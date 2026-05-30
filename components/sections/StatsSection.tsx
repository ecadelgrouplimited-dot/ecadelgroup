"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  {
    value: 5,
    suffix: "",
    label: "Group Subsidiaries",
    description: "SBB, PAME AI, SafeRoad UG, Hapa & Meridian — five distinct infrastructure categories",
  },
  {
    value: 4,
    suffix: "+",
    label: "Client Projects Delivered",
    description: "E-commerce, organisational systems, hospitality tech — real work for real clients",
  },
  {
    value: 199,
    suffix: "",
    label: "Countries on Platform",
    description: "SBB operates across 199 countries with full African localisation",
  },
  {
    value: 25,
    suffix: "+",
    label: "AI Agents in Production",
    description: "Kiongozi — SBB's AI workforce operating with full live business context",
  },
  {
    value: 100,
    suffix: "%",
    label: "African-Owned Infrastructure",
    description: "Sovereign systems. African data. African intelligence. African futures.",
  },
];

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let start = 0;
    const duration = 1600;
    const step = 16;
    const increment = target / (duration / step);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, step);
    return () => clearInterval(timer);
  }, [active, target]);

  return <span>{count}{suffix}</span>;
}

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-obsidian py-24 border-y border-white/5">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-white/5">
          {stats.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-obsidian p-10 text-center group hover:bg-graphite transition-colors duration-300">
              <div className="font-display font-bold text-5xl md:text-6xl mb-3 leading-none"
                style={{ color: "#C8A96E", textShadow: "0 0 30px rgba(200,169,110,0.3)" }}>
                <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
              </div>
              <div className="font-display font-semibold text-softwhite text-sm mb-2 tracking-wide">{stat.label}</div>
              <div className="text-platinum/56 text-xs leading-relaxed">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
