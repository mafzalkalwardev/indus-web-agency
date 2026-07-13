import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { PRODUCTS, CATEGORY_LABELS } from "@/lib/products";
import { href } from "@/lib/paths";

export const metadata = {
  title: "Live Demos — INDUS Web Agency",
  description: "Preview screenshots and demos of our automation tools before you subscribe.",
};

export default function DemosPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="text-center">
        <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent-tint/60 px-3 py-1 font-mono text-[0.68rem] font-medium uppercase tracking-[0.16em] text-accent-strong">Live Previews</span>
        <h1 className="mt-6 font-display text-4xl font-medium tracking-tight sm:text-5xl">See our products in action</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          Real screenshots and demo videos captured from each product. Licensed downloads are available from your dashboard after admin approval.
        </p>
      </div>

      <div className="mt-16 space-y-24">
        {PRODUCTS.map((product) => (
          <section key={product.slug} className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <span className="font-mono text-[0.7rem] font-medium uppercase tracking-[0.16em] text-accent">
                {CATEGORY_LABELS[product.category]}
              </span>
              <h2 className="mt-3 font-display text-2xl font-medium tracking-tight">{product.name}</h2>
              <p className="mt-3 leading-relaxed text-muted">{product.description}</p>
              <ul className="mt-5 space-y-1.5">
                {product.features.slice(0, 4).map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-ink">
                    <span className="h-1 w-1 rounded-full bg-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  href={href(`/products/${product.slug}`)}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition hover:-translate-y-0.5 hover:bg-ink-soft"
                >
                  <Play className="h-4 w-4" /> View Product
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {product.demoVideo && (
                <div className="overflow-hidden rounded-2xl border border-line bg-black">
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
              <div className={`grid gap-3 ${product.screenshots.length > 1 ? "sm:grid-cols-2" : ""}`}>
                {product.screenshots.slice(0, product.demoVideo ? 4 : 5).map((src, i) => (
                  <div
                    key={src}
                    className={`overflow-hidden rounded-2xl border border-line ${!product.demoVideo && i === 0 ? "sm:col-span-2" : ""}`}
                  >
                    <Image
                      src={src}
                      alt={`${product.name} screenshot ${i + 1}`}
                      width={600}
                      height={380}
                      className="w-full object-cover object-top"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="grain-dark relative mt-20 overflow-hidden rounded-3xl bg-ink p-12 text-center text-paper sm:p-16">
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-accent/20 blur-[110px]" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">Ready to get started?</h2>
          <p className="mt-3 text-paper/60">Choose weekly, monthly, or yearly billing. Admin approves within 24 hours.</p>
          <Link href={href("/products")} className="mt-8 inline-block rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-accent-strong">
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
}
