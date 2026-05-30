"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Globe, Landmark, Car, Shield, FlaskConical, Layers, ArrowRight } from "lucide-react";

const partnerCategories = [
  {
    icon: Landmark,
    title: "Governments & Agencies",
    desc: "National road authorities, transport ministries, and civic agencies deploying SafeRoad intelligence dashboards and public safety infrastructure.",
    accent: "#C8A96E",
  },
  {
    icon: Globe,
    title: "NGOs & Donor Bodies",
    desc: "Foundations, bilateral agencies, and international development bodies using SBB's NGO Mode for USAID/EU-standard grant accounting and donor reporting.",
    accent: "#8BA7C7",
  },
  {
    icon: Shield,
    title: "Insurance Companies",
    desc: "Live driver risk scoring and fleet telematics via SafeRoad APIs — enabling intelligent, usage-based insurance products for African carriers.",
    accent: "#C8A96E",
  },
  {
    icon: Building2,
    title: "Enterprises & SMEs",
    desc: "African businesses across 6 markets — Uganda, Kenya, Nigeria, Ghana, Tanzania, Rwanda — running operations on SBB's full-stack platform.",
    accent: "#8BA7C7",
  },
  {
    icon: Layers,
    title: "Payment Providers",
    desc: "Live integrations with Paystack, Flutterwave, and M-Pesa STK Push — embedded across SBB's invoice checkout and payment infrastructure.",
    accent: "#C8A96E",
  },
  {
    icon: Car,
    title: "Tax Authorities",
    desc: "eTIMS-compliant invoice signing for Kenya KRA and Nigeria FIRS — real-time submission to tax authorities built into SBB's compliance layer.",
    accent: "#8BA7C7",
  },
  {
    icon: FlaskConical,
    title: "Research Institutions",
    desc: "Universities and research bodies advancing African intelligence systems, policy intelligence, and data science in partnership with ECADEL GROUP LIMITED.",
    accent: "#C8A96E",
  },
];

// Pre-computed network node background
const NET_NODES = [
  { x: 10, y: 20 }, { x: 25, y: 8 },  { x: 40, y: 18 }, { x: 58, y: 12 },
  { x: 72, y: 22 }, { x: 88, y: 10 }, { x: 15, y: 82 }, { x: 30, y: 88 },
  { x: 48, y: 78 }, { x: 63, y: 85 }, { x: 78, y: 75 }, { x: 92, y: 82 },
  { x: 5,  y: 50 }, { x: 95, y: 48 }, { x: 50, y: 50 },
];
const NET_LINES = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[6,7],[7,8],[8,9],[9,10],[10,11],
  [0,6],[5,11],[12,0],[13,5],[14,2],[14,8],[12,7],[13,10],
];

export default function Partnerships() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      {/* Network background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {NET_LINES.map(([a, b], i) => {
          const na = NET_NODES[a], nb = NET_NODES[b];
          return (
            <motion.line key={i}
              x1={`${na.x}%`} y1={`${na.y}%`}
              x2={`${nb.x}%`} y2={`${nb.y}%`}
              stroke="#C8A96E" strokeWidth="0.06"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.12 } : {}}
              transition={{ duration: 1, delay: 0.4 + i * 0.05 }}
            />
          );
        })}
        {NET_NODES.map((n, i) => (
          <motion.circle key={i}
            cx={`${n.x}%`} cy={`${n.y}%`} r="0.25%"
            fill="#C8A96E"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.35 } : {}}
            transition={{ duration: 0.4, delay: 0.5 + i * 0.04 }}
          />
        ))}
      </svg>

      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-4">
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Partnerships & Collaboration
          </span>
        </motion.div>

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight"
          >
            Built for
            <br /><span style={{ color: "#C8A96E" }}>Institutional Scale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/68 max-w-md text-sm leading-relaxed"
          >
            ECADEL GROUP LIMITED is positioned to partner with the institutions and
            organisations that shape African infrastructure — from national governments
            to international development bodies.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
          {partnerCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="group relative bg-graphite p-8 hover:bg-carbon transition-all duration-300 overflow-hidden cursor-default"
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 80% 60% at 0% 0%, ${cat.accent}06 0%, transparent 65%)` }}
              />

              {/* Icon box */}
              <div
                className="w-11 h-11 flex items-center justify-center border mb-6 relative transition-all duration-300"
                style={{
                  borderColor: `${cat.accent}20`,
                  background: `${cat.accent}06`,
                }}
              >
                <cat.icon
                  size={16}
                  style={{ color: `${cat.accent}70` }}
                  className="group-hover:scale-110 transition-all duration-200"
                />
                {/* Icon glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 12px ${cat.accent}25, inset 0 0 8px ${cat.accent}10` }}
                />
              </div>

              <h3 className="font-display font-semibold text-softwhite text-sm mb-3 tracking-wide group-hover:text-white transition-colors duration-200">
                {cat.title}
              </h3>
              <p className="text-platinum/65 text-xs leading-relaxed">{cat.desc}</p>

              {/* Bottom sweep */}
              <div
                className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                style={{ background: `linear-gradient(to right, ${cat.accent}60, transparent)` }}
              />
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="relative bg-carbon border border-emerald-deep/20 p-8 flex flex-col justify-between group hover:border-emerald-deep/50 transition-all duration-300 overflow-hidden"
          >
            {/* Animated corner accent */}
            <div className="absolute top-0 left-0 w-8 h-px bg-emerald-deep" />
            <div className="absolute top-0 left-0 w-px h-8 bg-emerald-deep" />

            {/* Background pulse */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse 100% 80% at 50% 100%, rgba(200,169,110,0.06) 0%, transparent 70%)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            <div>
              <div className="w-8 h-px bg-emerald-deep mb-6" />
              <h3 className="font-display font-semibold text-softwhite text-base mb-3 tracking-wide">
                Become a Partner
              </h3>
              <p className="text-platinum/65 text-sm leading-relaxed">
                Ready to build Africa&apos;s intelligence infrastructure together?
                We want to hear from you.
              </p>
            </div>

            <a
              href="#contact"
              className="group/link mt-8 inline-flex items-center gap-2 text-xs text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
            >
              Get in touch
              <ArrowRight size={11} className="group-hover/link:translate-x-1 transition-transform duration-200" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
