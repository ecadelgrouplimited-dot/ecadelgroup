import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CookieBanner from "@/components/CookieBanner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ecadelgroup.com"),

  title: {
    default: "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
    template: "%s | ECADEL GROUP LIMITED",
  },

  description:
    "ECADEL GROUP LIMITED is a digital infrastructure and systems conglomerate headquartered in Kampala, Uganda. We build technology platforms, mobile & web applications, AI systems, and intelligent infrastructure for African businesses, governments, and institutions. Home of Smart Business Book, PAME AI, SafeRoad UG, Hapa, and Meridian.",

  keywords: [
    // Brand
    "ECADEL GROUP", "ECADEL GROUP LIMITED", "ECADEL", "ecadelgroup.com",
    // Platforms
    "Smart Business Book", "SBB finance", "sbb.finance",
    "PAME AI", "pame.cc", "agentic AI", "extended brain AI platform",
    "SafeRoad UG", "road safety Uganda", "fleet management Africa",
    "Hapa", "city intelligence Kampala", "local discovery Uganda",
    "Meridian", "consequence intelligence", "strategic foresight Africa",
    "ECADEL LABS", "African technology research",
    // Services
    "software development Uganda", "web development Kampala",
    "mobile app development Uganda", "custom software Uganda",
    "AI integration Africa", "AI training Uganda",
    "technology consultancy Uganda", "digital transformation Africa",
    "website development Uganda", "e-commerce development Uganda",
    "hosting domain registration Uganda",
    // Location / market
    "technology company Uganda", "tech company Kampala",
    "African tech company", "Uganda software company",
    "East Africa technology", "African digital infrastructure",
    "SME software Uganda", "business management software Africa",
    "mobile money integration Uganda", "MTN Airtel mobile money",
    // Sectors
    "civic technology Africa", "mobility intelligence",
    "operational intelligence", "AI infrastructure Africa",
    "African intelligence infrastructure", "sovereign AI Africa",
  ],

  authors: [{ name: "ECADEL GROUP LIMITED", url: "https://ecadelgroup.com" }],
  creator:   "ECADEL GROUP LIMITED",
  publisher: "ECADEL GROUP LIMITED",

  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:               true,
      follow:              true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet":       -1,
    },
  },

  alternates: {
    canonical: "https://ecadelgroup.com",
  },

  manifest: "/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon.ico",      sizes: "any"   },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },

  openGraph: {
    title:       "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
    description:
      "Digital infrastructure conglomerate building the systems that run African businesses, governments, and cities. Platforms: Smart Business Book · PAME AI · SafeRoad UG · Hapa · Meridian.",
    siteName: "ECADEL GROUP LIMITED",
    url:      "https://ecadelgroup.com",
    locale:   "en_US",
    type:     "website",
    images: [{
      url:    "/og-image.png",
      width:  1200,
      height: 630,
      alt:    "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
    description: "Building the technology platforms and intelligence infrastructure that Africa runs on.",
    images:      ["/og-image.png"],
  },
};

// ── Structured Data ───────────────────────────────────────────────────────────
const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    // Organisation
    {
      "@type":           "Organization",
      "@id":             "https://ecadelgroup.com/#organization",
      name:              "ECADEL GROUP LIMITED",
      url:               "https://ecadelgroup.com",
      logo:              "https://ecadelgroup.com/assets/ecadel_logos_icons/ecadel_logo_dark_1200.png",
      description:
        "Digital infrastructure and systems conglomerate headquartered in Kampala, Uganda. Building intelligence platforms, mobile & web applications, AI systems, and technology services for Africa.",
      foundingDate:      "2026",
      foundingLocation:  { "@type": "Place", name: "Kampala, Uganda" },
      areaServed:        ["Africa", "Uganda", "Kenya", "Nigeria", "Ghana", "Tanzania", "Rwanda", "Canada"],
      founder: {
        "@type": "Person",
        name:    "Wilson Ecaat",
        jobTitle: "Founder & Lead Developer",
      },
      contactPoint: [
        {
          "@type":       "ContactPoint",
          email:         "ecadel@ecadelgroup.com",
          contactType:   "customer service",
          availableLanguage: "English",
        },
      ],
      sameAs: [
        "https://sbb.finance",
        "https://pame.cc",
        "https://x.com/ecadelgroup",
      ],
    },

    // Website
    {
      "@type":        "WebSite",
      "@id":          "https://ecadelgroup.com/#website",
      url:            "https://ecadelgroup.com",
      name:           "ECADEL GROUP LIMITED",
      description:    "Africa's Intelligence Infrastructure Company",
      publisher:      { "@id": "https://ecadelgroup.com/#organization" },
    },

    // Smart Business Book
    {
      "@type":           "SoftwareApplication",
      name:              "Smart Business Book",
      url:               "https://sbb.finance",
      applicationCategory: "BusinessApplication",
      operatingSystem:   "Web, Android, iOS",
      description:
        "The operating system for African SMEs. Bookkeeping, invoicing, mobile money integration, payroll, and AI-powered financial intelligence. Offline-first. Free to start.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "UGX" },
      publisher: { "@id": "https://ecadelgroup.com/#organization" },
    },

    // PAME AI
    {
      "@type":           "SoftwareApplication",
      name:              "PAME AI",
      url:               "https://pame.cc",
      applicationCategory: "BusinessApplication",
      operatingSystem:   "Web",
      description:
        "Agentic extended-brain platform with persistent memory architecture, brain graph system, and clone-and-share intelligence widgets.",
      publisher: { "@id": "https://ecadelgroup.com/#organization" },
    },

    // Services offered
    {
      "@type":        "Service",
      "@id":          "https://ecadelgroup.com/#services",
      name:           "Technology Services — ECADEL GROUP LIMITED",
      provider:       { "@id": "https://ecadelgroup.com/#organization" },
      serviceType:    [
        "Software Development",
        "Mobile Application Development",
        "Web Development",
        "E-Commerce Development",
        "AI Training and Integration",
        "Technology Consultancy",
        "Cloud Hosting",
        "Domain Registration",
      ],
      areaServed: "Africa",
      description:
        "Full-spectrum technology services: custom software, mobile & web development, e-commerce platforms, AI integration, cloud hosting, domain registration, and strategic technology consultancy.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
        {/* PAME AI Brain Clone — intelligent chat widget */}
        <Script
          src="https://pame.cc/api/clone/widget.js"
          data-slug="ecadel-group"
          data-position="bottom-right"
          data-label="◆ Ask ECADEL AI"
          data-delay="0"
          data-theme="dark"
          strategy="afterInteractive"
        />
        {/* Widget brand override — applies ECADEL gold/dark theme to the PAME button */}
        <Script id="pame-brand-override" strategy="lazyOnload">{`
          (function() {
            var GOLD = '#C8A96E';
            var BG   = 'rgba(6,6,8,0.97)';
            var BORDER = 'rgba(200,169,110,0.42)';
            var SHADOW = '0 0 28px rgba(200,169,110,0.18), 0 8px 32px rgba(0,0,0,0.55)';

            function restyle(el) {
              if (!el || el._ecadelStyled) return;
              el._ecadelStyled = true;
              el.style.cssText += [
                'background:' + BG + ' !important',
                'background-image:none !important',
                'background-color:' + BG + ' !important',
                'border:1px solid ' + BORDER + ' !important',
                'border-radius:3px !important',
                'color:' + GOLD + ' !important',
                'box-shadow:' + SHADOW + ' !important',
                'font-family:"Space Grotesk",sans-serif !important',
                'font-size:12px !important',
                'font-weight:600 !important',
                'letter-spacing:0.1em !important',
                'text-transform:uppercase !important',
                'backdrop-filter:blur(16px) !important',
                '-webkit-backdrop-filter:blur(16px) !important',
              ].join(';');
              el.querySelectorAll('*').forEach(function(c) {
                c.style.setProperty('color', GOLD, 'important');
                c.style.setProperty('fill', GOLD, 'important');
                c.style.setProperty('background', 'transparent', 'important');
              });
            }

            function findWidget() {
              /* Strategy 1 — data attribute */
              document.querySelectorAll('[data-slug="ecadel-group"]').forEach(restyle);
              /* Strategy 2 — known class patterns */
              ['pame','clone','widget-btn','chat-btn','chat-bubble'].forEach(function(k){
                document.querySelectorAll('[class*="'+k+'"],[id*="'+k+'"]').forEach(restyle);
              });
              /* Strategy 3 — fixed-position bottom-right element with high z-index */
              Array.from(document.querySelectorAll('body > div, body > button, body > a')).forEach(function(el){
                try {
                  var s = window.getComputedStyle(el);
                  if (s.position === 'fixed' && parseInt(s.zIndex) > 900) restyle(el);
                } catch(e){}
              });
            }

            /* Run on mutations + timed fallbacks */
            var obs = new MutationObserver(function(){ setTimeout(findWidget, 150); });
            function start() {
              obs.observe(document.body, { childList:true, subtree:true });
              [800,2000,4000,8000].forEach(function(t){ setTimeout(findWidget, t); });
            }
            if (document.body) { start(); }
            else { document.addEventListener('DOMContentLoaded', start); }
          })();
        `}</Script>
      </body>
    </html>
  );
}
