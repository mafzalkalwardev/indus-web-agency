import Link from "next/link";
import { PRODUCTS, getProductsByCategory } from "@/lib/products";

export const metadata = {
  title: "Pricing — INDUS Web Agency",
};

export default function PricingPage() {
  const dialers = getProductsByCategory("dialer");
  const email = getProductsByCategory("email");
  const scrapers = getProductsByCategory("scraper");
  const bundles = getProductsByCategory("bundle");

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
                      View →
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

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold">Pricing Overview</h1>
      <p className="mt-2 text-slate-600">
        All products are billed monthly. Subscribe individually — no bundles required except Mailforge.
      </p>

      <PricingSection title="Auto Dialers" products={dialers} />
      <PricingSection title="Email Tools" products={email} />
      <PricingSection title="Web Scrapers" products={scrapers} />
      <PricingSection title="Bundles" products={bundles} />

      <div className="mt-12 rounded-2xl bg-[#0c2340] p-8 text-center text-white">
        <h3 className="text-xl font-bold">Not sure which dialer plan?</h3>
        <p className="mt-2 text-slate-300">Compare all four auto dialer tiers side by side.</p>
        <Link href="/compare" className="mt-4 inline-block rounded-lg bg-cyan-500 px-6 py-2 font-semibold hover:bg-cyan-400">
          Compare Dialer Plans
        </Link>
      </div>
    </div>
  );
}
