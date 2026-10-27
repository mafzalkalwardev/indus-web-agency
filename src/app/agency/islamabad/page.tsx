import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { ISLAMABAD_AGENCY } from "@/lib/local-agency";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";
import { Check, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Web Agencies in Islamabad | INDUS Web Agency",
  description: ISLAMABAD_AGENCY.description,
  keywords: [...ISLAMABAD_AGENCY.primaryKeywords, ...ISLAMABAD_AGENCY.secondaryKeywords],
  alternates: { canonical: "/agency/islamabad" },
};

export default function IslamabadAgencyPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Agency", path: "/agency" },
      { name: "Islamabad", path: "/agency/islamabad" },
    ]),
    faqPageJsonLd(ISLAMABAD_AGENCY.faqs),
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "INDUS Web Agency",
      description: ISLAMABAD_AGENCY.description,
      url: `${SITE_CONTACT.siteUrl}/agency/islamabad`,
      email: SITE_CONTACT.email,
      telephone: SITE_CONTACT.whatsapp,
      areaServed: [
        { "@type": "City", name: "Islamabad" },
        { "@type": "Country", name: "Pakistan" },
        "Worldwide",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Islamabad",
        addressCountry: "PK",
      },
      priceRange: "$$",
      knowsAbout: ISLAMABAD_AGENCY.primaryKeywords,
    },
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <PageHero
        eyebrow="Islamabad · Pakistan"
        title="Best web agencies in Islamabad"
        description="Web agencies in Islamabad that also ship AI auto dialers with CRMs and custom CRM software—INDUS Web Agency."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={href("/start-project")}
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-cyan-400"
          >
            Start a project <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={href("/telecom/use-cases/ai-custom-dialer-crm")}
            className="inline-flex items-center rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white hover:bg-white/10"
          >
            AI dialers + custom CRMs
          </Link>
        </div>
      </PageHero>

      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">{ISLAMABAD_AGENCY.answer}</p>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">What makes INDUS different among Islamabad web agencies</h2>
          <ul className="mt-5 space-y-2.5">
            {ISLAMABAD_AGENCY.whyLocal.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Services people hire us for</h2>
          <div className="mt-6 space-y-4">
            {ISLAMABAD_AGENCY.services.map((s) => (
              <Link
                key={s.title}
                href={href(s.href)}
                className="block rounded-xl border border-line bg-white p-5 transition hover:border-cyan-200"
              >
                <h3 className="font-bold text-[#0c2340]">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.body}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Deep context: studio + product shelf</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Many “web agencies in Islamabad” only deliver brochure sites. INDUS also operates a{" "}
            <Link href={href("/products")} className="text-cyan-600 hover:underline">
              licensed software shelf
            </Link>{" "}
            — Google Voice auto dialers, AI agents, email tools, scrapers — so clients can buy ready tools or commission
            custom CRMs and dialer platforms. That dual model is rare in the local market and strong for international
            outbound buyers.
          </p>
          <p className="mt-4 leading-relaxed text-muted">
            If you need the{" "}
            <Link href={href("/telecom/use-cases/ai-custom-dialer-crm")} className="text-cyan-600 hover:underline">
              best AI agent custom auto dialers with CRMs
            </Link>{" "}
            or a fully custom CRM, start a project or browse telecom use cases. For pure web design and custom apps, see{" "}
            <Link href={href("/services")} className="text-cyan-600 hover:underline">
              services
            </Link>{" "}
            and{" "}
            <Link href={href("/work")} className="text-cyan-600 hover:underline">
              selected work
            </Link>
            .
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Proof & comparisons</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href={href("/compare/web-agency-islamabad")} className="font-semibold text-cyan-600 hover:underline">
                INDUS vs typical Islamabad agencies →
              </Link>
            </li>
            <li>
              <Link href={href("/work/ai-custom-dialer-crm")} className="font-semibold text-cyan-600 hover:underline">
                AI dialer + custom CRM metrics →
              </Link>
            </li>
            <li>
              <Link href={href("/work/custom-outbound-crm")} className="font-semibold text-cyan-600 hover:underline">
                Custom outbound CRM case study →
              </Link>
            </li>
            <li>
              <Link href={href("/compare/custom-crm-vs-off-the-shelf")} className="font-semibold text-cyan-600 hover:underline">
                Custom CRM vs off-the-shelf →
              </Link>
            </li>
          </ul>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-bold text-[#0c2340]">Local search phrases we cover</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {[...ISLAMABAD_AGENCY.primaryKeywords, ...ISLAMABAD_AGENCY.secondaryKeywords.slice(0, 8)].map((kw) => (
              <li key={kw} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
                {kw}
              </li>
            ))}
          </ul>
        </section>

        <FaqSection faqs={ISLAMABAD_AGENCY.faqs} />

        <div className="mt-10 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-6">
          <p className="font-semibold text-[#0c2340]">Based in Islamabad · Serving the world</p>
          <p className="mt-2 text-sm text-muted">
            WhatsApp {SITE_CONTACT.whatsapp} ·{" "}
            <a href={`mailto:${SITE_CONTACT.email}`} className="text-cyan-600 hover:underline">
              {SITE_CONTACT.email}
            </a>
          </p>
          <Link
            href={href("/start-project")}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:underline"
          >
            Request a quote <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </div>
  );
}
