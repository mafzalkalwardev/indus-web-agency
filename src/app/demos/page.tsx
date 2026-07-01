import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import { href } from "@/lib/paths";

export const metadata = {
  title: "Live Demos — INDUS Web Agency",
  description: "Preview screenshots and demos of our automation tools before you subscribe.",
};

const DEMO_HIGHLIGHTS = [
  {
    slug: "dialer-multi-slot",
    images: ["/images/screenshots/dialer-light.png", "/images/screenshots/live-calls-light.png", "/images/screenshots/administration-light.png"],
  },
  {
    slug: "dialer-ai-multi-slot",
    images: ["/images/screenshots/live-calls-dark.png", "/images/screenshots/crm-dark.png"],
  },
  {
    slug: "email-verifier-pro",
    images: ["/images/products/email-verifier.svg"],
  },
  {
    slug: "mailforge",
    images: ["/images/products/mailforge.svg"],
  },
];

export default function DemosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">Live Previews</span>
        <h1 className="mt-4 text-4xl font-bold">See Our Products in Action</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Explore screenshots and demos before subscribing. Every product includes full source access after admin approval.
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {DEMO_HIGHLIGHTS.map(({ slug, images }) => {
          const product = PRODUCTS.find((p) => p.slug === slug);
          if (!product) return null;
          return (
            <section key={slug} className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600">
                  {CATEGORY_LABELS[product.category]}
                </span>
                <h2 className="mt-2 text-2xl font-bold">{product.name}</h2>
                <p className="mt-3 text-slate-600">{product.description}</p>
                <ul className="mt-4 space-y-1">
                  {product.features.slice(0, 4).map((f) => (
                    <li key={f} className="text-sm text-slate-600">✓ {f}</li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={href(`/products/${slug}`)} className="inline-flex items-center gap-2 rounded-lg bg-[#0c2340] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1a3a5c]">
                    <Play className="h-4 w-4" /> Subscribe
                  </Link>
                  <a href={product.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-5 py-2.5 text-sm font-medium hover:bg-slate-50">
                    <ExternalLink className="h-4 w-4" /> GitHub
                  </a>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {images.map((src, i) => (
                  <div key={src} className={`overflow-hidden rounded-xl border border-slate-200 shadow-lg ${i === 0 ? "sm:col-span-2" : ""}`}>
                    <Image src={src} alt={`${product.name} demo`} width={600} height={380} className="w-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-16 rounded-2xl gradient-hero p-10 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <p className="mt-2 text-slate-200">Choose weekly, monthly, or yearly billing. Admin approves within 24 hours.</p>
        <Link href={href("/products")} className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-[#0c2340] hover:bg-slate-100">
          View All Products
        </Link>
      </div>
    </div>
  );
}
