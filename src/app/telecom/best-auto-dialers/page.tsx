import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { TelecomCta } from "@/components/telecom/TelecomCta";
import { TELECOM_USE_CASES } from "@/lib/telecom-usecases";
import { DIALER_PRODUCT_CARDS } from "@/lib/telecom-seo";
import { PRIMARY_FOCUS_KEYWORDS } from "@/lib/telecom-keywords";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { Check } from "lucide-react";

const faqs = [
  {
    q: "What are the best auto dialers for telecommunication?",
    a: "For Google Voice–based telecom and outbound teams, INDUS Multi-Slot and Enterprise AI Multi-Slot combine parallel dialing, AMD, CRM logs, and admin dashboards without forcing a full CCaaS migration.",
  },
  {
    q: "What are the best auto dialers for cold calling?",
    a: "Cold calling teams typically want power or parallel/multi-slot dialing. INDUS Multi-Slot Agent dials up to five Google Voice lines and shows agents only the picked call—built for high-volume outbound lists.",
  },
  {
    q: "What are the best auto dialers when an AI agent closes or qualifies sales?",
    a: "Choose INDUS AI Agent Solo for AI on every call, or Enterprise AI Multi-Slot when you need parallel dialing with AI on the connected call—then hand hot leads to humans.",
  },
  {
    q: "Do INDUS dialers work worldwide?",
    a: "Yes for English-speaking outbound teams using Google Voice where available. See our global markets hub plus USA, Canada, UK, Australia, UAE, and India pages for geo context.",
  },
];

export const metadata: Metadata = {
  title: "Best Auto Dialers for Cold Calling, Telecom & AI Sales (2026)",
  description:
    "Best auto dialers for telecommunication, cold calling, and AI agents that qualify or close sales. Compare INDUS Google Voice multi-slot and AI dialers from $29/mo—global outbound teams.",
  keywords: [...PRIMARY_FOCUS_KEYWORDS],
  alternates: { canonical: "/telecom/best-auto-dialers" },
};

export default function BestAutoDialersPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Telecom", path: "/telecom" },
      { name: "Best auto dialers", path: "/telecom/best-auto-dialers" },
    ]),
    faqPageJsonLd(faqs),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Best-of · 2026"
        title="Best auto dialers for telecom, cold calling & AI sales"
        description="A practical shortlist for teams searching best auto dialers for telecommunication, best auto dialers for cold calling, and AI agents that help close sales—anchored on Google Voice outbound software from INDUS."
      >
        <TelecomCta source="best_dialers_hero" />
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">
          The best auto dialer depends on your workflow: cold calling volume, telecom outbound, or AI that qualifies and
          closes. INDUS Web Agency licenses four Google Voice dialer tiers used by sales, dispatch, and call-center
          teams worldwide—then builds custom CRMs when you outgrow off-the-shelf fields.
        </p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Quick picks by search intent</h2>
          <ul className="mt-6 space-y-4">
            <li className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-bold text-[#0c2340]">Best for telecommunication outbound</h3>
              <p className="mt-2 text-sm text-muted">
                Multi-Slot or Enterprise AI Multi-Slot +{" "}
                <Link href={href("/telecom/use-cases/telecommunication")} className="text-cyan-600 hover:underline">
                  telecom use case
                </Link>
                .
              </p>
            </li>
            <li className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-bold text-[#0c2340]">Best for cold calling</h3>
              <p className="mt-2 text-sm text-muted">
                Multi-Slot Agent for parallel connects — see{" "}
                <Link href={href("/telecom/use-cases/cold-calling")} className="text-cyan-600 hover:underline">
                  cold calling dialers
                </Link>
                .
              </p>
            </li>
            <li className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-bold text-[#0c2340]">Best when AI closes or qualifies sales</h3>
              <p className="mt-2 text-sm text-muted">
                AI Agent Solo or Enterprise AI Multi-Slot —{" "}
                <Link href={href("/telecom/use-cases/ai-sales-closing")} className="text-cyan-600 hover:underline">
                  AI sales closing dialers
                </Link>
                .
              </p>
            </li>
            <li className="rounded-xl border border-line bg-white p-5">
              <h3 className="font-bold text-[#0c2340]">Best AI agent custom auto dialers with CRMs &amp; custom CRMs</h3>
              <p className="mt-2 text-sm text-muted">
                License AI dialers with CRM modules, or commission a bespoke CRM —{" "}
                <Link href={href("/telecom/use-cases/ai-custom-dialer-crm")} className="text-cyan-600 hover:underline">
                  AI custom dialer + CRM guide
                </Link>
                .
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">INDUS dialer lineup</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {DIALER_PRODUCT_CARDS.map((card) => (
              <Link
                key={card.slug}
                href={href(`/products/${card.slug}`)}
                className="rounded-xl border border-line bg-white p-5 transition hover:border-cyan-200"
              >
                <p className="font-semibold text-[#0c2340]">{card.name}</p>
                <p className="text-sm text-cyan-600">{card.price}</p>
                <p className="mt-2 text-sm text-muted">{card.blurb}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">What “best” means in this market</h2>
          <ul className="mt-4 space-y-2.5">
            {[
              "Connect rate: parallel/multi-slot beats manual dialing for cold lists",
              "CRM: dispositions and history—not just a dial pad",
              "AI: optional conversational agent for qualify/close workflows",
              "Cost: published plans from $29/mo vs quote-only enterprise suites",
              "Fit: Google Voice teams vs full SIP/CCaaS platforms",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Browse every use case</h2>
          <p className="mt-2 text-sm text-muted">
            Insurance, real estate, solar, dispatch, BPO, SDR, appointment setting, and more.
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {TELECOM_USE_CASES.map((uc) => (
              <li key={uc.slug}>
                <Link href={href(`/telecom/use-cases/${uc.slug}`)} className="text-sm font-medium text-cyan-600 hover:underline">
                  {uc.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={faqs} />
        <TelecomCta source="best_dialers_footer" />
      </article>
    </div>
  );
}
