"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";

function IntelligenceCanvas({ still }: { still: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;

    // Render at device pixel ratio so the hairline grid and node cores stay crisp
    // on high-DPI displays instead of resolving to soft grey smears.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Nodes
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

      // subtle grid
      ctx.strokeStyle = `rgba(${GOLD},0.035)`;
      ctx.lineWidth = 1;
      const gs = 70;
      ctx.beginPath();
      for (let x = 0; x < w; x += gs) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = 0; y < h; y += gs) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // edges — squared-distance compare avoids a sqrt per pair
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

      // nodes
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

    // Reduced motion: paint one static frame of the graph and leave it there.
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
            "radial-gradient(ellipse 70% 60% at 50% 55%, rgba(200,169,110,0.10) 0%, transparent 70%)",
        }}
      />

      {/* top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-obsidian to-transparent pointer-events-none" />
      {/* bottom gradient fade */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-obsidian to-transparent pointer-events-none" />

      {/* content */}
      {/* pb > pt lifts the content off the scroll indicator pinned at the bottom */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20 pb-32">
        {/* logo mark above headline */}
        <motion.div
          {...fadeUp(0.25)}
          className="flex justify-center mb-10"
        >
          <div className="relative">
            <div
              className="absolute inset-0 blur-2xl rounded-full"
              style={{
                background: "radial-gradient(circle, rgba(200,169,110,0.20) 0%, transparent 70%)",
                transform: "scale(2)",
              }}
            />
            <Image
              src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
              alt="ECADEL GROUP"
              width={72}
              height={72}
              className="relative z-10 object-contain opacity-90"
              priority
            />
          </div>
        </motion.div>

        {/* eyebrow */}
        <motion.div {...fadeUp(0.4)}>
          <span className="inline-flex items-center gap-2 text-xs tracking-[0.35em] uppercase text-emerald-glow mb-8 font-display">
            <span className="w-8 h-px bg-emerald-deep" />
            African Intelligence Infrastructure
            <span className="w-8 h-px bg-emerald-deep" />
          </span>
        </motion.div>

        {/* headline */}
        <motion.h1
          {...fadeUp(0.55)}
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-softwhite leading-[1.02] tracking-tight mb-8"
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
          {...fadeUp(0.7)}
          className="text-platinum/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-14"
        >
          We build the infrastructure Africa runs on — road safety intelligence,
          agentic AI, city discovery, consequence foresight, and the financial operating
          system that powers businesses across the continent. Five companies. One mission.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.85)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#platforms"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-emerald-deep text-obsidian text-sm font-semibold tracking-wide hover:bg-emerald-glow transition-all duration-300"
            style={{ boxShadow: "0 0 30px rgba(200,169,110,0.3)" }}
          >
            Explore Our Platforms
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-200"
            />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-8 py-4 border border-platinum/20 text-platinum/70 text-sm tracking-wide hover:border-emerald-deep/60 hover:text-softwhite transition-all duration-300"
          >
            Partner With Us
          </a>
        </motion.div>

        {/* stat bar */}
        <motion.div
          {...fadeUp(1.0)}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-y-6 max-w-2xl mx-auto sm:divide-x sm:divide-white/10"
        >
          {[
            { value: "5", label: "Subsidiaries" },
            { value: "7", label: "Client Builds" },
            { value: "199", label: "Countries" },
            { value: "KLA", label: "Kampala, Uganda" },
          ].map((stat) => (
            <div key={stat.label} className="px-4 sm:px-6 text-center">
              <div className="font-display font-bold text-2xl text-softwhite mb-1">
                {stat.value}
              </div>
              <div className="text-platinum/65 text-[11px] tracking-wide uppercase">
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
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-platinum/50"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
