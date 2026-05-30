"use client";

import { motion } from "framer-motion";

const rowOne = [
  "Artificial Intelligence", "Road Safety Intelligence", "Consequence Intelligence",
  "Business Infrastructure", "Civic Technology", "PAME AI Extended Brain",
  "Mobile Money Integration", "Hapa City Intelligence", "Kiongozi AI Copilot",
  "Agentic Intelligence", "Operational Intelligence", "Fleet Analytics",
];

const rowTwo = [
  "eTIMS Compliance", "Location-Anchored Social Graph", "Strategic Foresight",
  "ROSCA & Savings Groups", "Geospatial Systems", "Public Safety Infrastructure",
  "Real-Time Data Systems", "NGO Fund Accounting", "Sovereign AI Africa",
  "Continental Intelligence Grid", "Smart City Systems", "Offline-First Architecture",
];

const Diamond = ({ gold }: { gold?: boolean }) => (
  <span
    className="mx-5 select-none"
    style={{ color: gold ? "#C8A96E" : "rgba(200,169,110,0.35)", fontSize: "0.5rem" }}
  >
    ◆
  </span>
);

function MarqueeRow({
  items,
  reverse = false,
  speed = 50,
  goldEvery = 4,
}: {
  items: string[];
  reverse?: boolean;
  speed?: number;
  goldEvery?: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden py-3">
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              className="font-display text-[11px] tracking-[0.22em] uppercase transition-colors duration-200 cursor-default"
              style={{
                color: i % goldEvery === 0
                  ? "rgba(200,169,110,0.85)"
                  : "rgba(200,196,190,0.55)",
              }}
            >
              {item}
            </span>
            <Diamond gold={i % (goldEvery * 2) === 0} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function MarqueeStrip() {
  return (
    <div className="relative bg-graphite border-y border-white/5 overflow-hidden">
      {/* Left and right gradient masks */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0E1018, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0E1018, transparent)" }} />

      {/* Subtle divider between rows */}
      <MarqueeRow items={rowOne} speed={55} goldEvery={3} />
      <div className="h-px mx-8" style={{ background: "rgba(200,169,110,0.08)" }} />
      <MarqueeRow items={rowTwo} reverse speed={48} goldEvery={4} />
    </div>
  );
}
