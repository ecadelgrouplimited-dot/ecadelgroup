#!/usr/bin/env node
/**
 * Scroll audit — proves the viewport still behaves after `overflow-x: clip` on
 * `body` (see app/globals.css).
 *
 * Why this exists: with `html { overflow: visible }`, a value set on `body`
 * propagates to the *viewport*, so that one-line change governs the whole
 * document. It is the fix for a real 6px horizontal overflow, but it could also
 * plausibly break vertical scrolling, fixed positioning, or scroll-driven
 * animations. Assertions beat assumptions.
 *
 * Usage: node scripts/scroll-audit.mjs [url]        (server must be running)
 * Requires: node >= 20 and Chrome/Chromium on PATH (or set CHROME_PATH).
 */

import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_ = process.argv.slice(2).find((a) => !a.startsWith("--")) || "http://localhost:3100/";
const PORT = 9334;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PROBE = `(async () => {
  const out = {};
  const de = document.documentElement;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Precondition: an unstyled page (stale server build) makes every number here
  // meaningless, and can even look like a pass.
  out.styled = getComputedStyle(document.body).backgroundColor !== "rgba(0, 0, 0, 0)";
  out.stylesheets = Array.from(document.styleSheets).length;

  out.docHeight = de.scrollHeight;
  out.viewportHeight = window.innerHeight;
  out.pageIsTaller = de.scrollHeight > window.innerHeight + 100;

  // The document styles html with scroll-behavior: smooth, so window.scrollTo
  // animates. Measuring straight after the call reads a position mid-flight and
  // proves nothing — force instant positioning for the measurement.
  const jump = (left, top) => window.scrollTo({ left, top, behavior: "instant" });

  // 1. vertical scrolling must work
  jump(0, 1500);
  await wait(400);
  out.scrolledY = window.scrollY;

  // 2. horizontal scrolling must NOT be possible
  jump(250, window.scrollY);
  await wait(400);
  out.scrolledX = window.scrollX;
  out.maxHorizontalScroll = (() => {
    const de2 = document.documentElement;
    return Math.max(de2.scrollWidth, document.body.scrollWidth) - window.innerWidth;
  })();
  jump(0, window.scrollY);

  // 3. fixed elements must still pin to the viewport after scrolling
  const nav = document.querySelector("nav");
  const navRect = nav ? nav.getBoundingClientRect() : null;
  out.navTop = navRect ? Math.round(navRect.top) : null;
  out.navFixed = nav ? getComputedStyle(nav).position === "fixed" : null;
  const skips = Array.from(document.querySelectorAll("a.skip-link"));
  out.skipLinkTop = skips.length ? Math.round(skips[0].getBoundingClientRect().top) : null;

  // 4. scroll-driven animation must still be driven
  const bar = Array.from(document.querySelectorAll("div")).find((d) => {
    const s = getComputedStyle(d);
    return s.position === "fixed" && s.top === "0px" && d.className.includes("origin-left");
  });
  out.progressBarFound = !!bar;
  out.progressScale = bar ? Math.round(new DOMMatrixReadOnly(getComputedStyle(bar).transform).a * 100) / 100 : null;

  // 5. the scroll-to-top control appears once scrolled
  const up = Array.from(document.querySelectorAll("button")).find(
    (b) => (b.getAttribute("aria-label") || "") === "Scroll to top"
  );
  out.scrollTopButtonVisible = up ? up.getBoundingClientRect().width > 0 : false;

  // 6. nothing may be clipped off the right edge
  out.offRightEdge = Array.from(document.querySelectorAll("body *")).filter((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0) return false;
    let p = el.parentElement;
    while (p && p !== document.body) { if (getComputedStyle(p).overflowX !== "visible") return false; p = p.parentElement; }
    return r.right - window.innerWidth > 1;
  }).length;

  jump(0, 0);
  await wait(400);
  out.backToTopY = window.scrollY;
  return out;
})()`;

const chromeBin = (process.env.CHROME_PATH
  ? [process.env.CHROME_PATH]
  : ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]);

const profile = mkdtempSync(join(tmpdir(), "scroll-audit-"));
let proc, version;
for (const bin of chromeBin) {
  proc = spawn(bin, ["--headless=new", "--disable-gpu", "--no-sandbox",
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"],
    { stdio: ["ignore", "ignore", "ignore"] });
  for (let i = 0; i < 50; i++) {
    try { const r = await fetch(`http://127.0.0.1:${PORT}/json/version`); if (r.ok) { version = await r.json(); break; } } catch {}
    await sleep(200);
  }
  if (version) break;
  proc.kill();
}
if (!version) { console.error(`Could not start Chrome (tried ${chromeBin.join(", ")})`); process.exit(1); }

const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
let id = 0; const pending = new Map(); const events = [];
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) events.push(m);
};
const send = (method, params = {}, sessionId) => new Promise((res) => {
  const i = ++id; pending.set(i, res);
  ws.send(JSON.stringify({ id: i, method, params, sessionId }));
});

const { result: { targetId } } = await send("Target.createTarget", { url: "about:blank" });
const { result: { sessionId } } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send("Runtime.enable", {}, sessionId);
await send("Emulation.setDeviceMetricsOverride", { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);
await send("Page.navigate", { url: URL_ }, sessionId);
for (let i = 0; i < 80; i++) { if (events.some((e) => e.method === "Page.loadEventFired")) break; await sleep(100); }
await sleep(2000);

const reply = await send("Runtime.evaluate", { expression: PROBE, returnByValue: true, awaitPromise: true }, sessionId);
const r = reply.result?.result?.value;
if (!r) { console.error("probe failed:", JSON.stringify(reply.result).slice(0, 400)); process.exit(1); }

console.log(`Scroll audit — ${URL_}\n`);
let failures = 0;
const check = (ok, label, detail = "") => {
  if (ok) console.log(`  ok   ${label}${detail ? "  (" + detail + ")" : ""}`);
  else { failures++; console.log(`  FAIL ${label}${detail ? "  (" + detail + ")" : ""}`); }
};

check(r.styled && r.stylesheets > 0, "page stylesheet loaded", `${r.stylesheets} sheet(s); body background resolved`);
check(r.pageIsTaller, "page is taller than the viewport", `${r.docHeight}px content / ${r.viewportHeight}px viewport`);
check(r.scrolledY === 1500, "vertical scrolling works", `scrollY after scrollTo(0,1500) = ${r.scrolledY}`);
check(r.scrolledX === 0, "horizontal scrolling is impossible", `scrollX after instant scrollTo(250) = ${r.scrolledX} (scrollable overflow ${r.maxHorizontalScroll}px)`);
check(r.backToTopY === 0, "scrolling back to the top works", `scrollY = ${r.backToTopY}`);
check(r.navFixed && r.navTop === 0, "fixed nav stays pinned after scrolling", `position ${r.navFixed}, top ${r.navTop}px`);
check(r.skipLinkTop !== null, "skip link still in the layer", `top ${r.skipLinkTop}px`);
check(r.progressBarFound && r.progressScale > 0, "scroll-driven progress bar is being driven", `scaleX ${r.progressScale}`);
check(r.scrollTopButtonVisible, "scroll-to-top control appears after scrolling");
check(r.offRightEdge === 0, "nothing rendered past the right edge", `${r.offRightEdge} element(s)`);

ws.close(); proc.kill();
try { rmSync(profile, { recursive: true, force: true }); } catch {}
console.log(`\n${failures === 0 ? "PASS" : `FAIL (${failures})`}`);
process.exit(failures === 0 ? 0 : 1);
