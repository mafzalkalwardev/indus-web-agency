import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { TELECOM_MARKETS } from "@/lib/telecom-markets";
import { breadcrumbJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Auto Dialer Software by Market — Global, UK, AU, UAE, India",
  description:
    "INDUS auto dialers for global outbound teams plus focused hubs for UK, Australia, UAE, and India—alongside USA and Canada telecom pages.",
  alternates: { canonical: "/telecom/markets" },
};

export default function MarketsIndexPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Telecom", path: "/telecom" },
          { name: "Markets", path: "/telecom/markets" },
        ])}
      />
      <PageHero
        eyebrow="GEO · Global reach"
        title="Outbound dialers for teams worldwide"
        description="We prioritize high-quality English market hubs—not thousands of empty country pages that hurt SEO. Start with Global, then open your region. USA and Canada have dedicated telecom hubs."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8 flex flex-wrap gap-3 text-sm">
          <Link href={href("/telecom/usa")} className="rounded-lg border border-line bg-white px-4 py-2 font-medium text-cyan-700">
            United States hub →
          </Link>
          <Link href={href("/telecom/canada")} className="rounded-lg border border-line bg-white px-4 py-2 font-medium text-cyan-700">
            Canada hub →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TELECOM_MARKETS.map((m) => (
            <Link
              key={m.slug}
              href={href(`/telecom/markets/${m.slug}`)}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-cyan-200 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-[#0c2340] group-hover:text-cyan-700">{m.name}</h2>
              <p className="mt-2 text-sm text-muted line-clamp-3">{m.description}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-600">
                Open <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
