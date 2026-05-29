import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ecadelgroup.com";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${base}/legal#privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/legal#terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/legal#cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
    { url: `${base}/legal#dpa`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.4 },
  ];
}
