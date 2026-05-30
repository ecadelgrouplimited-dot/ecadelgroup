"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Bot, Building, Globe2, Cpu, MapPin, Network } from "lucide-react";

const futureAreas = [
  { icon: Cpu, label: "Advanced AI Infrastructure" },
  { icon: Bot, label: "Autonomous Systems & Robotics" },
  { icon: Building, label: "Smart City Intelligence" },
  { icon: Globe2, label: "Strategic Intelligence Networks" },
  { icon: MapPin, label: "Regional Infrastructure Systems" },
  { icon: Network, label: "Continental Intelligence Grid" },
];

export default function FutureVision() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="vision" ref={ref} className="relative py-40 bg-obsidian overflow-hidden">
      {/* deep background radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(200,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      {/* large ghost text background */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 font-display font-bold text-[20vw] whitespace-nowrap select-none pointer-events-none leading-none"
        style={{
          color: "transparent",
          WebkitTextStroke: "1px rgba(200,169,110,0.06)",
        }}
      >
        2050
      </div>

      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-6"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Future Vision
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display font-bold text-5xl md:text-7xl text-softwhite leading-tight mb-8 max-w-5xl mx-auto"
        >
          Designing the Systems
          <br />
          <span style={{ color: "#C8A96E" }}>of Tomorrow</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-platinum/74 text-lg leading-relaxed max-w-3xl mx-auto mb-20"
        >
          ECADEL GROUP LIMITED is not building for this decade alone. Our roadmap
          extends to a future where Africa operates on a fully sovereign,
          continent-wide intelligence infrastructure — from autonomous urban
          systems to AI-driven governance tools, from smart logistics to
          strategic national intelligence.
        </motion.p>

        {/* future pillars */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5 max-w-4xl mx-auto mb-20">
          {futureAreas.map((area, i) => (
            <motion.div
              key={area.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="bg-obsidian p-8 group hover:bg-graphite transition-colors duration-300 flex flex-col items-center text-center"
            >
              <area.icon
                size={24}
                className="text-emerald-deep mb-4 group-hover:text-emerald-glow transition-colors duration-200"
              />
              <span className="text-platinum/60 text-sm group-hover:text-softwhite transition-colors duration-200">
                {area.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* timeline line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex items-center justify-center gap-0 max-w-2xl mx-auto mb-14"
        >
          {["2024", "Platform Launch", "2026", "Regional Scale", "2030", "Continental Grid"].map(
            (item, i) => (
              <div key={i} className="flex items-center">
                {i % 2 === 0 ? (
                  <div className="text-center">
                    <div className="w-3 h-3 rounded-full border border-emerald-deep mx-auto"
                      style={{ background: i === 0 ? "#C8A96E" : "transparent" }} />
                    <div className="text-[10px] font-mono text-emerald-glow mt-1">{item}</div>
                  </div>
                ) : (
                  <div className="text-[9px] text-platinum/50 mx-3 text-center max-w-[70px]">{item}</div>
                )}
                {i < 5 && i % 2 === 0 && (
                  <div className="w-12 h-px bg-emerald-deep/30 mx-1" />
                )}
              </div>
            )
          )}
        </motion.div>

        <motion.a
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-4 border border-emerald-deep/40 text-platinum/70 text-sm tracking-wide hover:border-emerald-deep hover:text-softwhite transition-all duration-300"
        >
          Partner in the Vision
        </motion.a>
      </div>
    </section>
  );
}
