import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_USA } from "@/lib/telecom-seo";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Google Voice Auto Dialer USA — Outbound Telecom CRM",
  description: TELECOM_USA.description,
  alternates: { canonical: "/telecom/usa" },
};

export default function TelecomUsaPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "United States", path: "/telecom/usa" },
    ]),
    faqPageJsonLd(TELECOM_USA.faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero eyebrow="GEO · United States" title={TELECOM_USA.title} description={TELECOM_USA.description}>
        <TelecomCta source="telecom_usa_hero" />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{TELECOM_USA.answer}</p>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Why US teams choose Google Voice dialers</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Many United States sales and dispatch operators already use Google Voice as a dedicated business line.
            INDUS auto dialers automate that browser workflow—from solo DOM/BOM starters to multi-slot predictive
            floors and AI agents—without requiring a full PBX migration for mid-market teams.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">TCPA &amp; DNC education (not legal advice)</h2>
          <p className="mt-3 leading-relaxed text-muted">
            US outbound calling may be subject to TCPA, state rules, and Do-Not-Call requirements depending on your
            use case, consent model, and industry. INDUS provides dialers, call logs, and optional custom compliance
            CRM features. We do <strong className="font-semibold text-[#0c2340]">not</strong> guarantee legal
            compliance—consult qualified counsel for your campaigns. See our{" "}
            <Link href={href("/telecom/crm/compliance-tcpa-crm")} className="text-cyan-600 hover:underline">
              compliance CRM guide
            </Link>{" "}
            and{" "}
            <Link href={href("/guides/google-voice-us-outbound-overview")} className="text-cyan-600 hover:underline">
              US outbound overview
            </Link>
            .
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[#0c2340]">Recommended starting points</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <Link href={href("/telecom/auto-dialers")} className="text-cyan-600 hover:underline">
                Auto dialer hub
              </Link>{" "}
              — compare all Google Voice tiers
            </li>
            <li>
              <Link href={href("/telecom/crm/outbound-dialer-crm")} className="text-cyan-600 hover:underline">
                Outbound dialer CRM
              </Link>{" "}
              — call logs + dispositions
            </li>
            <li>
              <Link href={href("/tools/dialer-calculator")} className="text-cyan-600 hover:underline">
                Dialer calculator
              </Link>{" "}
              — plan recommendation
            </li>
          </ul>
        </section>

        <FaqSection faqs={TELECOM_USA.faqs} />
        <TelecomCta source="telecom_usa_footer" />
      </article>
    </div>
  );
}
