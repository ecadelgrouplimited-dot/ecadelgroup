"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const realities = [
  {
    number: "01",
    title: "Designed for Local Infrastructure",
    description:
      "Most global technology fails in Africa because it assumes reliable power, unlimited bandwidth, and western governance structures. Our systems are built from the ground up for African infrastructure realities — offline-first, resilient, and adaptive.",
    accent: "#C8A96E",
  },
  {
    number: "02",
    title: "African-Owned Intelligence",
    description:
      "Africa's intelligence infrastructure should not be owned, operated, or extracted by foreign institutions. We are building sovereign intelligence systems — data stays in Africa, decisions are made in Africa, and the value remains in Africa.",
    accent: "#D4B97E",
  },
  {
    number: "03",
    title: "Scalable Civic Technology",
    description:
      "African cities are growing faster than any on earth. The civic technology needed to govern, monitor, and manage this growth must be purpose-built — not adapted from systems designed for static Western demographics.",
    accent: "#C8A96E",
  },
  {
    number: "04",
    title: "The Future of African Infrastructure",
    description:
      "The institutions that define the next 50 years of African development will be built now. ECADEL GROUP LIMITED is building the foundational intelligence infrastructure that those institutions will depend on.",
    accent: "#D4B97E",
  },
];

// Pre-computed signal nodes (continent-evocative cluster)
const SIGNAL_NODES = [
  { x: 48, y: 22, r: 1.4, d: 4.2 }, { x: 52, y: 28, r: 1.1, d: 5.1 },
  { x: 44, y: 35, r: 1.6, d: 3.8 }, { x: 56, y: 33, r: 1.2, d: 6.0 },
  { x: 42, y: 44, r: 1.0, d: 4.5 }, { x: 51, y: 42, r: 1.5, d: 3.3 },
  { x: 58, y: 40, r: 1.1, d: 5.5 }, { x: 46, y: 52, r: 1.3, d: 4.8 },
  { x: 54, y: 50, r: 1.0, d: 6.2 }, { x: 49, y: 60, r: 1.4, d: 3.6 },
  { x: 43, y: 63, r: 1.2, d: 5.0 }, { x: 57, y: 58, r: 1.1, d: 4.1 },
  { x: 48, y: 70, r: 1.6, d: 3.9 }, { x: 53, y: 68, r: 1.0, d: 5.8 },
  { x: 47, y: 78, r: 1.3, d: 4.4 }, { x: 39, y: 56, r: 1.0, d: 6.1 },
  { x: 62, y: 46, r: 1.2, d: 3.7 }, { x: 35, y: 42, r: 1.1, d: 5.3 },
  { x: 64, y: 55, r: 1.0, d: 4.6 }, { x: 37, y: 65, r: 1.4, d: 3.4 },
];

const SIGNAL_LINES = [
  [0, 1], [1, 3], [2, 4], [3, 6], [4, 7], [5, 8], [6, 8],
  [7, 9], [8, 11], [9, 12], [10, 12], [11, 13], [12, 14],
  [15, 4], [16, 6], [17, 2], [18, 11], [19, 10],
];

const QUOTE_WORDS = ["We", "are", "not", "building", "for", "the", "Africa", "that", "was."];
const QUOTE_WORDS2 = ["We", "are", "building", "for", "the", "Africa", "that"];

export default function WhyAfrica() {
  const ref  = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-obsidian overflow-hidden">

      {/* ── Signal network background ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Connection lines between nodes */}
        {SIGNAL_LINES.map(([a, b], i) => {
          const na = SIGNAL_NODES[a], nb = SIGNAL_NODES[b];
          return (
            <motion.line
              key={i}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke="#C8A96E"
              strokeWidth="0.08"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.12 } : {}}
              transition={{ duration: 1.2, delay: 0.5 + i * 0.08 }}
            />
          );
        })}

        {/* Signal nodes */}
        {SIGNAL_NODES.map((n, i) => (
          <g key={i}>
            <motion.circle
              cx={`${n.x}%`} cy={`${n.y}%`} r={`${n.r * 0.18}%`}
              fill="#C8A96E"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 0.5, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
              style={{ transformOrigin: `${n.x}% ${n.y}%` }}
            />
            {/* Pulse rings on every 4th node */}
            {i % 4 === 0 && (
              <motion.circle
                cx={`${n.x}%`} cy={`${n.y}%`}
                fill="none"
                stroke="#C8A96E"
                strokeWidth="0.06"
                animate={{ r: [`${n.r * 0.18}%`, `${n.r * 0.6}%`], opacity: [0.4, 0] }}
                transition={{ duration: n.d, repeat: Infinity, ease: "easeOut" }}
              />
            )}
          </g>
        ))}
      </svg>

      {/* ── Radial glows ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: "-10%", left: "50%", transform: "translateX(-50%)",
          width: "60vw", height: "50vh",
          background: "radial-gradient(ellipse, rgba(200,169,110,0.09) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "0", right: "5%",
          width: "30vw", height: "30vh",
          background: "radial-gradient(ellipse, rgba(139,167,199,0.04) 0%, transparent 70%)",
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-6"
        >
          <span className="text-xs tracking-[0.4em] uppercase text-emerald-glow font-display">
            Why Africa
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2
            className="font-display font-bold leading-tight mb-8"
            style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)" }}
          >
            <span className="text-softwhite">Africa Requires Infrastructure</span>
            <br />
            <span style={{ color: "#C8A96E" }}>Designed for Reality</span>
          </h2>
          <p className="text-platinum/74 text-lg leading-relaxed">
            The African continent is not a market to be served by adapted foreign
            technology. It is a civilisation requiring original intelligence
            infrastructure — built by Africans, for Africa, at African scale.
          </p>
        </motion.div>

        {/* Reality cards */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 mb-24">
          {realities.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              className="group relative bg-obsidian p-10 hover:bg-graphite transition-all duration-400 overflow-hidden cursor-default"
            >
              {/* Corner bracket top-left */}
              <div className="absolute top-0 left-0 w-6 h-px bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-0 left-0 h-6 w-px bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Hover radial glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 80% 50% at 0% 0%, ${item.accent}08 0%, transparent 60%)`,
                }}
              />

              {/* Number — animated glow */}
              <motion.div
                className="font-display font-black leading-none mb-6 select-none relative"
                style={{ fontSize: "clamp(4rem, 7vw, 6rem)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.12 }}
              >
                <span
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1px ${item.accent}40`,
                    display: "block",
                  }}
                >
                  {item.number}
                </span>
                {/* Glowing overlay — brightens on hover */}
                <span
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                  style={{
                    color: "transparent",
                    WebkitTextStroke: `1px ${item.accent}90`,
                    textShadow: `0 0 20px ${item.accent}60`,
                    display: "block",
                  }}
                >
                  {item.number}
                </span>
              </motion.div>

              <h3 className="font-display font-semibold text-xl mb-4 leading-snug text-softwhite group-hover:text-white transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-platinum/72 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Bottom sweep line */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${item.accent}, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Closing statement — word-by-word reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center"
        >
          {/* Animated vertical line */}
          <motion.div
            className="mx-auto mb-10"
            style={{ width: 1, background: "linear-gradient(to bottom, transparent, rgba(200,169,110,0.5), transparent)" }}
            initial={{ height: 0 }}
            animate={inView ? { height: 72 } : { height: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
          />

          <div
            className="font-display font-medium max-w-3xl mx-auto leading-relaxed"
            style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
          >
            {/* Line 1 */}
            <div className="flex flex-wrap justify-center gap-x-3 mb-2">
              {QUOTE_WORDS.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.1 + i * 0.06 }}
                  style={{ color: "rgba(199,204,212,0.75)" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            {/* Line 2 */}
            <div className="flex flex-wrap justify-center gap-x-3 items-baseline">
              {QUOTE_WORDS2.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 1.65 + i * 0.06 }}
                  style={{ color: "rgba(199,204,212,0.75)" }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 2.1 }}
                style={{
                  color: "#D4B97E",
                  textShadow: "0 0 30px rgba(212,185,126,0.4)",
                }}
              >
                will&nbsp;be.
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 2.3 }}
                style={{ color: "rgba(199,204,212,0.75)" }}
              >
                &rdquo;
              </motion.span>
            </div>
          </div>

          {/* Pulsing dot under the quote */}
          <motion.div
            className="mx-auto mt-8 w-1.5 h-1.5 rounded-full"
            style={{ background: "#C8A96E" }}
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.6, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
