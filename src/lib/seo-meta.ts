import type { Metadata } from "next";
import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";

/** Build Open Graph / Twitter metadata with a generated OG image. */
export function pageSocialMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Pick<Metadata, "openGraph" | "twitter" | "keywords"> {
  const ogUrl = `${SITE_CONTACT.siteUrl}/api/og?title=${encodeURIComponent(opts.title)}&subtitle=${encodeURIComponent(opts.description.slice(0, 120))}`;
  return {
    keywords: opts.keywords,
    openGraph: {
      type: "website",
      url: `${SITE_CONTACT.siteUrl}${opts.path}`,
      siteName: SITE_SEO.name,
      title: opts.title,
      description: opts.description,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [ogUrl],
    },
  };
}
