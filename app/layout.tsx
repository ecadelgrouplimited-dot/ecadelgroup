import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
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
  title: "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
  description:
    "ECADEL GROUP develops advanced operational intelligence systems, AI infrastructure, mobility platforms, and strategic foresight technologies designed for African realities.",
  keywords: [
    "African intelligence infrastructure",
    "AI systems Africa",
    "operational intelligence Uganda",
    "civic technology",
    "mobility intelligence",
    "strategic foresight Africa",
    "SafeRoad",
    "Meridian consequence intelligence",
    "Kampala Uganda technology",
  ],
  authors: [{ name: "ECADEL GROUP LIMITED" }],
  creator: "ECADEL GROUP LIMITED",
  publisher: "ECADEL GROUP LIMITED",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure",
    description:
      "Building advanced operational intelligence systems, AI infrastructure, and strategic foresight technologies designed for African realities.",
    siteName: "ECADEL GROUP LIMITED",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ECADEL GROUP LIMITED — Africa's Intelligence Infrastructure" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECADEL GROUP LIMITED",
    description: "Building Africa's Intelligence Infrastructure.",
    images: ["/og-image.png"],
  },
};

const schemaOrg = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ECADEL GROUP LIMITED",
  url: "https://ecadelgroup.com",
  logo: "https://ecadelgroup.com/assets/ecadel_logos_icons/ecadel_logo_dark_1200.png",
  description:
    "African intelligence infrastructure company building advanced operational intelligence systems, AI infrastructure, and strategic foresight technologies.",
  foundingLocation: { "@type": "Place", name: "Kampala, Uganda" },
  areaServed: "Africa",
  founder: { "@type": "Person", name: "Wilson ECAAT" },
  contactPoint: [
    { "@type": "ContactPoint", email: "ecadelgroup@ecadelgroup.com", contactType: "customer service" },
    { "@type": "ContactPoint", email: "partnerships@ecadelgroup.com", contactType: "sales" },
  ],
  sameAs: [],
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
      </body>
    </html>
  );
}
