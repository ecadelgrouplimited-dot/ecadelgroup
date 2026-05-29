"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Code2, Smartphone, Globe, Server, BrainCircuit, ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Code2,
    code: "SD",
    title: "Software Development",
    description:
      "Custom enterprise software, internal tools, APIs, and backend systems — built with precision, security, and long-term maintainability at the core. We build software that works in the real world, not just in demos.",
    tags: ["Enterprise Systems", "APIs & Integrations", "Backend Architecture"],
  },
  {
    icon: Smartphone,
    code: "MW",
    title: "Mobile & Web Development",
    description:
      "Premium web applications, e-commerce platforms, organisational portals, and mobile apps for iOS and Android — designed with craft and engineered to perform. From MVP to full-scale production.",
    tags: ["Web Applications", "iOS & Android", "E-Commerce Platforms"],
  },
  {
    icon: Server,
    code: "HD",
    title: "Hosting & Domain Registration",
    description:
      "Reliable cloud hosting, domain registration and management, SSL, uptime monitoring, and ongoing infrastructure support — so your platforms are always available when your customers need them.",
    tags: ["Cloud Hosting", "Domain Management", "SSL & Uptime"],
  },
  {
    icon: Globe,
    code: "TC",
    title: "Technology Consultancy",
    description:
      "Strategic technology advisory for organisations navigating digital transformation. System architecture, vendor selection, product roadmapping, and team structure — we help you build the right thing, the right way.",
    tags: ["Digital Strategy", "Architecture Reviews", "Product Roadmaps"],
  },
  {
    icon: BrainCircuit,
    code: "AI",
    title: "AI Training & Integration",
    description:
      "Custom AI model training, intelligent workflow automation, and AI integration into existing products and operations. Practical, grounded intelligence — from copilots to full agentic system design — delivered production-ready.",
    tags: ["Custom AI Models", "Workflow Automation", "Agentic Systems"],
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
      className="group relative bg-graphite border border-white/5 p-8 hover:border-emerald-deep/30 hover:bg-carbon transition-all duration-400 cursor-default"
    >
      {/* corner accent */}
      <div className="absolute top-0 left-0 w-10 h-px bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-px h-10 bg-emerald-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />

      <div className="flex items-start gap-4 mb-5">
        <div className="w-11 h-11 flex items-center justify-center border border-white/8 group-hover:border-emerald-deep/40 group-hover:bg-emerald-deep/8 transition-all duration-300 flex-shrink-0">
          <Icon size={16} className="text-platinum/40 group-hover:text-emerald-deep transition-colors duration-300" />
        </div>
        <div
          className="font-display font-bold text-[10px] tracking-[0.2em] text-emerald-deep/60 group-hover:text-emerald-deep transition-colors duration-300 pt-3"
          style={{ letterSpacing: "0.15em" }}
        >
          {svc.code}
        </div>
      </div>

      <h3 className="font-display font-semibold text-softwhite text-base mb-3 leading-snug tracking-wide group-hover:text-white transition-colors duration-200">
        {svc.title}
      </h3>
      <p className="text-platinum/45 text-sm leading-relaxed mb-5">
        {svc.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {svc.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] tracking-[0.18em] uppercase text-platinum/30 border border-white/5 px-2 py-0.5"
          >
            {tag}
          </span>
        ))}
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
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Services & Capabilities
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight max-w-xl"
          >
            What We Build
            <br />
            <span style={{ color: "#C8A96E" }}>For You.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/50 max-w-md text-sm leading-relaxed"
          >
            Beyond our platform subsidiaries, ECADEL GROUP delivers world-class
            technology services to clients across Africa and beyond — bringing the same
            institutional-grade standard to every engagement, regardless of scale.
          </motion.p>
        </div>

        {/* service cards — 3-col grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 mb-px">
          {services.map((svc, i) => (
            <ServiceCard key={svc.code} svc={svc} index={i} inView={inView} />
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.5 }}
            className="bg-emerald-deep/8 border border-emerald-deep/20 p-8 flex flex-col justify-between group hover:bg-emerald-deep/14 transition-all duration-300"
          >
            <div>
              <div className="w-8 h-px bg-emerald-deep mb-6" />
              <blockquote className="font-serif text-softwhite/80 text-lg leading-relaxed italic mb-4">
                &ldquo;Every engagement is an infrastructure decision. We build things that outlast the brief.&rdquo;
              </blockquote>
              <cite className="text-[10px] tracking-[0.2em] uppercase text-platinum/35 not-italic font-display">
                — ECADEL GROUP · Service Philosophy
              </cite>
            </div>
            <a
              href="#contact"
              className="group/link mt-8 inline-flex items-center gap-2 text-xs text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
            >
              Start a Project
              <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
