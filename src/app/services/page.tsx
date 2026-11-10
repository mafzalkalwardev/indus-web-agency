import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/agency/FadeIn";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";
import { ServicesPageContent } from "@/components/agency/ServicesPageContent";
import { FaqSection } from "@/components/seo/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { AGENCY_SERVICES, SERVICE_FAQS } from "@/lib/agency-services";
import { breadcrumbJsonLd, faqPageJsonLd, serviceOfferCatalogJsonLd } from "@/lib/schema";
import { pageSocialMeta } from "@/lib/seo-meta";

const title = "Custom software, AI, and automation services";
const description =
  "Custom web development, AI chatbots on Slack, Telegram, and WhatsApp, RAG and local-LLM systems, workflow automation, dialers, CRMs, email and phone verification, data collection, freight software, and SEO, AEO, and GEO.";

export const metadata: Metadata = {
  title,
  description,
  ...pageSocialMeta({
    title,
    description,
    path: "/services",
    keywords: [
      "custom web development",
      "AI chatbot Slack Telegram WhatsApp",
      "RAG knowledge assistant",
      "self-hosted AI",
      "n8n Make Zapier automation",
      "AI auto dialer",
      "carrier CRM",
      "email verification",
      "phone number verification",
      "freight dispatch software",
      "SEO AEO GEO",
    ],
  }),
};

export default function ServicesPage() {
  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]),
    serviceOfferCatalogJsonLd({
      name: "INDUS Web Agency services",
      description,
      path: "/services",
      services: AGENCY_SERVICES.map((service) => ({
        name: service.title,
        description: service.description,
      })),
    }),
    faqPageJsonLd([...SERVICE_FAQS]),
  ];

  return (
    <div className="bg-paper">
      <JsonLd data={jsonLd} />
      <section className="relative overflow-hidden border-b border-line bg-[#0c2340] py-24 text-white sm:py-28">
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-cyan-400" />
              <p className="eyebrow text-slate-300">Agency services</p>
            </div>
            <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              Custom builds. Considered craft. Production-ready delivery.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
              From custom websites to AI assistants, dialers, freight software, and search visibility —
              we design, build, and ship systems your team can rely on.
            </p>
            <Button asChild className="mt-9" size="lg">
              <Link href={href("/start-project")}>
                Request a quote <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </FadeIn>
        </div>
      </section>
      <ServicesPageContent />
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <FaqSection faqs={[...SERVICE_FAQS]} />
      </section>
    </div>
  );
}
