import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_DIALERS_HUB, DIALER_PRODUCT_CARDS } from "@/lib/telecom-seo";
import { breadcrumbJsonLd, faqPageJsonLd, howToJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Google Voice Auto Dialers — Plans, CRM & AI",
  description: TELECOM_DIALERS_HUB.description,
  alternates: { canonical: "/telecom/auto-dialers" },
};

export default function TelecomDialersPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Auto dialers", path: "/telecom/auto-dialers" },
    ]),
    faqPageJsonLd(TELECOM_DIALERS_HUB.faqs),
    howToJsonLd({
      name: "How to choose an INDUS Google Voice auto dialer",
      description: "Pick the right dialer tier for your outbound team size and AI needs.",
      steps: [
        { name: "Estimate team size", text: "Solo agents can start on DOM Starter or AI Solo; teams need Multi-Slot." },
        { name: "Decide on AI", text: "Choose AI Solo or Enterprise AI Multi-Slot if you want conversational AI on calls." },
        { name: "Check CRM needs", text: "Use Multi-Slot or Enterprise tiers when you need full CRM and admin dashboards." },
        { name: "Confirm with calculator", text: "Run the dialer calculator, then subscribe or start a custom project." },
      ],
    }),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Telecom · Dialers"
        title={TELECOM_DIALERS_HUB.title}
        description={TELECOM_DIALERS_HUB.description}
      >
        <TelecomCta variant="products" source="telecom_dialers_hero" />
      </PageHero>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{TELECOM_DIALERS_HUB.answer}</p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8">
        <h2 className="text-2xl font-bold text-[#0c2340]">Four dialer tiers</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {DIALER_PRODUCT_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={href(`/products/${card.slug}`)}
              className="rounded-2xl border border-line bg-white p-6 shadow-sm transition hover:border-cyan-200 hover:shadow-md"
            >
              <p className="text-xl font-bold text-[#0c2340]">{card.name}</p>
              <p className="mt-1 font-medium text-cyan-600">{card.price}</p>
              <p className="mt-3 text-sm text-muted">{card.blurb}</p>
              <span className="mt-4 inline-block text-sm font-semibold text-cyan-700">View product →</span>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-4 text-sm">
          <Link href={href("/compare")} className="font-semibold text-cyan-600 hover:underline">
            Full comparison table
          </Link>
          <Link href={href("/resources/dialer-comparison")} className="font-semibold text-cyan-600 hover:underline">
            Printable PDF chart
          </Link>
          <Link href={href("/demos")} className="font-semibold text-cyan-600 hover:underline">
            Live demos
          </Link>
          <Link href={href("/telecom/crm-types")} className="font-semibold text-cyan-600 hover:underline">
            Dialer CRM types
          </Link>
        </div>

        <FaqSection faqs={TELECOM_DIALERS_HUB.faqs} />
      </section>
    </div>
  );
}
