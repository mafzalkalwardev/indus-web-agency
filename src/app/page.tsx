import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail, Phone, Globe, Shield, Download, Clock, CheckCircle2 } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { PRODUCTS } from "@/lib/products";
import { MotionSection } from "@/components/ui/MotionSection";

const featured = PRODUCTS.filter((p) =>
  ["mailforge", "dialer-multi-slot", "dialer-ai-multi-slot", "email-verifier-pro"].includes(p.slug)
);

const capabilities = [
  {
    icon: Phone,
    title: "AI Auto Dialer Software",
    desc: "Google Voice auto dialers, predictive multi-slot dialing, voicemail detection, call logs, and dispatch workflow automation.",
    href: "/products?cat=dialer",
  },
  {
    icon: Mail,
    title: "Email Marketing Automation",
    desc: "Bulk email verification, SMTP outreach tools, unified inbox management, and Mailforge email operations.",
    href: "/products?cat=email",
  },
  {
    icon: Globe,
    title: "Web Scraping & Lead Generation",
    desc: "Playwright web scraping tools, FMCSA SAFER extraction, lead generation software, and data export systems.",
    href: "/products?cat=scraper",
  },
  {
    icon: Shield,
    title: "Secure Subscription Licensing",
    desc: "Dashboard downloads, signed license files, online verification, and time-limited access for every product.",
    href: "/signup",
  },
];

const proofPoints = [
  "Business automation software built for real sales and dispatch workflows",
  "Custom software development across Python, Node.js, Playwright, React, and desktop apps",
  "Professional setup guides, product demos, and subscription support",
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#0c2340] text-white">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-white" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="motion-frame motion-in">
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-300">
              Professional web agency and automation software company
            </p>
            <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              INDUS Web Agency builds automation tools that move business faster.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Subscribe to production-ready AI auto dialers, email marketing automation,
              bulk email verifier software, web scraping tools, and lead generation systems
              built for operators who need reliable results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-md bg-cyan-500 px-6 py-3 font-semibold text-white transition hover:bg-cyan-400"
              >
                Browse Software <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/demos"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                View Demos
              </Link>
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-lg border border-white/10 bg-white p-6 shadow-2xl">
              <Image
                src="/images/logo-trimmed.png"
                alt="INDUS Web Agency automation software company logo"
                width={537}
                height={593}
                className="mx-auto h-auto w-full max-w-[320px]"
                priority
              />
              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  ["13+", "Software products"],
                  ["4", "Core automation categories"],
                  ["24h", "Approval target"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-md border border-slate-200 bg-slate-50 p-3">
                    <p className="text-xl font-bold text-[#0c2340]">{value}</p>
                    <p className="mt-1 text-xs text-slate-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MotionSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">What INDUS builds</p>
          <h2 className="mt-2 text-3xl font-bold">Software for teams that depend on outbound operations.</h2>
          <p className="mt-3 text-slate-600">
            INDUS Web Agency combines custom software development, web automation, and subscription-ready
            licensing into practical tools for dispatch teams, marketers, sales operators, and lead researchers.
          </p>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-300 hover:shadow-md"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <item.icon className="h-8 w-8 text-cyan-600" />
              <h3 className="mt-4 font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </Link>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-white py-16" delay={100}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Featured products</p>
              <h2 className="mt-2 text-3xl font-bold">Popular automation software subscriptions</h2>
              <p className="mt-2 max-w-2xl text-slate-600">
                Start with focused software for dialing, email verification, email operations, or full AI-powered outbound automation.
              </p>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-medium text-cyan-700 hover:text-cyan-900">
              View all {PRODUCTS.length} products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-7xl px-4 py-16 sm:px-6" delay={150}>
        <h2 className="text-center text-3xl font-bold">How subscriptions work</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {[
            { step: "1", title: "Create an account", desc: "Sign up and choose the business automation software you need.", icon: Shield },
            { step: "2", title: "Select a plan", desc: "Subscribe to individual products with weekly, monthly, or yearly access.", icon: Clock },
            { step: "3", title: "Download and operate", desc: "Use dashboard downloads, setup guides, and license verification during your active period.", icon: Download },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-md bg-[#0c2340] text-xl font-bold text-white shadow-lg">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </MotionSection>

      <section className="bg-[#0c2340] py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-bold">Ready to automate your workflow?</h2>
          <p className="mt-4 text-slate-200">
            Compare AI auto dialer plans, browse email marketing automation tools, or start with a focused web scraping product today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/compare" className="rounded-md bg-white px-6 py-3 font-semibold text-[#0c2340] hover:bg-slate-100">
              Compare Dialer Plans
            </Link>
            <Link href="/pricing" className="rounded-md border border-white/30 px-6 py-3 font-semibold hover:bg-white/10">
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
