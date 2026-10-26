import type { MetadataRoute } from "next";
import { PRODUCTS } from "@/lib/products";
import { PORTFOLIO } from "@/lib/portfolio";
import { GUIDES } from "@/lib/guides";
import { TELECOM_CRM_TYPES } from "@/lib/telecom-crm";
import { SITE_CONTACT } from "@/lib/site-config";

const staticRoutes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/services", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/about", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" as const },
  { path: "/start-project", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/products", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/telecom", priority: 0.95, changeFrequency: "weekly" as const },
  { path: "/telecom/auto-dialers", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/telecom/crm-types", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/telecom/usa", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/telecom/canada", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/pricing", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/compare", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/demos", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/guides", priority: 0.75, changeFrequency: "weekly" as const },
  { path: "/tools/dialer-calculator", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/resources/dialer-guide", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/resources/dialer-comparison", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.65, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_CONTACT.siteUrl}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...TELECOM_CRM_TYPES.map((crm) => ({
      url: `${SITE_CONTACT.siteUrl}/telecom/crm/${crm.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.75,
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
