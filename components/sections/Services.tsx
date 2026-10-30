"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Smartphone, Globe, Server, BrainCircuit, ArrowRight, CheckCircle2, ShieldCheck,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    code: "SD · 01",
    title: "Enterprise Software & Operating Systems",
    description:
      "Full-scale operational platforms, management systems (HMS, ERP, Fleet & Compliance OS), internal admin consoles, APIs, and multi-tenant backend architectures — built for zero-downtime institutional use.",
    proven: ["FLEETS.HQ (UK)", "Reberon — The House HMS", "Neptune Guards Admin"],
    tags: ["Management Systems", "Multi-Tenant SaaS", "Role-Based Portals"],
  },
  {
    icon: Smartphone,
    code: "MW · 02",
    title: "High-Conversion Web & Mobile Platforms",
    description:
      "Editorial luxury websites, procurement-grade corporate portals, e-commerce storefronts, and native mobile applications for iOS and Android — designed with unmistakable authority and engineered to convert.",
    proven: ["reberonhotel.com", "neptuneguards.com", "256logisticsltd.co.uk"],
    tags: ["Luxury & Corporate Web", "iOS & Android", "E-Commerce & Bookings"],
  },
  {
    icon: BrainCircuit,
    code: "AI · 03",
    title: "AI Concierges, Copilots & Agentic Systems",
    description:
      "Bespoke domain AI agents, conversational booking & quotation concierges, document intelligence, and workflow automation integrated directly into your live business databases and WhatsApp/email channels.",
    proven: ["Sipi AI Concierge", "Kiongozi AI Copilot", "Akili Code OS"],
    tags: ["AI Concierges", "Workflow Automation", "Custom Model Integration"],
  },
  {
    icon: Globe,
    code: "TC · 04",
    title: "Technology & Compliance Consultancy",
    description:
      "Strategic architecture advisory for organisations navigating regulatory compliance (DVSA, Home Office, eTIMS, PPDA) and digital transformation. We design the blueprint and engineer the system that passes the audit.",
    proven: ["DVSA & Home Office RegTech", "PPDA Procurement Systems", "NGO Fund Portals"],
    tags: ["Regulatory Tech", "System Architecture", "Digital Transformation"],
  },
  {
    icon: Server,
    code: "HD · 05",
    title: "Managed Cloud Infrastructure & Domains",
    description:
      "Dedicated UK, European, and African cloud deployment, domain registration, SSL security, automated backups, 24/7 uptime telemetry, and long-term engineering SLA management.",
    proven: ["UK-Hosted Fleet Clusters", "99.9% Uptime SLA", "Managed Security"],
    tags: ["Cloud Infrastructure", "Domain Governance", "24/7 Managed SLA"],
  },
];

const deliverySteps = [
  {
    step: "01",
    title: "Operational Audit & Blueprint",
    detail: "We map your exact domain workflows, compliance obligations, and conversion bottlenecks before writing a single line of code.",
  },
  {
    step: "02",
    title: "Precision Design & Full-Stack Build",
    detail: "Editorial interfaces paired with sovereign, type-safe backend engineering, role-based access control, and real-time telemetry.",
  },
  {
    step: "03",
    title: "Verification, Hardening & Migration",
    detail: "Automated build/test verification, security stress-testing, and seamless migration of your existing records, staff, and workflows.",
  },
  {
    step: "04",
    title: "Production Launch & Managed Evolution",
    detail: "Zero-downtime deployment on dedicated cloud infrastructure, team onboarding, and continuous engineering support as you scale.",
  },
];

function ServiceCard({
  svc, index, inView,
}: {
  svc: (typeof services)[0];
  index: number;
  inView: boolean;
}) {
  const Icon = svc.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.1 + index * 0.08 }}
      className="group relative bg-graphite border border-white/5 p-8 hover:border-emerald-deep/35 hover:bg-carbon transition-all duration-400 flex flex-col justify-between"
    >
      {/* corner accent */}
      <div className="absolute top-0 left-0 w-10 h-px bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-px h-10 bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="w-11 h-11 flex items-center justify-center border border-white/10 group-hover:border-emerald-deep/45 group-hover:bg-emerald-deep/10 transition-all duration-300 flex-shrink-0">
            <Icon size={17} className="text-emerald-glow/80 group-hover:text-emerald-glow transition-colors duration-300" />
          </div>
          <div
            className="font-mono font-bold text-[10px] tracking-[0.2em] text-emerald-deep/75 group-hover:text-emerald-glow transition-colors duration-300"
          >
            {svc.code}
          </div>
        </div>

        <h3 className="font-display font-bold text-softwhite text-lg mb-3 leading-snug tracking-wide group-hover:text-white transition-colors duration-200">
          {svc.title}
        </h3>
        <p className="text-platinum/72 text-sm leading-relaxed mb-6">
          {svc.description}
        </p>
      </div>

      <div className="space-y-5 pt-4 border-t border-white/6">
        {/* Proven in production list */}
        <div>
          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-glow/85 mb-2 flex items-center gap-1.5">
            <CheckCircle2 size={10} /> Proven in Production
          </div>
          <div className="flex flex-wrap gap-1.5">
            {svc.proven.map((item) => (
              <a
                key={item}
                href="#client-work"
                className="text-[9px] font-mono text-softwhite/80 bg-obsidian/70 border border-white/8 hover:border-emerald-deep/45 px-2 py-0.5 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {svc.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[0.16em] uppercase text-platinum/50 border border-white/6 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" ref={ref} className="relative py-32 bg-obsidian">
      <div className="absolute inset-0 bg-intelligence-grid opacity-30" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4 flex items-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Services &amp; Capabilities
          </span>
          <span className="h-px w-10 bg-emerald-deep/40" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-platinum/50">
            End-to-End Engineering
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight max-w-xl"
          >
            What We Engineer
            <br />
            <span style={{ color: "#C8A96E" }}>For Your Institution.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/72 max-w-md text-sm leading-relaxed"
          >
            Beyond our six proprietary platforms, ECADEL GROUP partners with ambitious
            enterprises, hotels, logistics operators, security firms, and institutions across
            Africa, the UK, and North America to architect and manage mission-critical software.
          </motion.p>
        </div>

        {/* service cards — 3-col grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8 border border-white/8 mb-12">
          {services.map((svc, i) => (
            <ServiceCard key={svc.code} svc={svc} index={i} inView={inView} />
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="bg-gradient-to-br from-emerald-deep/15 via-carbon to-obsidian border border-emerald-deep/30 p-8 flex flex-col justify-between group hover:border-emerald-glow/60 transition-all duration-300"
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.22em] text-emerald-glow mb-5 border border-emerald-deep/35 px-2.5 py-1">
                <ShieldCheck size={11} /> Direct Executive Engagement
              </div>
              <blockquote className="font-serif text-softwhite/90 text-xl leading-relaxed italic mb-4">
                &ldquo;Every engagement is an infrastructure decision. We engineer systems that outlast the brief and compound in value.&rdquo;
              </blockquote>
              <cite className="text-[10px] tracking-[0.2em] uppercase text-platinum/60 not-italic font-display block mb-6">
                — ECADEL GROUP · Engineering Mandate
              </cite>
              <p className="text-xs text-platinum/70 leading-relaxed">
                Have a complex operational challenge, a hotel or fleet to digitise, or a flagship brand to launch? Speak directly with our lead architects.
              </p>
            </div>
            <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#contact"
                className="group/link inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-emerald-deep text-obsidian text-xs font-display font-bold uppercase tracking-[0.16em] hover:bg-emerald-glow transition-all duration-200"
              >
                Commission a Project
                <ArrowRight size={13} className="group-hover/link:translate-x-1 transition-transform duration-200" />
              </a>
              <a
                href="#client-work"
                className="text-center text-[10px] font-mono uppercase tracking-[0.18em] text-platinum/65 hover:text-emerald-glow transition-colors"
              >
                Inspect 9 Live Client Builds →
              </a>
            </div>
          </motion.div>
        </div>

        {/* 4-Step Delivery Blueprint */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="border border-white/8 bg-graphite/60"
        >
          <div className="px-6 py-4 border-b border-white/8 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-emerald-glow">
              How We Deliver — Institutional Engineering Protocol
            </span>
            <span className="text-[10px] font-mono text-platinum/50">
              Architecture · Build · Verification · Managed SLA
            </span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/8">
            {deliverySteps.map((s) => (
              <div key={s.step} className="p-6 hover:bg-carbon/60 transition-colors">
                <div className="font-mono text-xs font-bold text-emerald-deep mb-2">
                  STEP {s.step}
                </div>
                <div className="font-display font-semibold text-sm text-softwhite mb-2">
                  {s.title}
                </div>
                <p className="text-platinum/65 text-xs leading-relaxed">
                  {s.detail}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
