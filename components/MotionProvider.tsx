"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global motion policy.
 *
 * The CSS in globals.css neutralises *CSS* animations under
 * `prefers-reduced-motion`, but Framer Motion drives transforms from JS and
 * ignores that media query on its own — so the marquee, orbit rings and pulses
 * would keep running for a user who asked for less motion.
 *
 * `reducedMotion="user"` makes Framer Motion honour the OS setting globally:
 * it drops transform and layout animations while keeping opacity fades, which
 * is the recommended compromise — the page still feels alive, nothing slides.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
