"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Shield, Brain, MapPin, Activity, AlertTriangle,
  BarChart3, Car, Zap, Wallet, FileText, Users, Cpu,
  Globe, TrendingUp, Building2, Receipt, GitBranch, Share2,
  Compass, Heart,
} from "lucide-react";

// ─── SafeRoad ────────────────────────────────────────────────────────────────

const safeRoadFeatures = [
  { icon: Shield, label: "Passenger Safety" },
  { icon: Car, label: "Driver Accountability" },
  { icon: Activity, label: "Fleet Intelligence" },
  { icon: AlertTriangle, label: "SOS Systems" },
  { icon: Brain, label: "AI Safety Scoring" },
  { icon: MapPin, label: "Road Hazard Intel" },
  { icon: BarChart3, label: "Government Dashboards" },
  { icon: Zap, label: "Real-Time Visibility" },
];

function SafeRoadMockup() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-carbon border border-white/5"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-[10px] text-platinum/50 font-mono">SafeRoad — National Intelligence Dashboard</div>
      </div>
      <div className="relative h-48 bg-obsidian overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#C8A96E" strokeWidth="0.5" />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`v${i}`} x1={`${i * 7.14}%`} y1="0" x2={`${i * 7.14}%`} y2="100%" stroke="#C8A96E" strokeWidth="0.5" />
          ))}
        </svg>
        <svg className="absolute inset-0 w-full h-full">
          <path d="M 30 140 Q 100 60 200 90 Q 280 110 350 40" stroke="#C8A96E" strokeWidth="1.5" fill="none" opacity="0.7" strokeDasharray="4 2" />
          <path d="M 60 160 Q 140 100 250 130 Q 300 145 380 120" stroke="#D4B97E" strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="200" cy="90" r="5" fill="#C8A96E" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="120" cy="75" r="3" fill="#FF5555" opacity="0.8">
            <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="110" r="3" fill="#D4B97E" opacity="0.8" />
          <circle cx="350" cy="40" r="4" fill="#C8A96E" opacity="0.9" />
        </svg>
        <div className="absolute top-3 right-3 bg-graphite/90 border border-white/10 px-2 py-1 text-[9px] text-platinum/60 font-mono">LIVE — Kampala Region</div>
      </div>
      <div className="grid grid-cols-4 divide-x divide-white/5 border-t border-white/5">
        {[
          { label: "Active Vehicles", value: "1,247", color: "#C8A96E" },
          { label: "Incidents", value: "3", color: "#FF5555" },
          { label: "Avg Score", value: "84.2", color: "#D4B97E" },
          { label: "SOS Active", value: "0", color: "#C7CCD4" },
        ].map((s) => (
          <div key={s.label} className="px-3 py-3">
            <div className="font-mono text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-platinum/50 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SBB ─────────────────────────────────────────────────────────────────────

const sbbFeatures = [
  { icon: Wallet, label: "SMS Auto-Ingestion" },
  { icon: FileText, label: "Invoicing & Collections" },
  { icon: Users, label: "Payroll & HR" },
  { icon: Globe, label: "NGO Mode" },
  { icon: Cpu, label: "Kiongozi AI Copilot" },
  { icon: TrendingUp, label: "Financial Analytics" },
  { icon: Building2, label: "Multi-Business Workspaces" },
  { icon: Receipt, label: "Tax & eTIMS Compliance" },
];

function SBBMockup() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-carbon border border-white/5"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center justify-between px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-deep/80 flex items-center justify-center">
            <span className="text-[7px] font-bold text-white font-mono">SBB</span>
          </div>
          <span className="text-[10px] text-platinum/72 font-mono">Smart Business Book — Dashboard</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
          <span className="text-[9px] text-emerald-glow font-mono">LIVE</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3 border-b border-white/5">
        {[
          { label: "Cash & Mobile Money", value: "UGX 4,820,000", change: "+12.4%", up: true },
          { label: "Outstanding Invoices", value: "UGX 1,340,000", change: "3 overdue", up: false },
          { label: "Net This Month", value: "UGX 2,105,000", change: "+8.1%", up: true },
        ].map((card) => (
          <div key={card.label} className="bg-obsidian/60 p-2.5 border border-white/5">
            <div className="text-platinum/56 text-[8px] uppercase tracking-wider mb-1">{card.label}</div>
            <div className="font-mono text-[11px] font-bold text-softwhite leading-none">{card.value}</div>
            <div className={`text-[9px] mt-1 ${card.up ? "text-emerald-glow" : "text-red-400/80"}`}>{card.change}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 h-[calc(100%-7.5rem)]">
        <div className="col-span-3 border-r border-white/5 overflow-hidden">
          <div className="px-3 py-2 border-b border-white/5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-platinum/50 font-display">Recent Transactions</span>
          </div>
          {[
            { label: "MTN Mobile Money", amount: "+580,000", time: "09:14", type: "in" },
            { label: "Supplier — Office Supplies", amount: "-142,000", time: "08:52", type: "out" },
            { label: "Invoice #INV-0091 Paid", amount: "+920,000", time: "08:31", type: "in" },
            { label: "Airtel Money Transfer", amount: "+210,000", time: "07:55", type: "in" },
          ].map((tx, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-2 border-b border-white/3 hover:bg-white/2">
              <div>
                <div className="text-[10px] text-softwhite/80">{tx.label}</div>
                <div className="text-[8px] text-platinum/50 font-mono">{tx.time}</div>
              </div>
              <span className={`font-mono text-[10px] font-semibold ${tx.type === "in" ? "text-emerald-glow" : "text-red-400/80"}`}>
                {tx.amount}
              </span>
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col">
          <div className="px-3 py-2 border-b border-white/5">
            <span className="text-[9px] tracking-[0.2em] uppercase text-platinum/50 font-display">Kiongozi AI</span>
          </div>
          <div className="flex-1 p-2.5 space-y-2 overflow-hidden">
            <div className="bg-white/5 rounded-sm px-2.5 py-2">
              <p className="text-[9px] text-platinum/60 leading-relaxed">Your cash runway is <span className="text-emerald-glow">47 days</span>. Invoice INV-0088 is 12 days overdue — want me to send a WhatsApp reminder?</p>
            </div>
            <div className="bg-emerald-deep/10 border border-emerald-deep/20 rounded-sm px-2.5 py-2 ml-3">
              <p className="text-[9px] text-softwhite/70 leading-relaxed">Yes, send the reminder and flag the top 3 overdue customers.</p>
            </div>
            <div className="bg-white/5 rounded-sm px-2.5 py-2">
              <p className="text-[9px] text-platinum/60 leading-relaxed">Done. 3 reminders sent. <span className="text-emerald-glow">Nakato Ltd</span> owes the most: UGX 840,000.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAME AI ─────────────────────────────────────────────────────────────────

const pameFeatures = [
  { icon: Brain, label: "Persistent Memory Architecture" },
  { icon: GitBranch, label: "Brain Graph System" },
  { icon: Share2, label: "Clone & Share Widget" },
  { icon: Zap, label: "Agentic Workflows" },
  { icon: Cpu, label: "Context-Aware Intelligence" },
  { icon: Activity, label: "Personal Knowledge Engine" },
];

function PAMEMockup() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-carbon border border-white/5"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-[10px] text-platinum/50 font-mono">PAME AI — Brain Graph</div>
      </div>
      <div className="relative h-48 bg-obsidian overflow-hidden flex items-center justify-center">
        <svg className="absolute inset-0 w-full h-full">
          {/* Brain graph edges */}
          {[
            ["200,96","120,50"],["200,96","280,50"],["200,96","100,140"],
            ["200,96","300,140"],["200,96","200,160"],
            ["120,50","60,30"],["120,50","80,90"],
            ["280,50","340,30"],["280,50","320,90"],
            ["100,140","50,160"],["300,140","360,155"],
          ].map(([from, to], i) => {
            const [x1, y1] = from.split(",").map(Number);
            const [x2, y2] = to.split(",").map(Number);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#C8A96E" strokeWidth="1" opacity="0.35" />;
          })}
          {/* Central core */}
          <circle cx="200" cy="96" r="18" fill="#C8A96E" fillOpacity="0.2" stroke="#C8A96E" strokeOpacity="0.6" strokeWidth="1.5" />
          <circle cx="200" cy="96" r="10" fill="#C8A96E" fillOpacity="0.5" />
          <circle cx="200" cy="96" r="22" fill="none" stroke="#C8A96E" strokeOpacity="0.2" strokeWidth="1">
            <animate attributeName="r" values="18;26;18" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          {/* Memory nodes */}
          {[
            {cx:120,cy:50,r:8,label:"Work"},
            {cx:280,cy:50,r:8,label:"Projects"},
            {cx:100,cy:140,r:7,label:"Ideas"},
            {cx:300,cy:140,r:7,label:"Context"},
            {cx:200,cy:160,r:7,label:"Goals"},
            {cx:60,cy:30,r:5,label:""},
            {cx:340,cy:30,r:5,label:""},
            {cx:80,cy:90,r:5,label:""},
            {cx:320,cy:90,r:5,label:""},
            {cx:50,cy:160,r:4,label:""},
            {cx:360,cy:155,r:4,label:""},
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.cx} cy={n.cy} r={n.r} fill="#D4B97E" fillOpacity="0.25" stroke="#D4B97E" strokeOpacity="0.5" strokeWidth="1" />
              {n.label && (
                <text x={n.cx} y={n.cy - n.r - 3} textAnchor="middle" fill="#D4B97E" fontSize="7" fontFamily="monospace" opacity="0.7">{n.label}</text>
              )}
            </g>
          ))}
        </svg>
        <div className="absolute top-3 right-3 bg-graphite/90 border border-white/10 px-2 py-1 text-[9px] text-platinum/60 font-mono">BRAIN GRAPH — ACTIVE</div>
        <div className="absolute bottom-3 left-3 text-[9px] text-emerald-glow font-mono">247 memory nodes · 1,432 connections</div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
        {[
          { label: "Memory Nodes", value: "247", color: "#C8A96E" },
          { label: "Active Agents", value: "4", color: "#D4B97E" },
          { label: "Context Depth", value: "∞", color: "#C7CCD4" },
        ].map((s) => (
          <div key={s.label} className="px-3 py-3">
            <div className="font-mono text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-platinum/50 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Hapa ─────────────────────────────────────────────────────────────────────

const hapaFeatures = [
  { icon: MapPin, label: "Location-Anchored Social Graph" },
  { icon: Globe, label: "Cultural Intelligence Layer" },
  { icon: Users, label: "Local Creator Economy" },
  { icon: Wallet, label: "Mobile Money Commerce" },
  { icon: Compass, label: "City Intelligence Layer" },
  { icon: Heart, label: "Kampala-First Launch" },
];

function HapaMockup() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-carbon border border-white/5"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-[10px] text-platinum/50 font-mono">Hapa — Kampala City Intelligence</div>
      </div>
      <div className="relative h-48 bg-obsidian overflow-hidden">
        {/* City grid map */}
        <svg className="absolute inset-0 w-full h-full opacity-15">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={`${i * 14}%`} x2="100%" y2={`${i * 14}%`} stroke="#C8A96E" strokeWidth="0.8" />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v${i}`} x1={`${i * 9}%`} y1="0" x2={`${i * 9}%`} y2="100%" stroke="#C8A96E" strokeWidth="0.8" />
          ))}
        </svg>
        {/* Location pins */}
        <svg className="absolute inset-0 w-full h-full">
          {[
            { cx: 180, cy: 80, r: 16, label: "Nakasero", color: "#C8A96E" },
            { cx: 280, cy: 60, r: 12, label: "Kololo", color: "#D4B97E" },
            { cx: 120, cy: 120, r: 10, label: "Kabalagala", color: "#D4B97E" },
            { cx: 320, cy: 130, r: 10, label: "Ntinda", color: "#C8A96E" },
            { cx: 220, cy: 140, r: 8, label: "", color: "#C8A96E" },
            { cx: 80, cy: 65, r: 6, label: "", color: "#D4B97E" },
            { cx: 360, cy: 85, r: 6, label: "", color: "#D4B97E" },
          ].map((pin, i) => (
            <g key={i}>
              <circle cx={pin.cx} cy={pin.cy} r={pin.r} fill={pin.color} fillOpacity="0.15" stroke={pin.color} strokeOpacity="0.5" strokeWidth="1" />
              <circle cx={pin.cx} cy={pin.cy} r={pin.r * 0.35} fill={pin.color} opacity="0.8" />
              {pin.label && (
                <text x={pin.cx} y={pin.cy - pin.r - 3} textAnchor="middle" fill={pin.color} fontSize="7" fontFamily="monospace" opacity="0.8">{pin.label}</text>
              )}
            </g>
          ))}
          {/* Active pulse on main pin */}
          <circle cx="180" cy="80" r="20" fill="none" stroke="#C8A96E" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="16;28;16" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute top-3 right-3 bg-graphite/90 border border-white/10 px-2 py-1 text-[9px] text-platinum/60 font-mono">KAMPALA — LIVE</div>
        <div className="absolute bottom-3 left-3 text-[9px] text-emerald-glow font-mono">348 active spots · 12 creators nearby</div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
        {[
          { label: "Active Spots", value: "348", color: "#C8A96E" },
          { label: "Creators", value: "47", color: "#D4B97E" },
          { label: "City", value: "KLA", color: "#C7CCD4" },
        ].map((s) => (
          <div key={s.label} className="px-3 py-3">
            <div className="font-mono text-base font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-platinum/50 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Meridian ────────────────────────────────────────────────────────────────

const meridianFeatures = [
  "Strategic Foresight Engine",
  "Systemic Consequence Analysis",
  "Predictive Intelligence Models",
  "Institutional Decision Support",
  "Network Simulation & Modelling",
  "Crisis Intelligence Mapping",
];

function MeridianMockup() {
  return (
    <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-carbon border border-white/5"
      style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-graphite border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
        </div>
        <div className="flex-1 text-center text-[10px] text-platinum/50 font-mono">Meridian — Consequence Intelligence Platform</div>
      </div>
      <div className="relative h-48 bg-obsidian overflow-hidden">
        <svg className="absolute inset-0 w-full h-full">
          {[["200,96","110,40"],["200,96","300,40"],["200,96","110,152"],["200,96","300,152"],["110,40","50,80"],["300,40","360,80"],["110,152","60,170"],["300,152","350,170"]].map(([from,to],i)=>{
            const [x1,y1]=from.split(",").map(Number); const [x2,y2]=to.split(",").map(Number);
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#23395B" strokeWidth="1.5" opacity="0.8" />;
          })}
          {[{cx:200,cy:96,r:16,fill:"#C8A96E"},{cx:110,cy:40,r:9,fill:"#23395B"},{cx:300,cy:40,r:9,fill:"#23395B"},{cx:110,cy:152,r:9,fill:"#23395B"},{cx:300,cy:152,r:9,fill:"#23395B"},{cx:50,cy:80,r:6,fill:"#16181D"},{cx:360,cy:80,r:6,fill:"#16181D"},{cx:60,cy:170,r:6,fill:"#FF5555"},{cx:350,cy:170,r:6,fill:"#16181D"}].map((n,i)=>(
            <g key={i}><circle cx={n.cx} cy={n.cy} r={n.r+4} fill={n.fill} opacity="0.15"/><circle cx={n.cx} cy={n.cy} r={n.r} fill={n.fill} stroke="rgba(255,255,255,0.1)" strokeWidth="1"/></g>
          ))}
          <circle cx="60" cy="170" r="12" fill="none" stroke="#FF5555" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="6;16;6" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
        <div className="absolute top-3 right-3 bg-graphite/90 border border-white/10 px-2 py-1 text-[9px] text-platinum/60 font-mono">CONSEQUENCE MAP — ACTIVE</div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[9px] text-red-400 font-mono">RISK ALERT — Node 7</span>
        </div>
      </div>
      <div className="grid grid-cols-3 divide-x divide-white/5 border-t border-white/5">
        {[{label:"Scenarios Modelled",value:"847"},{label:"Risk Index",value:"72.4"},{label:"Foresight Horizon",value:"18mo"}].map((s)=>(
          <div key={s.label} className="px-3 py-3">
            <div className="font-mono text-base font-bold text-emerald-glow">{s.value}</div>
            <div className="text-platinum/50 text-[9px] uppercase tracking-wide mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Section ─────────────────────────────────────────────────────────────────

function PlatformBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] text-emerald-glow font-mono tracking-widest">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
      {label}
    </span>
  );
}

export default function FlagshipProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="platforms" ref={ref} className="relative py-32 bg-graphite">
      <div className="absolute inset-0 bg-intelligence-grid opacity-25" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">Portfolio</span>
        </motion.div>

        <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-6">
          Five Companies.
          <br /><span style={{ color: "#C8A96E" }}>Five Categories.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="text-platinum/72 max-w-2xl text-base leading-relaxed mb-24">
          Each subsidiary operates in a distinct infrastructure domain. Together they form the foundation
          of ECADEL GROUP LIMITED&apos;s mission: building the systems that run the institutions, businesses,
          and infrastructure of modern Africa.
        </motion.p>

        {/* ── SafeRoad ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center border border-emerald-deep/40 text-emerald-glow">
                <Shield size={14} />
              </div>
              <PlatformBadge label="03 / 05 — SAFEROAD UG · Awaiting Regulatory Approval" />
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4 leading-tight">
              National Road Safety<br />Intelligence Platform
            </h3>
            <p className="text-platinum/74 leading-relaxed mb-4">
              Uganda loses thousands of lives to road accidents every year. SafeRoad UG is building the digital infrastructure layer that addresses this — a road safety platform awaiting regulatory approval to deploy at scale across Uganda&apos;s transport systems.
            </p>
            <p className="text-platinum/65 text-sm leading-relaxed mb-8">
              Real-time fleet intelligence, AI-powered driver scoring, and government-grade operational dashboards built for national scale.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {safeRoadFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-platinum/60">
                  <Icon size={13} className="text-emerald-deep flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200">
              Inquire About SafeRoad <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.4 }}>
            <SafeRoadMockup />
          </motion.div>
        </motion.div>

        {/* ── SBB ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.25 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.45 }}
            className="order-2 lg:order-1">
            <SBBMockup />
          </motion.div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center border border-emerald-deep/40 bg-emerald-deep/10 font-mono font-bold text-emerald-glow text-[10px]">
                SBB
              </div>
              <PlatformBadge label="01 / 05 — LIVE AT SBB.FINANCE" />
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4 leading-tight">
              The Business Operating<br />System for Africa
            </h3>
            <p className="text-platinum/74 leading-relaxed mb-5">
              Smart Business Book (SBB) is a full-stack financial control and operations platform
              built for African SMEs, NGOs, and institutions. Powered by Kiongozi AI — built on Claude Sonnet/Opus. Offline-first. Zero accounting knowledge required.
            </p>
            <p className="text-platinum/65 text-sm leading-relaxed mb-8">
              MTN and Airtel mobile money integration built in. Free to start — four-tier UGX pricing. Live across Uganda and beyond.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {sbbFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-platinum/60">
                  <Icon size={13} className="text-emerald-deep flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-px bg-white/5 mb-10">
              {[
                { value: "25", label: "AI Agents" },
                { value: "136", label: "DB Tables" },
                { value: "199", label: "Countries" },
              ].map((s) => (
                <div key={s.label} className="bg-carbon px-4 py-3 text-center">
                  <div className="font-display font-bold text-lg text-softwhite">{s.value}</div>
                  <div className="text-platinum/56 text-[9px] uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <a href="https://sbb.finance" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200">
                Visit sbb.finance <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="#contact"
                className="text-sm text-platinum/65 hover:text-platinum/70 transition-colors duration-200">
                Enterprise Inquiry →
              </a>
            </div>
          </div>
        </motion.div>

        {/* ── PAME AI ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center border border-emerald-deep/40 bg-emerald-deep/10 text-emerald-glow">
                <Brain size={14} />
              </div>
              <PlatformBadge label="02 / 05 — PAME AI · LIVE AT PAME.CC" />
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4 leading-tight">
              Your Agentic<br />Extended Brain
            </h3>
            <p className="text-platinum/74 leading-relaxed mb-5">
              PAME AI is not a chatbot or an assistant. It is an agentic extended-brain platform — with persistent memory architecture, a brain graph system, and a clone-and-share widget feature that makes intelligence portable.
            </p>
            <p className="text-platinum/65 text-sm leading-relaxed mb-8">
              You don&apos;t use PAME. PAME grows with you.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {pameFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-platinum/60">
                  <Icon size={13} className="text-emerald-deep flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-5">
              <a href="https://pame.cc" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200">
                Visit pame.cc <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a href="#contact" className="text-sm text-platinum/65 hover:text-platinum/70 transition-colors duration-200">
                Enterprise Inquiry →
              </a>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
            <PAMEMockup />
          </motion.div>
        </motion.div>

        {/* ── Hapa ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-32">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
            className="order-2 lg:order-1">
            <HapaMockup />
          </motion.div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center border border-emerald-deep/40 text-emerald-glow">
                <MapPin size={14} />
              </div>
              <PlatformBadge label="04 / 05 — HAPA · Pre-Launch · Kampala" />
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4 leading-tight">
              Where You Are — And<br />Everything That Means
            </h3>
            <p className="text-platinum/74 leading-relaxed mb-5">
              Google has places. Instagram has moments. Hapa owns where you are. A city-intelligence and local discovery platform built for African urban reality — with a social graph anchored to location, a cultural intelligence layer, local creator economy, and mobile money commerce.
            </p>
            <p className="text-platinum/65 text-sm leading-relaxed mb-8">
              Launching in Kampala first.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {hapaFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 text-sm text-platinum/60">
                  <Icon size={13} className="text-emerald-deep flex-shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200">
              Follow Hapa Development <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </motion.div>

        {/* ── Meridian ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, delay: 0.3 }}
          className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 flex items-center justify-center border border-white/10 text-platinum/72">
                <Brain size={14} className="text-platinum/60" />
              </div>
              <PlatformBadge label="05 / 05 — MERIDIAN · Playbook Stage · Seeking Seed" />
            </div>
            <h3 className="font-display font-bold text-3xl md:text-4xl text-softwhite mb-4 leading-tight">
              Consequence Intelligence<br />Platform
            </h3>
            <p className="text-platinum/74 leading-relaxed mb-5">
              The world has spent three decades building AI that answers questions. No one has built the tool that maps the consequences of decisions before they are made — across economic, social, political, environmental, technical, and human systems simultaneously, in real time.
            </p>
            <p className="text-platinum/65 text-sm leading-relaxed mb-8">
              Meridian is that tool. Not a prediction engine. Not a risk platform. A living, dynamic consequence map — a new category of human capability called Consequence Intelligence.
            </p>
            <div className="space-y-3 mb-10">
              {meridianFeatures.map((f) => (
                <div key={f} className="flex items-center gap-3 text-sm text-platinum/60">
                  <div className="w-1 h-1 rounded-full bg-emerald-deep flex-shrink-0" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
            <a href="#contact" className="group inline-flex items-center gap-2 text-sm text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200">
              Explore Meridian <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
            <MeridianMockup />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
