"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    const targets = document.querySelectorAll("a, button, [data-cursor]");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{
          x: pos.x - 20,
          y: pos.y - 20,
          scale: isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.6 : 0.35,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 28, mass: 0.5 }}
      >
        <div className="w-10 h-10 rounded-full border border-emerald-deep/60" />
      </motion.div>
      {/* inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        animate={{ x: pos.x - 3, y: pos.y - 3 }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      >
        <div
          className="w-1.5 h-1.5 rounded-full bg-emerald-deep"
          style={{ boxShadow: "0 0 8px rgba(200,169,110,0.8)" }}
        />
      </motion.div>
    </>
  );
}
