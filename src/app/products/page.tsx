import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/agency/PageHero";
import { LiveProductCard } from "@/components/products/LiveProductCard";
import { ProductsClient } from "./ProductsClient";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { LIVE_PRODUCTS, PRODUCT_FAQS } from "@/lib/products";
import { breadcrumbJsonLd, faqPageJsonLd, softwareItemListJsonLd } from "@/lib/schema";
import { pageSocialMeta } from "@/lib/seo-meta";
import { href } from "@/lib/paths";

const title = "Products we publish";
const description =
  "MailForge, Routelix, Laneora, Article Pulse, Bulk Phone Number Verifier, CarrierSource, Tapvio, Inkcadence, and PakOption (coming soon) from INDUS Web Agency.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocialMeta({
    title,
    description,
    path: "/products",
    keywords: [
      "INDUS Web Agency products",
      "MailForge",
      "Routelix",
      "Laneora",
      "Article Pulse",
      "Bulk Phone Number Verifier",
      "CarrierSource Free Data Collector",
      "Tapvio",
      "Inkcadence",
      "PakOption",
    ],
  }),
};

export default function ProductsPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
    softwareItemListJsonLd({
      name: "INDUS Web Agency products",
      path: "/products",
      items: LIVE_PRODUCTS.map((product) => ({
        name: product.name,
        description: product.siteDescription ?? `${product.summary} ${product.does}`,
        url: product.url,
        anchorId: product.id,
        operatingSystem: product.operatingSystem,
      })),
    }),
    faqPageJsonLd([...PRODUCT_FAQS]),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Products"
        title="Software we publish"
        description="Email, dialing, freight, publishing, verification, and data tools. Each card links to that product's site."
      >
        <p className="mt-4 max-w-2xl text-sm text-slate-300">
          Descriptions follow each site&apos;s title and meta description. PakOption is marked Coming soon.
        </p>
      </PageHero>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8" aria-labelledby="published-products">
        <h2 id="published-products" className="sr-only">
          Published products
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_PRODUCTS.map((product) => (
            <LiveProductCard key={product.id} product={product} />
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Need a version of one of these built for your team?{" "}
          <Link href={href("/start-project")} className="font-medium text-ink hover:underline">
            Start a project
          </Link>
          .
        </p>
        <FaqSection faqs={[...PRODUCT_FAQS]} />
      </section>

      <ProductsClient />
    </div>
  );
}
