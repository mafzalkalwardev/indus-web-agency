import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { PORTFOLIO } from "@/lib/portfolio";
import { GUIDES } from "@/lib/guides";
import { SITE_CONTACT } from "@/lib/site-config";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.95, changeFrequency: "weekly" },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/start-project", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products", priority: 0.95, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" },
  { path: "/compare", priority: 0.8, changeFrequency: "monthly" },
  { path: "/demos", priority: 0.75, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.75, changeFrequency: "weekly" },
  { path: "/tools/dialer-calculator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/resources/dialer-guide", priority: 0.7, changeFrequency: "monthly" },
  { path: "/resources/dialer-comparison", priority: 0.65, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.65, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_CONTACT.siteUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...PORTFOLIO.map((project) => ({
      url: `${SITE_CONTACT.siteUrl}/work/${project.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
    })),
    ...GUIDES.map((guide) => ({
      url: `${SITE_CONTACT.siteUrl}/guides/${guide.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE_CONTACT.siteUrl}/products/${product.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: product.screenshots.slice(0, 1).map((src) => `${SITE_CONTACT.siteUrl}${src}`),
    })),
  ];
}
