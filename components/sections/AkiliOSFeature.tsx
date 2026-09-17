"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Download, BookOpen, Code2,
  ShieldCheck, Terminal, GitBranch, Wallet, Gauge, Cpu, Zap, Layers,
  Lock, Sparkles, Undo2, ScanEye, CircleCheckBig,
} from "lucide-react";

// Content sourced from the Akili OS documentation (akilios.dev/docs):
//   /docs/models, /docs/billing, /docs/getting-started, /docs/trust
const DOCS = "https://akilios.dev/docs";
const HOME = "https://akilios.dev";

// ── Why teams move to it ─────────────────────────────────────────────────────
const reasons = [
  {
    icon: ShieldCheck,
    title: "It proves its work",
    desc: "Verification runs your project's own build and test ladder after every change, and revert-on-fail puts the file back if it fails. \"The model says it's done\" and \"it is done\" stop being the same sentence.",
  },
  {
    icon: Lock,
    title: "Your code never leaves the machine",
    desc: "Akili Code OS is native and local — your files stay on disk and only model calls go out. Work opens the folder you grant it and nothing else.",
  },
  {
    icon: Layers,
    title: "One engine, three faces",
    desc: "Build for software, Motion for video, Work for documents and data. One provider list, one budget, one policy engine, one plan view, one audit log — learn a control once and it applies everywhere.",
  },
  {
    icon: Wallet,
    title: "A budget that stops the run",
    desc: "Per-conversation and per-day caps in dollars, enforced at the gateway. A run that crosses one is stopped mid-flight rather than reported afterwards — when it is already too late to matter.",
  },
  {
    icon: Undo2,
    title: "A checkpoint before every run",
    desc: "A git checkpoint is committed before the agent starts, so an entire run is undoable as a unit. Red/green diffs per file, and every tool call appended to .akili-code/audit.log.",
  },
  {
    icon: Sparkles,
    title: "Nothing to wire up",
    desc: "No provider key to obtain or paste, and no runtime to install around it. Rust binaries for Linux, macOS and Windows, and nothing to arrange before you can see it work.",
  },
];

// ── Install to verified change ───────────────────────────────────────────────
const terminalLines: { cmd: string; note: string }[] = [
  {
    cmd: "curl -fsSL https://akilios.dev/install.sh | sh",
    note: "picks your build and checks it against the release checksums",
  },
  {
    cmd: 'export AKILI_API_BASE="https://api.akilios.dev/v1"',
    note: "Akili's own gateway — Fundi and Core included",
  },
  {
    cmd: 'export AKILI_API_KEY="akili_live_…"',
    note: "issued to you by your organisation — no provider account to open",
  },
  {
    cmd: "akili-code inspect",
    note: "reads the project before anything is written",
  },
  {
    cmd: 'akili-code ask "where would I add an HTTP route?"',
    note: "seeds a context pack and cites the paths it relied on — read-only",
  },
  {
    cmd: 'akili-code edit src/main.rs "add a --version flag" \\',
    note: "",
  },
  {
    cmd: "    --apply --verify --revert-on-fail",
    note: "writes it, runs your build and tests, rolls back if they fail",
  },
];

// ── The two models ───────────────────────────────────────────────────────────
const models = [
  {
    name: "Akili Fundi",
    qualifier: "(Code)",
    tag: "The build model",
    accent: "#C8A96E",
    icon: Code2,
    role: "Long agent runs, refactors and migrations — work that has stages and has to hold a plan together across many steps.",
    reach: [
      "Agent runs that write, run and verify code",
      "Refactors and migrations across a whole codebase",
      "Anything that must keep a plan straight over dozens of steps",
    ],
    default: false,
  },
  {
    name: "Akili Core",
    qualifier: "",
    tag: "The everyday model",
    accent: "#D4B97E",
    icon: Zap,
    role: "Chat, search, quick edits, reading and summarising. Fast and inexpensive — the right default for most of the day.",
    reach: [
      "Asking questions about a codebase",
      "Small, targeted edits and cleanup",
      "Reading, summarising and drafting",
    ],
    default: true,
  },
];

function ReasonCard({ icon: Icon, title, desc, delay }: { icon: typeof ShieldCheck; title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay }}
      className="group relative border border-white/8 bg-carbon p-7 hover:border-emerald-deep/40 transition-colors duration-300"
    >
      <div className="w-9 h-9 flex items-center justify-center border border-emerald-deep/30 bg-emerald-deep/8 mb-5">
        <Icon size={15} className="text-emerald-glow" />
      </div>
      <h3 className="font-display font-semibold text-softwhite text-base mb-2.5 tracking-wide">
        {title}
      </h3>
      <p className="text-platinum/65 text-[13px] leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function TerminalMock() {
  return (
    <div className="relative w-full rounded-sm overflow-hidden bg-carbon border border-white/8"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-[10px] text-platinum/50 font-mono">akili-code — terminal</div>
      </div>
      <div className="p-5 space-y-3.5 overflow-x-auto">
        {terminalLines.map((line) => (
          <div key={line.cmd} className="whitespace-pre font-mono text-[11px] leading-relaxed">
            <div>
              <span className="text-emerald-glow/70 select-none">$ </span>
              <span className="text-softwhite/85">{line.cmd}</span>
            </div>
            {line.note && (
              <div className="text-platinum/60 text-[10px] pl-4 mt-1"># {line.note}</div>
            )}
          </div>
        ))}
        <div className="whitespace-pre font-mono text-[11px] leading-relaxed pt-1 border-t border-white/5 mt-4">
          <div className="text-platinum/60 text-[10px] pt-3"># worst case: nothing happened</div>
        </div>
      </div>
    </div>
  );
}

export default function AkiliOSFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="akili-os" ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-25" />

      {/* gold radial behind the headline */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 25% 15%, rgba(200,169,110,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* ── Headline ── */}
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
                Featured
              </span>
              <span className="h-px w-10 bg-emerald-deep/40" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-platinum/50 font-mono">
                Try it today
              </span>
            </div>

            <h2 className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-6">
              The Engine We Build On.
              <br />
              <span style={{ color: "#C8A96E" }}>Now On Your Machine.</span>
            </h2>

            <p className="text-platinum/72 text-base leading-relaxed mb-5 max-w-2xl">
              <span className="text-softwhite/85 font-medium">Akili Code OS</span> is a native
              operating layer for AI work — not another browser tab. <strong className="text-softwhite/80 font-semibold">Build</strong> writes,
              runs and verifies software. <strong className="text-softwhite/80 font-semibold">Motion</strong> makes video from
              scenes that stay editable data. <strong className="text-softwhite/80 font-semibold">Work</strong> opens real
              documents and spreadsheets, researches with citations, and drafts your email.
            </p>
            <p className="text-platinum/60 text-sm leading-relaxed mb-9 max-w-2xl">
              It is the same engine our own teams ship with — now available to the businesses and
              institutions we work with. Linux, macOS and Windows, with no runtime to install
              around it.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <a
                href={`${HOME}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-deep text-obsidian text-sm font-semibold tracking-wide hover:bg-emerald-glow transition-all duration-300"
                style={{ boxShadow: "0 0 30px rgba(200,169,110,0.25)" }}
              >
                <Download size={16} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                Download Akili Code OS
              </a>
              <a
                href={DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-platinum/20 text-platinum/75 text-sm tracking-wide hover:border-emerald-deep/60 hover:text-softwhite transition-all duration-300"
              >
                <BookOpen size={15} />
                Read the docs
              </a>
            </div>

            {/* chips */}
            <ul className="flex flex-wrap gap-3">
              {[
                "Runs on your machine",
                "Files never leave it",
                "No provider key needed",
                "Verifies its own work",
              ].map((chip) => (
                <li
                  key={chip}
                  className="text-[10px] tracking-[0.14em] uppercase text-platinum/65 border border-white/8 px-3 py-1.5"
                >
                  {chip}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
          >
            <TerminalMock />
            <p className="text-platinum/60 text-[11px] leading-relaxed mt-4 font-mono">
              Served by Akili&apos;s own gateway — there is no provider key to obtain. Nothing is written until you ask for it.
            </p>
          </motion.div>
        </div>

        {/* ── Why ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Why it is different
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-24">
          {reasons.map((r, i) => (
            <ReasonCard
              key={r.title}
              icon={r.icon}
              title={r.title}
              desc={r.desc}
              delay={i * 0.06}
            />
          ))}
        </div>

        {/* ── The models ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
              The models
            </span>
            <span className="h-px w-10 bg-emerald-deep/40" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-platinum/50 font-mono">
              Akili Fundi &amp; Akili Core
            </span>
          </div>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite leading-tight mb-5">
            Two Akili models.<br />
            <span style={{ color: "#C8A96E" }}>Both behind every face.</span>
          </h3>
          <p className="text-platinum/72 leading-relaxed max-w-3xl">
            Akili Code OS runs on Akili&apos;s own models — served by our own gateway, so there is no
            provider key to obtain and no third party in the middle. Both carry a{" "}
            <span className="text-softwhite/80">1,000,000-token context window</span>, and you can
            switch between them mid-conversation: start on the deep-reasoning model while the
            thinking is hard, drop to the fast one once it isn&apos;t.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {models.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, delay: i * 0.12 }}
                className="relative border border-white/8 bg-carbon p-8 hover:border-emerald-deep/40 transition-colors duration-300"
              >
                {/* accent rule */}
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, ${m.accent}, transparent)` }} />

                <div className="flex items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 flex items-center justify-center border"
                      style={{ borderColor: "rgba(200,169,110,0.3)", background: "rgba(200,169,110,0.07)" }}
                    >
                      <Icon size={16} style={{ color: m.accent }} />
                    </div>
                    <div>
                      <div className="font-display font-bold text-softwhite text-lg leading-none">
                        {m.name}{" "}
                        {m.qualifier && (
                          <span className="text-platinum/55 font-normal text-sm">{m.qualifier}</span>
                        )}
                      </div>
                      <div className="text-[10px] tracking-[0.2em] uppercase text-platinum/50 font-mono mt-1.5">
                        {m.tag}
                      </div>
                    </div>
                  </div>
                  {m.default && (
                    <span className="text-[9px] tracking-[0.18em] uppercase text-emerald-glow border border-emerald-deep/40 px-2.5 py-1 font-mono whitespace-nowrap">
                      The default
                    </span>
                  )}
                </div>

                <p className="text-platinum/70 text-sm leading-relaxed mb-7">{m.role}</p>

                <div className="text-[10px] tracking-[0.22em] uppercase text-platinum/60 font-display mb-3">
                  Reach for it when
                </div>
                <div className="space-y-2.5 mb-7">
                  {m.reach.map((r) => (
                    <div key={r} className="flex items-start gap-2.5 text-sm text-platinum/65">
                      <CircleCheckBig size={13} className="flex-shrink-0 mt-0.5" style={{ color: m.accent }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-px bg-white/5">
                  <div className="bg-carbon px-4 py-3">
                    <div className="font-mono text-sm font-bold" style={{ color: m.accent }}>
                      1,000,000
                    </div>
                    <div className="text-platinum/50 text-[9px] uppercase tracking-wider mt-0.5">
                      Token context
                    </div>
                  </div>
                  <div className="bg-carbon px-4 py-3">
                    <div className="font-mono text-sm font-bold text-softwhite">Switchable</div>
                    <div className="text-platinum/50 text-[9px] uppercase tracking-wider mt-0.5">
                      Mid-conversation
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* switch + context note */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-px bg-white/5 mb-24"
        >
          {[
            {
              icon: Gauge,
              title: "Switch mid-conversation",
              desc: "The switch takes effect on the next turn, and the context gauge and cost meter re-scale to whichever model is active.",
            },
            {
              icon: Cpu,
              title: "Context that is used, not dumped",
              desc: "A 1M window is not permission to send everything. It seeds a context pack from your question and spreads relevance across the dependency graph — so long runs don't fall over halfway.",
            },
            {
              icon: ScanEye,
              title: "Cost you can see",
              desc: "The meter reads actual usage from the API's own response, not an estimate, and cache hits are credited — so a repeat turn over the same context bills at a fraction of the first.",
            },
          ].map((n) => {
            const Icon = n.icon;
            return (
              <div key={n.title} className="bg-carbon p-7">
                <Icon size={15} className="text-emerald-deep mb-4" />
                <div className="font-display font-semibold text-softwhite text-sm mb-2.5 tracking-wide">
                  {n.title}
                </div>
                <p className="text-platinum/60 text-[12px] leading-relaxed">{n.desc}</p>
              </div>
            );
          })}
        </motion.div>

        {/* ── Install + where to go next ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 border border-white/8 bg-carbon"
        >
          <div className="p-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex items-center justify-center border border-emerald-deep/40 bg-emerald-deep/10 flex-shrink-0">
                <Terminal size={16} className="text-emerald-glow" />
              </div>
              <div>
                <div className="font-display font-bold text-softwhite text-lg mb-1.5">
                  Install it in one line
                </div>
                <p className="text-platinum/65 text-[13px] leading-relaxed max-w-xl">
                  Linux and macOS get a single command that verifies the download against the release
                  checksums. Windows takes the archive from the download page.
                </p>
                <code className="inline-block mt-3 font-mono text-[11px] text-emerald-glow/85 bg-obsidian/70 border border-white/8 px-3 py-1.5">
                  curl -fsSL https://akilios.dev/install.sh | sh
                </code>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch gap-3 flex-shrink-0">
              <a
                href={`${HOME}/download`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-deep text-obsidian text-sm font-semibold tracking-wide hover:bg-emerald-glow transition-all duration-300"
              >
                <Download size={15} className="group-hover:translate-y-0.5 transition-transform duration-200" />
                Download
              </a>
              <a
                href={DOCS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-platinum/20 text-platinum/75 text-sm tracking-wide hover:border-emerald-deep/60 hover:text-softwhite transition-all duration-300"
              >
                <BookOpen size={15} />
                Documentation
              </a>
            </div>
          </div>

          {/* Commercial detail deliberately stays on the product site. */}
          <div className="border-t border-white/8 px-10 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-platinum/60 text-[12px] leading-relaxed max-w-2xl">
              Plans, pricing, daily allowances and billing live on the product site, where they are
              always current — we keep this page to what Akili Code OS does and why it matters.
            </p>
            <a
              href={`${DOCS}/billing`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-[12px] text-emerald-glow whitespace-nowrap border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
            >
              Plans &amp; pricing on akilios.dev
              <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>

        {/* section-level footnote */}
        <p className="text-platinum/60 text-[10px] tracking-[0.14em] uppercase font-mono mt-8 flex items-center gap-2">
          <GitBranch size={11} />
          Akili Code OS · a group platform by ECADEL GROUP LIMITED
        </p>
      </div>
    </section>
  );
}
