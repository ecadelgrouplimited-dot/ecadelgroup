"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// Pre-computed at module level — same values on server and client, no hydration drift.
const ORBIT_DOTS = [0, 72, 144, 216, 288].map((deg, i) => ({
  deg,
  color: i % 2 === 0 ? "#C8A96E" : "#D4B97E",
  duration: 2 + i * 0.4,
}));

const ORB_LABELS = [
  { label: "AI Systems", angle: 0 },
  { label: "Civic Tech", angle: 120 },
  { label: "Intelligence", angle: 240 },
].map(({ label, angle }) => {
  const r = 155;
  const rad = ((angle - 90) * Math.PI) / 180;
  // toFixed(3) → identical string on server and client
  return {
    label,
    top: `calc(50% + ${(Math.sin(rad) * r).toFixed(3)}px - 8px)`,
    left: `calc(50% + ${(Math.cos(rad) * r).toFixed(3)}px)`,
  };
});

const pillars = [
  {
    label: "Mission",
    text: "To build the foundational intelligence infrastructure that enables African institutions, governments, businesses, and communities to operate with clarity, precision, and strategic advantage.",
  },
  {
    label: "Vision",
    text: "A continent where every critical system — road safety, financial operations, civic governance — runs on sovereign intelligence infrastructure built by Africa, for Africa.",
  },
  {
    label: "Philosophy",
    text: "We build systems that respect African reality. SMS ingestion instead of bank feeds. Offline-first instead of cloud-only. Local compliance instead of imported frameworks. Original infrastructure, not adaptation.",
  },
];

function LogoOrb() {
  return (
    <div className="relative w-full h-80 md:h-full flex items-center justify-center select-none">
      {/* Outer rotating rings */}
      {[220, 300, 380].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size,
            height: size,
            borderColor: `rgba(200,169,110,${0.12 + i * 0.08})`,
            borderStyle: i === 1 ? "dashed" : "solid",
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 20 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Orbiting dots — CSS rotate+translateX avoids inline trig → no hydration drift */}
      {ORBIT_DOTS.map(({ deg, color, duration }, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: "calc(50% - 4px)",
            left: "calc(50% - 4px)",
            width: 8,
            height: 8,
            transform: `rotate(${deg}deg) translateX(110px)`,
            transformOrigin: "4px 4px",
          }}
        >
          <motion.div
            className="w-full h-full rounded-full"
            style={{ background: color, boxShadow: "0 0 8px rgba(200,169,110,0.8)" }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      ))}

      {/* Central glow */}
      <div
        className="absolute w-40 h-40 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,169,110,0.18) 0%, transparent 70%)",
          filter: "blur(20px)",
        }}
      />

      {/* Central logo */}
      <div className="relative z-10 flex items-center justify-center w-24 h-24">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div
            className="absolute inset-0 blur-xl rounded-full"
            style={{ background: "rgba(200,169,110,0.4)" }}
          />
          <Image
            src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
            alt="ECADEL GROUP"
            width={88}
            height={88}
            className="relative z-10 object-contain"
          />
        </motion.div>
      </div>

      {/* Data-point labels — positions pre-computed at module level */}
      {ORB_LABELS.map(({ label, top, left }) => (
        <div
          key={label}
          className="absolute text-[10px] tracking-[0.2em] uppercase text-emerald-deep/70 font-display whitespace-nowrap"
          style={{ top, left, transform: "translateX(-50%)" }}
        >
          {label}
        </div>
      ))}
    </div>
  );
}

export default function CompanyOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="overview" ref={ref} className="relative py-32 bg-graphite overflow-hidden">
      {/* background texture */}
      <div className="absolute inset-0 bg-intelligence-grid opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.35em] uppercase text-emerald-glow font-display">
            Who We Are
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-4xl md:text-5xl text-softwhite leading-tight mb-8">
                Africa&apos;s Strategic
                <br />
                <span style={{ color: "#C8A96E" }}>Intelligence Company</span>
              </h2>
              <p className="text-platinum/60 text-lg leading-relaxed mb-8">
                ECADEL GROUP LIMITED is a digital infrastructure and systems conglomerate
                headquartered in Kampala, Uganda. Our portfolio spans five subsidiaries:{" "}
                <span className="text-softwhite/70">Smart Business Book</span> for African SMEs,{" "}
                <span className="text-softwhite/70">PAME AI</span> as an agentic extended-brain platform,{" "}
                <span className="text-softwhite/70">SafeRoad UG</span> for road safety infrastructure,{" "}
                <span className="text-softwhite/70">Hapa</span> for city intelligence and local discovery,
                and <span className="text-softwhite/70">PROSEQ</span> for consequence intelligence.
              </p>
            <p className="text-platinum/68 leading-relaxed">
              We are not a software agency. We are not a startup. We are a
              long-term technology institution — building the foundational systems
              that will define how African governments, enterprises, and
              communities operate for the next generation.
            </p>
          </motion.div>

          {/* right: logo orb visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-96"
          >
            <LogoOrb />
          </motion.div>
        </div>

        {/* pillars */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-20 grid md:grid-cols-3 gap-px bg-white/5"
        >
          {pillars.map((pillar) => (
            <div
              key={pillar.label}
              className="bg-graphite p-8 group hover:bg-carbon transition-colors duration-300"
            >
              <div className="w-8 h-px bg-emerald-deep mb-6 group-hover:w-14 transition-all duration-300" />
              <h3 className="font-display font-semibold text-softwhite text-lg mb-4 tracking-wide">
                {pillar.label}
              </h3>
              <p className="text-platinum/72 text-sm leading-relaxed">
                {pillar.text}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
