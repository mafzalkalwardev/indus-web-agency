import Link from "next/link";
import type { Metadata } from "next";
import { PRODUCTS, getProductsByCategory } from "@/lib/products";

export const metadata: Metadata = {
  title: "Automation Software Pricing",
  description:
    "Compare INDUS Web Agency pricing for AI auto dialers, email marketing automation, bulk email verifier software, web scraping tools, and Mailforge subscriptions.",
  alternates: {
    canonical: "/pricing",
  },
};

function PricingSection({ title, products }: { title: string; products: typeof PRODUCTS }) {
  return (
    <section className="mt-14">
      <h2 className="font-bold text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-paper-raised">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line bg-paper-sunk/50 text-left">
              <th className="px-5 py-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">Product</th>
              <th className="px-5 py-3.5 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">Plans</th>
              <th className="px-5 py-3.5 text-right font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">Starting at</th>
              <th className="px-5 py-3.5 text-right font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-muted">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-line last:border-0 transition-colors hover:bg-paper-sunk/40">
                <td className="px-5 py-3.5 font-medium text-ink">{p.name}</td>
                <td className="px-5 py-3.5 text-muted">
                  {p.plans.map((pl) => pl.name).join(", ")}
                </td>
                <td className="px-5 py-3.5 text-right font-semibold text-ink">
                  ${Math.min(...p.plans.map((pl) => pl.price))}/mo
                </td>
                <td className="px-5 py-3.5 text-right">
                  <Link href={`/products/${p.slug}`} className="font-medium text-accent hover:text-accent-strong">
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function PricingPage() {
  const dialers = getProductsByCategory("dialer");
  const email = getProductsByCategory("email");
  const scrapers = getProductsByCategory("scraper");
  const bundles = getProductsByCategory("bundle");

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">Subscription pricing</p>
      </div>
      <h1 className="mt-6 font-bold text-4xl font-medium tracking-tight sm:text-5xl">Software pricing overview</h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
        Compare subscription pricing for AI auto dialer software, email marketing automation,
        bulk email verification, web scraping tools, and Mailforge. Subscribe individually,
        with Mailforge available as the full email operations bundle.
      </p>

      <PricingSection title="Auto Dialers" products={dialers} />
      <PricingSection title="Email Tools" products={email} />
      <PricingSection title="Web Scrapers" products={scrapers} />
      <PricingSection title="Bundles" products={bundles} />

      <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#0c2340] p-10 text-center text-white sm:p-12">
        <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]" />
        <div className="relative z-10">
          <h3 className="text-2xl font-bold tracking-tight">Not sure which dialer plan fits?</h3>
          <p className="mt-2 text-slate-300">Compare all four auto dialer tiers side by side.</p>
          <Link href="/compare" className="mt-6 inline-block rounded-lg bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-cyan-500">
            Compare Dialer Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
