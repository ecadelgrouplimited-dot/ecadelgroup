#!/usr/bin/env node
/**
 * Site audit — launches its own headless Chrome and drives it over the
 * DevTools Protocol. Two modes:
 *
 *   node scripts/site-audit.mjs [url]                  responsive sweep
 *   node scripts/site-audit.mjs [url] --reduced-motion accessibility checks
 *
 * Why this exists: this site animates a lot, and animated content can quietly
 * break the "no horizontal scrolling" rule (a card waiting off-screen at an
 * x-offset makes the document wider than the viewport). That is invisible in a
 * code review and easy to reintroduce, so it gets measured instead of assumed.
 *
 * Requires: node >= 20 and a Chrome/Chromium binary on PATH (or set
 * CHROME_PATH). The dev server must already be running.
 */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const ARGS = process.argv.slice(2);
const REDUCED_MOTION = ARGS.includes("--reduced-motion");
const URL_ = ARGS.find((a) => !a.startsWith("--")) || "http://localhost:3100/";
const PORT = 9333;
const WIDTHS = [360, 390, 768, 834, 1024, 1180, 1280, 1440, 1920];

const CHROME =
  process.env.CHROME_PATH ||
  ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"].join("|");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Measurements run inside the page ────────────────────────────────────────
const RESPONSIVE = `(() => {
  const vw = window.innerWidth, de = document.documentElement;
  const isClipped = (el) => {
    let p = el.parentElement;
    while (p && p !== document.body) {
      if (getComputedStyle(p).overflowX !== "visible") return true;
      p = p.parentElement;
    }
    return false;
  };
  const out = { vw, hOverflow: de.scrollWidth - vw, offenders: [], nav: null };

  if (out.hOverflow > 1) {
    document.querySelectorAll("body *").forEach((el) => {
      if (isClipped(el)) return;                       // marquee innards always overhang
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right - vw > 1) {
        const sec = el.closest("section[id]");
        const grid = el.closest('div[class*="grid"]');
        out.offenders.push({
          section: sec ? sec.id : "(none)",
          row: grid && grid.querySelector("h3") ? grid.querySelector("h3").textContent.trim().slice(0, 40) : "?",
          tag: el.tagName, cls: String(el.className || "").slice(0, 60),
          over: Math.round(r.right - vw),
        });
      }
    });
    out.offenders.sort((a, b) => b.over - a.over);
    out.offenders = out.offenders.slice(0, 5);
  }

  const nav = document.querySelector("nav");
  if (nav && nav.firstElementChild) {
    const inner = nav.firstElementChild;
    const kids = Array.from(inner.children)
      .filter((k) => k.getBoundingClientRect().width > 0)
      .map((k) => k.getBoundingClientRect());
    const wrap = inner.querySelector("div.hidden") || inner.children[1];
    const links = wrap
      ? Array.from(wrap.querySelectorAll("a"))
          .map((a) => a.getBoundingClientRect())
          .filter((r) => r.width > 0)
      : [];
    out.nav = {
      overflowsRow: inner.scrollWidth - Math.round(inner.getBoundingClientRect().width) > 1,
      overlap: kids.some((r, i) => i > 0 && r.left < kids[i - 1].right - 0.5),
      links: links.length,
      slackEachSide: kids.length > 1 ? kids.slice(1).map((r, i) => Math.round(r.left - kids[i].right)) : [],
      burger: (() => { const b = nav.querySelector("button"); if (!b) return null; return b.getBoundingClientRect().width > 0; })(),
    };
  }
  // Preconditions: if the stylesheet failed to load (e.g. the dev server is
  // serving a stale build whose chunk hashes no longer exist), every layout
  // measurement below is meaningless and can even LOOK like a pass. Fail loudly
  // instead of reporting a false result.
  out.styled = getComputedStyle(document.body).backgroundColor !== "rgba(0, 0, 0, 0)";
  out.stylesheets = Array.from(document.styleSheets).length;
  out.chunksOk = !Array.from(document.querySelectorAll("link[rel=stylesheet]"))
    .some((l) => l.sheet === null); // a null .sheet means the CSS 404'd

  out.sections = document.querySelectorAll("section[id]").length;
  out.hasFeaturedSection = !!document.getElementById("akili-os");

  // every field on the enquiry form must resolve to a real <label>
  const ids = ["contact-name", "contact-org", "contact-email", "contact-type", "contact-message"];
  out.unlabelledFields = ids.filter((id) => {
    const el = document.getElementById(id);
    return !el || el.labels === null || el.labels.length === 0;
  });

  // images must carry alt text
  out.imagesMissingAlt = Array.from(document.querySelectorAll("img"))
    .filter((i) => !i.hasAttribute("alt")).length;
  return out;
})()`;

const REDUCED = `(async () => {
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const t = (el) => el ? getComputedStyle(el).transform : null;
  const isIntro = (d) => getComputedStyle(d).zIndex === "99999" && getComputedStyle(d).position === "fixed";
  const introVisible = () => Array.from(document.querySelectorAll("div")).some(isIntro);

  // Sample the intro from the moment the probe runs. A single late check would
  // miss a brief flash — "skipped" has to mean never shown, not just gone later.
  const samples = [];
  for (let i = 0; i < 24; i++) { samples.push(introVisible()); await wait(50); }

  const marquee = document.querySelector('[class*="whitespace-nowrap"]');
  const track = marquee ? marquee.querySelector("div") : null;
  const before = t(track);
  await wait(900);
  const after = t(track);

  // Precondition: an unstyled page (stale server build) would trivially "pass".
  const styled = getComputedStyle(document.body).backgroundColor !== "rgba(0, 0, 0, 0)";

  return {
    styled,
    mediaMatches: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    bodyCursor: getComputedStyle(document.body).cursor,
    introEverVisible: samples.some(Boolean),
    introFramesVisible: samples.filter(Boolean).length,
    introStillVisible: samples[samples.length - 1],
    marqueeTransformStatic: before === after,
    marqueeTransform: before,
    hasFeaturedSection: !!document.getElementById("akili-os"),
  };
})()`;

// ── CDP plumbing ────────────────────────────────────────────────────────────
class Chrome {
  constructor() {
    this.profile = mkdtempSync(join(tmpdir(), "site-audit-"));
  }
  async start() {
    const candidates = CHROME.split("|");
    for (const bin of candidates) {
      this.proc = spawn(bin, [
        "--headless=new", "--disable-gpu", "--no-sandbox",
        `--remote-debugging-port=${PORT}`, `--user-data-dir=${this.profile}`,
        "about:blank",
      ], { stdio: ["ignore", "ignore", "ignore"] });
      for (let i = 0; i < 50; i++) {
        try {
          const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
          if (r.ok) { this.version = await r.json(); return; }
        } catch { /* not up yet */ }
        await sleep(200);
      }
      this.proc.kill();
    }
    throw new Error(`Could not start a Chrome binary (tried: ${candidates.join(", ")}). Set CHROME_PATH.`);
  }
  async connect() {
    const ws = new WebSocket(this.version.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let id = 0;
    this.pending = new Map();
    this.events = [];
    ws.onmessage = (e) => {
      const m = JSON.parse(e.data);
      if (m.id && this.pending.has(m.id)) { this.pending.get(m.id)(m); this.pending.delete(m.id); }
      else if (m.method) this.events.push(m);
    };
    this.ws = ws;
    const { result: { targetId } } = await this.send("Target.createTarget", { url: "about:blank" });
    const { result: { sessionId } } = await this.send("Target.attachToTarget", { targetId, flatten: true });
    this.targetId = targetId;
    this.session = sessionId;
    await this.send("Page.enable", {}, sessionId);
    await this.send("Runtime.enable", {}, sessionId);
    await this.send("Log.enable", {}, sessionId);
  }
  send(method, params = {}, sessionId) {
    return new Promise((res) => {
      const id = (this._i = (this._i || 0) + 1);
      this.pending.set(id, res);
      this.ws.send(JSON.stringify({ id, method, params, sessionId }));
    });
  }
  async open(width, mobile, reducedMotion) {
    if (width) await this.send("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile }, this.session);
    if (reducedMotion !== undefined) {
      await this.send("Emulation.setEmulatedMedia", {
        features: [{ name: "prefers-reduced-motion", value: reducedMotion ? "reduce" : "no-preference" }],
      }, this.session);
    }
    this.events.length = 0;
    await this.send("Page.navigate", { url: URL_ }, this.session);
    for (let i = 0; i < 80; i++) {
      if (this.events.some((e) => e.method === "Page.loadEventFired")) break;
      await sleep(100);
    }
    await sleep(1600);
  }
  async evaluate(expression) {
    const reply = await this.send("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true }, this.session);
    if (reply.result?.exceptionDetails) throw new Error(reply.result.exceptionDetails.text || "evaluate threw");
    return reply.result?.result?.value;
  }
  async close() {
    try { await this.send("Target.closeTarget", { targetId: this.targetId }); } catch { /* going away anyway */ }
    this.ws?.close();
    this.proc?.kill();
    try { rmSync(this.profile, { recursive: true, force: true }); } catch { /* best effort */ }
  }
}

// ── Main ────────────────────────────────────────────────────────────────────
const chrome = new Chrome();
await chrome.start();
await chrome.connect();

let failures = 0;
const fail = (m) => { failures++; console.log("  FAIL " + m); };

if (REDUCED_MOTION) {
  console.log(`Reduced-motion audit — ${URL_}\n`);
  await chrome.open(1280, false, true);
  const r = await chrome.evaluate(REDUCED);
  const check = (ok, label, detail = "") => {
    if (ok) console.log(`  ok   ${label}${detail ? "  (" + detail + ")" : ""}`);
    else fail(`${label}${detail ? "  (" + detail + ")" : ""}`);
  };
  check(r.styled, "page stylesheet loaded (measurements are meaningful)");
  check(r.mediaMatches, "browser reports prefers-reduced-motion: reduce");
  check(r.bodyCursor === "auto", "native cursor restored", `cursor: ${r.bodyCursor}`);
  check(!r.introEverVisible, "branded intro never shown", `visible in ${r.introFramesVisible}/24 samples, still visible at end: ${r.introStillVisible}`);
  check(r.marqueeTransformStatic, "marquee is not animating", `transform ${r.marqueeTransform}`);
  check(r.hasFeaturedSection, "Akili Code OS section present");
} else {
  console.log(`Responsive audit — ${URL_}\n`);
  console.log("  width  overflow  navFits  overlap  burger  links  slack");
  for (const width of WIDTHS) {
    await chrome.open(width, width < 768, false);
    const r = await chrome.evaluate(RESPONSIVE);
    const nav = r.nav || {};
    const line = [
      String(width).padStart(7),
      (r.hOverflow > 1 ? `+${r.hOverflow}` : "none").padStart(9),
      String(!nav.overflowsRow).padStart(8),
      String(!nav.overlap).padStart(8),
      String(nav.burger).padStart(7),
      String(nav.links).padStart(6),
      JSON.stringify(nav.slackEachSide).padStart(8),
    ].join("  ");
    console.log(line);
    if (!r.styled || !r.chunksOk) {
      fail(`page is NOT styled at ${width}px (css 404 — restart the server after a build). Every measurement below is unreliable.`);
      continue;
    }
    if (r.hOverflow > 1) {
      fail(`horizontal overflow of ${r.hOverflow}px at ${width}px`);
      for (const o of r.offenders) console.log(`         #${o.section} · ${o.row} · <${o.tag}> +${o.over}px  ${o.cls}`);
    }
    if (nav.overflowsRow) fail(`nav row overflows at ${width}px`);
    if (nav.overlap) fail(`nav children collide at ${width}px`);
    if (r.sections < 10) fail(`only ${r.sections} sections rendered at ${width}px`);
    if (r.unlabelledFields.length) fail(`unlabelled form fields at ${width}px: ${r.unlabelledFields.join(", ")}`);
    if (r.imagesMissingAlt) fail(`${r.imagesMissingAlt} image(s) without alt text at ${width}px`);
    if (width >= 1024 && nav.links < 8) fail(`expected 8 nav links at ${width}px, saw ${nav.links}`);
    if (width >= 1024 && nav.slackEachSide.some((g) => g < 16)) {
      fail(`nav slack below 16px at ${width}px: ${JSON.stringify(nav.slackEachSide)}`);
    }
  }
}

await chrome.close();
console.log(`\n${failures === 0 ? "PASS" : `FAIL (${failures})`}`);
process.exit(failures === 0 ? 0 : 1);
