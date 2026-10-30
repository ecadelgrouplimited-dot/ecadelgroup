"use client";

import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence, LayoutGroup } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight, Clock, Star, ShoppingBag, Building2, Truck,
  Landmark, Hotel, Layers, ShieldCheck, Users,
  Maximize2, X, ChevronLeft, ChevronRight, Sparkles,
  Terminal, CheckCircle2, Radio, Lock, Eye, ArrowRight,
} from "lucide-react";

/* ── Palette — disciplined: gold for flagship, light-gold / steel alternating ── */
const GOLD = "#C8A96E";
const GOLD_LIGHT = "#D4B97E";
const STEEL = "#8BA7C7";

type Sector = "Platforms & Systems" | "Hospitality & Security" | "Corporate Web" | "E-Commerce";

type ScreenShot = {
  src: string;
  label: string;
  badge: string;
  caption: string;
  width: number;
  height: number;
};

type Project = {
  id: string;
  status: "live" | "upcoming";
  featured?: boolean;
  badgeLabel?: string;
  sector: Sector;
  icon: typeof Building2;
  accent: string;
  name: string;
  client: string;
  type: string;
  region: string;
  description: string;
  deliverables: string[];
  metrics: { value: string; label: string }[];
  url: string;
  href: string;
  tags: string[];
  screenshots?: ScreenShot[];
  customVisual?: "neptune";
};

const FLEETSHQ_SCREENS: ScreenShot[] = [
  {
    src: "/assets/projects/fleetshq-dashboard.webp",
    label: "Command Center",
    badge: "SUPER ADMIN · LIVE",
    caption:
      "Unified Executive Dashboard — real-time DVSA (92%) and Home Office (96%) compliance rings, live UK GPS vehicle tracking, 30-day statutory expiry horizon, and sponsored worker visa oversight.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-competency.webp",
    label: "Competency Matrix",
    badge: "DVSA & LEGAL",
    caption:
      "Role-by-role legal competency matrix spanning Driving & Licensing (HGV, CPC Mod 1/2, Tacho), Health & Safety, Vehicle & Equipment, and ADR/WTD statutory compliance.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-training.webp",
    label: "Training & CPC",
    badge: "DRIVER CPC · JAUPT",
    caption:
      "Driver CPC and mandatory training command center — tracking completion rates across HGV Driver CPC, Tachograph Awareness, Drivers' Hours (WTD), and upcoming scheduled modules.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-schedule.webp",
    label: "Training Plan",
    badge: "GANTT SCHEDULE",
    caption:
      "Interactive quarterly training schedule and compliance timeline — visualising planned, in-progress, and completed statutory courses across all operating centres.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-rtw.webp",
    label: "Right to Work",
    badge: "HOME OFFICE AUDIT",
    caption:
      "Sponsor Licence & Right to Work verification vault — Biometric Residence Permit (BRP) and Driver Qualification Card inspection with automated 30-day renewal alerts.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-medical.webp",
    label: "Medical & Fitness",
    badge: "DVLA GROUP 2",
    caption:
      "DVLA Group 2 fitness-to-drive monitoring — tracking driver medical examinations, vision & hearing checks, drug & alcohol screening, and declared health conditions.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-drivers.webp",
    label: "Drivers Console",
    badge: "FLEET ROSTER",
    caption:
      "Live HGV driver directory with instant side-panel inspection of licence entitlements, CPC expiry countdowns, digital tachograph cards, and daily walkaround activity.",
    width: 1905,
    height: 1080,
  },
  {
    src: "/assets/projects/fleetshq-hr.webp",
    label: "Employment & HR",
    badge: "HR & CONTRACTS",
    caption:
      "Full workforce & HR lifecycle management — 61 active staff across HGV drivers, workshop, and management with contract renewal tracking and probation governance.",
    width: 1905,
    height: 1080,
  },
];

const REBERON_HOTEL_SCREENS: ScreenShot[] = [
  {
    src: "/assets/projects/reberon-hotel-hero.webp",
    label: "Highland Sanctuary Web",
    badge: "PUBLIC LUXURY SITE",
    caption:
      "\"Sanctuary on the Slopes of Elgon\" — bespoke editorial web experience for Reberon Hotel in Kapchorwa (1,900m ASL), crafted to convert high-value international and domestic stays.",
    width: 1905,
    height: 988,
  },
  {
    src: "/assets/projects/reberon-hms-overview.webp",
    label: "The House · HMS Console",
    badge: "HOTEL OS · OWNER VIEW",
    caption:
      "\"Reberon — The House\" Modern Hotel Management System: real-time command over Reservations, Front Desk, Walk-Ins, POS Terminal, Room Rack, 9 Cost Centers, and Waitlist analytics.",
    width: 1918,
    height: 1080,
  },
  {
    src: "/assets/projects/reberon-hotel-concierge.webp",
    label: "Sipi AI Concierge",
    badge: "AI HIGHLAND HOST",
    caption:
      "Conversational AI Highland Host & Booking Engine — generates multi-day event and conference quotations, calculates live stay estimates (UGX/USD), and locks rates for 48 hours.",
    width: 1856,
    height: 996,
  },
  {
    src: "/assets/projects/reberon-hms-pos.webp",
    label: "Multi-Outlet POS & KDS",
    badge: "KITCHEN · BAR · SPA",
    caption:
      "Fast-order hospitality Point of Sale spanning Highland Kitchen & Dining, The Ridge Bar, Health Club & Spa, and Conference — with KDS queue, room folio posting, and 80mm thermal KOT printing.",
    width: 1918,
    height: 1080,
  },
  {
    src: "/assets/projects/reberon-hms-inbox.webp",
    label: "Unified Guest Inbox",
    badge: "OMNICHANNEL CRM",
    caption:
      "Multi-channel guest communications hub unifying website enquiries, email threads, and direct WhatsApp escalation with one-click conversion to confirmed reservations.",
    width: 1918,
    height: 1080,
  },
  {
    src: "/assets/projects/reberon-hotel-weather.webp",
    label: "Live Ridge Telemetry",
    badge: "1,920M ASL · LIVE",
    caption:
      "\"Right now on the ridge\" — live Open-Meteo highland weather station, solar arc tracker, temperature differential vs. Kampala, and 3-day mountain forecast integrated into the guest journey.",
    width: 1905,
    height: 988,
  },
];

const projects: Project[] = [
  {
    id: "fleetshq",
    status: "live",
    featured: true,
    badgeLabel: "Flagship Platform Build",
    sector: "Platforms & Systems",
    icon: Layers,
    accent: GOLD,
    name: "FLEETS.HQ",
    client: "256 Logistics Ltd · UK Licensed Operator",
    type: "The Operating System for Transport Companies",
    region: "United Kingdom",
    description:
      "What began as a compliance hub for a single licensed haulier is now a full transport operating platform — designed, engineered, and managed by ECADEL GROUP. FLEETS.HQ runs five integrated domains across drivers, vehicles, compliance, tachographs, and maintenance, then layers dispatch, proof-of-delivery, invoicing, and settlement on top. It protects an Operator's Licence (DVSA) and a Sponsor Licence (Home Office) simultaneously — watching every licence, CPC, MOT, visa, and right-to-work check in real time and flagging risk before it becomes a violation.",
    deliverables: [
      "10 Role-Based Operator & Driver Portals",
      "Real-Time DVSA & Home Office Compliance Engine",
      "Live UK GPS Fleet Tracking & Defect Workflows",
      "1-Click Statutory Audit Evidence Pack Generator",
    ],
    metrics: [
      { value: "5", label: "Operating Domains" },
      { value: "10", label: "Role Panels" },
      { value: "98%", label: "Audit Readiness" },
      { value: "24/7", label: "Live Monitoring" },
    ],
    url: "fleetshq.com",
    href: "https://fleetshq.com",
    tags: ["Transport SaaS", "RegTech", "DVSA Compliance", "Home Office RTW", "Tachograph Analysis", "Multi-Tenant"],
    screenshots: FLEETSHQ_SCREENS,
  },
  {
    id: "reberonhotel",
    status: "live",
    featured: true,
    badgeLabel: "Luxury Web + Full Hotel OS",
    sector: "Hospitality & Security",
    icon: Hotel,
    accent: GOLD_LIGHT,
    name: "Reberon Hotel & \"The House\" HMS",
    client: "Denis Mayamba · Owner & Managing Director",
    type: "Luxury Highland Website, AI Concierge & Modern Hotel Management System",
    region: "Uganda · Mount Elgon",
    description:
      "A complete hospitality technology ecosystem engineered for Reberon Hotel at 1,900m on the slopes of Mount Elgon in Kapchorwa. Externally, an editorial luxury web platform with live ridge weather telemetry and 'Sipi Concierge' — an AI highland host that answers guest questions, builds custom event quotations, and locks room rates for 48 hours. Internally, 'Reberon — The House': a custom full-stack Hotel Management System powering Reservations, Front Desk, Room Rack, Housekeeping, a Multi-Outlet Point of Sale (Kitchen, Ridge Bar, Spa & Conference with KDS and 80mm thermal KOT printing), unified WhatsApp/Email Guest Inbox, and 9-cost-center HR & Payroll.",
    deliverables: [
      "Editorial Luxury Website & Live 1,900m Ridge Telemetry",
      "Sipi AI Concierge & 48-Hour Rate-Lock Booking Engine",
      "'The House' Property Management System (Front Desk & Room Rack)",
      "Multi-Outlet Kitchen/Bar POS, KDS & Omnichannel Guest Inbox",
    ],
    metrics: [
      { value: "9", label: "Hotel Cost Centers" },
      { value: "4", label: "POS & KDS Outlets" },
      { value: "AI", label: "Sipi Concierge Host" },
      { value: "2-in-1", label: "Web + Full HMS" },
    ],
    url: "reberonhotel.com",
    href: "https://reberonhotel.com",
    tags: ["Hospitality OS", "Hotel Management System", "AI Concierge", "Point of Sale & KDS", "Omnichannel CRM", "Luxury Web"],
    screenshots: REBERON_HOTEL_SCREENS,
  },
  {
    id: "neptuneguards",
    status: "live",
    featured: true,
    badgeLabel: "Website + Operations Admin Panel",
    sector: "Hospitality & Security",
    icon: ShieldCheck,
    accent: STEEL,
    name: "Neptune Guards Ltd",
    client: "Edwin Rwensiisira · Director",
    type: "Private Security Corporate Platform & Operations Admin Panel",
    region: "Uganda · Kampala",
    description:
      "A high-authority digital command presence and custom operations admin panel built for Neptune Guards Ltd — a licensed private security force headquartered in Luzira, Kampala and operating since 2019. The public platform showcases six core security divisions (Armed & Unarmed Guarding, Quick Reaction Alarm Response, Electronic Security & CCTV, Armed VIP Escort, K-9 Guard Dog Units, and Licensed Investigations) with transparent pricing tiers and instant deployment quote flows. Paired with a dedicated administrative control panel for managing guard deployments, client inquiries, patrol inspection logs, and service operations.",
    deliverables: [
      "High-Conversion Security Corporate Website",
      "Operations & Guard Deployment Admin Panel",
      "Transparent Guarding Rate Calculator & Quote Engine",
      "6-Division Security Capability & Compliance Showcase",
    ],
    metrics: [
      { value: "6", label: "Security Divisions" },
      { value: "24/7", label: "QRT & Patrol Ops" },
      { value: "2", label: "Web + Admin Panel" },
      { value: "100%", label: "Vetted Force" },
    ],
    url: "neptuneguards.com",
    href: "https://neptuneguards.com",
    tags: ["Security Tech", "Admin Control Panel", "Corporate Platform", "Lead Conversion", "Operations Portal"],
    customVisual: "neptune",
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
      "A procurement-grade digital presence for one of Uganda's established construction and civil engineering firms — trading since 2010 and delivering for district governments, ministries, and international donors. Eight structured sections carry the full weight of the business: live and completed project portfolio, service capability, plant and equipment inventory, compliance documentation, and a downloadable company profile built for procurement officers who need evidence, not marketing.",
    deliverables: [
      "PPDA Procurement-Ready Digital Dossier",
      "30+ Civil & Building Project Portfolio",
      "Plant & Heavy Equipment Inventory System",
    ],
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
      "The public face of a licensed UK freight operator running domestic and European haulage out of Normanton, West Yorkshire. Nine pages covering services, fleet, gallery, careers, and FAQ — with a quote-request flow, live WhatsApp dispatch, and a fleet showcase spanning rigids, curtain-siders, box trailers, refrigerated units, flatbed & Moffett, and light commercials. Built to convert freight enquiries, not just to look the part.",
    deliverables: [
      "6-Class UK & European Fleet Showcase",
      "Instant Freight Quote & WhatsApp Dispatch",
      "Driver Careers & Operator Compliance Hub",
    ],
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
    deliverables: [
      "Member & Stakeholder Management Portal",
      "Programme Tracking & Impact Analytics",
      "Integrated Public Website & Custom CMS",
    ],
    metrics: [
      { value: "4", label: "Core Modules" },
      { value: "2", label: "Portal + Website" },
      { value: "100%", label: "Cloud Managed" },
    ],
    url: "einsteinrisingcanada.org",
    href: "https://einsteinrisingcanada.org",
    tags: ["Organisation Portal", "Custom CMS", "Full-Stack"],
  },
  {
    id: "bunyonyi",
    status: "live",
    sector: "Hospitality & Security",
    icon: Hotel,
    accent: GOLD_LIGHT,
    name: "Bunyonyi Luxury Resort",
    client: "Precious · Resort Manager",
    type: "Premium Resort Website & Bookings Management",
    region: "Uganda",
    description:
      "A complete digital presence for one of Uganda's premier luxury resort destinations on Lake Bunyonyi. A visually striking website that captures the resort's premium identity, paired with a full bookings management system that transforms how the resort handles reservations.",
    deliverables: [
      "Luxury Lakefront Digital Experience",
      "24/7 Direct Online Reservation Engine",
      "Back-Office Bookings & Room Availability Console",
    ],
    metrics: [
      { value: "24/7", label: "Online Bookings" },
      { value: "2", label: "Integrated Systems" },
      { value: "0%", label: "OTA Commission" },
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
    deliverables: [
      "High-Conversion Product Catalogue & Storefront",
      "Seamless Cart & Checkout Pipeline",
      "Inventory & Order Fulfilment Dashboard",
    ],
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
    deliverables: [
      "Artisanal Lookbook & Product Customiser",
      "Mobile Money & International Card Checkout",
      "Craft Provenance & Story Architecture",
    ],
    metrics: [
      { value: "2026", label: "Launch Window" },
      { value: "Global", label: "Shipping Ready" },
    ],
    url: "ambrosolicreations.com",
    href: "#contact",
    tags: ["E-Commerce", "Brand Experience", "Handcraft"],
  },
];

const FILTERS: ("All" | Sector)[] = [
  "All",
  "Platforms & Systems",
  "Hospitality & Security",
  "Corporate Web",
  "E-Commerce",
];

/* ── Small parts ─────────────────────────────────────────────────────────── */

function StatusBadge({ status }: { status: "live" | "upcoming" }) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-display text-emerald-glow border border-emerald-deep/30 bg-emerald-deep/5 px-2.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
        Live in Production
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

/* ── Neptune Guards Interactive Dual-System Preview (Web + Admin Panel) ──── */

function NeptuneGuardsShowcase({ accent }: { accent: string }) {
  const [tab, setTab] = useState<"admin" | "web">("admin");

  return (
    <div
      className="relative w-full overflow-hidden bg-obsidian border border-white/10"
      style={{ boxShadow: "0 24px 70px rgba(0,0,0,0.65)" }}
    >
      {/* Top chrome */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 bg-graphite border-b border-white/8">
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="w-4 h-4 flex items-center justify-center flex-shrink-0"
            style={{ background: `${accent}20`, border: `1px solid ${accent}55` }}
          >
            <ShieldCheck size={10} style={{ color: accent }} />
          </div>
          <span className="text-[10px] text-softwhite/80 font-mono truncate">
            {tab === "admin"
              ? "neptuneguards.com/admin — Operations & Deployment Console"
              : "neptuneguards.com — Public Security & Quote Portal"}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-obsidian/80 p-0.5 border border-white/8">
          <button
            type="button"
            onClick={() => setTab("admin")}
            className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider transition-all duration-200"
            style={{
              background: tab === "admin" ? `${accent}22` : "transparent",
              color: tab === "admin" ? "#F0EDE6" : "rgba(200,196,190,0.5)",
              border: tab === "admin" ? `1px solid ${accent}50` : "1px solid transparent",
            }}
          >
            Admin Panel
          </button>
          <button
            type="button"
            onClick={() => setTab("web")}
            className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider transition-all duration-200"
            style={{
              background: tab === "web" ? `${accent}22` : "transparent",
              color: tab === "web" ? "#F0EDE6" : "rgba(200,196,190,0.5)",
              border: tab === "web" ? `1px solid ${accent}50` : "1px solid transparent",
            }}
          >
            Public Website
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "admin" ? (
          <motion.div
            key="admin"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="p-4 sm:p-5 space-y-4"
          >
            {/* KPI row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: "Active Posts", val: "48", sub: "Kampala & Central", color: GOLD },
                { label: "Hourly Check-Ins", val: "99.4%", sub: "Radio & Supervisor", color: "#5EC28A" },
                { label: "QRT Units Ready", val: "6", sub: "< 8 min dispatch", color: accent },
                { label: "Quote Requests", val: "14", sub: "3 pending review", color: GOLD_LIGHT },
              ].map((k) => (
                <div key={k.label} className="bg-carbon/90 border border-white/6 p-2.5">
                  <div className="text-[8px] font-mono uppercase tracking-wider text-platinum/45 mb-1">
                    {k.label}
                  </div>
                  <div className="font-mono font-bold text-base leading-none" style={{ color: k.color }}>
                    {k.val}
                  </div>
                  <div className="text-[8px] text-platinum/50 mt-1 truncate">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Deployment & Service Divisions table */}
            <div className="border border-white/6 bg-carbon/60 divide-y divide-white/5">
              <div className="px-3.5 py-2 flex items-center justify-between bg-graphite/70">
                <span className="text-[9px] font-mono uppercase tracking-[0.18em] text-platinum/60">
                  Live Security Divisions &amp; Deployment Matrix
                </span>
                <span className="inline-flex items-center gap-1.5 text-[8px] font-mono text-emerald-glow">
                  <Radio size={9} className="animate-pulse" /> LUZIRA HQ COMMAND
                </span>
              </div>
              {[
                { div: "Armed & Unarmed Guarding", spec: "Police-vetted · 1-mo training · Hourly check-ins", rate: "UGX 500k–600k/mo", status: "ACTIVE" },
                { div: "Quick Reaction Force (QRT)", spec: "24/7 Intruder alarm rapid response units", rate: "Instant Dispatch", status: "STANDBY" },
                { div: "Electronic Security & CCTV", spec: "Surveillance design, supply & alarm integration", rate: "Site Survey", status: "ACTIVE" },
                { div: "VIP Escort & K-9 Section", spec: "High-value transit escort & trained guard dogs", rate: "Custom Deployment", status: "ACTIVE" },
              ].map((row) => (
                <div key={row.div} className="px-3.5 py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="min-w-0">
                    <div className="text-[11px] font-display font-medium text-softwhite/90 truncate">
                      {row.div}
                    </div>
                    <div className="text-[9px] text-platinum/45 font-mono truncate">{row.spec}</div>
                  </div>
                  <div className="flex items-center gap-2.5 flex-shrink-0">
                    <span className="hidden sm:inline text-[9px] font-mono text-platinum/60">{row.rate}</span>
                    <span
                      className="text-[8px] font-mono px-2 py-0.5 border"
                      style={{
                        color: GOLD,
                        borderColor: "rgba(200,169,110,0.3)",
                        background: "rgba(200,169,110,0.08)",
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="web"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="p-5 sm:p-6 bg-gradient-to-br from-obsidian via-carbon to-graphite"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-emerald-glow border border-emerald-deep/30 px-2.5 py-0.5">
                EST. 2019 · PLOT 11 TUCKER CRESCENT, LUZIRA
              </span>
              <span className="text-[9px] font-mono text-platinum/50">Licensed by Uganda Police</span>
            </div>
            <h4 className="font-display font-bold text-xl sm:text-2xl text-softwhite leading-snug mb-2">
               disciplined Protection for Enterprises, Estates &amp; Institutions.
            </h4>
            <p className="text-platinum/65 text-xs leading-relaxed mb-5">
              Vetted, fingerprinted, and rigorously trained security personnel backed by 24/7 command supervision, CCTV &amp; intruder alarm engineering, K-9 units, and rapid alarm response.
            </p>
            <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
              <div className="bg-obsidian/80 border border-white/8 p-3.5">
                <div className="text-[9px] font-mono uppercase tracking-wider text-platinum/50">
                  Armed Security Officer
                </div>
                <div className="font-display font-bold text-base text-softwhite mt-1">
                  UGX 600,000 <span className="text-[10px] font-normal text-platinum/45">/ guard / mo</span>
                </div>
                <div className="text-[9px] text-emerald-glow/80 font-mono mt-1">
                  ✓ Full kit · Hourly radio check-in · Supervisor parade
                </div>
              </div>
              <div className="bg-obsidian/80 border border-white/8 p-3.5">
                <div className="text-[9px] font-mono uppercase tracking-wider text-platinum/50">
                  Unarmed Security Officer
                </div>
                <div className="font-display font-bold text-base text-softwhite mt-1">
                  UGX 500,000 <span className="text-[10px] font-normal text-platinum/45">/ guard / mo</span>
                </div>
                <div className="text-[9px] text-emerald-glow/80 font-mono mt-1">
                  ✓ Vetted &amp; trained · Baton, cuffs &amp; whistle · 24/7 QRT backup
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Interactive Real-Screenshot Gallery for Flagship Projects ────────────── */

function InteractiveScreenGallery({
  project,
  onOpenLightbox,
}: {
  project: Project;
  onOpenLightbox: (project: Project, index: number) => void;
}) {
  const screens = project.screenshots ?? [];
  const [activeIdx, setActiveIdx] = useState(0);

  if (!screens.length) return null;
  const current = screens[activeIdx] ?? screens[0];

  const prev = () => setActiveIdx((i) => (i === 0 ? screens.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i === screens.length - 1 ? 0 : i + 1));

  return (
    <div className="w-full min-w-0">
      {/* Browser/App Frame */}
      <div
        className="relative w-full overflow-hidden bg-obsidian border border-white/10 group/frame"
        style={{ boxShadow: "0 28px 80px rgba(0,0,0,0.68)" }}
      >
        {/* Top window bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 bg-graphite border-b border-white/8">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex gap-1.5 flex-shrink-0">
              <span className="w-2 h-2 rounded-full bg-red-500/50" />
              <span className="w-2 h-2 rounded-full bg-amber-400/50" />
              <span className="w-2 h-2 rounded-full bg-emerald-400/50" />
            </div>
            <span className="text-[10px] text-platinum/65 font-mono truncate ml-1.5">
              {project.url} — <span className="text-softwhite/90">{current.label}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="hidden sm:inline-block text-[8px] font-mono tracking-[0.16em] uppercase px-2 py-0.5 border"
              style={{
                color: project.accent,
                borderColor: `${project.accent}45`,
                background: `${project.accent}12`,
              }}
            >
              {current.badge}
            </span>
            <button
              type="button"
              onClick={() => onOpenLightbox(project, activeIdx)}
              className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider text-platinum/70 hover:text-softwhite bg-white/5 hover:bg-white/10 border border-white/10 px-2 py-1 transition-colors"
              aria-label={`Inspect ${project.name} ${current.label} in full screen`}
            >
              <Maximize2 size={10} />
              <span className="hidden sm:inline">Expand</span>
            </button>
          </div>
        </div>

        {/* Main Cropped Screenshot Viewport */}
        <div
          onClick={() => onOpenLightbox(project, activeIdx)}
          className="relative w-full aspect-[16/9] bg-obsidian overflow-hidden cursor-zoom-in"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full"
            >
              <Image
                src={current.src}
                alt={`${project.name} — ${current.label}`}
                width={current.width}
                height={current.height}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/frame:scale-[1.015]"
                priority={activeIdx === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Subtle bottom vignette + hover zoom pill */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-obsidian/80 via-obsidian/20 to-transparent pointer-events-none" />

          <div className="absolute bottom-3 right-3 opacity-0 group-hover/frame:opacity-100 transition-opacity duration-200 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-display uppercase tracking-[0.16em] bg-obsidian/90 text-emerald-glow border border-emerald-deep/50 backdrop-blur-md">
              <Eye size={11} /> Click to Inspect High-Res ({activeIdx + 1}/{screens.length})
            </span>
          </div>

          {/* Left / Right quick arrows on image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous system screen"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-white/15 text-softwhite/80 hover:text-emerald-glow hover:border-emerald-deep/60 transition-all opacity-80 sm:opacity-0 group-hover/frame:opacity-100"
          >
            <ChevronLeft size={15} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next system screen"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-obsidian/80 border border-white/15 text-softwhite/80 hover:text-emerald-glow hover:border-emerald-deep/60 transition-all opacity-80 sm:opacity-0 group-hover/frame:opacity-100"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Active Screen Caption Bar */}
        <div className="px-4 py-3 bg-graphite/95 border-t border-white/8 flex items-start justify-between gap-4">
          <p className="text-[11px] text-platinum/75 leading-relaxed">
            <span className="font-mono text-softwhite font-semibold mr-2">
              {String(activeIdx + 1).padStart(2, "0")}/{String(screens.length).padStart(2, "0")} · {current.label}:
            </span>
            {current.caption}
          </p>
        </div>

        {/* Interactive Module Switcher Strip */}
        <div className="px-3 py-2.5 bg-obsidian border-t border-white/6 flex flex-wrap items-center gap-1.5">
          {screens.map((sc, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={sc.src}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className="px-2.5 py-1.5 text-[9px] font-mono tracking-wider uppercase transition-all duration-200 flex items-center gap-1.5"
                style={{
                  color: isSelected ? "#060608" : "rgba(200,196,190,0.68)",
                  background: isSelected ? project.accent : "rgba(255,255,255,0.03)",
                  border: `1px solid ${isSelected ? project.accent : "rgba(255,255,255,0.07)"}`,
                  fontWeight: isSelected ? 700 : 500,
                }}
              >
                <span className={isSelected ? "opacity-80" : "opacity-45"}>
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span>{sc.label}</span>
              </button>
            );
          })}
        </div>
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
      className="inline-flex items-center gap-2 text-xs font-display tracking-wider uppercase px-4 py-2.5 border transition-all duration-200 hover:gap-3"
      style={{
        color: "#060608",
        background: p.accent,
        borderColor: p.accent,
        fontWeight: 600,
      }}
    >
      Visit {p.url}
      <ArrowUpRight size={13} />
    </a>
  );
}

const METRIC_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
};

function Metrics({ p, large = false }: { p: Project; large?: boolean }) {
  if (!p.metrics.length) return null;
  return (
    <div className={`grid gap-px bg-white/8 border border-white/8 ${METRIC_COLS[p.metrics.length] ?? "grid-cols-2"}`}>
      {p.metrics.map((m) => (
        <div key={m.label} className="bg-graphite px-3 py-3.5 text-center group-hover:bg-carbon transition-colors duration-300">
          <div
            className="font-display font-bold leading-none mb-1.5"
            style={{ color: p.accent, fontSize: large ? "1.35rem" : "1.1rem" }}
          >
            {m.value}
          </div>
          <div className="text-platinum/55 text-[8px] uppercase tracking-[0.14em] leading-tight">
            {m.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturedCard({
  p,
  active,
  onOpenLightbox,
}: {
  p: Project;
  active: boolean;
  onOpenLightbox: (project: Project, index: number) => void;
}) {
  const Icon = p.icon;
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55 }}
      className="group relative min-w-0 md:col-span-2 bg-graphite hover:bg-carbon/90 transition-colors duration-400 p-6 sm:p-10 md:p-12 overflow-hidden"
    >
      {/* flagship ambient wash */}
      <div
        className="absolute inset-0 pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(ellipse 55% 90% at 8% 40%, ${p.accent}0C 0%, transparent 68%)` }}
      />
      {/* animated top rule */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, ${p.accent}00, ${p.accent}80, ${p.accent}00)` }}
        animate={active ? { opacity: [0.35, 0.95, 0.35] } : {}}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <div
        className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700"
        style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }}
      />

      <div className="relative z-10">
        {/* header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <div
              className="w-9 h-9 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ border: `1px solid ${p.accent}45`, background: `${p.accent}12` }}
            >
              <Icon size={15} style={{ color: p.accent }} />
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/55 border border-white/8 px-2.5 py-1">
              {p.region}
            </span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/55 border border-white/8 px-2.5 py-1">
              {p.sector}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase font-display px-2.5 py-1"
              style={{ color: p.accent, border: `1px solid ${p.accent}55`, background: `${p.accent}12` }}
            >
              <Star size={8} />
              {p.badgeLabel ?? "Flagship Build"}
            </span>
            <StatusBadge status={p.status} />
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: copy + architecture deliverables */}
          <div className="lg:col-span-5 min-w-0 flex flex-col">
            <h3
              className="font-display font-bold text-softwhite mb-1.5 leading-[1.08] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.65rem)" }}
            >
              {p.name}
            </h3>
            <div className="font-serif italic text-base mb-1" style={{ color: `${p.accent}E0` }}>
              {p.type}
            </div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-platinum/55 font-display mb-5">
              {p.client} · Engineered by ECADEL GROUP
            </div>

            <p className="text-platinum/75 text-sm leading-relaxed mb-6">{p.description}</p>

            {/* Key Engineered Deliverables */}
            <div className="border border-white/8 bg-obsidian/50 p-4 mb-6">
              <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-glow mb-2.5 flex items-center gap-1.5">
                <Terminal size={10} /> What We Engineered &amp; Delivered
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-2">
                {p.deliverables.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs text-softwhite/85">
                    <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0" style={{ color: p.accent }} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-7">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] tracking-[0.14em] uppercase text-platinum/55 border border-white/8 px-2 py-0.5 hover:border-white/20 transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <ProjectLink p={p} />
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs text-platinum/70 hover:text-softwhite border-b border-white/15 hover:border-emerald-deep pb-0.5 transition-colors"
              >
                Request a Similar System <ArrowRight size={12} />
              </a>
            </div>
          </div>

          {/* Right: Interactive Live Screenshot Showcase or Custom System Console */}
          <div className="lg:col-span-7 w-full min-w-0 space-y-3">
            {p.screenshots && p.screenshots.length > 0 ? (
              <InteractiveScreenGallery project={p} onOpenLightbox={onOpenLightbox} />
            ) : p.customVisual === "neptune" ? (
              <NeptuneGuardsShowcase accent={p.accent} />
            ) : null}
            <Metrics p={p} large />
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
        style={{ background: `radial-gradient(ellipse 70% 60% at 0% 0%, ${p.accent}0A 0%, transparent 65%)` }}
      />
      {/* edge accents */}
      <div className="absolute top-0 left-0 w-px h-0 group-hover:h-full transition-all duration-500" style={{ background: p.accent }} />
      <div className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(to right, ${p.accent}, transparent)` }} />

      <div className="relative z-10 flex flex-col flex-1">
        {/* header */}
        <div className="flex items-start justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div
              className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-105"
              style={{ border: `1px solid ${p.accent}35`, background: `${p.accent}10` }}
            >
              <Icon size={13} style={{ color: `${p.accent}D0` }} />
            </div>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/50 border border-white/8 px-2 py-0.5">
              {p.region}
            </span>
            <span className="text-[9px] tracking-[0.15em] uppercase text-platinum/40 border border-white/5 px-2 py-0.5">
              {p.sector}
            </span>
          </div>
          <StatusBadge status={p.status} />
        </div>

        <h3 className="font-display font-bold text-softwhite text-xl mb-1 leading-tight tracking-tight group-hover:text-white transition-colors duration-200">
          {p.name}
        </h3>
        <div className="text-[10px] tracking-[0.18em] uppercase text-platinum/50 font-display mb-1">
          {p.client}
        </div>
        <div className="font-serif italic text-sm mb-4" style={{ color: `${p.accent}D0` }}>
          {p.type}
        </div>

        <p className="text-platinum/72 text-sm leading-relaxed mb-5">{p.description}</p>

        {/* Deliverables mini list */}
        <div className="border-t border-white/6 pt-4 mb-6 space-y-1.5">
          {p.deliverables.map((d) => (
            <div key={d} className="flex items-center gap-2 text-xs text-platinum/70">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: p.accent }} />
              <span>{d}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-5">
          <Metrics p={p} />

          <div className="flex flex-wrap gap-1.5">
            {p.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[0.15em] uppercase text-platinum/48 border border-white/6 px-2 py-0.5 hover:border-white/15 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            {p.status === "live" ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-display tracking-wider uppercase border-b pb-0.5 transition-all duration-200 hover:gap-2.5"
                style={{ color: p.accent, borderColor: `${p.accent}55` }}
              >
                {p.url}
                <ArrowUpRight size={12} />
              </a>
            ) : (
              <span className="text-xs text-platinum/50 font-display tracking-wider">
                {p.url} · Launching Soon
              </span>
            )}
            <a
              href="#contact"
              className="text-[10px] font-display uppercase tracking-[0.16em] text-platinum/50 hover:text-emerald-glow transition-colors"
            >
              Build Similar →
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Full-Screen Lightbox Modal ──────────────────────────────────────────── */

function LightboxModal({
  state,
  onClose,
  onSelectIndex,
}: {
  state: { project: Project; index: number } | null;
  onClose: () => void;
  onSelectIndex: (idx: number) => void;
}) {
  const screens = state?.project.screenshots ?? [];
  const current = screens[state?.index ?? 0];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!state || !screens.length) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onSelectIndex(state.index === 0 ? screens.length - 1 : state.index - 1);
      }
      if (e.key === "ArrowRight") {
        onSelectIndex(state.index === screens.length - 1 ? 0 : state.index + 1);
      }
    },
    [state, screens.length, onClose, onSelectIndex],
  );

  useEffect(() => {
    if (!state) return;
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state, handleKeyDown]);

  return (
    <AnimatePresence>
      {state && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[10000] bg-obsidian/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label={`${state.project.name} — ${current.label} screen inspector`}
          onClick={onClose}
        >
          {/* Top Bar */}
          <div
            className="max-w-7xl w-full mx-auto flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 border"
                style={{
                  color: state.project.accent,
                  borderColor: `${state.project.accent}50`,
                  background: `${state.project.accent}15`,
                }}
              >
                {state.project.name}
              </span>
              <span className="text-sm font-display font-semibold text-softwhite">
                {current.label}
              </span>
              <span className="hidden sm:inline text-xs font-mono text-platinum/50">
                ({state.index + 1} of {screens.length})
              </span>
            </div>

            <div className="flex items-center gap-3">
              {state.project.status === "live" && (
                <a
                  href={state.project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-display uppercase tracking-wider px-3.5 py-1.5 bg-emerald-deep text-obsidian font-semibold hover:bg-emerald-glow transition-colors"
                >
                  Open {state.project.url} <ArrowUpRight size={13} />
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                aria-label="Close screen inspector"
                className="w-9 h-9 flex items-center justify-center border border-white/15 text-platinum/75 hover:text-softwhite hover:border-emerald-deep transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Center Image */}
          <div
            className="relative max-w-7xl w-full mx-auto my-4 flex-1 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full border border-white/12 bg-carbon shadow-2xl overflow-hidden">
              <Image
                src={current.src}
                alt={`${state.project.name} — ${current.label}`}
                width={current.width}
                height={current.height}
                sizes="100vw"
                className="w-full h-auto max-h-[72vh] object-contain mx-auto"
                priority
              />
            </div>

            {/* Prev / Next buttons */}
            <button
              type="button"
              onClick={() =>
                onSelectIndex(state.index === 0 ? screens.length - 1 : state.index - 1)
              }
              aria-label="Previous screen"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-obsidian/90 border border-white/20 text-softwhite hover:border-emerald-deep hover:text-emerald-glow transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() =>
                onSelectIndex(state.index === screens.length - 1 ? 0 : state.index + 1)
              }
              aria-label="Next screen"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center bg-obsidian/90 border border-white/20 text-softwhite hover:border-emerald-deep hover:text-emerald-glow transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Bottom Caption + Screen Tabs */}
          <div
            className="max-w-7xl w-full mx-auto pt-4 border-t border-white/10 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-platinum/80 leading-relaxed">
              <strong className="text-softwhite font-display mr-2">{current.label}:</strong>
              {current.caption}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {screens.map((sc, idx) => (
                <button
                  key={sc.src}
                  type="button"
                  onClick={() => onSelectIndex(idx)}
                  className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition-all"
                  style={{
                    background: idx === state.index ? state.project.accent : "rgba(255,255,255,0.05)",
                    color: idx === state.index ? "#060608" : "rgba(240,237,230,0.75)",
                    fontWeight: idx === state.index ? 700 : 500,
                  }}
                >
                  {String(idx + 1).padStart(2, "0")} · {sc.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */

export default function ClientProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [filter, setFilter] = useState<"All" | Sector>("All");
  const [lightbox, setLightbox] = useState<{ project: Project; index: number } | null>(null);

  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.sector === filter)),
    [filter],
  );

  const summary = useMemo(() => {
    const live = projects.filter((p) => p.status === "live").length;
    return [
      { value: String(projects.length), label: "Client Systems & Builds" },
      { value: String(live), label: "Live in Production" },
      { value: "3", label: "Countries (UK · UG · CAN)" },
      { value: "100%", label: "Engineered In-House" },
    ];
  }, []);

  return (
    <section id="client-work" ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 80% 0%, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4 flex items-center gap-3"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Proven Client Engineering
          </span>
          <span className="h-px w-10 bg-emerald-deep/40" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-platinum/50">
            Interactive Live Portfolio
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
            <span style={{ color: GOLD }}>Engineered to Convert &amp; Endure.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/74 max-w-xl text-sm leading-relaxed"
          >
            Every client platform we deliver carries the exact institutional standard we apply to our
            own subsidiaries: sovereign architecture, obsessive visual craft, and mission-critical
            reliability — from UK DVSA &amp; Home Office compliance consoles to highland luxury hotel
            operating systems and private security command portals.
          </motion.p>
        </div>

        {/* summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 mb-12 border border-white/8"
        >
          {summary.map((s) => (
            <div key={s.label} className="bg-obsidian/70 px-6 py-5">
              <div className="font-display font-bold text-2xl sm:text-3xl leading-none mb-2" style={{ color: GOLD }}>
                {s.value}
              </div>
              <div className="text-platinum/60 text-[9px] uppercase tracking-[0.18em]">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 mb-10"
        >
          <div
            className="flex flex-wrap items-center gap-2"
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
                    color: isActive ? "#060608" : "rgba(200,196,190,0.65)",
                    border: `1px solid ${isActive ? GOLD : "rgba(255,255,255,0.08)"}`,
                    background: isActive ? GOLD : "rgba(6,6,8,0.45)",
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {f}
                  <span className={`ml-2 ${isActive ? "text-obsidian/70" : "text-platinum/35"}`}>
                    {String(count).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="text-[10px] font-mono text-platinum/55 flex items-center gap-2">
            <Sparkles size={12} className="text-emerald-glow" />
            <span>Click any system screen to inspect in full resolution</span>
          </div>
        </motion.div>

        {/* grid */}
        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/8 border border-white/8">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p, i) =>
                p.featured ? (
                  <FeaturedCard
                    key={p.id}
                    p={p}
                    active={inView}
                    onOpenLightbox={(proj, idx) => setLightbox({ project: proj, index: idx })}
                  />
                ) : (
                  <ProjectCard key={p.id} p={p} i={i} />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* High-Conversion Commission Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 relative border border-emerald-deep/35 bg-obsidian p-8 sm:p-10 md:p-12 overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 70% 90% at 90% 50%, rgba(200,169,110,0.12) 0%, transparent 70%)",
            }}
          />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-glow mb-3">
                <Lock size={11} /> Bespoke Enterprise &amp; Institutional Engineering
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-softwhite leading-tight mb-3">
                Ready to turn your operations into a competitive moat?
              </h3>
              <p className="text-platinum/72 text-sm leading-relaxed">
                Whether you need a full-scale operating platform like{" "}
                <span className="text-softwhite">FLEETS.HQ</span>, a luxury property &amp; POS
                management system like <span className="text-softwhite">Reberon Hotel — The House</span>,
                or a high-converting corporate &amp; admin portal like{" "}
                <span className="text-softwhite">Neptune Guards</span> — our engineering team delivers
                production-ready systems from architecture to deployment.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 flex-shrink-0">
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-emerald-deep text-obsidian text-xs font-display font-bold uppercase tracking-[0.16em] hover:bg-emerald-glow transition-all duration-300"
                style={{ boxShadow: "0 0 30px rgba(200,169,110,0.3)" }}
              >
                Start Your Project
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="https://wa.me/256760512691"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/15 text-softwhite/85 text-xs font-display uppercase tracking-[0.16em] hover:border-emerald-deep/60 hover:text-emerald-glow transition-all"
              >
                Direct WhatsApp Desk
                <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full-Screen Lightbox Inspector */}
      <LightboxModal
        state={lightbox}
        onClose={() => setLightbox(null)}
        onSelectIndex={(idx) =>
          setLightbox((prev) => (prev ? { ...prev, index: idx } : null))
        }
      />
    </section>
  );
}
