import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { getProduct, PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import { getSetupGuide } from "@/lib/setup-guides";
import { SubscribeButton } from "@/components/products/SubscribeButton";
import { SetupGuidePanel } from "@/components/products/SetupGuidePanel";
export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };
  return { title: `${product.name} — INDUS Web Agency`, description: product.description };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const setupGuide = getSetupGuide(slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6 text-sm text-slate-500">
        <Link href="/products" className="hover:text-cyan-600">Products</Link>
        {" / "}
        <span>{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-700">
            {CATEGORY_LABELS[product.category]}
          </span>
          <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-lg text-slate-600">{product.tagline}</p>
          <p className="mt-4 text-slate-700">{product.description}</p>

          <div className="mt-4 rounded-xl border border-cyan-100 bg-cyan-50/60 p-4 text-sm text-slate-700">
            <p className="font-semibold text-[#0c2340]">Subscription license included</p>
            <p className="mt-1">
              After admin approval, download from your dashboard includes a license file.
              The app verifies online on startup and stops working when your period ends
              (7, 15, 30 days, or yearly).
            </p>
            <a href="/sdk/README.md" className="mt-2 inline-block text-cyan-700 hover:underline">
              Developer SDK →
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {product.techStack.map((t) => (
              <span key={t} className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-6 flex gap-4">
            {product.homepage && (
              <a
                href={product.homepage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-[#0c2340]"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>

          <ul className="mt-8 space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-xl border border-cyan-100 bg-cyan-50/60 p-4 text-sm text-slate-700">
            <p className="font-semibold text-[#0c2340]">Subscription license required</p>
            <p className="mt-1">
              After admin approval, download includes a signed <code className="text-xs">indus-license-{product.slug}.json</code> file.
              The app verifies online on startup and locks when your period ends (7, 15, 30, or 365 days).
            </p>
            <a href="/sdk/README.md" className="mt-2 inline-block text-cyan-700 hover:underline">
              Integration SDK for developers →
            </a>
          </div>

          <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-cyan-950">
            <p className="font-semibold">Time-limited subscription license</p>
            <p className="mt-1 text-cyan-900">
              After admin approval you get a license file with your download. Choose 7, 15, 30, or 365 days.
              The product verifies online on startup and stops working when the period ends.
            </p>
            <a href="/sdk/README.md" className="mt-2 inline-block font-medium text-cyan-700 hover:underline">
              Developer SDK →
            </a>
          </div>
        </div>

        <div>
          {product.demoVideo && (
            <div className="mb-4 overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-lg">
              <video
                src={product.demoVideo}
                controls
                playsInline
                preload="metadata"
                className="w-full"
                poster={product.screenshots[0]}
              >
                Your browser does not support video playback.
              </video>
            </div>
          )}
          {product.screenshots.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg">
              <Image
                src={product.screenshots[0]}
                alt={`${product.name} screenshot`}
                width={800}
                height={500}
                className="w-full object-cover object-top"
              />
            </div>
          )}
          {product.screenshots.length > 1 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {product.screenshots.slice(1, 5).map((src) => (
                <div key={src} className="overflow-hidden rounded-lg border border-slate-200">
                  <Image src={src} alt="Screenshot" width={400} height={250} className="w-full object-cover object-top" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Choose a Plan</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-cyan-400 bg-cyan-50/50 shadow-lg ring-2 ring-cyan-400"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-4 rounded-full bg-cyan-600 px-3 py-0.5 text-xs font-bold text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-bold">{plan.name}</h3>
              <p className="mt-2">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-slate-500">/{plan.period}</span>
              </p>
              <ul className="mt-4 flex-1 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <SubscribeButton productSlug={product.slug} plan={plan} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {setupGuide && <SetupGuidePanel guide={setupGuide} productName={product.name} />}

      {product.comparison && product.comparison.length > 0 && (
        <section className="mt-16 overflow-x-auto">
          <h2 className="text-2xl font-bold">Plan Comparison</h2>
          <table className="mt-6 w-full min-w-[500px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-3 text-left font-semibold">Feature</th>
                {product.plans.map((p) => (
                  <th key={p.id} className="py-3 text-center font-semibold">{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.comparison.map((row) => {
                const keys = ["starter", "pro", "business", "enterprise"] as const;
                return (
                  <tr key={row.feature} className="border-b border-slate-100">
                    <td className="py-3 font-medium">{row.feature}</td>
                    {product.plans.map((p, i) => {
                      const key = keys[i];
                      const val = key ? row[key] : undefined;
                      return (
                        <td key={p.id} className="py-3 text-center">
                          {val === true ? "✓" : val === false ? "—" : val ?? "—"}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
}
