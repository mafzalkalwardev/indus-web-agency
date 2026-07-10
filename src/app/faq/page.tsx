import Link from "next/link";
import type { Metadata } from "next";
import { href } from "@/lib/paths";
import { FAQ_ITEMS } from "@/lib/faq-content";
import { SITE_CONTACT } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Automation Software FAQ",
  description:
    "Frequently asked questions about INDUS Web Agency subscriptions, software licenses, product downloads, setup guides, and support.",
  alternates: {
    canonical: "/faq",
  },
};

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-2 text-slate-600">
        Answers about automation software subscriptions, licenses, device limits, downloads, and support. Need more help?{" "}
        <a href={`mailto:${SITE_CONTACT.email}`} className="text-cyan-600 hover:underline">
          {SITE_CONTACT.email}
        </a>
      </p>

      <div className="mt-10 space-y-6">
        {FAQ_ITEMS.map((item) => (
          <article key={item.q} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-[#0c2340]">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">
        <Link href={href("/products")} className="text-cyan-600 hover:underline">Browse products</Link>
        {" | "}
        <Link href={href("/compare")} className="text-cyan-600 hover:underline">Compare dialers</Link>
      </p>
    </div>
  );
}
