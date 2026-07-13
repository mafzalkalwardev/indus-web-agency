import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, ArrowRight, Hammer, Boxes, MapPin } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-config";
import { href, basePath } from "@/lib/paths";
import { FOOTER_STUDIO_LINKS, FOOTER_PRODUCT_LINKS } from "@/lib/site-nav";

export function Footer() {
  const bp = basePath();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#0c2340] text-slate-300">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 sm:pt-20">
        {/* Dual-path CTA */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition group-hover:bg-cyan-500/20" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                <Hammer className="h-3 w-3" /> Custom builds
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                Need software built for your business?
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                Websites, apps, dialers, and automation — scoped, designed, and shipped by our studio.
                Typical response within 24 hours.
              </p>
              <Link
                href={href("/start-project")}
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500"
              >
                Start a project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-cyan-500/10 blur-2xl transition group-hover:bg-cyan-500/20" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-cyan-300">
                <Boxes className="h-3 w-3" /> Software shelf
              </span>
              <h2 className="mt-4 text-2xl font-bold leading-tight text-white sm:text-3xl">
                Ready-made tools you can license today
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
                13 production dialers, email tools, and scrapers. Subscribe, get approved, download with a
                signed license — from $19/mo.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={href("/products")}
                  className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#0c2340] transition hover:bg-slate-100"
                >
                  Browse products <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={href("/demos")}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/25 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Live demos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Link grid */}
        <div className="mt-14 grid gap-10 border-t border-white/10 pt-14 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link href={href("/")} className="inline-flex items-center gap-2.5">
              <Image
                src={`${bp}/images/logo-icon.png`}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
              <div>
                <span className="block text-lg font-bold text-white">INDUS</span>
                <span className="block text-xs text-cyan-400">Web Agency</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
              A software studio and product company — we build custom solutions for clients and ship the
              same battle-tested automation tools as subscriptions.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">50+ projects shipped</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">13 licensed products</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300">24h response</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
              Studio
            </h4>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_STUDIO_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="text-sm text-slate-300 transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
              Product shelf
            </h4>
            <ul className="mt-4 space-y-3">
              {FOOTER_PRODUCT_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="group block text-sm transition">
                    <span className="text-slate-300 group-hover:text-white">{item.label}</span>
                    <span className="mt-0.5 block text-xs text-slate-500 group-hover:text-slate-400">{item.hint}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link href={href("/pricing")} className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300">
                  View all pricing →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
              Resources
            </h4>
            <ul className="mt-4 space-y-2.5">
              <li><Link href={href("/guides")} className="text-sm text-slate-300 transition hover:text-white">Guides & articles</Link></li>
              <li><Link href={href("/tools/dialer-calculator")} className="text-sm text-slate-300 transition hover:text-white">Dialer calculator</Link></li>
              <li><Link href={href("/resources/dialer-guide")} className="text-sm text-slate-300 transition hover:text-white">Free comparison guide</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
              Get in touch
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-slate-300 transition hover:text-white">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 fill-[#25D366]" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-slate-300 transition hover:text-white">
                  WhatsApp — chat now
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <a href={SITE_CONTACT.whatsappUrl} className="text-slate-300 transition hover:text-white">
                  {SITE_CONTACT.whatsapp}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                <span className="text-slate-400">Islamabad, Pakistan · Remote worldwide</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative mt-12 border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-center text-xs text-slate-500 sm:text-left">
            © {year} INDUS Web Agency. Custom software studio &amp; automation product shelf.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-500">
            <Link href={href("/faq")} className="transition hover:text-cyan-400">FAQ</Link>
            <Link href={href("/terms")} className="transition hover:text-cyan-400">Terms</Link>
            <Link href={href("/privacy")} className="transition hover:text-cyan-400">Privacy</Link>
            <Link href={href("/signup")} className="transition hover:text-cyan-400">Create account</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
