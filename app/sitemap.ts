import { MetadataRoute } from "next";

const BASE = "https://ecadelgroup.com";

// Use a fixed date that reflects actual last content update.
// Update this when you make significant content changes.
const LAST_UPDATED = new Date("2026-07-25");
const LEGAL_DATE   = new Date("2026-01-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core pages ────────────────────────────────────────────────────────────
    {
      url:             BASE,
      lastModified:    LAST_UPDATED,
      changeFrequency: "weekly",
      priority:        1.0,
    },

    // ── Key anchor sections (hint crawlers about section content) ─────────────
    {
      url:             `${BASE}/#overview`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.85,
    },
    {
      url:             `${BASE}/#services`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.9,
    },
    {
      url:             `${BASE}/#platforms`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.9,
    },
    {
      url:             `${BASE}/#labs`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.8,
    },
    {
      url:             `${BASE}/#client-work`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.85,
    },
    {
      url:             `${BASE}/#testimonials`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.75,
    },
    {
      url:             `${BASE}/#leadership`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.7,
    },
    {
      url:             `${BASE}/#contact`,
      lastModified:    LAST_UPDATED,
      changeFrequency: "monthly",
      priority:        0.8,
    },

    // ── Legal pages ───────────────────────────────────────────────────────────
    {
      url:             `${BASE}/legal`,
      lastModified:    LEGAL_DATE,
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             `${BASE}/legal#privacy`,
      lastModified:    LEGAL_DATE,
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             `${BASE}/legal#terms`,
      lastModified:    LEGAL_DATE,
      changeFrequency: "yearly",
      priority:        0.4,
    },
    {
      url:             `${BASE}/legal#cookies`,
      lastModified:    LEGAL_DATE,
      changeFrequency: "yearly",
      priority:        0.3,
    },
    {
      url:             `${BASE}/legal#dpa`,
      lastModified:    LEGAL_DATE,
      changeFrequency: "yearly",
      priority:        0.3,
    },
  ];
}
