import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, Globe, Shield, Download, Clock } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { MotionSection } from "@/components/ui/MotionSection";
import { HeroBackground } from "@/components/ui/HeroBackground";

export default function HomePage() {
  const featured = PRODUCTS.filter((p) =>
    ["mailforge", "dialer-multi-slot", "dialer-ai-multi-slot", "email-verifier-pro"].includes(p.slug)
  );

  return (
    <>
      <section className="gradient-hero relative text-white overflow-hidden">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="motion-frame motion-in">
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
                Professional Automation Suite
              </p>
              <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                INDUS Web Agency
              </h1>
              <p className="mt-6 text-lg text-slate-200">
                Subscribe to auto dialers, email marketing tools, and web scrapers separately.
                Download your software and use it for the duration of your plan.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400 hover:scale-[1.02]"
                >
                  Browse Products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Create Account
                </Link>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-cyan-400/10 blur-3xl" />
              <Image
                src="/images/logo-trimmed.png"
                alt="INDUS Web Agency Logo"
                width={537}
                height={593}
                className="animate-float relative z-10 h-auto w-full max-w-[380px] drop-shadow-[0_0_40px_rgba(34,211,238,0.25)]"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Mail, title: "Email Tools", desc: "Verifier, sender, unified inbox", href: "/products?cat=email" },
            { icon: Phone, title: "Auto Dialers", desc: "4 plans from DOM to AI multi-slot", href: "/products?cat=dialer" },
            { icon: Globe, title: "Web Scrapers", desc: "Playwright, SAFER, lead CRM", href: "/products?cat=scraper" },
            { icon: Shield, title: "Secure Access", desc: "Time-limited subscriptions", href: "/signup" },
          ].map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md hover:-translate-y-1"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <item.icon className="h-8 w-8 text-cyan-600" />
              <h3 className="mt-3 font-bold">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-white py-16" delay={100}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <p className="mt-2 text-slate-600">Our most popular automation tools</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/products" className="text-cyan-600 font-medium hover:text-cyan-800">
              View all {PRODUCTS.length} products →
            </Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6" delay={150}>
        <h2 className="text-center text-3xl font-bold">How It Works</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Sign Up", desc: "Create your customer account in seconds", icon: Shield },
            { step: "2", title: "Subscribe", desc: "Pick individual products and plans that fit your needs", icon: Clock },
            { step: "3", title: "Download & Use", desc: "Download from your dashboard during your subscription period", icon: Download },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0c2340] text-xl font-bold text-white shadow-lg">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <section className="gradient-hero py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Ready to automate your workflow?</h2>
          <p className="mt-4 text-slate-200">
            Join dispatch teams and marketers using INDUS tools. Compare dialer plans or start with email tools today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/compare" className="rounded-lg bg-white px-6 py-3 font-semibold text-[#0c2340] hover:bg-slate-100">
              Compare Dialer Plans
            </Link>
            <Link href="/pricing" className="rounded-lg border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              View All Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
