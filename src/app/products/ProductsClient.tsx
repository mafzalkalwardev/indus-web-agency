"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

function ProductsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") as ProductCategory | null;
  const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-accent" />
        <p className="eyebrow text-accent">Software shelf</p>
      </div>
      <h1 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
        Automation products for sales, dispatch &amp; email
      </h1>
      <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted">
        Subscribe to professional AI auto dialers, email marketing automation, bulk email verification,
        web scraping tools, and lead generation software. Every product includes secure dashboard
        downloads, subscription licensing, and setup guidance.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <a
          href={`${basePath}/products`}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            !cat ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper-raised text-muted hover:border-ink hover:text-ink"
          }`}
        >
          All
        </a>
        {categories.map(([key, label]) => (
          <a
            key={key}
            href={`${basePath}/products?cat=${key}`}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              cat === key ? "border-ink bg-ink text-paper" : "border-line-strong bg-paper-raised text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {label}
          </a>
        ))}
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}

export function ProductsClient() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-muted">Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
