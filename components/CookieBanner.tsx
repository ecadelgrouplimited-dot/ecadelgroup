"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Cookie } from "lucide-react";

const STORAGE_KEY = "zg_cookie_consent";

type Consent = "accepted" | "declined" | null;

export default function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent;
    if (!stored) {
      // Small delay so it doesn't clash with the loading screen
      const t = setTimeout(() => setVisible(true), 3200);
      return () => clearTimeout(t);
    }
    setConsent(stored);
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setConsent("accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, "declined");
    setConsent("declined");
    setVisible(false);
  };

  // Don't render once a decision is stored
  if (consent !== null) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9998] w-[calc(100%-3rem)] max-w-2xl"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div
            className="glass border border-white/8 px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-5"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,169,110,0.08)" }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-9 h-9 border border-emerald-deep/30 flex items-center justify-center text-emerald-deep">
              <Cookie size={15} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="text-softwhite/90 text-sm font-display font-medium mb-0.5">
                This site uses cookies
              </p>
              <p className="text-platinum/45 text-xs leading-relaxed">
                We use strictly necessary cookies and optional analytics cookies to improve your
                experience.{" "}
                <Link
                  href="/legal#cookies"
                  className="text-emerald-deep hover:text-emerald-glow underline underline-offset-2 transition-colors"
                >
                  Cookie Policy
                </Link>
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={decline}
                className="px-4 py-2 text-xs text-platinum/50 hover:text-softwhite border border-white/8 hover:border-white/15 transition-all duration-200 tracking-wide"
              >
                Decline
              </button>
              <button
                onClick={accept}
                className="px-5 py-2 text-xs text-softwhite bg-emerald-deep hover:bg-emerald-glow transition-all duration-200 tracking-wide font-medium"
                style={{ boxShadow: "0 0 16px rgba(200,169,110,0.3)" }}
              >
                Accept All
              </button>
              <button
                onClick={decline}
                className="p-1.5 text-platinum/30 hover:text-platinum/70 transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
