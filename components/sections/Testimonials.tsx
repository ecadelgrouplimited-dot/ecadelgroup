"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "Building a complete organisational management system is no small task — it requires someone who understands not just technology, but the operational reality of running a purpose-driven organisation. ECADEL delivered exactly that: a portal and website that now manages our entire operation with a precision we couldn't achieve before. This wasn't just development — it was transformation.",
    name: "Derek J Lobo",
    title: "President",
    org: "Einstein Rising Canada",
    project: "Organisation Management System · einsteinrisingcanada.org",
    initials: "DJL",
    accent: "#C8A96E",
    glow: "rgba(200,169,110,0.06)",
  },
  {
    quote: "Our guests arrive expecting a premium experience — and that experience now starts before they even set foot on our property. The website ECADEL built captures everything that makes Bunyonyi Luxury Resort exceptional, and the bookings management system has genuinely changed how we operate. Reservations that used to require calls and back-and-forth are now completely seamless. The quality of the work is rare.",
    name: "Precious",
    title: "Resort Manager",
    org: "Bunyonyi Luxury Resort",
    project: "Premium Resort Website & Bookings · bunyonyiluxuryresort.com",
    initials: "P",
    accent: "#D4B97E",
    glow: "rgba(212,185,126,0.06)",
  },
  {
    quote: "I make premium, handcrafted bags — every piece is made with intention and care. The platform ECADEL is building for Ambrosoli Creations carries that same spirit. It is not just an e-commerce site; it is a digital home for the craft. The attention to detail they bring to the work mirrors what we put into every bag we make. I could not have chosen better partners for this.",
    name: "Ambrose",
    title: "Founder",
    org: "Ambrosoli Creations",
    project: "Premium E-Commerce Platform · ambrosolicreations.com",
    initials: "A",
    accent: "#C8A96E",
    glow: "rgba(200,169,110,0.06)",
  },
  {
    quote: "I needed a clean, functional online store that actually worked — and what the ECADEL team delivered was beyond what I expected. The platform handles everything from product listings to checkout with a polish that puts us right alongside much bigger brands. Our customers noticed the difference immediately. The whole experience of working with them was professional from day one.",
    name: "Simon Sharp",
    title: "Founder",
    org: "Simon Sharp Products",
    project: "E-Commerce Platform · simonsharpproducts.com",
    initials: "SS",
    accent: "#D4B97E",
    glow: "rgba(212,185,126,0.06)",
  },
];

export default function Testimonials() {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      {/* Shifting ambient glow — changes with active testimonial */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`glow-${current}`}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            background: `radial-gradient(ellipse 70% 60% at 30% 50%, ${t.glow} 0%, transparent 70%)`,
          }}
        />
      </AnimatePresence>

      {/* Static centre glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 50% 40% at 70% 60%, rgba(139,167,199,0.03) 0%, transparent 70%)",
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <span className="text-xs tracking-[0.4em] uppercase text-emerald-glow font-display">
            Client Testimonials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-16"
        >
          Words from the
          <br />
          <span style={{ color: "#C8A96E" }}>People We Build For.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-12 gap-0 border border-white/8"
          style={{ background: "rgba(14,16,24,0.6)", backdropFilter: "blur(8px)" }}
        >

          {/* ── Left panel — the quote ── */}
          <div className="lg:col-span-8 p-10 md:p-14 relative border-b lg:border-b-0 lg:border-r border-white/8 overflow-hidden">

            {/* Decorative giant quote mark — shifts colour with speaker */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`qmark-${current}`}
                className="absolute top-6 left-8 select-none pointer-events-none font-serif leading-none"
                style={{ fontSize: "clamp(6rem, 12vw, 10rem)", color: t.accent, opacity: 0.08 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.08, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                aria-hidden="true"
              >
                &ldquo;
              </motion.div>
            </AnimatePresence>

            {/* Accent top border that pulses */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, ${t.accent}60, transparent)` }}
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <blockquote
                  className="font-serif leading-relaxed font-light mb-10 relative z-10"
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                    color: "rgba(240,237,230,0.88)",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-5">
                  {/* Avatar with per-speaker accent */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 relative"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${t.accent}30 0%, ${t.accent}08 60%)`,
                      border: `1px solid ${t.accent}40`,
                      color: t.accent,
                      boxShadow: `0 0 20px ${t.accent}20`,
                    }}
                  >
                    {t.initials}
                    {/* Outer ring pulse */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ border: `1px solid ${t.accent}30` }}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>

                  <div>
                    <div className="font-display font-semibold text-softwhite text-base tracking-wide">
                      {t.name}
                    </div>
                    <div className="text-platinum/68 text-xs tracking-wide mt-0.5">
                      {t.title} · {t.org}
                    </div>
                    <div
                      className="text-[9px] tracking-[0.18em] uppercase mt-1.5"
                      style={{ color: t.accent }}
                    >
                      {t.project}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 flex items-center justify-center border border-white/8 text-platinum/65 hover:border-emerald-deep/50 hover:text-emerald-glow transition-all duration-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 flex items-center justify-center border border-white/8 text-platinum/65 hover:border-emerald-deep/50 hover:text-emerald-glow transition-all duration-200"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>

              {/* Progress dots */}
              <div className="flex items-center gap-2 ml-2">
                {testimonials.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === current ? 28 : 6,
                      height: 2,
                      background: i === current ? item.accent : "rgba(255,255,255,0.15)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      transition: "all 0.4s",
                      boxShadow: i === current ? `0 0 8px ${item.accent}60` : "none",
                    }}
                  />
                ))}
              </div>

              <span className="ml-auto text-[9px] font-mono text-platinum/38 tracking-widest">
                {String(current + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* ── Right panel — client index ── */}
          <div className="lg:col-span-4 p-8 md:p-10 flex flex-col">
            <div className="text-[9px] tracking-[0.3em] uppercase text-platinum/42 font-display mb-5">
              All Clients
            </div>
            <div className="space-y-1 flex-1">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-full text-left px-4 py-4 transition-all duration-200 border-l-2 group"
                  style={{
                    borderColor: i === current ? item.accent : "transparent",
                    background: i === current ? `${item.accent}06` : "transparent",
                  }}
                >
                  <div
                    className="font-display font-semibold text-sm tracking-wide transition-colors duration-200"
                    style={{ color: i === current ? "rgba(240,237,230,0.95)" : "rgba(200,196,190,0.42)" }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-[9px] tracking-[0.15em] uppercase mt-0.5 transition-colors duration-200"
                    style={{ color: i === current ? item.accent : "rgba(200,196,190,0.22)" }}
                  >
                    {item.title} · {item.org}
                  </div>
                </button>
              ))}
            </div>

            {/* Bottom note */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-[10px] text-platinum/38 leading-relaxed font-display tracking-wide">
                Real words from real clients — every project built to the same standard we apply to our own platforms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
