"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "About", href: "#overview" },
  { label: "Services", href: "#services" },
  { label: "Platforms", href: "#platforms" },
  { label: "Labs", href: "#labs" },
  { label: "Our Work", href: "#client-work" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/assets/ecadel_logos_icons/ecadel_lockup_horizontal_transparent.png"
              alt="ECADEL GROUP LIMITED"
              width={180}
              height={44}
              className="object-contain opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              priority
            />
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-platinum/60 text-sm tracking-wide hover:text-softwhite transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-emerald-deep group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="hidden lg:block text-sm px-5 py-2 border border-emerald-deep/50 text-emerald-glow hover:bg-emerald-deep/10 hover:border-emerald-glow transition-all duration-300 tracking-wide"
            >
              Partner With Us
            </a>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-platinum/70 hover:text-softwhite transition-colors p-1"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 inset-x-0 z-40 glass border-b border-white/5 lg:hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-platinum/70 text-base hover:text-softwhite transition-colors tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center text-sm px-5 py-2.5 border border-emerald-deep/50 text-emerald-glow"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
