"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";

const projects = [
  {
    index: "01",
    status: "live" as const,
    name: "Simon Sharp Products",
    client: "Simon Sharp · Founder",
    type: "Mini E-Commerce Platform",
    description:
      "A clean, high-performing online storefront for Simon Sharp's product brand. Full e-commerce functionality — product catalogue, cart, and checkout — delivered with a premium user experience that positions the brand alongside much larger players in the market.",
    url: "simonsharpproducts.com",
    href: "https://simonsharpproducts.com",
    tags: ["E-Commerce", "Web Development", "UX Design"],
  },
  {
    index: "02",
    status: "live" as const,
    name: "Einstein Rising Canada",
    client: "Derek J Lobo · President",
    type: "Complete Organisation Management System",
    description:
      "A comprehensive portal and public-facing website for Einstein Rising Canada — managing the full operational lifecycle of the organisation. Member management, programme tracking, donor reporting, and administrative workflows, all integrated into one institutional-grade system.",
    url: "einsteinrisingcanada.org",
    href: "https://einsteinrisingcanada.org",
    tags: ["Organisation Portal", "Custom CMS", "Full-Stack"],
  },
  {
    index: "03",
    status: "live" as const,
    name: "Bunyonyi Luxury Resort",
    client: "Precious · Resort Manager",
    type: "Premium Resort Website & Bookings Management",
    description:
      "A complete digital presence for one of Uganda's premier luxury resort destinations on Lake Bunyonyi. A visually striking website that captures the resort's premium identity, paired with a full bookings management system that transforms how the resort handles reservations.",
    url: "bunyonyiluxuryresort.com",
    href: "https://bunyonyiluxuryresort.com",
    tags: ["Hospitality Tech", "Bookings System", "Premium Web"],
  },
  {
    index: "04",
    status: "upcoming" as const,
    name: "Ambrosoli Creations",
    client: "Ambrose · Founder",
    type: "Premium Handcraft E-Commerce Platform",
    description:
      "A flagship e-commerce platform for Ambrosoli Creations — makers of handcrafted premium bags. Built to carry the brand's artisanal identity into the digital space: custom product showcases, seamless checkout, and a shopping experience that honours the craft behind every piece.",
    url: "ambrosolicreations.com",
    href: "#",
    tags: ["E-Commerce", "Brand Experience", "Handcraft"],
  },
];

function StatusBadge({ status }: { status: "live" | "upcoming" }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-display text-emerald-glow border border-emerald-deep/30 px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
        Live
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-display text-amber-400/70 border border-amber-400/20 px-2.5 py-1">
      <Clock size={9} />
      In Development
    </span>
  );
}

export default function ClientProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="client-work" ref={ref} className="relative py-32 bg-graphite">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Client Work
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight"
          >
            Built for Clients.
            <br />
            <span style={{ color: "#C8A96E" }}>Built to Last.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/72 max-w-md text-sm leading-relaxed"
          >
            Every client project we deliver carries the same standard we apply to our own
            subsidiaries: precision engineering, premium design, and infrastructure that
            holds under real-world conditions.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {projects.map((project, i) => (
            <motion.div
              key={project.index}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 + i * 0.1 }}
              className={`group relative bg-graphite p-10 hover:bg-carbon transition-all duration-400 cursor-default ${
                project.status === "upcoming" ? "border-t-2 border-emerald-deep/50" : ""
              }`}
            >
              {/* left accent */}
              <div className="absolute top-0 left-0 w-px h-0 bg-emerald-deep group-hover:h-full transition-all duration-500" />
              <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />

              {/* header */}
              <div className="flex items-start justify-between mb-6">
                <div className="font-display text-[10px] tracking-[0.25em] uppercase text-platinum/42">
                  {project.index} / 04
                </div>
                <StatusBadge status={project.status} />
              </div>

              <h3 className="font-display font-bold text-2xl text-softwhite mb-1 leading-tight tracking-tight group-hover:text-white transition-colors duration-200">
                {project.name}
              </h3>

              <div className="text-[10px] tracking-[0.18em] uppercase text-platinum/50 font-display mb-1">
                {project.client}
              </div>

              <div className="font-serif italic text-sm text-emerald-glow/80 mb-5">
                {project.type}
              </div>

              <p className="text-platinum/72 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              {/* tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] tracking-[0.15em] uppercase text-platinum/42 border border-white/5 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* link */}
              {project.status === "live" ? (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
                >
                  {project.url}
                  <ArrowUpRight size={12} />
                </a>
              ) : (
                <span className="text-xs text-platinum/50 font-display tracking-wider">
                  {project.url} · Launching Soon
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
