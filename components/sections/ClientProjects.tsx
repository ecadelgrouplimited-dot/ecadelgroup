"use client";

import { useRef, useState, useMemo } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  ArrowUpRight, Clock, Star, ShoppingBag, Building2, Truck,
  Landmark, Hotel, Layers, ShieldCheck, Gauge, Users, Wrench, FileCheck,
} from "lucide-react";

/* ── Palette — disciplined: gold for flagship, light-gold / steel alternating ── */
const GOLD = "#C8A96E";
const GOLD_LIGHT = "#D4B97E";
const STEEL = "#8BA7C7";

type Sector = "Platforms & Systems" | "Corporate Web" | "E-Commerce";

type Project = {
  id: string;
  status: "live" | "upcoming";
  featured?: boolean;
  sector: Sector;
  icon: typeof Building2;
  accent: string;
  name: string;
  client: string;
  type: string;
  region: string;
  description: string;
  metrics: { value: string; label: string }[];
  url: string;
  href: string;
  tags: string[];
};

const projects: Project[] = [
  {
    id: "fleetshq",
    status: "live",
    featured: true,
    sector: "Platforms & Systems",
    icon: Layers,
    accent: GOLD,
    name: "FLEETS.HQ",
    client: "256 Logistics Ltd · Operator",
    type: "The Operating System for Transport Companies",
    region: "United Kingdom",
    description:
      "What began as a compliance hub for a single licensed haulier is now a full transport operating platform — designed, engineered and managed by ECADEL GROUP. FLEETS.HQ runs five integrated domains across drivers, vehicles, compliance, tachographs and maintenance, then layers dispatch, proof-of-delivery, invoicing and settlement on top. It protects an Operator's Licence (DVSA) and a Sponsor Licence (Home Office) at the same time — watching every licence, CPC, MOT, visa and right-to-work check in real time and flagging risk before it becomes a violation. Ten connected role panels, tenant-aware access control, UK-hosted infrastructure, and one-click audit evidence packs that turn a multi-day audit response into minutes.",
    metrics: [
      { value: "5", label: "Operating Domains" },
      { value: "10", label: "Role Panels" },
      { value: "98%", label: "Audit Readiness" },
      { value: "24/7", label: "Live Monitoring" },
    ],
    url: "fleetshq.com",
    href: "https://fleetshq.com",
    tags: ["Transport SaaS", "RegTech", "DVSA Compliance", "Tachograph Analysis", "Multi-Tenant", "Enterprise"],
  },
  {
    id: "reberon",
    status: "live",
    sector: "Corporate Web",
    icon: Landmark,
    accent: STEEL,
    name: "Reberon Investments",
    client: "Denis Mayamba · Managing Director",
    type: "Construction & Investment Corporate Platform",
    region: "Uganda",
    description:
      "A procurement-grade digital presence for one of Uganda's established construction and civil engineering firms — trading since 2010 and delivering for district governments, ministries and international donors. Eight structured sections carry the full weight of the business: live and completed project portfolio, service capability, plant and equipment inventory, compliance documentation, and a downloadable company profile built for procurement officers who need evidence, not marketing.",
    metrics: [
      { value: "30+", label: "Projects Listed" },
      { value: "15yr", label: "Track Record" },
      { value: "8", label: "Site Sections" },
    ],
    url: "reberoninvestments.com",
    href: "https://reberoninvestments.com",
    tags: ["Corporate Web", "Construction", "Procurement", "Portfolio System"],
  },
  {
    id: "256logistics",
    status: "live",
    sector: "Corporate Web",
    icon: Truck,
    accent: GOLD_LIGHT,
    name: "256 Logistics Ltd",
    client: "Director · 256 Logistics Ltd",
    type: "UK Freight & Haulage Corporate Website",
    region: "United Kingdom",
    description:
      "The public face of a licensed UK freight operator running domestic and European haulage out of Normanton, West Yorkshire. Nine pages covering services, fleet, gallery, careers and FAQ — with a quote-request flow, live WhatsApp dispatch, and a fleet showcase spanning rigids, curtain-siders, box trailers, refrigerated units, flatbed & Moffett, and light commercials. Built to convert freight enquiries, not just to look the part.",
    metrics: [
      { value: "40+", label: "Fleet Vehicles" },
      { value: "9", label: "Pages" },
      { value: "6", label: "Fleet Classes" },
    ],
    url: "256logisticsltd.co.uk",
    href: "https://256logisticsltd.co.uk",
    tags: ["Corporate Web", "Logistics", "Lead Generation", "UK Market"],
  },
  {
    id: "einstein",
    status: "live",
    sector: "Platforms & Systems",
    icon: Users,
    accent: STEEL,
    name: "Einstein Rising Canada",
    client: "Derek J Lobo · President",
    type: "Complete Organisation Management System",
    region: "Canada",
    description:
      "A comprehensive portal and public-facing website managing the full operational lifecycle of the organisation — member management, programme tracking, donor reporting, and administrative workflows, all integrated into one institutional-grade system.",
    metrics: [
      { value: "4", label: "Core Modules" },
      { value: "2", label: "Portal + Website" },
    ],
    url: "einsteinrisingcanada.org",
    href: "https://einsteinrisingcanada.org",
    tags: ["Organisation Portal", "Custom CMS", "Full-Stack"],
  },
  {
    id: "bunyonyi",
    status: "live",
    sector: "Platforms & Systems",
    icon: Hotel,
    accent: GOLD_LIGHT,
    name: "Bunyonyi Luxury Resort",
    client: "Precious · Resort Manager",
    type: "Premium Resort Website & Bookings Management",
    region: "Uganda",
    description:
      "A complete digital presence for one of Uganda's premier luxury resort destinations on Lake Bunyonyi. A visually striking website that captures the resort's premium identity, paired with a full bookings management system that transforms how the resort handles reservations.",
    metrics: [
      { value: "24/7", label: "Online Bookings" },
      { value: "2", label: "Integrated Systems" },
    ],
    url: "bunyonyiluxuryresort.com",
    href: "https://bunyonyiluxuryresort.com",
    tags: ["Hospitality Tech", "Bookings System", "Premium Web"],
  },
  {
    id: "simonsharp",
    status: "live",
    sector: "E-Commerce",
    icon: ShoppingBag,
    accent: STEEL,
    name: "Simon Sharp Products",
    client: "Simon Sharp · Founder",
    type: "Mini E-Commerce Platform",
    region: "United Kingdom",
    description:
      "A clean, high-performing online storefront for Simon Sharp's product brand. Full e-commerce functionality — product catalogue, cart, and checkout — delivered with a premium user experience that positions the brand alongside much larger players in the market.",
    metrics: [
      { value: "3", label: "Store Modules" },
      { value: "100%", label: "Mobile-First" },
    ],
    url: "simonsharpproducts.com",
    href: "https://simonsharpproducts.com",
    tags: ["E-Commerce", "Web Development", "UX Design"],
  },
  {
    id: "ambrosoli",
    status: "upcoming",
    sector: "E-Commerce",
    icon: ShoppingBag,
    accent: GOLD_LIGHT,
    name: "Ambrosoli Creations",
    client: "Ambrose · Founder",
    type: "Premium Handcraft E-Commerce Platform",
    region: "Uganda",
    description:
      "A flagship e-commerce platform for Ambrosoli Creations — makers of handcrafted premium bags. Built to carry the brand's artisanal identity into the digital space: custom product showcases, seamless checkout, and a shopping experience that honours the craft behind every piece.",
    metrics: [
      { value: "2026", label: "Launch Window" },
    ],
    url: "ambrosolicreations.com",
    href: "#",
    tags: ["E-Commerce", "Brand Experience", "Handcraft"],
  },
];

const FILTERS: ("All" | Sector)[] = ["All", "Platforms & Systems", "Corporate Web", "E-Commerce"];

/* ── Small parts ─────────────────────────────────────────────────────────── */

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

/* Mini product panel for the flagship card — the five FLEETS.HQ domains, live. */
const DOMAINS = [
  { icon: Users, label: "Drivers", detail: "Licence · CPC · Training" },
  { icon: Truck, label: "Vehicles", detail: "MOT · Inspections · Defects" },
  { icon: ShieldCheck, label: "Compliance", detail: "DVSA · Home Office" },
  { icon: Gauge, label: "Tachographs", detail: "Analysis · Alerts" },
  { icon: Wrench, label: "Maintenance", detail: "Workshop · PMI · Cost" },
];

function FleetsPanel({ active }: { active: boolean }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-carbon border border-white/8"
      style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.55)" }}
    >
      {/* chrome */}
      <div className="flex items-center justify-between gap-2 px-4 py-2.5 bg-graphite border-b border-white/5">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-4 h-4 flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(200,169,110,0.16)", border: `1px solid ${GOLD}55` }}
          >
            <span className="text-[6px] font-bold font-mono" style={{ color: GOLD }}>F</span>
          </div>
          <span className="text-[10px] text-platinum/70 font-mono truncate">FLEETS.HQ — Operator Console</span>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
          <span className="text-[9px] font-mono" style={{ color: GOLD_LIGHT }}>UK-HOSTED</span>
        </div>
      </div>

      {/* domain rows */}
      <div className="divide-y divide-white/5">
        {DOMAINS.map((d, i) => (
          <motion.div
            key={d.label}
            initial={{ opacity: 0, x: -8 }}
            animate={active ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.08 }}
            className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.02] transition-colors duration-200"
          >
            <d.icon size={12} style={{ color: `${GOLD}B0` }} className="flex-shrink-0" />
            <span className="text-[11px] text-softwhite/85 font-display tracking-wide w-20 sm:w-24 flex-shrink-0">
              {d.label}
            </span>
            {/* min-w-0 is what lets truncate engage inside a flex row */}
            <span className="text-[9px] text-platinum/45 font-mono truncate min-w-0 flex-1">
              {d.detail}
            </span>
            <span className="text-[8px] tracking-[0.15em] uppercase text-emerald-glow/80 flex-shrink-0">
              OK
            </span>
          </motion.div>
        ))}
      </div>

      {/* audit strip */}
      <div className="flex items-center gap-3 px-4 py-3 border-t border-white/5 bg-obsidian/60">
        <FileCheck size={12} style={{ color: GOLD }} className="flex-shrink-0" />
        <span className="text-[10px] text-platinum/60 font-mono flex-1 truncate min-w-0">
          Audit evidence pack
        </span>
        <span className="text-[10px] font-mono font-bold" style={{ color: GOLD }}>
          1-CLICK
        </span>
      </div>
    </div>
  );
}

/* ── Cards ───────────────────────────────────────────────────────────────── */

function ProjectLink({ p }: { p: Project }) {
  if (p.status !== "live") {
    return (
      <span className="text-xs text-platinum/50 font-display tracking-wider">
        {p.url} · Launching Soon
      </span>
    );
  }
  return (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs border-b pb-0.5 transition-all duration-200 hover:gap-2.5"
      style={{ color: p.accent, borderColor: `${p.accent}55` }}
    >
      {p.url}
      <ArrowUpRight size={12} />
    </a>
  );
}

// Static class strings so Tailwind can see them; 4-up folds to 2×2 on small screens.
const METRIC_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

function Metrics({ p, large = false }: { p: Project; large?: boolean }) {
  if (!p.metrics.length) return null;
  return (
    <div className={`grid gap-px bg-white/5 ${METRIC_COLS[p.metrics.length] ?? "grid-cols-2"}`}>
      {p.metrics.map((m) => (
        <div key={m.label} className="bg-graphite px-2 py-3 text-center group-hover:bg-carbon transition-colors duration-300">
          <div
            className="font-display font-bold leading-none mb-1.5"
            style={{ color: p.accent, fontSize: large ? "1.35rem" : "1.05rem" }}
          >
            {m.value}
          </div>
          <div className="text-platinum/45 text-[8px] uppercase tracking-[0.14em] leading-tight">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({ p, active }: { p: Project; active: boolean }) {
  const Icon = p.icon;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55 }}
      className="group relative min-w-0 md:col-span-2 bg-graphite hover:bg-carbon transition-colors duration-400 p-7 sm:p-10 md:p-14 overflow-hidden"
    >
      {/* flagship ambient wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse 55% 90% at 8% 40%, ${p.accent}0A 0%, transparent 68%)` }}
      />
      {/* animated top rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, ${p.accent}00, ${p.accent}70, ${p.accent}00)` }}
        animate={active ? { opacity: [0.35, 0.9, 0.35] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }} />

      <div className="relative z-10">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ border: `1px solid ${p.accent}45`, background: `${p.accent}0D` }}
            >
              <Icon size={15} style={{ color: p.accent }} />
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/35 border border-white/5 px-2 py-0.5">
              {p.region}
            </span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/35 border border-white/5 px-2 py-0.5">
              {p.sector}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-display px-2.5 py-1"
              style={{ color: p.accent, border: `1px solid ${p.accent}55`, background: `${p.accent}10` }}
            >
              <Star size={8} />
              Flagship Build
            </span>
            <StatusBadge status={p.status} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* copy */}
          <div className="lg:col-span-7 min-w-0">
            <h3
              className="font-display font-bold text-softwhite mb-1.5 leading-[1.05] tracking-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.1rem)" }}
            >
              {p.name}
            </h3>
            <div className="font-serif italic text-base mb-1" style={{ color: `${p.accent}D0` }}>
              {p.type}
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-platinum/45 font-display mb-6">
              {p.client} · Developed &amp; managed by ECADEL GROUP
            </div>

            <p className="text-platinum/72 text-sm leading-relaxed mb-8">{p.description}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.15em] uppercase text-platinum/45 border border-white/5 px-2 py-0.5 hover:border-white/15 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <ProjectLink p={p} />
          </div>

          {/* live panel */}
          <div className="lg:col-span-5 w-full min-w-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={active ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <FleetsPanel active={active} />
            </motion.div>
            <div className="mt-px">
              <Metrics p={p} large />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const Icon = p.icon;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      className={`group relative min-w-0 bg-graphite hover:bg-carbon transition-colors duration-400 p-7 sm:p-9 md:p-10 flex flex-col overflow-hidden ${
        p.status === "upcoming" ? "border-t-2 border-emerald-deep/40" : ""
      }`}
    >
      {/* hover wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse 70% 60% at 0% 0%, ${p.accent}08 0%, transparent 65%)` }}
      />
      {/* edge accents */}
      <div className="absolute top-0 left-0 w-px h-0 group-hover:h-full transition-all duration-500" style={{ background: p.accent }} />
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }} />

      <div className="relative z-10 flex flex-col flex-1">
        {/* header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ border: `1px solid ${p.accent}30`, background: `${p.accent}08` }}
            >
              <Icon size={13} style={{ color: `${p.accent}C0` }} />
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/30 border border-white/5 px-2 py-0.5">
              {p.region}
            </span>
          </div>
          <StatusBadge status={p.status} />
        </div>

        <h3 className="font-display font-bold text-softwhite text-xl mb-1 leading-tight tracking-tight group-hover:text-white transition-colors duration-200">
          {p.name}
        </h3>
        <div className="text-[10px] tracking-[0.18em] uppercase text-platinum/45 font-display mb-1">
          {p.client}
        </div>
        <div className="font-serif italic text-sm mb-5" style={{ color: `${p.accent}C0` }}>
          {p.type}
        </div>

        <p className="text-platinum/70 text-sm leading-relaxed mb-6">{p.description}</p>

        <div className="mt-auto space-y-6">
          <Metrics p={p} />

          <div className="flex flex-wrap gap-2">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.15em] uppercase text-platinum/42 border border-white/5 px-2 py-0.5 hover:border-white/15 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <ProjectLink p={p} />
        </div>
      </div>
    </motion.article>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export default function ClientProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<"All" | Sector>("All");

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.sector === filter)),
    [filter],
  );

  const summary = useMemo(() => {
    const regions = new Set(projects.map((p) => p.region));
    const live = projects.filter((p) => p.status === "live").length;
    return [
      { value: String(projects.length), label: "Client Projects" },
      { value: String(live), label: "Live in Production" },
      { value: String(regions.size), label: "Countries" },
      { value: String(FILTERS.length - 1), label: "Delivery Categories" },
    ];
  }, []);

  return (
    <section id="client-work" ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(200,169,110,0.04) 0%, transparent 70%)" }}
      />

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

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight"
          >
            Built for Clients.
            <br />
            <span style={{ color: GOLD }}>Built to Last.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/72 max-w-md text-sm leading-relaxed"
          >
            Every client project we deliver carries the same standard we apply to our own
            subsidiaries: precision engineering, premium design, and infrastructure that
            holds under real-world conditions — from UK haulage regulation to Ugandan
            public procurement.
          </motion.p>
        </div>

        {/* summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/5 mb-12 border border-white/5"
        >
          {summary.map((s) => (
            <div key={s.label} className="bg-graphite px-6 py-5">
              <div className="font-display font-bold text-2xl leading-none mb-2" style={{ color: GOLD }}>
                {s.value}
              </div>
              <div className="text-platinum/50 text-[9px] uppercase tracking-[0.18em]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center gap-2 mb-10"
          role="tablist"
          aria-label="Filter client projects by category"
        >
          {FILTERS.map((f) => {
            const isActive = filter === f;
            const count = f === "All" ? projects.length : projects.filter((p) => p.sector === f).length;
            return (
              <button
                key={f}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f)}
                className="relative px-4 py-2 text-[10px] tracking-[0.18em] uppercase font-display transition-colors duration-200"
                style={{
                  color: isActive ? GOLD : "rgba(200,196,190,0.5)",
                  border: `1px solid ${isActive ? `${GOLD}55` : "rgba(255,255,255,0.06)"}`,
                  background: isActive ? `${GOLD}0D` : "transparent",
                }}
              >
                {f}
                <span className="ml-2 text-platinum/30">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </motion.div>

        {/* grid */}
        <LayoutGroup>
          {/* Cards carry min-w-0 — without it grid items default to min-width:auto
              and a wide card pushes the track past the container on narrow screens. */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) =>
                p.featured ? (
                  <FeaturedCard key={p.id} p={p} active={inView} />
                ) : (
                  <ProjectCard key={p.id} p={p} i={i} />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}
