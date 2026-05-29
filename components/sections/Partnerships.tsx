"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, Globe, Landmark, Car, Shield, FlaskConical, Layers } from "lucide-react";

const partnerCategories = [
  {
    icon: Landmark,
    title: "Governments & Agencies",
    desc: "National road authorities, transport ministries, and civic agencies deploying SafeRoad intelligence dashboards and public safety infrastructure.",
  },
  {
    icon: Globe,
    title: "NGOs & Donor Bodies",
    desc: "Foundations, bilateral agencies, and international development bodies using SBB's NGO Mode for USAID/EU-standard grant accounting and donor reporting.",
  },
  {
    icon: Shield,
    title: "Insurance Companies",
    desc: "Live driver risk scoring and fleet telematics via SafeRoad APIs — enabling intelligent, usage-based insurance products for African carriers.",
  },
  {
    icon: Building2,
    title: "Enterprises & SMEs",
    desc: "African businesses across 6 markets — Uganda, Kenya, Nigeria, Ghana, Tanzania, Rwanda — running operations on SBB's full-stack platform.",
  },
  {
    icon: Layers,
    title: "Payment Providers",
    desc: "Live integrations with Paystack, Flutterwave, and M-Pesa STK Push — embedded across SBB's invoice checkout and payment infrastructure.",
  },
  {
    icon: Car,
    title: "Tax Authorities",
    desc: "eTIMS-compliant invoice signing for Kenya KRA and Nigeria FIRS — real-time submission to tax authorities built into SBB's compliance layer.",
  },
  {
    icon: FlaskConical,
    title: "Research Institutions",
    desc: "Universities and research bodies advancing African intelligence systems, policy intelligence, and data science in partnership with ECADEL GROUP LIMITED.",
  },
];

export default function Partnerships() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      <div className="absolute inset-0 bg-intelligence-grid opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-4"
        >
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
            <br />
            <span style={{ color: "#C8A96E" }}>Institutional Scale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-platinum/50 max-w-md text-sm leading-relaxed"
          >
            ECADEL GROUP LIMITED is positioned to partner with the institutions and
            organisations that shape African infrastructure — from national
            governments to international development bodies.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5">
          {partnerCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="bg-graphite p-8 group hover:bg-carbon transition-colors duration-300 relative"
            >
              <div
                className="w-10 h-10 flex items-center justify-center border border-white/5 mb-6 group-hover:border-emerald-deep/30 group-hover:bg-emerald-deep/5 transition-all duration-300"
              >
                <cat.icon size={16} className="text-platinum/40 group-hover:text-emerald-deep transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-softwhite text-sm mb-3 tracking-wide">
                {cat.title}
              </h3>
              <p className="text-platinum/40 text-xs leading-relaxed">{cat.desc}</p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-emerald-deep group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-emerald-deep/8 border border-emerald-deep/20 p-8 flex flex-col justify-between group hover:bg-emerald-deep/15 transition-all duration-300"
          >
            <div>
              <div className="w-8 h-px bg-emerald-deep mb-6" />
              <h3 className="font-display font-semibold text-softwhite text-sm mb-3 tracking-wide">
                Become a Partner
              </h3>
              <p className="text-platinum/50 text-xs leading-relaxed">
                Ready to build Africa&apos;s intelligence infrastructure together?
              </p>
            </div>
            <a
              href="#contact"
              className="mt-6 inline-block text-xs text-emerald-glow border-b border-emerald-deep/40 pb-0.5 hover:border-emerald-glow transition-all duration-200"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
