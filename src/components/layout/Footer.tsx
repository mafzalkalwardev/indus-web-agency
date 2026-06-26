import Link from "next/link";
import { Mail, Phone, Code2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#0c2340] text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-lg font-bold text-white">INDUS Web Agency</h3>
          <p className="mt-2 max-w-md text-sm text-slate-400">
            Professional automation tools for dispatch, email marketing, and web scraping.
            Subscribe to individual products and download with time-limited access.
          </p>
          <div className="mt-4 flex gap-4">
            <a
              href="https://github.com/mafzalkalwardev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white"
            >
              <Code2 className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-white">Products</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/products?cat=email" className="hover:text-cyan-400">Email Tools</Link></li>
            <li><Link href="/products?cat=dialer" className="hover:text-cyan-400">Auto Dialers</Link></li>
            <li><Link href="/products?cat=scraper" className="hover:text-cyan-400">Web Scrapers</Link></li>
            <li><Link href="/products/mailforge" className="hover:text-cyan-400">Mailforge Bundle</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              <a href="mailto:support@induswebagency.com" className="hover:text-cyan-400">
                support@induswebagency.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-400" />
              <a href="https://wa.me/923079670503" className="hover:text-cyan-400">
                +92 307 967 0503
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} INDUS Web Agency. All rights reserved.
      </div>
    </footer>
  );
}
