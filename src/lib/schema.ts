import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";
import { absoluteCanonical } from "@/lib/seo-meta";

export type FaqItem = { q: string; a: string };

export function faqPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_CONTACT.siteUrl}${item.path}`,
    })),
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  modifiedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    datePublished: opts.publishedAt,
    dateModified: opts.modifiedAt || opts.publishedAt,
    author: {
      "@type": "Organization",
      name: SITE_SEO.name,
      url: SITE_CONTACT.siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_SEO.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONTACT.siteUrl}/images/logo-trimmed.png`,
      },
    },
    mainEntityOfPage: `${SITE_CONTACT.siteUrl}${opts.path}`,
  };
}

export function softwareItemListJsonLd(opts: {
  name: string;
  path: string;
  items: {
    name: string;
    description: string;
    url: string;
    anchorId: string;
    operatingSystem?: string;
  }[];
}) {
  const pageUrl = absoluteCanonical(opts.path);
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: opts.name,
    url: pageUrl,
    numberOfItems: opts.items.length,
    itemListElement: opts.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: `${pageUrl}#${item.anchorId}`,
      item: {
        "@type": "SoftwareApplication",
        name: item.name,
        description: item.description,
        url: item.url,
        ...(item.operatingSystem ? { operatingSystem: item.operatingSystem } : {}),
        provider: {
          "@type": "Organization",
          name: SITE_SEO.name,
          url: SITE_CONTACT.siteUrl,
        },
      },
    })),
  };
}

export function serviceOfferCatalogJsonLd(opts: {
  name: string;
  description: string;
  path: string;
  services: { name: string; description: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: absoluteCanonical(opts.path),
    provider: {
      "@type": "Organization",
      name: SITE_SEO.name,
      url: SITE_CONTACT.siteUrl,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: opts.name,
      itemListElement: opts.services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
        },
      })),
    },
  };
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
