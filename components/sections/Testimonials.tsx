"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Building a complete organisational management system is no small task — it requires someone who understands not just technology, but the operational reality of running a purpose-driven organisation. ECADEL delivered exactly that: a portal and website that now manages our entire operation with a precision we couldn't achieve before. This wasn't just development — it was transformation.",
    name: "Derek J Lobo",
    title: "President",
    org: "Einstein Rising Canada",
    project: "Organisation Management System · einsteinrisingcanada.org",
    initials: "DJL",
  },
  {
    quote:
      "Our guests arrive expecting a premium experience — and that experience now starts before they even set foot on our property. The website ECADEL built captures everything that makes Bunyonyi Luxury Resort exceptional, and the bookings management system has genuinely changed how we operate. Reservations that used to require calls and back-and-forth are now completely seamless. The quality of the work is rare.",
    name: "Precious",
    title: "Resort Manager",
    org: "Bunyonyi Luxury Resort",
    project: "Premium Resort Website & Bookings · bunyonyiluxuryresort.com",
    initials: "P",
  },
  {
    quote:
      "I make premium, handcrafted bags — every piece is made with intention and care. The platform ECADEL is building for Ambrosoli Creations carries that same spirit. It is not just an e-commerce site; it is a digital home for the craft. The attention to detail they bring to the work mirrors what we put into every bag we make. I could not have chosen better partners for this.",
    name: "Ambrose",
    title: "Founder",
    org: "Ambrosoli Creations",
    project: "Premium E-Commerce Platform · ambrosolicreations.com",
    initials: "A",
  },
  {
    quote:
      "I needed a clean, functional online store that actually worked — and what the ECADEL team delivered was beyond what I expected. The platform handles everything from product listings to checkout with a polish that puts us right alongside much bigger brands. Our customers noticed the difference immediately. The whole experience of working with them was professional from day one.",
    name: "Simon Sharp",
    title: "Founder",
    org: "Simon Sharp Products",
    project: "E-Commerce Platform · simonsharpproducts.com",
    initials: "SS",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  const t = testimonials[current];

  return (
    <section id="testimonials" ref={ref} className="relative py-32 bg-obsidian overflow-hidden">
      {/* subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(200,169,110,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
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
          className="grid lg:grid-cols-12 gap-0 bg-white/3 border border-white/5"
        >
          {/* left panel — quote */}
          <div className="lg:col-span-8 p-10 md:p-14 relative border-b lg:border-b-0 lg:border-r border-white/5">
            {/* giant decorative quote mark */}
            <div
              className="absolute top-8 left-10 font-serif text-[8rem] leading-none text-emerald-deep/10 select-none pointer-events-none"
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45 }}
              >
                <blockquote className="font-serif text-xl md:text-2xl text-softwhite/85 leading-relaxed font-light mb-10 relative z-10">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-5">
                  {/* avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(200,169,110,0.2) 0%, rgba(200,169,110,0.05) 100%)",
                      border: "1px solid rgba(200,169,110,0.3)",
                      color: "#C8A96E",
                    }}
                  >
                    {t.initials}
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
                      style={{ color: "#C8A96E" }}
                    >
                      {t.project}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* navigation arrows */}
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

              {/* dots */}
              <div className="flex items-center gap-2 ml-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className="transition-all duration-300"
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === current ? 24 : 6,
                      height: 2,
                      background:
                        i === current
                          ? "#C8A96E"
                          : "rgba(255,255,255,0.15)",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right panel — index of all clients */}
          <div className="lg:col-span-4 p-8 md:p-10">
            <div className="text-[9px] tracking-[0.3em] uppercase text-platinum/42 font-display mb-6">
              All Clients
            </div>
            <div className="space-y-1">
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-full text-left px-4 py-4 transition-all duration-200 border-l-2 group ${
                    i === current
                      ? "border-emerald-deep bg-emerald-deep/5"
                      : "border-transparent hover:border-white/10 hover:bg-white/2"
                  }`}
                >
                  <div
                    className={`font-display font-semibold text-sm tracking-wide transition-colors duration-200 ${
                      i === current ? "text-softwhite" : "text-platinum/65 group-hover:text-platinum/65"
                    }`}
                  >
                    {item.name}
                  </div>
                  <div
                    className={`text-[9px] tracking-[0.15em] uppercase mt-0.5 transition-colors duration-200 ${
                      i === current ? "text-emerald-glow" : "text-platinum/38"
                    }`}
                  >
                    {item.title} · {item.org}
                  </div>
                </button>
              ))}
            </div>

            {/* bottom note */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-[10px] text-platinum/42 leading-relaxed font-display tracking-wide">
                Real words from real clients — every project built with the same standard we apply to our own platforms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
