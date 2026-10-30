"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Send, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

const contactEmails = [
  { label: "General & Project Inquiries", email: "ecadel@ecadelgroup.com" },
  { label: "Enterprise & Institutional Partnerships", email: "ecadel@ecadelgroup.com" },
  { label: "Investor & Grant Relations", email: "ecadel@ecadelgroup.com" },
];

const QUICK_SCOPES = [
  { label: "Enterprise Platform / Operating System", type: "services" },
  { label: "Hotel / Hospitality System & POS", type: "services" },
  { label: "Corporate Website & Admin Panel", type: "services" },
  { label: "AI Concierge / Custom AI Integration", type: "services" },
  { label: "Fleet & Compliance System", type: "services" },
  { label: "Institutional / Government Partnership", type: "partnership" },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedScope, setSelectedScope] = useState<string>("");
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

  const handleScopeSelect = (scopeLabel: string, inquiryType: string) => {
    setSelectedScope(scopeLabel);
    setForm((prev) => ({
      ...prev,
      type: inquiryType,
      message: prev.message
        ? prev.message
        : `We are interested in discussing a ${scopeLabel} with ECADEL GROUP. `,
    }));
  };

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
          className="mb-4 flex items-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Start a Conversation
          </span>
          <span className="h-px w-10 bg-emerald-deep/40" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-platinum/50">
            Kampala · United Kingdom · Global
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-6">
              Let&apos;s Engineer
              <br />
              <span style={{ color: "#C8A96E" }}>Your Next System.</span>
            </h2>
            <p className="text-platinum/74 leading-relaxed mb-8 text-sm sm:text-base">
              Whether you are commissioning a full operating platform like{" "}
              <span className="text-softwhite">FLEETS.HQ</span>, a modern hospitality &amp; POS
              system like <span className="text-softwhite">Reberon Hotel</span>, a high-trust
              corporate &amp; admin portal like <span className="text-softwhite">Neptune Guards</span>,
              or an institutional partnership — our leadership team responds directly.
            </p>

            {/* SLA & Trust Strip */}
            <div className="border border-white/8 bg-obsidian/60 p-4 mb-8 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-softwhite/90 font-display">
                <Clock size={13} className="text-emerald-deep flex-shrink-0" />
                <span>Direct Architect Response within 24 Hours</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-platinum/70">
                <CheckCircle2 size={13} className="text-emerald-deep flex-shrink-0" />
                <span>Full NDA &amp; Sovereign Data Governance Available</span>
              </div>
            </div>

            {/* emails */}
            <div className="space-y-4 mb-8">
              {contactEmails.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <Mail size={13} className="text-emerald-deep mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-platinum/60 text-[10px] tracking-[0.2em] uppercase mb-0.5">
                      {c.label}
                    </div>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-softwhite/85 text-sm hover:text-emerald-glow transition-colors duration-200"
                    >
                      {c.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* phone / WhatsApp */}
            <div className="flex items-start gap-4 mb-6">
              <Phone size={13} className="text-emerald-deep mt-1 flex-shrink-0" />
              <div>
                <div className="text-platinum/60 text-[10px] tracking-[0.2em] uppercase mb-1">
                  Direct Executive Desk &amp; WhatsApp
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <a
                    href="tel:+256760512691"
                    className="text-softwhite/85 text-sm hover:text-emerald-glow transition-colors duration-200"
                  >
                    +256 760 512 691
                  </a>
                  <span className="text-platinum/38 text-xs">·</span>
                  <a
                    href="https://wa.me/256760512691"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-emerald-glow text-xs font-display uppercase tracking-wider border border-emerald-deep/40 bg-emerald-deep/10 px-2.5 py-1 hover:bg-emerald-deep hover:text-obsidian transition-all duration-200"
                  >
                    Instant WhatsApp <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            </div>

            {/* location */}
            <div className="flex items-center gap-3 text-platinum/72 text-sm">
              <MapPin size={13} className="text-emerald-deep flex-shrink-0" />
              <span>Headquarters: Kampala, Uganda · Serving Africa, UK &amp; Canada</span>
            </div>
          </motion.div>

          {/* right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-7"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 px-6 border border-emerald-deep/30 bg-obsidian/80">
                <div className="w-12 h-12 border border-emerald-deep flex items-center justify-center mb-6">
                  <Send size={18} className="text-emerald-glow" />
                </div>
                <h3 className="font-display font-semibold text-softwhite text-xl mb-3">
                  Inquiry Received
                </h3>
                <p className="text-platinum/72 text-sm max-w-sm">
                  Thank you for reaching out to ECADEL GROUP LIMITED. Our leadership and architecture team will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 bg-obsidian/65 border border-white/8 p-6 sm:p-8 md:p-10"
              >
                {/* Quick Project Scope Selector */}
                <div>
                  <div className="text-[10px] tracking-[0.22em] uppercase text-emerald-glow font-mono mb-2.5">
                    What are we building together? (Optional Quick-Select)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_SCOPES.map((sc) => {
                      const active = selectedScope === sc.label;
                      return (
                        <button
                          key={sc.label}
                          type="button"
                          onClick={() => handleScopeSelect(sc.label, sc.type)}
                          className="text-[10px] font-display tracking-wide px-3 py-1.5 border transition-all duration-200"
                          style={{
                            borderColor: active ? "#C8A96E" : "rgba(255,255,255,0.08)",
                            background: active ? "rgba(200,169,110,0.16)" : "rgba(19,23,32,0.7)",
                            color: active ? "#F0EDE6" : "rgba(200,196,190,0.65)",
                          }}
                        >
                          {sc.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Full Name *
                    </label>
                    <input
                      id="contact-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-carbon border border-white/10 px-4 py-3 text-sm text-softwhite placeholder-platinum/25 focus:outline-none focus:border-emerald-deep/70 transition-colors duration-200"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-org" className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Organisation *
                    </label>
                    <input
                      id="contact-org"
                      required
                      value={form.org}
                      onChange={(e) => setForm({ ...form, org: e.target.value })}
                      className="w-full bg-carbon border border-white/10 px-4 py-3 text-sm text-softwhite placeholder-platinum/25 focus:outline-none focus:border-emerald-deep/70 transition-colors duration-200"
                      placeholder="Company or institution"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="contact-email"
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-carbon border border-white/10 px-4 py-3 text-sm text-softwhite placeholder-platinum/25 focus:outline-none focus:border-emerald-deep/70 transition-colors duration-200"
                      placeholder="you@organisation.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-type" className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="contact-type"
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full bg-carbon border border-white/10 px-4 py-3 text-sm text-softwhite focus:outline-none focus:border-emerald-deep/70 transition-colors duration-200"
                    >
                      <option value="services">Custom Software / Web / System Build</option>
                      <option value="partnership">Enterprise / Institutional Partnership</option>
                      <option value="government">Government / Civic Infrastructure</option>
                      <option value="investment">Investment &amp; Grant Inquiry</option>
                      <option value="media">Media &amp; Press</option>
                      <option value="research">ECADEL LABS Research</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-[10px] tracking-[0.25em] uppercase text-platinum/65 mb-2">
                    Project Brief / Message *
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-carbon border border-white/10 px-4 py-3 text-sm text-softwhite placeholder-platinum/25 focus:outline-none focus:border-emerald-deep/70 transition-colors duration-200 resize-none"
                    placeholder="Tell us about your operational goals, timeline, and the system or platform you want to build..."
                  />
                </div>

                {error && (
                  <p role="alert" className="text-red-400/90 text-xs leading-relaxed border border-red-400/20 bg-red-400/5 px-4 py-3">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-emerald-deep text-obsidian text-xs sm:text-sm font-display font-bold uppercase tracking-[0.16em] hover:bg-emerald-glow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: "0 0 28px rgba(200,169,110,0.28)" }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Transmitting Brief…
                    </>
                  ) : (
                    <>
                      <Send size={14} />
                      Submit Project Brief
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
