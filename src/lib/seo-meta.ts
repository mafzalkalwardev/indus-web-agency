import type { Metadata } from "next";
import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";

/**
 * Root-relative path for a self-referencing canonical.
 * Homepage is "/". Every other path has a leading slash and no trailing slash,
 * matching `trailingSlash: false`.
 */
export function canonicalPath(path: string): string {
  if (!path || path === "/") return "/";
  const withLeading = path.startsWith("/") ? path : `/${path}`;
  return withLeading.replace(/\/+$/, "") || "/";
}

/**
 * Absolute www URL for a path. Homepage is `https://www.induswebagency.com`
 * (no trailing slash), which is what Next.js emits for canonical "/" when
 * `trailingSlash` is false. Other paths have no trailing slash.
 */
export function absoluteCanonical(path: string): string {
  const canonical = canonicalPath(path);
  if (canonical === "/") return SITE_CONTACT.siteUrl;
  return `${SITE_CONTACT.siteUrl}${canonical}`;
}

/** Open Graph defaults shared by the root layout and pages that only override the URL. */
export const siteOpenGraph: Metadata["openGraph"] = {
  type: "website",
  siteName: SITE_SEO.name,
  title: SITE_SEO.title,
  description: SITE_SEO.description,
  images: [
    {
      url: "/images/logo-trimmed.png",
      width: 1200,
      height: 630,
      alt: "INDUS Web Agency business automation software",
    },
  ],
};

/**
 * Self-referencing canonical and og:url for an indexable page.
 * `openGraph` is replaced (not deep-merged) when a page sets it, so this
 * repeats the site defaults and only changes `url`.
 */
export function selfReferencingMeta(path: string): Pick<Metadata, "alternates" | "openGraph"> {
  const canonical = canonicalPath(path);
  return {
    alternates: { canonical },
    openGraph: {
      ...siteOpenGraph,
      url: canonical,
    },
  };
}

/** Build Open Graph / Twitter metadata with a generated OG image. */
export function pageSocialMeta(opts: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Pick<Metadata, "openGraph" | "twitter" | "keywords" | "alternates"> {
  const path = canonicalPath(opts.path);
  const ogUrl = `${SITE_CONTACT.siteUrl}/api/og?title=${encodeURIComponent(opts.title)}&subtitle=${encodeURIComponent(opts.description.slice(0, 120))}`;
  return {
    keywords: opts.keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
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
