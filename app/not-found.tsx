import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center text-center px-6 bg-intelligence-grid">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,110,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <Image
          src="/assets/ecadel_logos_icons/ecadel_logo_dark_512.png"
          alt="ECADEL GROUP"
          width={56}
          height={56}
          className="opacity-40 mb-10 object-contain"
        />

        <div
          className="font-display font-bold text-[10rem] leading-none select-none mb-4"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(200,169,110,0.2)",
          }}
        >
          404
        </div>

        <h1 className="font-display font-bold text-2xl text-softwhite mb-4">
          Signal Not Found
        </h1>
        <p className="text-platinum/50 text-sm max-w-xs mb-10 leading-relaxed">
          The intelligence node you&apos;re looking for doesn&apos;t exist or has been
          decommissioned.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3 border border-emerald-deep/50 text-emerald-glow text-sm tracking-wide hover:bg-emerald-deep/10 transition-all duration-300"
        >
          Return to Base
        </Link>
      </div>
    </div>
  );
}
