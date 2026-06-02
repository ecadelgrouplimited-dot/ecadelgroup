"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const leaders = [
  {
    name: "Wilson Ecaat",
    title: "Founder · Lead Developer · AI Architect",
    discipline: "Founder & AI Architect",
    bio: "The solo architect behind ECADEL's entire portfolio — Wilson has independently designed, built, and launched production-ready platforms while simultaneously developing others at the conceptual and playbook stage. His work spans AI architecture, systems engineering, product design, go-to-market strategy, and investor relations. He is the kind of builder who does not wait for a team before starting — he builds the foundations first, then builds the team around them.",
    initials: "WE",
    accentColor: "#C8A96E",
    glowColor: "rgba(200,169,110,0.35)",
    patternAngle: 45,
    tags: ["AI Architecture", "Systems Engineering", "Product Vision"],
  },
  {
    name: "Catherine Ademun",
    title: "Co-Founder · ECADEL Group",
    discipline: "Co-Founder",
    bio: "Catherine Ademun co-founded ECADEL GROUP LIMITED with a mandate that extends beyond product. As the institution scales, she shapes how ECADEL positions itself within African markets, builds strategic partnerships, and connects its systems to the communities they are built to serve. Her role evolves with the company — a founder invested in the long-term mission at every stage of its growth.",
    initials: "CA",
    accentColor: "#D4B97E",
    glowColor: "rgba(212,185,126,0.3)",
    patternAngle: -45,
    tags: ["Co-Founder", "ECADEL Group", "Founding Vision"],
  },
];

function LeaderCard({
  leader,
  index,
  inView,
}: {
  leader: (typeof leaders)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group"
    >
      {/* Portrait card */}
      <div className="relative mb-8 overflow-hidden bg-carbon border border-white/5 group-hover:border-white/10 transition-colors duration-500" style={{ aspectRatio: "3/4", maxHeight: "480px" }}>

        {/* Animated background pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.07]" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`hex-${index}`} x="0" y="0" width="40" height="69.28" patternUnits="userSpaceOnUse"
              patternTransform={`rotate(${leader.patternAngle})`}>
              <path d="M20 0 L40 11.55 L40 34.64 L20 46.19 L0 34.64 L0 11.55 Z"
                fill="none" stroke={leader.accentColor} strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
        </svg>

        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, ${leader.accentColor}18 0%, #16181D 55%, #0B0B0D 100%)`,
          }}
        />

        {/* Large decorative initial */}
        <div
          className="absolute -bottom-6 -right-4 font-display font-bold select-none leading-none pointer-events-none"
          style={{
            fontSize: "clamp(8rem, 20vw, 14rem)",
            color: "transparent",
            WebkitTextStroke: `1px ${leader.accentColor}15`,
          }}
        >
          {leader.initials}
        </div>

        {/* Central portrait element */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Outer ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute w-48 h-48 rounded-full border border-dashed opacity-20"
            style={{ borderColor: leader.accentColor }}
          />
          {/* Static ring */}
          <div
            className="absolute w-36 h-36 rounded-full border opacity-30"
            style={{ borderColor: leader.accentColor }}
          />

          {/* Monogram circle */}
          <div
            className="relative w-28 h-28 rounded-full flex items-center justify-center font-display font-bold text-4xl z-10 transition-transform duration-500 group-hover:scale-105"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${leader.accentColor}55 0%, ${leader.accentColor}22 50%, transparent 80%)`,
              border: `1px solid ${leader.accentColor}50`,
              color: leader.accentColor,
              boxShadow: `0 0 40px ${leader.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {leader.initials}
          </div>

          {/* Connecting lines */}
          <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none">
            {[30, 90, 150, 210, 270, 330].map((angle) => {
              const cx = 50, cy = 50;
              const innerR = 14, outerR = 24;
              const rad = (angle * Math.PI) / 180;
              return (
                <line
                  key={angle}
                  x1={`${cx + innerR * Math.cos(rad)}%`}
                  y1={`${cy + innerR * Math.sin(rad)}%`}
                  x2={`${cx + outerR * Math.cos(rad)}%`}
                  y2={`${cy + outerR * Math.sin(rad)}%`}
                  stroke={leader.accentColor}
                  strokeWidth="1"
                />
              );
            })}
          </svg>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 inset-x-0 p-6"
          style={{
            background: "linear-gradient(to top, rgba(11,11,13,0.95) 0%, transparent 100%)",
          }}
        >
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {leader.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] px-2 py-0.5 tracking-wider uppercase font-display"
                style={{
                  background: `${leader.accentColor}15`,
                  border: `1px solid ${leader.accentColor}30`,
                  color: leader.accentColor,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <span
            className="text-[10px] tracking-[0.25em] uppercase font-display"
            style={{ color: leader.accentColor }}
          >
            {leader.discipline}
          </span>
        </div>
      </div>

      {/* Text info */}
      <div>
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-display font-bold text-softwhite text-2xl">{leader.name}</h3>
        </div>
        <p className="text-platinum/65 text-xs tracking-[0.15em] uppercase mb-5">{leader.title}</p>
        <div className="w-10 h-px mb-5" style={{ background: leader.accentColor }} />
        <p className="text-platinum/72 text-sm leading-relaxed">{leader.bio}</p>
      </div>
    </motion.div>
  );
}

export default function Leadership() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="leadership" ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      {/* side glow */}
      <div
        className="absolute -left-40 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Leadership
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-4"
        >
          The People Behind
          <br />
          <span style={{ color: "#C8A96E" }}>the Systems</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-platinum/68 text-sm max-w-lg mb-16 leading-relaxed"
        >
          ECADEL GROUP LIMITED is led by founders who combine deep technical expertise with
          strategic operational discipline — building for generations, not quarters.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl">
          {leaders.map((leader, i) => (
            <LeaderCard key={leader.name} leader={leader} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
