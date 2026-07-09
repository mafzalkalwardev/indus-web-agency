import Link from "next/link";
import { href } from "@/lib/paths";
import { FAQ_ITEMS } from "@/lib/faq-content";
import { SITE_CONTACT } from "@/lib/site-config";

export const metadata = {
  title: "FAQ — INDUS Web Agency",
  description: "Frequently asked questions about subscriptions, licenses, downloads, and support.",
};

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-2 text-slate-600">
        Answers about subscriptions, licenses, device limits, and support. Need more help?{" "}
        <a href={`mailto:${SITE_CONTACT.email}`} className="text-cyan-600 hover:underline">
          {SITE_CONTACT.email}
        </a>
      </p>

      <div className="mt-10 space-y-6">
        {FAQ_ITEMS.map((item) => (
          <article key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-semibold text-[#0c2340]">{item.q}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.a}</p>
          </article>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-slate-500">
        <Link href={href("/products")} className="text-cyan-600 hover:underline">Browse products</Link>
        {" · "}
        <Link href={href("/compare")} className="text-cyan-600 hover:underline">Compare dialers</Link>
      </p>
    </div>
  );
}
