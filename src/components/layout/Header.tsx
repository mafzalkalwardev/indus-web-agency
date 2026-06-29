"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { href, basePath } from "@/lib/paths";

export function Header() {
  const [session, setSession] = useState<{ role: string } | null>(null);
  const bp = basePath();

  useEffect(() => {
    fetch(href("/api/auth/me"), { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setSession(d.user))
      .catch(() => setSession(null));
  }, []);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={href("/")} className="flex items-center gap-3">
          <Image
            src={`${bp}/images/logo.jpg`}
            alt="INDUS Web Agency"
            width={44}
            height={44}
            className="rounded-lg object-cover"
          />
          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-[#0c2340]">INDUS</span>
            <span className="block text-xs font-medium text-cyan-600">Web Agency</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href={href("/products")} className="text-sm font-medium text-slate-600 hover:text-[#0c2340]">
            Products
          </Link>
          <Link href={href("/pricing")} className="text-sm font-medium text-slate-600 hover:text-[#0c2340]">
            Pricing
          </Link>
          <Link href={href("/compare")} className="text-sm font-medium text-slate-600 hover:text-[#0c2340]">
            Compare
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {session ? (
            <>
              {session.role === "admin" && (
                <Link
                  href={href("/admin")}
                  className="hidden text-sm font-medium text-amber-700 hover:text-amber-900 sm:block"
                >
                  Admin
                </Link>
              )}
              <Link
                href={href("/dashboard")}
                className="rounded-lg bg-[#0c2340] px-4 py-2 text-sm font-medium text-white hover:bg-[#1a3a5c]"
              >
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link href={href("/login")} className="text-sm font-medium text-slate-600 hover:text-[#0c2340]">
                Sign In
              </Link>
              <Link
                href={href("/signup")}
                className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
