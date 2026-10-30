"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronDown, Sparkles, Layers } from "lucide-react";
import Image from "next/image";

function IntelligenceCanvas({ still }: { still: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const NODE_COUNT = 55;
    const GOLD = "200,169,110";
    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    const nodes: {
      x: number; y: number; vx: number; vy: number; r: number; pulse: number;
    }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * W(),
        y: Math.random() * H(),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.2 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const CONNECT_DIST = 160;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;

    function draw(advance: boolean) {
      if (!ctx || !canvas) return;
      const w = W(), h = H();
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = `rgba(${GOLD},0.035)`;
      ctx.lineWidth = 1;
      const gs = 70;
      ctx.beginPath();
      for (let x = 0; x < w; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y < h; y += gs) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_DIST_SQ) {
            const alpha = (1 - Math.sqrt(distSq) / CONNECT_DIST) * 0.18;
            ctx.strokeStyle = `rgba(${GOLD},${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        if (advance) n.pulse += 0.025;
        const pulseAlpha = 0.5 + 0.5 * Math.sin(n.pulse);
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 4);
        grd.addColorStop(0, `rgba(${GOLD},${0.9 * pulseAlpha})`);
        grd.addColorStop(1, `rgba(${GOLD},0)`);
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${GOLD},${pulseAlpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();

        if (!advance) return;
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
    }

    if (still) {
      draw(false);
      const repaint = () => { resize(); draw(false); };
      window.addEventListener("resize", repaint);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", repaint);
      };
    }

    const loop = () => {
      draw(true);
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, [still]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

const HERO_SHOWCASE = [
  {
    name: "FLEETS.HQ",
    domain: "fleetshq.com",
    role: "UK Transport & DVSA Compliance OS",
    region: "United Kingdom",
    image: "/assets/projects/fleetshq-dashboard.webp",
    href: "#client-work",
  },
  {
    name: "Reberon Hotel & HMS",
    domain: "reberonhotel.com",
    role: "Luxury Sanctuary Web, AI Host & Hotel OS",
    region: "Uganda · Mt. Elgon",
    image: "/assets/projects/reberon-hms-overview.webp",
    href: "#client-work",
  },
  {
    name: "Reberon Sanctuary",
    domain: "reberonhotel.com/book",
    role: "Sipi AI Concierge & Highland Telemetry",
    region: "Kapchorwa · 1,900m",
    image: "/assets/projects/reberon-hotel-hero.webp",
    href: "#client-work",
  },
];

export default function HeroSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-obsidian">
      {/* animated canvas */}
      <IntelligenceCanvas still={!!reduceMotion} />

      {/* radial glow overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 75% 60% at 50% 45%, rgba(200,169,110,0.11) 0%, transparent 70%)",
        }}
      />

      {/* top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-obsidian to-transparent pointer-events-none" />
      {/* bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />

      {/* content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-28 pb-28">
        {/* logo mark above headline */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex justify-center mb-7"
        >
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(200,169,110,0.24) 0%, transparent 70%)",
                transform: "scale(2.1)",
              }}
            />
            <Image
              src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
              alt="ECADEL GROUP"
              width={68}
              height={68}
              className="relative z-10 object-contain opacity-95"
              priority
            />
          </div>
        </motion.div>

        {/* eyebrow */}
        <motion.div {...fadeUp(0.32)}>
          <span className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.32em] uppercase text-emerald-glow mb-6 font-display px-4 py-1.5 border border-emerald-deep/25 bg-emerald-deep/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-deep animate-pulse" />
            African Intelligence Infrastructure &amp; Enterprise Engineering
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          {...fadeUp(0.45)}
          className="font-display font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-softwhite leading-[1.01] tracking-tight mb-7"
        >
          Building Africa&apos;s
          <br />
          <span
            className="text-glow"
            style={{ color: "#C8A96E" }}
          >
            Intelligence
          </span>{" "}
          Infrastructure
        </motion.h1>

        {/* subheadline */}
        <motion.p
          {...fadeUp(0.6)}
          className="text-platinum/72 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10"
        >
          We engineer the foundational platforms and enterprise systems that modern institutions run on —
          from sovereign AI, financial operating systems, and road safety intelligence to bespoke
          transport compliance consoles, hotel operating systems, and high-converting corporate platforms.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.75)}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-14"
        >
          <a
            href="#client-work"
            className="group inline-flex items-center gap-2.5 px-8 py-4 bg-emerald-deep text-obsidian text-xs sm:text-sm font-display font-bold uppercase tracking-[0.14em] hover:bg-emerald-glow transition-all duration-300"
            style={{ boxShadow: "0 0 36px rgba(200,169,110,0.34)" }}
          >
            <Layers size={15} />
            Explore Live Client Systems
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="#platforms"
            className="inline-flex items-center gap-2 px-7 py-4 border border-emerald-deep/45 bg-obsidian/70 text-softwhite text-xs sm:text-sm font-display uppercase tracking-[0.14em] hover:border-emerald-glow hover:bg-emerald-deep/10 transition-all duration-300"
          >
            Our 6 Group Platforms
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-4 border border-white/15 text-platinum/80 text-xs sm:text-sm font-display uppercase tracking-[0.14em] hover:border-emerald-deep/60 hover:text-softwhite transition-all duration-300"
          >
            Commission a Project
            <ArrowUpRight size={14} />
          </a>
        </motion.div>

        {/* Live Production Showcase Ribbon */}
        <motion.div
          {...fadeUp(0.9)}
          className="max-w-6xl mx-auto mb-14 text-left"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
            <div className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.22em] text-emerald-glow">
              <Sparkles size={11} /> Featured Systems Live in Production
            </div>
            <a
              href="#client-work"
              className="text-[10px] font-mono uppercase tracking-[0.2em] text-platinum/60 hover:text-emerald-glow transition-colors"
            >
              View All 9 Client Builds &amp; Interactive Screens →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {HERO_SHOWCASE.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative bg-graphite/90 border border-white/10 hover:border-emerald-deep/60 overflow-hidden transition-all duration-300 flex flex-col"
                style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.55)" }}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-obsidian border-b border-white/8">
                  <Image
                    src={item.image}
                    alt={`${item.name} — ${item.role}`}
                    width={640}
                    height={360}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-transparent to-transparent" />
                  <span className="absolute top-2.5 right-2.5 text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 bg-obsidian/85 text-emerald-glow border border-emerald-deep/40 backdrop-blur-sm">
                    {item.region}
                  </span>
                </div>
                <div className="p-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-xs text-softwhite group-hover:text-emerald-glow transition-colors truncate">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-mono text-platinum/45 truncate">
                        · {item.domain}
                      </span>
                    </div>
                    <div className="text-[10px] text-platinum/65 truncate mt-0.5">
                      {item.role}
                    </div>
                  </div>
                  <ArrowRight
                    size={13}
                    className="text-emerald-deep flex-shrink-0 group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* stat bar */}
        <motion.div
          {...fadeUp(1.05)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-3xl mx-auto sm:divide-x sm:divide-white/10 pt-4 border-t border-white/8"
        >
          {[
            { value: "6", label: "Group Platforms" },
            { value: "9", label: "Client Systems Built" },
            { value: "199", label: "Countries Reached" },
            { value: "UK · UG · CAN", label: "Production Markets" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 sm:px-6 text-center">
              <div className="font-display font-bold text-xl sm:text-2xl text-softwhite mb-1">
                {stat.value}
              </div>
              <div className="text-platinum/65 text-[10px] tracking-[0.16em] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-platinum/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
