"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PRODUCTS, CATEGORY_LABELS, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { PageHero } from "@/components/agency/PageHero";
import { href } from "@/lib/paths";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function ProductsContent() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") as ProductCategory | null;
  const filtered = cat ? PRODUCTS.filter((p) => p.category === cat) : PRODUCTS;
  const categories = Object.entries(CATEGORY_LABELS) as [ProductCategory, string][];

  return (
    <>
      <PageHero
        eyebrow="Software shelf"
        title="Automation products for sales, dispatch & email"
        description="Subscribe to professional AI auto dialers, email marketing automation, bulk email verification, and web scraping tools — secure downloads with signed licenses."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="outline" size="lg">
            <Link href={href("/tools/dialer-calculator")}>Find my dialer plan</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={href("/resources/dialer-guide")}>Free comparison guide</Link>
          </Button>
        </div>
      </PageHero>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-wrap gap-2">
          <Link
            href={href("/products")}
            className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
              !cat ? "border-[#0c2340] bg-[#0c2340] text-white" : "border-line bg-white text-muted hover:border-slate-400"
            }`}
          >
            All ({PRODUCTS.length})
          </Link>
          {categories.map(([key, label]) => (
            <Link
              key={key}
              href={href(`/products?cat=${key}`)}
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

        <div className="mt-14 rounded-2xl border border-cyan-200 bg-cyan-50/50 p-8 text-center sm:text-left">
          <p className="font-semibold text-[#0c2340]">Need something custom instead?</p>
          <p className="mt-2 text-sm text-muted">
            We also build bespoke dialers, email platforms, and automation — not just off-the-shelf tools.
          </p>
          <Link
            href={href("/start-project")}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-600 hover:underline"
          >
            Start a custom project <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}

export function ProductsClient() {
  return (
    <Suspense fallback={<div className="min-h-[40vh] bg-[#0c2340]" />}>
      <ProductsContent />
    </Suspense>
  );
}
