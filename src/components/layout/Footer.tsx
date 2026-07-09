import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, Home, Package, MonitorPlay, DollarSign, GitCompareArrows } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";

const footerNav = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/demos", label: "Live Demos", icon: MonitorPlay },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
  { href: "/compare", label: "Compare", icon: GitCompareArrows },
] as const;

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#0c2340] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Image
            src="/images/logo-trimmed.png"
            alt="INDUS Web Agency"
            width={200}
            height={80}
            className="h-16 w-auto object-contain"
          />
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Professional automation tools for dispatch, email marketing, and web scraping.
            Subscribe to individual products and download securely from your dashboard.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white">Navigate</h4>
          <ul className="mt-3 space-y-2 text-sm">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={href(item.href)} className="inline-flex items-center gap-1.5 hover:text-cyan-400">
                  {"icon" in item && item.icon ? <item.icon className="h-3.5 w-3.5 text-cyan-500" /> : null}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Products</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href={href("/products?cat=email")} className="hover:text-cyan-400">Email Tools</Link></li>
            <li><Link href={href("/products?cat=dialer")} className="hover:text-cyan-400">Auto Dialers</Link></li>
            <li><Link href={href("/products?cat=scraper")} className="hover:text-cyan-400">Web Scrapers</Link></li>
            <li><Link href={href("/products/mailforge")} className="hover:text-cyan-400">Mailforge Bundle</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact & Support</h4>
          <ul className="mt-3 space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
              <a href={`mailto:${SITE_CONTACT.email}`} className="hover:text-cyan-400">
                {SITE_CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-[#25D366]" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <a href={SITE_CONTACT.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400">
                WhatsApp Chat
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
              <a href={SITE_CONTACT.whatsappUrl} className="hover:text-cyan-400">
                {SITE_CONTACT.whatsapp}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 px-4 py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <Link href={href("/faq")} className="hover:text-cyan-400">FAQ</Link>
          <Link href={href("/terms")} className="hover:text-cyan-400">Terms of Service</Link>
          <Link href={href("/privacy")} className="hover:text-cyan-400">Privacy Policy</Link>
        </div>
        <p className="mt-2 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} INDUS Web Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
