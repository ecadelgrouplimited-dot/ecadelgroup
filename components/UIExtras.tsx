"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUp } from "lucide-react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, #C8A96E 0%, #D4B97E 60%, #C8A96E 100%)",
        boxShadow: "0 0 8px rgba(200,169,110,0.6)",
      }}
    />
  );
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center border border-emerald-deep/50 bg-obsidian/80 text-emerald-glow hover:bg-emerald-deep/10 hover:border-emerald-glow transition-all duration-300 backdrop-blur-sm"
          aria-label="Scroll to top"
          style={{ boxShadow: "0 0 20px rgba(200,169,110,0.2)" }}
        >
          <ArrowUp size={16} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
