"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 500);
          return 100;
        }
        return Math.min(p + Math.random() * 16 + 5, 100);
      });
    }, 70);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-obsidian flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* subtle grid bg */}
          <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

          {/* radial glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 40% at 50% 50%, rgba(200,169,110,0.08) 0%, transparent 70%)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative text-center flex flex-col items-center"
          >
            {/* Logo mark with glow */}
            <div className="relative mb-8">
              <div
                className="absolute inset-0 rounded-full blur-2xl"
                style={{
                  background: "radial-gradient(circle, rgba(200,169,110,0.25) 0%, transparent 70%)",
                  transform: "scale(1.8)",
                }}
              />
              <motion.div
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
                  alt="ECADEL GROUP"
                  width={80}
                  height={80}
                  className="relative z-10 object-contain"
                  priority
                />
              </motion.div>
            </div>

            {/* Full logo text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Image
                src="/assets/ecadel_logos_icons/ecadel_lockup_horizontal_transparent.png"
                alt="ECADEL GROUP LIMITED"
                width={220}
                height={61}
                className="object-contain mb-8 opacity-75"
              />
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-carbon mx-auto overflow-hidden relative">
              <motion.div
                className="h-full bg-emerald-deep absolute left-0 top-0"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
            <p className="text-platinum/25 text-[10px] tracking-[0.3em] uppercase mt-4 font-display">
              Initialising Systems
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
