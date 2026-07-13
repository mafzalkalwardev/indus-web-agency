import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Check } from "lucide-react";
import { getProduct, PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import { getSetupGuide } from "@/lib/setup-guides";
import { SubscribeButton } from "@/components/products/SubscribeButton";
import { SetupGuidePanel } from "@/components/products/SetupGuidePanel";
import { ProductWhatsAppCta } from "@/components/products/ProductWhatsAppCta";
import { PageHero } from "@/components/agency/PageHero";
import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";
import { href } from "@/lib/paths";

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product Not Found" };

  const category = CATEGORY_LABELS[product.category].toLowerCase();
  const description = `${product.description} Available from INDUS Web Agency with secure subscription licensing, setup guidance, and professional support.`;

  return {
    title: `${product.name} ${category}`,
    description,
    keywords: [
      product.name,
      product.tagline,
      ...product.features,
      ...product.techStack,
      ...SITE_SEO.keywords,
    ],
    alternates: {
      canonical: `/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | INDUS Web Agency`,
      description,
      url: `/products/${product.slug}`,
      type: "website",
      images: product.screenshots[0]
        ? [
            {
              url: product.screenshots[0],
              width: 1200,
              height: 630,
              alt: `${product.name} automation software screenshot`,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | INDUS Web Agency`,
      description,
      images: product.screenshots[0] ? [product.screenshots[0]] : undefined,
    },
  };
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
  const productUrl = `${SITE_CONTACT.siteUrl}/products/${product.slug}`;
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    applicationCategory: `${CATEGORY_LABELS[product.category]} Software`,
    operatingSystem: "Windows, Web",
    url: productUrl,
    image: product.screenshots[0] ? `${SITE_CONTACT.siteUrl}${product.screenshots[0]}` : undefined,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: SITE_SEO.name,
    },
    offers: product.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.price,
      priceCurrency: "USD",
      url: productUrl,
      availability: "https://schema.org/InStock",
      category: "subscription",
    })),
  };

  return (
    <div className="bg-paper">
      <ProductWhatsAppCta productName={product.name} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <PageHero
        eyebrow={CATEGORY_LABELS[product.category]}
        title={product.name}
        description={product.tagline}
      >
        <p className="mt-4 max-w-2xl text-base text-slate-300">{product.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {product.techStack.map((t) => (
            <span key={t} className="rounded-md border border-white/20 bg-white/10 px-2.5 py-1 text-xs font-medium text-slate-200">
              {t}
            </span>
          ))}
        </div>
        {product.homepage && (
          <a
            href={product.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 hover:text-cyan-200"
          >
            <ExternalLink className="h-4 w-4" /> Live demo
          </a>
        )}
      </PageHero>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6 text-sm text-slate-500">
        <Link href={href("/products")} className="hover:text-cyan-600">Products</Link>
        {" / "}
        <span>{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <ul className="space-y-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-600" />
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-lg border border-cyan-100 bg-cyan-50/60 p-4 text-sm text-slate-700">
            <p className="font-semibold text-[#0c2340]">Subscription license required</p>
            <p className="mt-1">
              After admin approval, your download includes a signed{" "}
              <code className="text-xs">indus-license-{product.slug}.json</code> file.
              The app verifies online on startup and locks when your period ends.
            </p>
            <a href="/sdk/README.md" className="mt-2 inline-block text-cyan-700 hover:underline">
              Integration SDK for developers
            </a>
          </div>
        </div>

        <div>
          {product.demoVideo && (
            <div className="mb-4 overflow-hidden rounded-lg border border-slate-200 bg-black shadow-lg">
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
            <div className="overflow-hidden rounded-lg border border-slate-200 shadow-lg">
              <Image
                src={product.screenshots[0]}
                alt={`${product.name} automation software screenshot`}
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
                  <Image src={src} alt={`${product.name} feature screenshot`} width={400} height={250} className="w-full object-cover object-top" />
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
              className={`relative flex flex-col rounded-lg border p-6 ${
                plan.highlighted
                  ? "border-cyan-400 bg-cyan-50/50 shadow-lg ring-2 ring-cyan-400"
                  : "border-slate-200 bg-white"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 right-4 rounded-md bg-cyan-600 px-3 py-0.5 text-xs font-bold text-white">
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
                          {val === true ? "Yes" : val === false ? "-" : val ?? "-"}
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
    </div>
  );
}
