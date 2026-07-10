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
    <section className="mt-12">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-sm">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Plans</th>
              <th className="px-4 py-3 text-right">Starting at</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.slug} className="border-b border-slate-100 hover:bg-slate-50">
                <td className="px-4 py-3 font-medium">{p.name}</td>
                <td className="px-4 py-3 text-slate-600">
                  {p.plans.map((pl) => pl.name).join(", ")}
                </td>
                <td className="px-4 py-3 text-right font-semibold">
                  ${Math.min(...p.plans.map((pl) => pl.price))}/mo
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/products/${p.slug}`} className="text-cyan-600 hover:text-cyan-800">
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Subscription pricing</p>
      <h1 className="mt-2 text-3xl font-bold">Automation Software Pricing Overview</h1>
      <p className="mt-3 max-w-3xl text-slate-600">
        Compare subscription pricing for AI auto dialer software, email marketing automation,
        bulk email verification, web scraping tools, and Mailforge. Subscribe individually,
        with Mailforge available as the full email operations bundle.
      </p>

      <PricingSection title="Auto Dialers" products={dialers} />
      <PricingSection title="Email Tools" products={email} />
      <PricingSection title="Web Scrapers" products={scrapers} />
      <PricingSection title="Bundles" products={bundles} />

      <div className="mt-12 rounded-lg bg-[#0c2340] p-8 text-center text-white">
        <h3 className="text-xl font-bold">Not sure which dialer plan fits?</h3>
        <p className="mt-2 text-slate-300">Compare all four auto dialer tiers side by side.</p>
        <Link href="/compare" className="mt-4 inline-block rounded-md bg-cyan-500 px-6 py-2 font-semibold hover:bg-cyan-400">
          Compare Dialer Plans
        </Link>
      </div>
    </div>
  );
}
