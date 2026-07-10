import type { MetadataRoute } from "next";
import { SITE_CONTACT } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard/", "/api/", "/login", "/signup"],
    },
    sitemap: `${SITE_CONTACT.siteUrl}/sitemap.xml`,
    host: SITE_CONTACT.siteUrl,
  };
}
