"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const INTERACTIVE = "a, button, [role='tab'], [data-cursor]";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const reduceMotion = useReducedMotion();

  // Neither the motion preference nor the pointer capability is knowable during
  // SSR, so the server would render the cursor and the client would drop it — a
  // hydration mismatch. Render nothing until after mount, then decide.
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!mounted || reduceMotion || !finePointer) return;

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    // Delegated hover detection — sections mount and unmount cards as filters
    // change, so binding listeners once on mount would miss anything added later.
    const over = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) setIsHovering(true);
    };
    const out = (e: MouseEvent) => {
      if ((e.target as Element | null)?.closest?.(INTERACTIVE)) setIsHovering(false);
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, true);
    document.addEventListener("mouseout", out, true);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over, true);
      document.removeEventListener("mouseout", out, true);
    };
  }, [mounted, reduceMotion, finePointer]);

  // Motion-sensitive users and touch/hybrid devices get the native cursor back
  // (globals.css only hides it for hover-capable fine pointers).
  if (!mounted || reduceMotion || !finePointer) return null;

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
