"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { href } from "@/lib/paths";
import { Button } from "@/components/ui/button";

function ProductsContent({ cat }: { cat: ProductCategory | null }) {
  const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

  return (
    <section id="licensed-downloads" className="scroll-mt-36 border-t border-line bg-paper-sunk/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <p className="eyebrow text-accent">Licensed downloads</p>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Dialers, email tools, and scrapers you can download
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          These are separate from the product sites above. Subscribe, get approved, and download with a signed license.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/tools/dialer-calculator")}>Find my dialer plan</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={href("/resources/dialer-guide")}>Free comparison guide</Link>
          </Button>
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          <Link
            href={href("/products#licensed-downloads")}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              !cat ? "border-[#0c2340] bg-[#0c2340] text-white" : "border-line bg-white text-muted hover:border-slate-400"
            }`}
          >
            All licensed ({PRODUCTS.length})
          </Link>
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={href(`/products?cat=${key}#licensed-downloads`)}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                cat === key ? "border-[#0c2340] bg-[#0c2340] text-white" : "border-line bg-white text-muted hover:border-slate-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ProductsFromSearch() {
  const cat = useSearchParams().get("cat") as ProductCategory | null;
  return <ProductsContent cat={cat} />;
}

export function ProductsClient() {
  return (
    <Suspense fallback={<ProductsContent cat={null} />}>
      <ProductsFromSearch />
    </Suspense>
  );
}
