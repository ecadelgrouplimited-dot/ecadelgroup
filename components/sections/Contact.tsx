"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";

const contactEmails = [
  { label: "General Inquiries", email: "ecadel@ecadelgroup.com" },
  { label: "Partnerships", email: "ecadel@ecadelgroup.com" },
  { label: "Investors", email: "ecadel@ecadelgroup.com" },
  { label: "Media", email: "ecadel@ecadelgroup.com" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({
    name: "",
    org: "",
    email: "",
    type: "services",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please email us directly at ecadel@ecadelgroup.com");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 bg-graphite">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Contact
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-8">
              Let&apos;s Build
              <br />
              <span style={{ color: "#C8A96E" }}>Together</span>
            </h2>
              <p className="text-platinum/74 leading-relaxed mb-12">
              Whether you need a website, a mobile app, a custom software system,
              AI integration, or a technology partner for the long term — we want
              to hear from you. ECADEL GROUP LIMITED builds for clients and
              institutions that demand the same standard we apply to our own platforms.
            </p>

            {/* emails */}
            <div className="space-y-4 mb-10">
              {contactEmails.map((c) => (
                <div key={c.email} className="flex items-start gap-4">
                  <Mail size={13} className="text-emerald-deep mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-platinum/65 text-[10px] tracking-[0.2em] uppercase mb-0.5">
                      {c.label}
                    </div>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-platinum/70 text-sm hover:text-softwhite transition-colors duration-200"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* phone / WhatsApp */}
            <div className="flex items-start gap-4 mb-4">
              <Phone size={13} className="text-emerald-deep mt-1 flex-shrink-0" />
              <div>
                <div className="text-platinum/65 text-[10px] tracking-[0.2em] uppercase mb-0.5">
                  Phone &amp; WhatsApp
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="tel:+256760512691"
                    className="text-platinum/70 text-sm hover:text-softwhite transition-colors duration-200"
                  >
                    +256 760 512 691
                  </a>
                  <span className="text-platinum/38 text-xs">·</span>
                  <a
                    href="https://wa.me/256760512691"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-glow/70 text-sm hover:text-emerald-glow transition-colors duration-200"
                  >
                    WhatsApp →
                  </a>
                </div>
              </div>
            </div>

            {/* location */}
            <div className="flex items-center gap-3 text-platinum/72 text-sm">
              <MapPin size={13} className="text-emerald-deep flex-shrink-0" />
              <span>Kampala, Uganda</span>
            </div>
          </motion.div>

          {/* right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-emerald-deep/20 bg-emerald-deep/5">
                <div className="w-12 h-12 border border-emerald-deep flex items-center justify-center mb-6">
                  <Send size={18} className="text-emerald-glow" />
                </div>
                <h3 className="font-display font-semibold text-softwhite text-xl mb-3">
                  Inquiry Received
                </h3>
                <p className="text-platinum/72 text-sm max-w-xs">
                  Thank you for reaching out. Our team will respond within 48
                  hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Full Name *
                    </label>
                    <input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-carbon border border-white/8 px-4 py-3 text-sm text-softwhite placeholder-platinum/20 focus:outline-none focus:border-emerald-deep/60 transition-colors duration-200"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Organisation *
                    </label>
                    <input
                      required
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full bg-carbon border border-white/8 px-4 py-3 text-sm text-softwhite placeholder-platinum/20 focus:outline-none focus:border-emerald-deep/60 transition-colors duration-200"
                      placeholder="Your organisation"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-carbon border border-white/8 px-4 py-3 text-sm text-softwhite placeholder-platinum/20 focus:outline-none focus:border-emerald-deep/60 transition-colors duration-200"
                    placeholder="your@organisation.com"
                  />
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                    Inquiry Type
                  </label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full bg-carbon border border-white/8 px-4 py-3 text-sm text-softwhite focus:outline-none focus:border-emerald-deep/60 transition-colors duration-200"
                  >
                    <option value="services">Services Inquiry</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="government">Government / Civic</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="media">Media & Press</option>
                    <option value="research">Research Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-carbon border border-white/8 px-4 py-3 text-sm text-softwhite placeholder-platinum/20 focus:outline-none focus:border-emerald-deep/60 transition-colors duration-200 resize-none"
                    placeholder="Tell us about your initiative and how we can work together..."
                  />
                </div>

                {error && (
                  <p className="text-red-400/80 text-xs leading-relaxed border border-red-400/20 bg-red-400/5 px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-deep text-obsidian text-sm font-semibold tracking-wide hover:bg-emerald-glow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0 0 24px rgba(200,169,110,0.25)" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
