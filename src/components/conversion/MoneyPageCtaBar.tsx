"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Calendar, Rocket } from "lucide-react";
import { SITE_CONTACT } from "@/lib/site-config";
import { href } from "@/lib/paths";
import { trackEvent } from "@/lib/analytics";

const MONEY_PREFIXES = ["/telecom", "/agency", "/compare", "/work", "/process", "/resources/dialer"];

export function MoneyPageCtaBar() {
  const pathname = usePathname() || "";
  const show = MONEY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`) || pathname.startsWith(p));

  if (!show || pathname.startsWith("/admin")) return null;

  const demoUrl = `${SITE_CONTACT.whatsappUrl}?text=${encodeURIComponent(
    "Hi INDUS — I'd like a dialer / CRM demo."
  )}`;

  return (
    <>
      <div className="h-24 sm:h-20 print:hidden" aria-hidden />
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 print:hidden">
        <div className="pointer-events-auto mx-auto mb-4 flex max-w-3xl items-center justify-center gap-2 px-4 pb-[4.5rem] sm:mb-5 sm:gap-3 sm:px-6 sm:pb-0 sm:pr-24">
          <div className="flex w-full items-center justify-between gap-2 rounded-2xl border border-white/10 bg-[#0c2340]/95 p-2 shadow-xl backdrop-blur sm:w-auto sm:justify-center sm:p-2.5">
            <a
              href={SITE_CONTACT.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("sticky_cta", { target: "whatsapp", path: pathname })}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white sm:flex-none sm:px-4 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("sticky_cta", { target: "demo", path: pathname })}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-cyan-500 px-3 py-2.5 text-xs font-semibold text-white sm:flex-none sm:px-4 sm:text-sm"
            >
              <Calendar className="h-4 w-4" />
              Book demo
            </a>
            <Link
              href={href("/start-project")}
              onClick={() => trackEvent("sticky_cta", { target: "start_project", path: pathname })}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-xs font-semibold text-white sm:flex-none sm:px-4 sm:text-sm"
            >
              <Rocket className="h-4 w-4" />
              <span className="hidden sm:inline">Start project</span>
              <span className="sm:hidden">Project</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
