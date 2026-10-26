import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_CANADA } from "@/lib/telecom-seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Dispatch Dialer & Outbound Software Canada",
  description: TELECOM_CANADA.description,
  alternates: { canonical: "/telecom/canada" },
};

export default function TelecomCanadaPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Canada", path: "/telecom/canada" },
    ]),
    faqPageJsonLd(TELECOM_CANADA.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="GEO · Canada" title={TELECOM_CANADA.title} description={TELECOM_CANADA.description}>
        <TelecomCta source="telecom_canada_hero" />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{TELECOM_CANADA.answer}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Dispatch &amp; outbound for Canadian operators</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Freight brokers, carrier sales, and outbound desks in Canada need the same fundamentals as US teams:
            parallel dialing, clear dispositions, and CRM history. INDUS Multi-Slot and AI dialers cover the calling
            engine; custom dispatch CRMs add lanes, equipment, and bilingual fields when required.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">List building &amp; scrapers</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Pair dialers with{" "}
            <Link href={href("/products/canadian-website-scraper")} className="text-cyan-600 hover:underline">
              Canadian Website Scraper
            </Link>{" "}
            or other INDUS scrapers to build prospect lists, then push clean data into campaigns. For logistics-adjacent
            US data that Canadian brokers also use, see the{" "}
            <Link href={href("/products/fmcsa-safer-scraper")} className="text-cyan-600 hover:underline">
              FMCSA SAFER Scraper
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Next steps</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <Link href={href("/telecom/crm/dispatch-calling-crm")} className="text-cyan-600 hover:underline">
                Dispatch calling CRM guide
              </Link>
            </li>
            <li>
              <Link href={href("/telecom/auto-dialers")} className="text-cyan-600 hover:underline">
                Auto dialer plans
              </Link>
            </li>
            <li>
              <Link href={href("/start-project")} className="text-cyan-600 hover:underline">
                Custom bilingual / dispatch CRM
              </Link>
            </li>
          </ul>
        </section>

        <FaqSection faqs={TELECOM_CANADA.faqs} />
        <TelecomCta source="telecom_canada_footer" />
      </article>
    </div>
  );
}
