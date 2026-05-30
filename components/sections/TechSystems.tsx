"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Globe, Radio, Lock, BarChart3, GitBranch, Wifi } from "lucide-react";

const techPillars = [
  { icon: Cpu,       title: "AI Systems",             desc: "On-device and cloud AI models optimised for African data environments — low-latency, high-reliability.", accent: "#C8A96E" },
  { icon: Radio,     title: "Operational Intelligence",desc: "Real-time sensor fusion, event processing, and intelligent alerting across distributed infrastructure.", accent: "#8BA7C7" },
  { icon: Database,  title: "Data Infrastructure",    desc: "High-throughput pipelines capable of ingesting, processing, and serving continental-scale datasets.", accent: "#C8A96E" },
  { icon: GitBranch, title: "Scalable Architecture",  desc: "Modular, microservices-based systems designed to scale from city-level to continental deployment.", accent: "#8BA7C7" },
  { icon: Wifi,      title: "Offline-First Systems",  desc: "Platforms that remain operational during connectivity interruptions — essential for African realities.", accent: "#C8A96E" },
  { icon: Globe,     title: "APIs & Integrations",    desc: "Open APIs enabling third-party integration with insurance systems, government portals, and enterprise tools.", accent: "#8BA7C7" },
  { icon: BarChart3, title: "Real-Time Analytics",    desc: "Millisecond-latency analytics dashboards with geospatial intelligence and live data visualisation.", accent: "#C8A96E" },
  { icon: Lock,      title: "Geospatial Systems",     desc: "African-scale mapping, routing, and location intelligence — covering urban, peri-urban, and rural terrains.", accent: "#8BA7C7" },
];

const LAYERS = [
  { label: "Intelligence Layer", color: "#C8A96E",  y: 18,  desc: "Kiongozi AI · Meridian · PAME · Decision Engine" },
  { label: "Processing Layer",   color: "#8BA7C7",  y: 78,  desc: "Stream Processing · Event Bus · Inference Runtime" },
  { label: "Data Layer",         color: "#4a6080",  y: 138, desc: "Storage · Pipelines · Telemetry · Mobile Money Ingestion" },
];

// Pre-computed packet positions
const PACKETS = [
  { x: 210, startY: 168, endY: 18,  delay: 0 },
  { x: 320, startY: 168, endY: 18,  delay: 0.9 },
  { x: 430, startY: 168, endY: 18,  delay: 1.8 },
  { x: 265, startY: 168, endY: 18,  delay: 0.45 },
  { x: 375, startY: 168, endY: 18,  delay: 1.35 },
];

function LiveArchDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full overflow-hidden border border-white/5 bg-carbon" style={{ height: 220 }}>
      <div className="absolute top-2 left-3 text-[9px] font-mono text-platinum/42 tracking-[0.2em] uppercase">
        System Architecture — Live
      </div>
      <div className="absolute top-2 right-3 flex items-center gap-1.5">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-emerald-deep"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-[8px] font-mono text-emerald-glow tracking-wider">ACTIVE</span>
      </div>

      <svg viewBox="0 0 600 210" className="w-full h-full" style={{ marginTop: 4 }}>
        <defs>
          <marker id="tech-arr" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="4" markerHeight="4" orient="auto">
            <path d="M 0 0 L 8 4 L 0 8 z" fill="#C8A96E" opacity="0.6" />
          </marker>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Layers */}
        {LAYERS.map((layer, li) => (
          <g key={layer.label}>
            <motion.rect
              x="12" y={layer.y} width="576" height="44" rx="2"
              fill={layer.color} fillOpacity="0.08"
              stroke={layer.color} strokeOpacity="0.35" strokeWidth="0.8"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + li * 0.2 }}
              style={{ transformOrigin: "12px 0" }}
            />
            <motion.text
              x="24" y={layer.y + 26}
              fill={layer.color} fontSize="8.5" fontFamily="monospace"
              opacity="0.9" letterSpacing="0.05em"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.9 } : {}}
              transition={{ delay: 0.6 + li * 0.2 }}
            >
              {layer.label}
            </motion.text>
            <motion.text
              x="140" y={layer.y + 26}
              fill={layer.color} fontSize="7" fontFamily="monospace"
              opacity="0.5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.5 } : {}}
              transition={{ delay: 0.8 + li * 0.2 }}
            >
              {layer.desc}
            </motion.text>
            {/* 4 module blocks inside each layer */}
            {[1, 2, 3, 4].map((b) => (
              <motion.rect
                key={b}
                x={90 + b * 110} y={layer.y + 7} width="75" height="30" rx="2"
                fill={layer.color} fillOpacity="0.15"
                stroke={layer.color} strokeOpacity="0.3" strokeWidth="0.8"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 + li * 0.15 + b * 0.05 }}
              />
            ))}
          </g>
        ))}

        {/* Vertical connectors (static) */}
        {[210, 320, 430].map((x) => (
          <g key={x}>
            <line x1={x + 37} y1="62" x2={x + 37} y2="78" stroke="#C8A96E" strokeWidth="1" strokeOpacity="0.3" markerEnd="url(#tech-arr)" />
            <line x1={x + 37} y1="122" x2={x + 37} y2="138" stroke="#C8A96E" strokeWidth="1" strokeOpacity="0.3" markerEnd="url(#tech-arr)" />
          </g>
        ))}

        {/* Animated data packets traveling upward */}
        {PACKETS.map((pkt, i) => (
          <motion.circle
            key={i}
            cx={pkt.x}
            r="3"
            fill="#C8A96E"
            filter="url(#glow)"
            initial={{ cy: pkt.startY, opacity: 0 }}
            animate={inView ? {
              cy: [pkt.startY, pkt.endY, pkt.endY],
              opacity: [0, 0.9, 0],
            } : {}}
            transition={{
              duration: 2.2,
              delay: pkt.delay + 1.2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function TechSystems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-30" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(200,169,110,0.05) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Technology & Systems
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight"
          >
            Built on
            <br />
            <span style={{ color: "#C8A96E" }}>Serious Infrastructure</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/68 max-w-md text-sm leading-relaxed"
          >
            Three foundational layers — Intelligence, Processing, Data — carry
            every ECADEL platform. Data flows upward in real time. Decisions flow
            downward as intelligence.
          </motion.p>
        </div>

        {/* Live architecture diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <LiveArchDiagram inView={inView} />
        </motion.div>

        {/* Tech pillar cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {techPillars.map((tech, i) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.06 }}
                className="group relative bg-obsidian p-7 hover:bg-graphite transition-all duration-300 overflow-hidden cursor-default"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse 100% 60% at 0% 0%, ${tech.accent}06 0%, transparent 70%)` }}
                />

                {/* Icon with glow */}
                <div className="relative mb-5">
                  <Icon
                    size={20}
                    style={{ color: `${tech.accent}70` }}
                    className="group-hover:scale-110 transition-all duration-200"
                  />
                  {/* Glow behind icon */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                    style={{ background: tech.accent, borderRadius: "50%", transform: "scale(1.5)" }}
                  />
                </div>

                <h3 className="font-display font-semibold text-softwhite text-sm mb-3 tracking-wide leading-snug group-hover:text-white transition-colors duration-200">
                  {tech.title}
                </h3>
                <p className="text-platinum/65 text-xs leading-relaxed">{tech.desc}</p>

                {/* Bottom line sweep */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(to right, ${tech.accent}80, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
