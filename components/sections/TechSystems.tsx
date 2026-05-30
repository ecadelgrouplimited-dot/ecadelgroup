"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cpu, Database, Globe, Radio, Lock, BarChart3, GitBranch, Wifi } from "lucide-react";

const techPillars = [
  {
    icon: Cpu,
    title: "AI Systems",
    desc: "On-device and cloud AI models optimised for African data environments — low-latency, high-reliability.",
  },
  {
    icon: Radio,
    title: "Operational Intelligence",
    desc: "Real-time sensor fusion, event processing, and intelligent alerting across distributed infrastructure.",
  },
  {
    icon: Database,
    title: "Data Infrastructure",
    desc: "High-throughput pipelines capable of ingesting, processing, and serving continental-scale datasets.",
  },
  {
    icon: GitBranch,
    title: "Scalable Architecture",
    desc: "Modular, microservices-based systems designed to scale from city-level to continental deployment.",
  },
  {
    icon: Wifi,
    title: "Offline-First Systems",
    desc: "Platforms that remain operational during connectivity interruptions — essential for African realities.",
  },
  {
    icon: Globe,
    title: "APIs & Integrations",
    desc: "Open APIs enabling third-party integration with insurance systems, government portals, and enterprise tools.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    desc: "Millisecond-latency analytics dashboards with geospatial intelligence and live data visualisation.",
  },
  {
    icon: Lock,
    title: "Geospatial Systems",
    desc: "African-scale mapping, routing, and location intelligence — covering urban, peri-urban, and rural terrains.",
  },
];

function ArchDiagram() {
  return (
    <div className="relative w-full h-64 overflow-hidden">
      <svg viewBox="0 0 600 200" className="w-full h-full">
        {/* layers */}
        {[
          { y: 20, label: "Intelligence Layer", color: "#C8A96E" },
          { y: 80, label: "Processing Layer", color: "#23395B" },
          { y: 140, label: "Data Layer", color: "#16181D" },
        ].map((layer) => (
          <g key={layer.label}>
            <rect x="20" y={layer.y} width="560" height="40" rx="2"
              fill={layer.color} fillOpacity="0.12"
              stroke={layer.color} strokeOpacity="0.4" strokeWidth="1" />
            <text x="36" y={layer.y + 24} fill={layer.color} fontSize="10"
              fontFamily="monospace" opacity="0.8">
              {layer.label}
            </text>
            {/* blocks in layer */}
            {[1, 2, 3, 4].map((b) => (
              <rect key={b}
                x={100 + b * 110} y={layer.y + 6} width="80" height="28" rx="1"
                fill={layer.color} fillOpacity="0.2"
                stroke={layer.color} strokeOpacity="0.3" strokeWidth="0.8" />
            ))}
          </g>
        ))}
        {/* vertical connectors */}
        {[210, 320, 430].map((x) => (
          <g key={x}>
            <line x1={x + 40} y1="60" x2={x + 40} y2="80" stroke="#C8A96E" strokeWidth="1" strokeOpacity="0.4" />
            <line x1={x + 40} y1="120" x2={x + 40} y2="140" stroke="#C8A96E" strokeWidth="1" strokeOpacity="0.4" />
          </g>
        ))}
        {/* data flow arrows */}
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#C8A96E" opacity="0.5" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

export default function TechSystems() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian">
      <div className="absolute inset-0 bg-intelligence-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Technology & Systems
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
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

          {/* arch diagram */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:w-1/2 glass border border-white/5 p-4"
          >
            <div className="text-[10px] text-platinum/50 font-mono mb-2 tracking-wider">
              SYSTEM ARCHITECTURE — OVERVIEW
            </div>
            <ArchDiagram />
          </motion.div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {techPillars.map((tech, i) => (
            <motion.div
              key={tech.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="bg-obsidian p-7 group hover:bg-carbon transition-colors duration-300 relative"
            >
              <tech.icon
                size={20}
                className="text-emerald-deep mb-5 group-hover:text-emerald-glow transition-colors duration-200"
              />
              <h3 className="font-display font-semibold text-softwhite text-sm mb-3 tracking-wide">
                {tech.title}
              </h3>
              <p className="text-platinum/65 text-xs leading-relaxed">{tech.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
