"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FlaskConical, GraduationCap, Coins, Users, BookOpen, ArrowRight } from "lucide-react";

const labsPillars = [
  {
    icon: FlaskConical,
    title: "Cross-Subsidiary Research",
    desc: "Shared technical foundations, protocols, and intelligence infrastructure that every ECADEL platform is built on — stress-tested in the Lab before it ships to production.",
  },
  {
    icon: GraduationCap,
    title: "University Partnerships",
    desc: "Formal research collaborations with African academic institutions — advancing the disciplines ECADEL GROUP is pioneering: AI systems, civic tech, consequence intelligence.",
  },
  {
    icon: Coins,
    title: "Grant Pathways",
    desc: "Active pursuit of development finance from the African Development Bank, Gates Foundation, USAID, and bilateral agencies — funding the research that no venture capital will touch.",
  },
  {
    icon: Users,
    title: "Talent Pipeline",
    desc: "ECADEL LABS trains the engineers, researchers, and systems thinkers who will staff the Group's subsidiaries — building the team from the inside out.",
  },
  {
    icon: BookOpen,
    title: "Published Research",
    desc: "Positioning ECADEL at the frontier of African technology thinking — through papers, whitepapers, and open research that establish intellectual leadership on the continent.",
  },
];

// Pre-computed orbital positions for the 5 subsidiary nodes
const ORBITAL_NODES = [
  { angle: 0,   label: "SBB",      r: 130 },
  { angle: 72,  label: "PAME",     r: 130 },
  { angle: 144, label: "SafeRoad", r: 130 },
  { angle: 216, label: "Hapa",     r: 130 },
  { angle: 288, label: "PROSEQ", r: 130 },
].map(({ angle, label, r }) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    label,
    x: 200 + r * Math.cos(rad),
    y: 200 + r * Math.sin(rad),
    lx: 200 + (r + 22) * Math.cos(rad),
    ly: 200 + (r + 22) * Math.sin(rad),
  };
});

function LabsOrb() {
  return (
    <div className="relative w-full flex items-center justify-center" style={{ height: 420 }}>
      {/* Rotating rings */}
      {[
        { size: 320, duration: 40, reverse: false, dashed: false, opacity: 0.12 },
        { size: 240, duration: 28, reverse: true,  dashed: true,  opacity: 0.18 },
        { size: 160, duration: 18, reverse: false, dashed: false, opacity: 0.22 },
      ].map((ring, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: ring.size,
            height: ring.size,
            border: `1px ${ring.dashed ? "dashed" : "solid"} rgba(200,169,110,${ring.opacity})`,
          }}
          animate={{ rotate: ring.reverse ? -360 : 360 }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        />
      ))}

      {/* SVG layer — orbital nodes + connector lines */}
      <svg
        className="absolute"
        style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }}
        viewBox="0 0 400 400"
      >
        {/* Lines from center to each node */}
        {ORBITAL_NODES.map((node) => (
          <line
            key={node.label + "-line"}
            x1={200} y1={200}
            x2={node.x} y2={node.y}
            stroke="#C8A96E"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />
        ))}

        {/* Orbital node circles */}
        {ORBITAL_NODES.map((node, i) => (
          <g key={node.label}>
            <circle
              cx={node.x} cy={node.y} r={14}
              fill="rgba(200,169,110,0.1)"
              stroke="rgba(200,169,110,0.4)"
              strokeWidth="1"
            />
            <motion.circle
              cx={node.x} cy={node.y} r={14}
              fill="transparent"
              stroke="rgba(200,169,110,0.6)"
              strokeWidth="1"
              animate={{ opacity: [0.6, 0.2, 0.6] }}
              transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <text
              x={node.lx} y={node.ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#C8A96E"
              fontSize="8"
              fontFamily="monospace"
              opacity="0.7"
              style={{ letterSpacing: "0.1em" }}
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Center glow circle */}
        <circle cx={200} cy={200} r={38}
          fill="rgba(200,169,110,0.08)"
          stroke="rgba(200,169,110,0.35)"
          strokeWidth="1"
        />
        <motion.circle
          cx={200} cy={200} r={44}
          fill="none"
          stroke="rgba(200,169,110,0.15)"
          strokeWidth="1"
          animate={{ r: [38, 52, 38], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* Center core label */}
      <div className="relative z-10 text-center pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="font-serif font-bold leading-none mb-1"
            style={{ fontSize: "3rem", color: "#C8A96E" }}
          >
            ΛΣ
          </div>
          <div
            className="font-display text-[9px] tracking-[0.3em] uppercase"
            style={{ color: "rgba(200,169,110,0.5)" }}
          >
            ECADEL LABS
          </div>
        </motion.div>
      </div>

      {/* Ambient glow behind core */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(200,169,110,0.12) 0%, transparent 70%)",
          filter: "blur(24px)",
        }}
      />
    </div>
  );
}

export default function EcadelLabs() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="labs" ref={ref} className="relative py-32 bg-carbon overflow-hidden">
      {/* background grid */}
      <div className="absolute inset-0 bg-intelligence-grid opacity-25" />

      {/* subtle gold radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 70% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="mb-4">
              <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
                The Engine
              </span>
            </div>

            <h2 className="font-display font-bold text-5xl md:text-6xl text-softwhite leading-none mb-6 tracking-tight">
              ECADEL
              <br />
              <span style={{ color: "#C8A96E" }}>LABS</span>
            </h2>

            <p className="text-platinum/60 text-lg leading-relaxed mb-4">
              Every great institution has a research engine powering everything built above it.
              For ECADEL GROUP, that engine is <span className="text-softwhite/80">ECADEL LABS</span>.
            </p>

            <p className="text-platinum/68 leading-relaxed mb-10">
              ECADEL LABS is our research and innovation institution — the place where ideas are
              stress-tested before they become subsidiaries, where shared technical foundations are
              built that every platform in the group runs on, and where we publish work that
              establishes ECADEL at the frontier of African technology thinking.
            </p>

            {/* pillars */}
            <div className="space-y-6 mb-10">
              {labsPillars.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 flex items-center justify-center border border-white/8 group-hover:border-emerald-deep/40 group-hover:bg-emerald-deep/8 transition-all duration-300 flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-platinum/56 group-hover:text-emerald-deep transition-colors duration-300" />
                    </div>
                    <div>
                      <div className="font-display font-semibold text-softwhite text-sm mb-1 tracking-wide">
                        {pillar.title}
                      </div>
                      <p className="text-platinum/65 text-xs leading-relaxed">
                        {pillar.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* grant bodies callout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="border border-white/5 bg-white/2 p-6 mb-8"
            >
              <div className="text-[9px] tracking-[0.3em] uppercase text-platinum/42 font-display mb-3">
                Target Grant Partners
              </div>
              <div className="flex flex-wrap gap-3">
                {[
                  "African Development Bank",
                  "Gates Foundation",
                  "USAID",
                  "EU Horizon",
                  "World Bank IFC",
                ].map((g) => (
                  <span
                    key={g}
                    className="text-[10px] tracking-[0.12em] uppercase text-platinum/65 border border-white/6 px-3 py-1 hover:border-emerald-deep/30 hover:text-platinum/65 transition-all duration-200"
                  >
                    {g}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.a
              href="#contact"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
            >
              Partner with ECADEL LABS
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.a>
          </motion.div>

          {/* ── Right: orbital visual ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center justify-center"
          >
            <LabsOrb />
          </motion.div>
        </div>

        {/* bottom band — three quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="grid grid-cols-3 gap-px bg-white/5 mt-20"
        >
          {[
            {
              value: "5",
              label: "Subsidiaries Powered",
              sub: "Every ECADEL platform runs on shared Lab infrastructure",
            },
            {
              value: "∞",
              label: "Research Appetite",
              sub: "No problem too complex, no market too unexplored",
            },
            {
              value: "1",
              label: "Continent. Unlimited Scope.",
              sub: "Africa-first research with global application and ambition",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-carbon p-8 text-center group hover:bg-graphite transition-colors duration-300"
            >
              <div
                className="font-display font-bold text-4xl md:text-5xl mb-2 leading-none"
                style={{ color: "#C8A96E" }}
              >
                {stat.value}
              </div>
              <div className="font-display font-semibold text-softwhite text-xs tracking-wide mb-1">
                {stat.label}
              </div>
              <div className="text-platinum/50 text-[10px] leading-relaxed">
                {stat.sub}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
