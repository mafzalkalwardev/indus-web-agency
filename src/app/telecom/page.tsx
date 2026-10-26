import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_CRM_TYPES } from "@/lib/telecom-crm";
import { TELECOM_PILLAR, DIALER_PRODUCT_CARDS } from "@/lib/telecom-seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowRight, Phone, Database, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Outbound Telecommunications Software — Dialers & CRMs",
  description: TELECOM_PILLAR.description,
  keywords: [...TELECOM_PILLAR.keywords],
  alternates: { canonical: "/telecom" },
};

export default function TelecomPillarPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
    ]),
    faqPageJsonLd(TELECOM_PILLAR.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="Telecom niche" title={TELECOM_PILLAR.title} description={TELECOM_PILLAR.description}>
        <TelecomCta source="telecom_pillar_hero" />
      </PageHero>

      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{TELECOM_PILLAR.answer}</p>
      </section>

      <section className="border-y border-line bg-white py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <h2 className="text-2xl font-bold text-[#0c2340]">Explore the outbound stack</h2>
          <p className="mt-2 max-w-2xl text-muted">
            Pillar content for SEO, AEO, and geo search—linked to live dialer products and custom CRM builds.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <HubCard
              href="/telecom/auto-dialers"
              icon={<Phone className="h-5 w-5 text-cyan-600" />}
              title="Auto dialers"
              body="Google Voice tiers from $29/mo — multi-slot, AI, CRM modules."
            />
            <HubCard
              href="/telecom/crm-types"
              icon={<Database className="h-5 w-5 text-cyan-600" />}
              title="Telecom CRM types"
              body="14 CRM categories for outbound, dispatch, AI voice, compliance, and more."
            />
            <HubCard
              href="/telecom/usa"
              icon={<MapPin className="h-5 w-5 text-cyan-600" />}
              title="United States"
              body="US Google Voice outbound hub with TCPA/DNC education."
            />
            <HubCard
              href="/telecom/canada"
              icon={<MapPin className="h-5 w-5 text-cyan-600" />}
              title="Canada"
              body="Dispatch and outbound software for Canadian operators."
            />
            <HubCard
              href="/compare"
              icon={<Phone className="h-5 w-5 text-cyan-600" />}
              title="Compare plans"
              body="Side-by-side dialer feature matrix and pricing."
            />
            <HubCard
              href="/tools/dialer-calculator"
              icon={<Phone className="h-5 w-5 text-cyan-600" />}
              title="Dialer calculator"
              body="Answer two questions; get a recommended plan."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0c2340]">Flagship Google Voice dialers</h2>
            <p className="mt-2 text-muted">Licensed products with CRM on higher tiers.</p>
          </div>
          <Link href={href("/telecom/auto-dialers")} className="text-sm font-semibold text-cyan-600 hover:underline">
            All dialers →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DIALER_PRODUCT_CARDS.map((card) => (
            <Link
              key={card.slug}
              href={href(`/products/${card.slug}`)}
              className="rounded-xl border border-line bg-white p-5 shadow-sm transition hover:border-cyan-200 hover:shadow-md"
            >
              <p className="font-semibold text-[#0c2340]">{card.name}</p>
              <p className="mt-1 text-sm font-medium text-cyan-600">{card.price}</p>
              <p className="mt-2 text-sm text-muted">{card.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0c2340]">Telecom CRM taxonomy</h2>
              <p className="mt-2 max-w-2xl text-muted">
                Every major outbound CRM type—from dialer CRM to TCPA compliance—explained with INDUS next steps.
              </p>
            </div>
            <Link href={href("/telecom/crm-types")} className="text-sm font-semibold text-cyan-600 hover:underline">
              View all types →
            </Link>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TELECOM_CRM_TYPES.slice(0, 6).map((crm) => (
              <Link
                key={crm.slug}
                href={href(`/telecom/crm/${crm.slug}`)}
                className="flex items-center justify-between rounded-lg border border-line bg-white px-4 py-3 text-sm font-medium text-[#0c2340] transition hover:border-cyan-200"
              >
                {crm.shortName}
                <ArrowRight className="h-4 w-4 text-cyan-600" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <FaqSection faqs={TELECOM_PILLAR.faqs} />
        <TelecomCta source="telecom_pillar_footer" />
      </section>
    </div>
  );
}

function HubCard({
  href: path,
  icon,
  title,
  body,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href(path)}
      className="rounded-2xl border border-line bg-paper p-6 transition hover:border-cyan-200 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-50">{icon}</div>
      <h3 className="mt-4 text-lg font-bold text-[#0c2340]">{title}</h3>
      <p className="mt-2 text-sm text-muted">{body}</p>
    </Link>
  );
}
