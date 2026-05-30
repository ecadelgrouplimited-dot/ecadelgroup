"use client";

import { motion } from "framer-motion";

const items = [
  "Artificial Intelligence",
  "Road Safety Intelligence",
  "Consequence Intelligence",
  "Business Infrastructure",
  "Civic Technology",
  "PAME AI Extended Brain",
  "Mobile Money Integration",
  "Hapa City Intelligence",
  "NGO Fund Accounting",
  "Kiongozi AI Copilot",
  "Agentic Intelligence",
  "Operational Intelligence",
  "Fleet Analytics",
  "eTIMS Compliance",
  "Location-Anchored Social Graph",
  "Strategic Foresight",
  "ROSCA & Savings Groups",
  "Geospatial Systems",
  "Public Safety Infrastructure",
  "Real-Time Data Systems",
];

const Separator = () => (
  <span className="mx-6 text-emerald-deep opacity-60">◆</span>
);

export default function MarqueeStrip() {
  const repeated = [...items, ...items];

  return (
    <div className="relative bg-graphite border-y border-white/5 overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-graphite to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-graphite to-transparent pointer-events-none" />
      <motion.div
        className="flex items-center whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="font-display text-xs tracking-[0.22em] uppercase text-platinum/65 hover:text-platinum/70 transition-colors duration-200 cursor-default">
              {item}
            </span>
            <Separator />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
