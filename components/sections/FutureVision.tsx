"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Bot, Building, Globe2, MapPin, Network } from "lucide-react";

// ── Milestone timeline data ───────────────────────────────────────────────────
const milestones = [
  {
    year: "2026",
    label: "Foundation",
    desc: "ECADEL GROUP launches. SBB & PAME AI live. Uganda operations established.",
    active: true,
  },
  {
    year: "2028",
    label: "Regional Scale",
    desc: "East African deployment. SafeRoad UG fully operational. Hapa city networks launch.",
    active: false,
  },
  {
    year: "2030",
    label: "Continental Grid",
    desc: "Meridian deployed across 10 African governments. 100M+ people on ECADEL infrastructure.",
    active: false,
  },
  {
    year: "2035",
    label: "Pan-African",
    desc: "Sovereign intelligence infrastructure operational across all major African economies.",
    active: false,
  },
  {
    year: "2050",
    label: "Sovereign Continent",
    desc: "Africa operates on a fully sovereign, continent-wide intelligence grid — built by Africans.",
    active: false,
  },
];

// ── Future capability pillars ─────────────────────────────────────────────────
const pillars = [
  {
    icon: Cpu,
    label: "Advanced AI Infrastructure",
    desc: "Sovereign AI models trained on African data, optimised for African languages, contexts, and infrastructure realities.",
    target: "2030",
    accent: "#C8A96E",
  },
  {
    icon: Bot,
    label: "Autonomous Systems",
    desc: "Intelligent logistics, transport, and civic automation built specifically for African urban and rural environments.",
    target: "2032",
    accent: "#8BA7C7",
  },
  {
    icon: Building,
    label: "Smart City Intelligence",
    desc: "City-scale operational intelligence managing energy, traffic, public safety, and civic services in real time.",
    target: "2033",
    accent: "#C8A96E",
  },
  {
    icon: Globe2,
    label: "Strategic Intelligence Networks",
    desc: "Cross-continental intelligence linking governments, development banks, and institutions with consequence foresight.",
    target: "2035",
    accent: "#8BA7C7",
  },
  {
    icon: MapPin,
    label: "Regional Infrastructure",
    desc: "Fully operational intelligence infrastructure spanning East, West, Central, and Southern Africa simultaneously.",
    target: "2038",
    accent: "#C8A96E",
  },
  {
    icon: Network,
    label: "Continental Intelligence Grid",
    desc: "A unified, sovereign intelligence layer covering all 54 African nations — the backbone of a continent.",
    target: "2050",
    accent: "#D4A96E",
  },
];

// ── 2050 impact metrics ───────────────────────────────────────────────────────
const metrics = [
  { value: "1.4B+", label: "People on sovereign African intelligence infrastructure" },
  { value: "54",   label: "African nations with ECADEL systems operating" },
  { value: "$2T+", label: "Annual economic value generated through the grid" },
];

// ── Pre-computed particle positions (no hydration mismatch) ───────────────────
const PARTICLE_DATA = Array.from({ length: 55 }, (_, i) => ({
  x: ((i * 137.508) % 97) + 1.5,
  y: ((i * 97.618)  % 95) + 2.5,
  r: 0.6 + (i % 4) * 0.35,
  dur: 8 + (i % 7) * 2.5,
  delay: (i % 11) * 0.4,
  dx: ((i % 9) - 4) * 12,
  dy: ((i % 7) - 3) * 14,
  opacity: 0.18 + (i % 5) * 0.07,
}));

// ── Connection lines (pre-computed pairs) ─────────────────────────────────────
const CONNECTIONS = Array.from({ length: 18 }, (_, i) => ({
  x1: ((i * 173.1) % 90) + 5,
  y1: ((i * 113.7) % 85) + 7,
  x2: ((i * 89.3 + 40) % 90) + 5,
  y2: ((i * 61.4 + 30) % 85) + 7,
  opacity: 0.04 + (i % 3) * 0.015,
  dur: 6 + (i % 5) * 1.8,
  delay: (i % 9) * 0.6,
}));

// ── Orbital ring config ───────────────────────────────────────────────────────
const RINGS = [
  { r: 58,  dur: 60,  rev: false, dash: false, stroke: 0.14 },
  { r: 96,  dur: 45,  rev: true,  dash: true,  stroke: 0.10 },
  { r: 134, dur: 35,  rev: false, dash: false, stroke: 0.08 },
  { r: 172, dur: 28,  rev: true,  dash: true,  stroke: 0.06 },
];

const PLATFORM_NODES = [
  { angle: 0,   label: "SBB",      r: 96  },
  { angle: 72,  label: "PAME AI",  r: 134 },
  { angle: 144, label: "SafeRoad", r: 172 },
  { angle: 216, label: "Hapa",     r: 58  },
  { angle: 288, label: "Meridian", r: 96  },
].map(({ angle, label, r }) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    label,
    cx: 200 + r * Math.cos(rad),
    cy: 200 + r * Math.sin(rad),
    lx: 200 + (r + 24) * Math.cos(rad),
    ly: 200 + (r + 24) * Math.sin(rad),
    pulseDur: 2.2 + (angle / 72) * 0.4,
  };
});

// ── Pulsing scan-line keyframes injected once ─────────────────────────────────
const SCAN_STYLE = `
  @keyframes scan2050 {
    0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
    5%   { opacity: 1; }
    50%  { clip-path: inset(0 0% 0 0); }
    95%  { opacity: 1; }
    100% { clip-path: inset(0 0 0 100%); opacity: 0; }
  }
  @keyframes glow2050 {
    0%,100% { opacity: 0.04; filter: blur(2px); }
    50%     { opacity: 0.10; filter: blur(0px); }
  }
  @keyframes float-particle {
    0%,100% { transform: translate(0,0); }
    50%     { transform: translate(var(--dx),var(--dy)); }
  }
  @keyframes pulse-signal {
    0%,100% { stroke-dashoffset: 200; opacity: 0.06; }
    50%     { stroke-dashoffset: 0;   opacity: 0.18; }
  }
  @keyframes node-pulse {
    0%,100% { r: 5; opacity: 0.9; }
    50%     { r: 9; opacity: 0.3; }
  }
  @keyframes ring-glow {
    0%,100% { stroke-opacity: 0.06; }
    50%     { stroke-opacity: 0.18; }
  }
  @keyframes line-fill {
    from { stroke-dashoffset: 400; }
    to   { stroke-dashoffset: 0; }
  }
`;

export default function FutureVision() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [scanKey, setScanKey] = useState(0);

  // Re-trigger scan line periodically
  useEffect(() => {
    const id = setInterval(() => setScanKey(k => k + 1), 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="vision"
      ref={ref}
      className="relative py-32 bg-obsidian overflow-hidden"
    >
      {/* ── Injected keyframes ── */}
      <style>{SCAN_STYLE}</style>

      {/* ── Background constellation ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        {CONNECTIONS.map((c, i) => (
          <line
            key={i}
            x1={`${c.x1}%`} y1={`${c.y1}%`}
            x2={`${c.x2}%`} y2={`${c.y2}%`}
            stroke="#C8A96E"
            strokeWidth="0.08"
            opacity={c.opacity}
            style={{
              animation: `pulse-signal ${c.dur}s ${c.delay}s ease-in-out infinite`,
              strokeDasharray: 200,
            }}
          />
        ))}
        {PARTICLE_DATA.map((p, i) => (
          <circle
            key={i}
            cx={`${p.x}%`} cy={`${p.y}%`}
            r={`${p.r * 0.22}%`}
            fill="#C8A96E"
            opacity={p.opacity}
            style={{
              // @ts-expect-error custom CSS vars
              "--dx": `${p.dx}px`,
              "--dy": `${p.dy}px`,
              animation: `float-particle ${p.dur}s ${p.delay}s ease-in-out infinite`,
            }}
          />
        ))}
      </svg>

      {/* ── Ambient radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "70vw", height: "60vh",
          background: "radial-gradient(ellipse, rgba(200,169,110,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", top: "20%", right: "-10%",
          width: "40vw", height: "40vh",
          background: "radial-gradient(ellipse, rgba(139,167,199,0.04) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Giant breathing 2050 ghost ── */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none font-display font-black"
        style={{
          fontSize: "clamp(120px, 22vw, 320px)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,169,110,0.18)",
          animation: "glow2050 6s ease-in-out infinite",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
        }}
        aria-hidden="true"
      >
        2050
      </div>

      {/* ── Scan-line over the ghost text ── */}
      <div
        key={scanKey}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none font-display font-black"
        style={{
          fontSize: "clamp(120px, 22vw, 320px)",
          color: "rgba(200,169,110,0.15)",
          letterSpacing: "-0.04em",
          lineHeight: 0.85,
          animation: "scan2050 3s ease-in-out forwards",
        }}
        aria-hidden="true"
      >
        2050
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            className="mb-5"
          >
            <span className="text-xs tracking-[0.4em] uppercase text-emerald-glow font-display">
              Roadmap to 2050
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.1 }}
            className="font-display font-bold leading-tight mb-8 max-w-5xl mx-auto"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.5rem)" }}
          >
            <span className="text-softwhite">Building the Systems</span>
            <br />
            <span style={{ color: "#C8A96E" }}>Africa Runs on in 2050</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-platinum/74 text-lg leading-relaxed max-w-3xl mx-auto"
          >
            ECADEL GROUP LIMITED is not building for this decade alone. Our roadmap
            extends to a future where Africa operates on a fully sovereign,
            continent-wide intelligence infrastructure — built by Africans, owned by
            Africans, serving 1.4 billion people.
          </motion.p>
        </div>

        {/* ── Two-column: Timeline + Orbital Visual ── */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">

          {/* Left: Milestone timeline */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-[9px] tracking-[0.3em] uppercase text-platinum/50 font-display mb-8">
              Milestone Timeline
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[11px] top-3 bottom-3 w-px bg-white/8" />
              {/* Animated fill */}
              <motion.div
                className="absolute left-[11px] top-3 w-px bg-emerald-deep"
                initial={{ height: 0 }}
                animate={inView ? { height: "calc(100% - 24px)" } : { height: 0 }}
                transition={{ duration: 2.5, delay: 0.8, ease: "easeInOut" }}
              />

              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <motion.div
                    key={m.year}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.6 + i * 0.15 }}
                    className="relative flex gap-6 pb-8 last:pb-0"
                  >
                    {/* Dot */}
                    <div className="relative flex-shrink-0 mt-1">
                      <div
                        className="w-[23px] h-[23px] rounded-full border flex items-center justify-center z-10 relative"
                        style={{
                          borderColor: m.active ? "#C8A96E" : "rgba(255,255,255,0.12)",
                          background:  m.active ? "rgba(200,169,110,0.15)" : "rgba(6,6,8,0.8)",
                        }}
                      >
                        {m.active && (
                          <motion.div
                            className="w-2 h-2 rounded-full bg-emerald-deep"
                            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                        {!m.active && (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="pb-1">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span
                          className="font-display font-bold text-lg leading-none"
                          style={{ color: m.active ? "#C8A96E" : "rgba(240,237,230,0.7)" }}
                        >
                          {m.year}
                        </span>
                        <span
                          className="text-[10px] tracking-[0.18em] uppercase font-display"
                          style={{ color: m.active ? "#C8A96E" : "rgba(200,196,190,0.45)" }}
                        >
                          {m.label}
                        </span>
                        {m.active && (
                          <span className="text-[8px] tracking-[0.15em] uppercase text-emerald-glow border border-emerald-deep/30 px-1.5 py-0.5">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-platinum/60 leading-relaxed max-w-xs">
                        {m.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Orbital visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.5 }}
            className="flex items-center justify-center"
            style={{ height: 440 }}
          >
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full"
              style={{ maxWidth: 440 }}
              aria-hidden="true"
            >
              {/* Animated rings */}
              {RINGS.map((ring, i) => (
                <g key={i}>
                  <motion.circle
                    cx="200" cy="200" r={ring.r}
                    fill="none"
                    stroke="#C8A96E"
                    strokeWidth="0.8"
                    strokeOpacity={ring.stroke}
                    strokeDasharray={ring.dash ? "3 6" : "none"}
                    animate={{ rotate: ring.rev ? -360 : 360 }}
                    transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "200px 200px" }}
                  />
                  {/* Ring glow pulse */}
                  <circle
                    cx="200" cy="200" r={ring.r}
                    fill="none"
                    stroke="#C8A96E"
                    strokeWidth="1.5"
                    style={{ animation: `ring-glow ${8 + i * 3}s ${i * 1.5}s ease-in-out infinite` }}
                  />
                </g>
              ))}

              {/* Data flow pulses on rings */}
              {RINGS.slice(0, 3).map((ring, idx) => (
                <circle
                  key={`pulse-${idx}`}
                  cx={200 + ring.r} cy="200" r="3"
                  fill="#C8A96E"
                  opacity="0.8"
                  style={{
                    transformOrigin: "200px 200px",
                    animation: `spin ${ring.dur * 0.7}s ${idx * 2}s linear infinite`,
                  }}
                />
              ))}

              {/* Platform nodes */}
              {PLATFORM_NODES.map((node) => (
                <g key={node.label}>
                  {/* Connector line */}
                  <line
                    x1="200" y1="200"
                    x2={node.cx} y2={node.cy}
                    stroke="#C8A96E"
                    strokeWidth="0.5"
                    strokeOpacity="0.12"
                    strokeDasharray="3 4"
                  />
                  {/* Outer glow ring */}
                  <motion.circle
                    cx={node.cx} cy={node.cy} r={12}
                    fill="rgba(200,169,110,0.06)"
                    stroke="#C8A96E"
                    strokeWidth="0.8"
                    strokeOpacity="0.35"
                    animate={{ opacity: [0.35, 0.8, 0.35], scale: [1, 1.15, 1] }}
                    transition={{ duration: node.pulseDur, repeat: Infinity, ease: "easeInOut" }}
                    style={{ transformOrigin: `${node.cx}px ${node.cy}px` }}
                  />
                  {/* Inner dot */}
                  <circle cx={node.cx} cy={node.cy} r="4" fill="#C8A96E" opacity="0.9" />
                  {/* Label */}
                  <text
                    x={node.lx} y={node.ly}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#C8A96E"
                    fontSize="7.5"
                    fontFamily="monospace"
                    opacity="0.75"
                    letterSpacing="0.05em"
                  >
                    {node.label}
                  </text>
                </g>
              ))}

              {/* Center core */}
              <circle cx="200" cy="200" r="20"
                fill="rgba(200,169,110,0.12)"
                stroke="#C8A96E"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
              <motion.circle
                cx="200" cy="200"
                fill="none"
                stroke="#C8A96E"
                strokeWidth="1"
                strokeOpacity="0.3"
                animate={{ r: [20, 34, 20], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="200" cy="200"
                fill="none"
                stroke="#C8A96E"
                strokeWidth="0.6"
                strokeOpacity="0.15"
                animate={{ r: [20, 50, 20], opacity: [0.15, 0, 0.15] }}
                transition={{ duration: 3.5, delay: 1, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* ECADEL label in center */}
              <text x="200" y="197" textAnchor="middle" fill="#C8A96E" fontSize="8"
                fontFamily="'Space Grotesk', sans-serif" fontWeight="700"
                letterSpacing="0.15em" opacity="0.9"
              >
                ECADEL
              </text>
              <text x="200" y="208" textAnchor="middle" fill="#C8A96E" fontSize="6"
                fontFamily="monospace" letterSpacing="0.08em" opacity="0.55"
              >
                2026 — 2050
              </text>

              {/* Outer arc labels */}
              <text x="200" y="22" textAnchor="middle" fill="rgba(200,196,190,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.2em"
              >
                AFRICA
              </text>
              <text x="200" y="388" textAnchor="middle" fill="rgba(200,196,190,0.35)"
                fontSize="7" fontFamily="monospace" letterSpacing="0.2em"
              >
                CONTINENTAL
              </text>
            </svg>
          </motion.div>
        </div>

        {/* ── Future capability pillars ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mb-4"
        >
          <div className="text-[9px] tracking-[0.3em] uppercase text-platinum/50 font-display mb-8 text-center">
            What We Are Building Toward
          </div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-20">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 + i * 0.08 }}
                className="group relative bg-obsidian p-8 hover:bg-graphite transition-all duration-400 cursor-default overflow-hidden"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${pillar.accent}08 0%, transparent 70%)`,
                  }}
                />

                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                  style={{ background: pillar.accent }}
                />

                {/* Target year badge */}
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 flex items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: `${pillar.accent}30`,
                      background: `${pillar.accent}08`,
                    }}
                  >
                    <Icon
                      size={17}
                      style={{ color: `${pillar.accent}80` }}
                      className="group-hover:scale-110 transition-transform duration-200"
                    />
                  </div>
                  <span
                    className="text-[8px] tracking-[0.2em] uppercase font-mono border px-2 py-0.5"
                    style={{
                      color: `${pillar.accent}90`,
                      borderColor: `${pillar.accent}25`,
                    }}
                  >
                    Target {pillar.target}
                  </span>
                </div>

                <h3
                  className="font-display font-semibold text-sm mb-2 tracking-wide leading-snug transition-colors duration-200"
                  style={{ color: "rgba(240,237,230,0.85)" }}
                >
                  {pillar.label}
                </h3>
                <p className="text-platinum/60 text-xs leading-relaxed">
                  {pillar.desc}
                </p>

                <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `${pillar.accent}40` }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── 2050 impact metrics ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.4 }}
          className="grid grid-cols-3 gap-px bg-white/5 mb-16"
        >
          {metrics.map((m) => (
            <div
              key={m.label}
              className="bg-obsidian px-8 py-10 text-center group hover:bg-graphite transition-colors duration-300"
            >
              <motion.div
                className="font-display font-black leading-none mb-3"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  color: "#C8A96E",
                  textShadow: "0 0 40px rgba(200,169,110,0.25)",
                }}
                animate={inView ? { opacity: [0, 1], y: [20, 0] } : {}}
                transition={{ duration: 0.7, delay: 1.6 }}
              >
                {m.value}
              </motion.div>
              <div className="text-platinum/60 text-xs leading-relaxed max-w-[160px] mx-auto">
                {m.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="text-center"
        >
          <p className="text-platinum/50 text-sm mb-6 italic font-serif">
            &ldquo;We are not building for the Africa that was. We are building for the Africa that will be.&rdquo;
          </p>
          <a
            href="#contact"
            className="group inline-flex items-center gap-3 px-10 py-4 border border-emerald-deep/40 text-platinum/72 text-sm tracking-widest hover:border-emerald-deep hover:text-softwhite transition-all duration-300 relative overflow-hidden"
          >
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
              style={{ background: "rgba(200,169,110,0.04)" }}
            />
            <span className="relative">Partner in the Vision</span>
            <motion.span
              className="relative text-emerald-deep"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </a>
        </motion.div>

      </div>
    </section>
  );
}
