import Link from "next/link";
import { Mail, Phone, ArrowUpRight } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";

const footerNav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/start-project", label: "Start a project" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
  { href: "/demos", label: "Live Demos" },
  { href: "/pricing", label: "Pricing" },
  { href: "/compare", label: "Compare" },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-ink text-paper/70">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8">
        {/* Big statement */}
        <div className="flex flex-col gap-8 border-b border-white/10 pb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-accent">Let&apos;s build</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-paper sm:text-5xl">
              Have something worth building well?
            </h2>
          </div>
          <Link
            href={href("/start-project")}
            className="group inline-flex items-center gap-2 self-start rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-accent-strong md:self-auto"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-2xl font-medium tracking-tight text-paper">INDUS</span>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/50">
              A software studio building custom products, websites, and automation — plus a shelf of
              ready-made tools you can license today.
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-paper/40">Navigate</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={href(item.href)} className="text-paper/70 transition hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-paper/40">Products</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link href={href("/products?cat=email")} className="text-paper/70 transition hover:text-accent">Email Tools</Link></li>
              <li><Link href={href("/products?cat=dialer")} className="text-paper/70 transition hover:text-accent">Auto Dialers</Link></li>
              <li><Link href={href("/products?cat=scraper")} className="text-paper/70 transition hover:text-accent">Web Scrapers</Link></li>
              <li><Link href={href("/products/mailforge")} className="text-paper/70 transition hover:text-accent">Mailforge Bundle</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-paper/40">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${SITE_CONTACT.email}`} className="text-paper/70 transition hover:text-accent">
                  {SITE_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[#25D366]" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-paper/70 transition hover:text-accent">
                  WhatsApp Chat
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={SITE_CONTACT.whatsappUrl} className="text-paper/70 transition hover:text-accent">
                  {SITE_CONTACT.whatsapp}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-xs text-paper/40">
            © {new Date().getFullYear()} INDUS Web Agency. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-paper/50">
            <Link href={href("/faq")} className="transition hover:text-accent">FAQ</Link>
            <Link href={href("/terms")} className="transition hover:text-accent">Terms</Link>
            <Link href={href("/privacy")} className="transition hover:text-accent">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
