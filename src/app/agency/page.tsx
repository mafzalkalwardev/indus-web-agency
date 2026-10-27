import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/agency/PageHero";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";
import { href } from "@/lib/paths";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Web & Software Agency — Islamabad & Worldwide | INDUS",
  description:
    "INDUS Web Agency — Islamabad software studio for custom websites, AI auto dialers with CRMs, custom CRM development, and automation products. Local presence, global delivery.",
  alternates: { canonical: "/agency" },
};

const links = [
  {
    href: "/agency/islamabad",
    title: "Best web agencies in Islamabad",
    body: "Local SEO hub for Islamabad clients searching web agencies, software houses, and CRM developers.",
  },
  {
    href: "/agency/pakistan",
    title: "Software & web agency in Pakistan",
    body: "Pakistan-wide positioning for custom software, dialers, and CRM builds.",
  },
  {
    href: "/telecom/use-cases/ai-custom-dialer-crm",
    title: "AI agent custom dialers + CRMs",
    body: "Best AI agent custom auto dialers with CRMs and fully custom CRM projects.",
  },
  {
    href: "/start-project",
    title: "Start a project",
    body: "Quote for websites, apps, dialers, or bespoke CRMs.",
  },
];

export default function AgencyHubPage() {
  return (
    <div className="bg-paper">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Agency", path: "/agency" },
        ])}
      />
      <PageHero
        eyebrow="Studio · Local + global"
        title="Web & software agency — Islamabad base, worldwide clients"
        description="INDUS is both a product company and a custom studio. Search for web agencies in Islamabad or AI dialer+CRM builders worldwide—we cover both."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={href(l.href)}
              className="group rounded-2xl border border-line bg-white p-6 transition hover:border-cyan-200 hover:shadow-md"
            >
              <h2 className="text-lg font-bold text-[#0c2340] group-hover:text-cyan-700">{l.title}</h2>
              <p className="mt-2 text-sm text-muted">{l.body}</p>
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
