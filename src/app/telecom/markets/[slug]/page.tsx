import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_MARKETS, getTelecomMarket } from "@/lib/telecom-markets";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { Check } from "lucide-react";

export function generateStaticParams() {
  return TELECOM_MARKETS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const market = getTelecomMarket(slug);
  if (!market) return { title: "Market not found" };
  return {
    title: market.title,
    description: market.description,
    keywords: [...market.primaryKeywords, "INDUS Web Agency", "auto dialer", "cold calling"],
    alternates: { canonical: `/telecom/markets/${market.slug}` },
  };
}

export default async function TelecomMarketPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const market = getTelecomMarket(slug);
  if (!market) notFound();

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Markets", path: "/telecom/markets" },
      { name: market.name, path: `/telecom/markets/${market.slug}` },
    ]),
    faqPageJsonLd(market.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow={`Market · ${market.name}`} title={market.title} description={market.description}>
        <TelecomCta source={`market_${market.slug}`} />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{market.answer}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Why teams here choose INDUS</h2>
          <ul className="mt-4 space-y-2.5">
            {market.notes.map((n) => (
              <li key={n} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {n}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Popular searches we target</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {market.primaryKeywords.map((kw) => (
              <li key={kw} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {kw}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Start here</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <Link href={href("/telecom/best-auto-dialers")} className="text-cyan-600 hover:underline">
                Best auto dialers hub
              </Link>
            </li>
            <li>
              <Link href={href("/telecom/use-cases/cold-calling")} className="text-cyan-600 hover:underline">
                Cold calling use case
              </Link>
            </li>
            <li>
              <Link href={href("/telecom/use-cases/ai-sales-closing")} className="text-cyan-600 hover:underline">
                AI sales closing
              </Link>
            </li>
            <li>
              <Link href={href("/products?cat=dialer")} className="text-cyan-600 hover:underline">
                Browse dialer products
              </Link>
            </li>
          </ul>
        </section>

        <FaqSection faqs={market.faqs} />
        <TelecomCta source={`market_${market.slug}_footer`} />
      </article>
    </div>
  );
}
