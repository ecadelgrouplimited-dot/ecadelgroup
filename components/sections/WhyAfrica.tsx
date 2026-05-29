"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const realities = [
  {
    number: "01",
    title: "Designed for Local Infrastructure",
    description:
      "Most global technology fails in Africa because it assumes reliable power, unlimited bandwidth, and western governance structures. Our systems are built from the ground up for African infrastructure realities — offline-first, resilient, and adaptive.",
  },
  {
    number: "02",
    title: "African-Owned Intelligence",
    description:
      "Africa's intelligence infrastructure should not be owned, operated, or extracted by foreign institutions. We are building sovereign intelligence systems — data stays in Africa, decisions are made in Africa, and the value remains in Africa.",
  },
  {
    number: "03",
    title: "Scalable Civic Technology",
    description:
      "African cities are growing faster than any on earth. The civic technology needed to govern, monitor, and manage this growth must be purpose-built — not adapted from systems designed for static Western demographics.",
  },
  {
    number: "04",
    title: "The Future of African Infrastructure",
    description:
      "The institutions that define the next 50 years of African development will be built now. ECADEL GROUP LIMITED is building the foundational intelligence infrastructure that those institutions will depend on.",
  },
];

export default function WhyAfrica() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      {/* deep emerald radial at top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center top, rgba(200,169,110,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Why Africa
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="font-display font-bold text-4xl md:text-6xl text-softwhite leading-tight mb-8">
            Africa Requires Infrastructure
            <br />
            <span style={{ color: "#C8A96E" }}>Designed for Reality</span>
          </h2>
          <p className="text-platinum/55 text-lg leading-relaxed">
            The African continent is not a market to be served by adapted foreign
            technology. It is a civilisation requiring original intelligence
            infrastructure — built by Africans, for Africa, at African scale.
          </p>
        </motion.div>

        {/* reality cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {realities.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.1 }}
              className="bg-obsidian p-10 group hover:bg-graphite transition-colors duration-300 relative"
            >
              <div
                className="font-display font-bold text-6xl leading-none mb-6 select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1px rgba(200,169,110,0.25)",
                }}
              >
                {item.number}
              </div>
              <h3 className="font-display font-semibold text-softwhite text-xl mb-4 leading-snug">
                {item.title}
              </h3>
              <p className="text-platinum/50 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* closing statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <div className="w-px h-16 bg-emerald-deep/40 mx-auto mb-8" />
          <p
            className="font-display font-medium text-2xl md:text-3xl max-w-3xl mx-auto leading-relaxed"
            style={{ color: "rgba(199,204,212,0.7)" }}
          >
            &ldquo;We are not building for the Africa that was.
            <br />
            We are building for the Africa that{" "}
            <span style={{ color: "#D4B97E" }}>will be</span>.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
