"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const focusAreas = [
  {
    icon: "MI",
    title: "Mobility Intelligence",
    description:
      "Real-time transport analytics, fleet management systems, and road intelligence that makes African mobility measurably safer.",
  },
  {
    icon: "CI",
    title: "Consequence Intelligence",
    description:
      "Predictive consequence mapping and systemic risk analysis that enables institutions to anticipate and pre-empt cascading failure.",
  },
  {
    icon: "FI",
    title: "Financial Infrastructure",
    description:
      "Full-stack business operating systems — connecting mobile money, payroll, compliance, and AI intelligence for African enterprises.",
  },
  {
    icon: "CT",
    title: "Civic Technology",
    description:
      "Digital infrastructure for governments and civic institutions, built for African administrative realities and governance contexts.",
  },
  {
    icon: "AI",
    title: "AI Infrastructure",
    description:
      "Foundational AI systems designed for African data environments: offline-resilient, low-bandwidth tolerant, and locally sovereign.",
  },
  {
    icon: "OS",
    title: "Operational Systems",
    description:
      "Mission-critical operational platforms that power enterprise and institutional operations with precision, scale, and reliability.",
  },
  {
    icon: "PS",
    title: "Public Safety Intelligence",
    description:
      "Advanced safety systems integrating real-time incident response, hazard intelligence, and coordinated emergency protocols.",
  },
  {
    icon: "SA",
    title: "Strategic Analytics",
    description:
      "Institutional decision intelligence — transforming complex African datasets into actionable strategic insight for leaders and planners.",
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group relative bg-carbon border border-white/5 p-8 hover:border-emerald-deep/30 transition-all duration-400 cursor-default"
    >
      <div className="absolute top-0 left-0 w-8 h-px bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-px h-8 bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div
        className="w-12 h-12 flex items-center justify-center mb-6 text-emerald-deep font-display font-bold text-xs border border-emerald-deep/20 group-hover:border-emerald-deep/60 group-hover:bg-emerald-deep/10 transition-all duration-300"
        style={{ letterSpacing: "0.05em" }}
      >
        {area.icon}
      </div>
      <h3 className="font-display font-semibold text-softwhite text-base mb-3 leading-snug group-hover:text-white transition-colors duration-200">
        {area.title}
      </h3>
      <p className="text-platinum/68 text-sm leading-relaxed">{area.description}</p>
      <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

export default function StrategicFocus() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="focus" ref={ref} className="relative py-32 bg-obsidian">
      <div className="absolute inset-0 bg-intelligence-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">Strategic Focus</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight max-w-xl">
            Eight Domains.
            <br /><span style={{ color: "#C8A96E" }}>One Mission.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/72 max-w-md text-sm leading-relaxed">
            From the roads African people travel to the businesses they run, from the governments
            that serve them to the NGOs that support them — ECADEL GROUP LIMITED builds the intelligence
            systems that make every domain function with clarity and precision.
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
