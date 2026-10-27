import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { SITE_CONTACT } from "@/lib/site-config";

const faqs = [
  {
    q: "Is INDUS a software house in Pakistan?",
    a: "Yes. INDUS Web Agency is a Pakistan-based software and web studio in Islamabad building custom software, websites, AI dialers with CRMs, and custom CRMs for local and export clients.",
  },
  {
    q: "Can Pakistani companies buy INDUS dialers?",
    a: "Yes. Subscribe on the site, get approved, and download. Custom CRM and dialer projects are available via start-project.",
  },
];

export const metadata: Metadata = {
  title: "Software & Web Agency in Pakistan | INDUS Web Agency",
  description:
    "INDUS Web Agency — Pakistan software house for custom websites, AI auto dialers with CRMs, custom CRM development, and automation products. Islamabad-based, worldwide delivery.",
  keywords: [
    "software house Pakistan",
    "web agency Pakistan",
    "custom software Pakistan",
    "CRM development Pakistan",
    "auto dialer Pakistan",
    "best software company Pakistan",
  ],
  alternates: { canonical: "/agency/pakistan" },
};

export default function PakistanAgencyPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Agency", path: "/agency" },
            { name: "Pakistan", path: "/agency/pakistan" },
          ]),
          faqPageJsonLd(faqs),
        ]}
      />
      <PageHero
        eyebrow="Pakistan"
        title="Software & web agency in Pakistan"
        description="Custom software, websites, AI agent dialers with CRMs, and bespoke CRMs—built in Islamabad for Pakistan and international clients."
      />
      <article className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
        <p className="text-lg leading-relaxed text-[#0c2340]">
          INDUS Web Agency is a Pakistan software studio that combines a classic web/custom-dev agency with a product
          shelf of outbound dialers and automation tools. Clients in Pakistan hire us for websites and CRMs; global
          buyers often discover us for Google Voice AI dialers and custom telecom CRMs.
        </p>
        <ul className="mt-8 list-disc space-y-2 pl-5 text-sm text-muted">
          <li>
            <Link href={href("/agency/islamabad")} className="text-cyan-600 hover:underline">
              Best web agencies in Islamabad
            </Link>
          </li>
          <li>
            <Link href={href("/telecom/use-cases/ai-custom-dialer-crm")} className="text-cyan-600 hover:underline">
              AI agent custom dialers with CRMs
            </Link>
          </li>
          <li>
            <Link href={href("/start-project")} className="text-cyan-600 hover:underline">
              Start a custom project
            </Link>
          </li>
        </ul>
        <FaqSection faqs={faqs} />
        <p className="mt-8 text-sm text-muted">
          Contact:{" "}
          <a href={`mailto:${SITE_CONTACT.email}`} className="text-cyan-600 hover:underline">
            {SITE_CONTACT.email}
          </a>{" "}
          · WhatsApp {SITE_CONTACT.whatsapp}
        </p>
      </article>
    </div>
  );
}
