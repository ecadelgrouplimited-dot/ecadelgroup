"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const focusAreas = [
  {
    icon: "MI",
    title: "Mobility Intelligence",
    description: "Real-time transport analytics, fleet management systems, and road intelligence that makes African mobility measurably safer.",
    accent: "#C8A96E",
    bg: "rgba(200,169,110,0.05)",
  },
  {
    icon: "CI",
    title: "Consequence Intelligence",
    description: "Predictive consequence mapping and systemic risk analysis that enables institutions to anticipate and pre-empt cascading failure.",
    accent: "#8BA7C7",
    bg: "rgba(139,167,199,0.05)",
  },
  {
    icon: "FI",
    title: "Financial Infrastructure",
    description: "Full-stack business operating systems — connecting mobile money, payroll, compliance, and AI intelligence for African enterprises.",
    accent: "#C8A96E",
    bg: "rgba(200,169,110,0.05)",
  },
  {
    icon: "CT",
    title: "Civic Technology",
    description: "Digital infrastructure for governments and civic institutions, built for African administrative realities and governance contexts.",
    accent: "#8BA7C7",
    bg: "rgba(139,167,199,0.05)",
  },
  {
    icon: "AI",
    title: "AI Infrastructure",
    description: "Foundational AI systems designed for African data environments: offline-resilient, low-bandwidth tolerant, and locally sovereign.",
    accent: "#C8A96E",
    bg: "rgba(200,169,110,0.05)",
  },
  {
    icon: "OS",
    title: "Operational Systems",
    description: "Mission-critical operational platforms that power enterprise and institutional operations with precision, scale, and reliability.",
    accent: "#8BA7C7",
    bg: "rgba(139,167,199,0.05)",
  },
  {
    icon: "PS",
    title: "Public Safety Intelligence",
    description: "Advanced safety systems integrating real-time incident response, hazard intelligence, and coordinated emergency protocols.",
    accent: "#C8A96E",
    bg: "rgba(200,169,110,0.05)",
  },
  {
    icon: "SA",
    title: "Strategic Analytics",
    description: "Institutional decision intelligence — transforming complex African datasets into actionable strategic insight for leaders and planners.",
    accent: "#8BA7C7",
    bg: "rgba(139,167,199,0.05)",
  },
];

function FocusCard({
  area, index, inView,
}: {
  area: (typeof focusAreas)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group relative bg-carbon border border-white/5 p-8 hover:border-white/10 transition-all duration-400 cursor-default overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(ellipse 100% 70% at 0% 0%, ${area.accent}07 0%, transparent 65%)` }}
      />
      <div
        className="absolute top-0 left-0 w-5 h-px opacity-0 group-hover:opacity-100 group-hover:w-8 transition-all duration-300"
        style={{ background: area.accent }}
      />
      <div
        className="absolute top-0 left-0 w-px h-5 opacity-0 group-hover:opacity-100 group-hover:h-8 transition-all duration-300"
        style={{ background: area.accent }}
      />

      <div
        className="w-12 h-12 flex items-center justify-center mb-6 font-display font-bold text-xs relative transition-all duration-300 group-hover:scale-105"
        style={{
          border: `1px solid ${area.accent}25`,
          background: area.bg,
          letterSpacing: "0.05em",
          color: `${area.accent}80`,
          boxShadow: "none",
        }}
      >
        <span className="group-hover:text-[length:var(--accent)] transition-colors duration-200" style={{ color: `${area.accent}80` }}>
          {area.icon}
        </span>
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ boxShadow: `0 0 14px ${area.accent}30, inset 0 0 8px ${area.accent}10` }}
        />
      </div>

      <h3 className="font-display font-semibold text-softwhite text-base mb-3 leading-snug group-hover:text-white transition-colors duration-200 tracking-wide">
        {area.title}
      </h3>
      <p className="text-platinum/65 text-sm leading-relaxed">{area.description}</p>

      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
        style={{ background: `linear-gradient(to right, ${area.accent}60, transparent)` }}
      />
    </motion.div>
  );
}

export default function StrategicFocus() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="focus" ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-30" />
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(200,169,110,0.05) 0%, transparent 60%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">Strategic Focus</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight max-w-xl"
          >
            Eight Domains.
            <br /><span style={{ color: "#C8A96E" }}>One Mission.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/68 max-w-md text-sm leading-relaxed"
          >
            From the roads African people travel to the businesses they run, from the
            governments that serve them to the NGOs that support them — ECADEL GROUP
            builds the intelligence systems that make every domain function with
            clarity and precision.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {focusAreas.map((area, i) => (
            <FocusCard key={area.title} area={area} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
