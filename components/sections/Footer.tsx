"use client";

import Image from "next/image";
import { Twitter, ArrowUpRight } from "lucide-react";

const clientWork = [
  { label: "FLEETS.HQ",             href: "https://fleetshq.com" },
  { label: "Reberon Investments",   href: "https://reberoninvestments.com" },
  { label: "256 Logistics Ltd",     href: "https://256logisticsltd.co.uk" },
  { label: "Einstein Rising Canada", href: "https://einsteinrisingcanada.org" },
  { label: "Bunyonyi Luxury Resort", href: "https://bunyonyiluxuryresort.com" },
  { label: "Simon Sharp Products",  href: "https://simonsharpproducts.com" },
];

const footerLinks = {
  Company: [
    { label: "About", href: "#overview" },
    { label: "Our Work", href: "#client-work" },
    { label: "Leadership", href: "#leadership" },
    { label: "Vision", href: "#vision" },
    { label: "Contact", href: "#contact" },
  ],
  Platforms: [
    { label: "Smart Business Book", href: "https://sbb.finance" },
    { label: "PAME AI", href: "https://pame.cc" },
    { label: "SafeRoad UG", href: "#platforms" },
    { label: "Hapa", href: "#platforms" },
    { label: "PROSEQ", href: "#platforms" },
  ],
  Focus: [
    { label: "Mobility Intelligence", href: "#focus" },
    { label: "Civic Technology", href: "#focus" },
    { label: "AI Infrastructure", href: "#focus" },
    { label: "Strategic Analytics", href: "#focus" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal#privacy" },
    { label: "Terms of Service", href: "/legal#terms" },
    { label: "Cookie Policy", href: "/legal#cookies" },
    { label: "Data Processing", href: "/legal#dpa" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-obsidian border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* top section */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-10 pb-16 border-b border-white/5">
          {/* brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center group mb-6">
              <Image
                src="/assets/ecadel_logos_icons/ecadel_lockup_horizontal_transparent.png"
                alt="ECADEL GROUP LIMITED"
                width={160}
                height={40}
                className="object-contain opacity-70 group-hover:opacity-95 transition-opacity duration-300"
              />
            </a>

            <p className="text-platinum/65 text-sm leading-relaxed max-w-xs">
              Building Africa&apos;s Intelligence Infrastructure. Headquartered in
              Kampala, Uganda.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {/* X (Twitter) */}
              <a
                href="https://x.com/ecadelgroup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ECADEL GROUP on X"
                className="w-8 h-8 flex items-center justify-center border border-white/8 text-platinum/65 hover:text-softwhite hover:border-emerald-deep/40 transition-all duration-200"
              >
                <Twitter size={13} />
              </a>
              {/* LinkedIn — coming soon */}
              <span
                title="LinkedIn coming soon"
                className="w-8 h-8 flex items-center justify-center border border-white/5 text-platinum/38 cursor-not-allowed select-none"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </span>
            </div>
          </div>

          {/* nav cols */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-platinum/65 mb-5">
                {section}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-platinum/72 text-sm hover:text-softwhite transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* selected client work — outbound links to live builds */}
        <div className="py-8 border-b border-white/5">
          <h4 className="font-display text-[10px] tracking-[0.3em] uppercase text-platinum/65 mb-5">
            Selected Client Work
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {clientWork.map((c) => (
              <a
                key={c.href}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-platinum/60 text-xs hover:text-softwhite transition-colors duration-200"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-deep/50 group-hover:bg-emerald-deep transition-colors duration-200" />
                {c.label}
                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-70 transition-opacity duration-200" />
              </a>
            ))}
          </div>
        </div>

        {/* bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-platinum/42 text-xs tracking-wide">
            © {new Date().getFullYear()} ECADEL GROUP LIMITED. All rights reserved. Kampala, Uganda.
          </p>
          <p className="text-platinum/42 text-xs tracking-[0.15em] italic">
            Building Africa&apos;s Intelligence Infrastructure.
          </p>
        </div>
      </div>
    </footer>
  );
}
