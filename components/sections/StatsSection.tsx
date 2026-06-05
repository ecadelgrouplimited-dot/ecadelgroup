"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 5,
    suffix: "",
    label: "Group Subsidiaries",
    description: "SBB · PAME AI · SafeRoad · Hapa · PROSEQ",
    accent: "#C8A96E",
  },
  {
    value: 4,
    suffix: "+",
    label: "Client Projects Delivered",
    description: "Real work. Real clients. Real impact.",
    accent: "#D4B97E",
  },
  {
    value: 199,
    suffix: "",
    label: "Countries on Platform",
    description: "SBB deployed globally with full African localisation",
    accent: "#C8A96E",
  },
  {
    value: 25,
    suffix: "+",
    label: "AI Agents in Production",
    description: "Kiongozi — running with full live business context",
    accent: "#D4B97E",
  },
  {
    value: 100,
    suffix: "%",
    label: "African-Owned",
    description: "Sovereign systems. African data. African futures.",
    accent: "#C8A96E",
  },
];

function CountUp({ target, suffix, active, accent }: { target: number; suffix: string; active: boolean; accent: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return (
    <span style={{ color: accent, textShadow: `0 0 40px ${accent}50` }}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-obsidian py-24 border-y border-white/5 overflow-hidden">
      {/* Ambient gold radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 90% 120% at 50% 50%, rgba(200,169,110,0.05) 0%, transparent 65%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-obsidian px-8 py-10 text-center hover:bg-graphite transition-colors duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 100% 80% at 50% 0%, ${stat.accent}07 0%, transparent 70%)` }}
              />

              {/* Animated top line on hover */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, transparent, ${stat.accent}, transparent)` }}
              />

              {/* Number */}
              <div
                className="font-display font-black leading-none mb-3"
                style={{ fontSize: "clamp(2.8rem, 4.5vw, 4rem)" }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} accent={stat.accent} />
              </div>

              {/* Animated underline draw */}
              <motion.div
                className="mx-auto mb-4"
                style={{ height: 1, background: `linear-gradient(to right, transparent, ${stat.accent}60, transparent)` }}
                initial={{ width: 0 }}
                animate={inView ? { width: "60%" } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
              />

              <div className="font-display font-semibold text-softwhite text-sm mb-2 tracking-wide">
                {stat.label}
              </div>
              <div className="text-platinum/60 text-[11px] leading-relaxed">
                {stat.description}
              </div>

              {/* Bottom accent dot */}
              <motion.div
                className="mx-auto mt-5 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: stat.accent }}
                animate={inView ? { opacity: [0, 0.8, 0] } : {}}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
