import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AgencyHero } from "@/components/agency/AgencyHero";
import { FadeIn } from "@/components/agency/FadeIn";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { href } from "@/lib/paths";
import { ServiceCardsGrid, PortfolioPreviewGrid } from "@/components/agency/HomeMotionBlocks";

const featured = PRODUCTS.filter((p) =>
  ["mailforge", "dialer-multi-slot", "dialer-ai-multi-slot", "email-verifier-pro"].includes(p.slug)
);

const marquee = [
  "Next.js", "React", "TypeScript", "Three.js", "GSAP", "Framer Motion",
  "Node.js", "PostgreSQL", "Tailwind", "Python", "Automation", "AI Integration",
];

export default function HomePage() {
  return (
    <>
      <AgencyHero />

      {/* Capabilities marquee */}
      <section className="border-y border-line bg-paper py-6">
        <div className="flex items-center gap-4">
          <div className="relative flex w-full overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
              {[...marquee, ...marquee].map((item, i) => (
                <span key={i} className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {item}
                  <span className="ml-10 text-accent/60">/</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-accent">01 — What we do</p>
            <h2 className="mt-5 font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
              Custom software &amp; websites, built to last
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Need something built from scratch? We take on bespoke software, web apps, and automation —
              with the same engineering care behind our own products.
            </p>
          </div>
          <Link
            href={href("/services")}
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
          >
            <span className="link-underline">All services</span>
            <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </FadeIn>

        <ServiceCardsGrid />
      </section>

      {/* Selected work — dark section */}
      <section className="grain-dark relative overflow-hidden bg-ink py-24 text-paper">
        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow text-accent">02 — Selected work</p>
              <h2 className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl">
                Production systems, shipped
              </h2>
              <p className="mt-4 max-w-lg text-paper/60">
                Real products we&apos;ve designed, built, and put in front of users.
              </p>
            </div>
            <Link href={href("/work")} className="group inline-flex items-center gap-1.5 text-sm font-medium text-paper">
              <span className="link-underline">View portfolio</span>
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </FadeIn>
          <PortfolioPreviewGrid />
        </div>
      </section>

      {/* Software products */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn className="max-w-2xl">
          <p className="eyebrow text-accent">03 — Off the shelf</p>
          <h2 className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Ready-made automation products
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">
            Subscribe to dialers, email tools, and scrapers — download instantly after approval.
          </p>
        </FadeIn>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <div className="mt-10">
          <Button asChild variant="secondary">
            <Link href={href("/products")}>All {PRODUCTS.length} products <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Two ways to work */}
      <section className="border-t border-line bg-paper-sunk/50 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <FadeIn>
            <p className="eyebrow text-accent">04 — How we work</p>
            <h2 className="mt-5 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Two ways to work with us
            </h2>
          </FadeIn>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <FadeIn delay={0.1} className="flex flex-col rounded-2xl border border-line bg-paper-raised p-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Custom project</span>
              <h3 className="mt-3 font-display text-2xl font-medium">Built for you, end to end</h3>
              <p className="mt-2 text-sm text-muted">Website, app, or automation designed and shipped by our team.</p>
              <ol className="mt-8 space-y-4 text-sm">
                {["Submit your brief", "Discovery & proposal", "Design, build & launch", "Ongoing support"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{s}</span>
                  </li>
                ))}
              </ol>
              <Button asChild className="mt-8 self-start">
                <Link href={href("/start-project")}>Start a project</Link>
              </Button>
            </FadeIn>
            <FadeIn delay={0.2} className="flex flex-col rounded-2xl border border-line bg-paper-raised p-8">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Software subscription</span>
              <h3 className="mt-3 font-display text-2xl font-medium">License our existing tools</h3>
              <p className="mt-2 text-sm text-muted">Use battle-tested products with secure, licensed downloads.</p>
              <ol className="mt-8 space-y-4 text-sm">
                {["Create your account", "Subscribe to a product", "Admin approves access", "Download & operate"].map((s, i) => (
                  <li key={s} className="flex items-center gap-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-ink">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-ink">{s}</span>
                  </li>
                ))}
              </ol>
              <Button asChild variant="navy" className="mt-8 self-start">
                <Link href={href("/signup")}>Browse &amp; subscribe</Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="grain-dark relative overflow-hidden bg-ink py-28 text-paper">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]" />
        <FadeIn className="relative z-10 mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="font-display text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
            Ready to build something worth keeping?
          </h2>
          <p className="mt-5 text-lg text-paper/60">
            Custom project or off-the-shelf software — let&apos;s help you move faster.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href={href("/start-project")}>Start a project <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href={href("/demos")}>View live demos</Link>
            </Button>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
