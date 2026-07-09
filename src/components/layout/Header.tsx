"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/components/auth/SessionProvider";
import { href, basePath } from "@/lib/paths";
import { LayoutDashboard, ChevronDown, LogOut, Shield, Package, MonitorPlay, Home, Menu, X, DollarSign, GitCompareArrows } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Products", icon: Package },
  { href: "/demos", label: "Live Demos", icon: MonitorPlay },
  { href: "/pricing", label: "Pricing", icon: DollarSign },
  { href: "/compare", label: "Compare", icon: GitCompareArrows },
] as const;

export function Header() {
  const { user, loading, logout } = useSession();
  const pathname = usePathname();
  const bp = basePath();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const isActive = (path: string) => {
    const p = href(path);
    if (path === "/") return pathname === p || pathname === `${p}/`;
    return pathname.startsWith(p);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c2340]/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={href("/")} className="group flex shrink-0 items-center gap-2.5">
          <Image
            src={`${bp}/images/logo-icon.png`}
            alt=""
            width={48}
            height={48}
            className="h-10 w-10 object-contain transition-transform group-hover:scale-105 sm:h-11 sm:w-11"
            priority
          />
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-wide text-white sm:text-lg">INDUS</span>
            <span className="block text-[11px] font-medium text-cyan-400 sm:text-xs">Web Agency</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={href(item.href)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-white/10 text-white"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              {"icon" in item && item.icon ? <item.icon className="h-4 w-4 text-cyan-400" /> : null}
              {item.label}
            </Link>
          ))}
          {user && (
            <Link
              href={href("/dashboard")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/dashboard") ? "bg-cyan-500/20 text-cyan-200" : "text-cyan-300 hover:bg-cyan-500/15"
              }`}
            >
              My Products
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileNav(!mobileNav)}
            className="rounded-lg p-2 text-white lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileNav ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {loading ? (
            <div className="hidden h-9 w-24 animate-pulse rounded-lg bg-white/10 sm:block" />
          ) : user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-cyan-600 text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden max-w-[100px] truncate md:inline">{user.name.split(" ")[0]}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-2">
                      <p className="truncate text-sm font-semibold text-[#0c2340]">{user.name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link href={href("/dashboard")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0c2340] hover:bg-slate-50">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link href={href("/products")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0c2340] hover:bg-slate-50">
                      <Package className="h-4 w-4" /> Browse Products
                    </Link>
                    {user.role === "admin" && (
                      <Link href={href("/admin")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50">
                        <Shield className="h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <button onClick={() => { setMenuOpen(false); logout(); }} className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href={href("/login")}
                className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white sm:block"
              >
                Sign In
              </Link>
              <Link
                href={href("/signup")}
                className="hidden rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cyan-900/30 transition hover:bg-cyan-400 sm:block"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileNav && (
        <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                onClick={() => setMobileNav(false)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive(item.href) ? "bg-white/10 text-white" : "text-slate-300"
                }`}
              >
                {"icon" in item && item.icon ? <item.icon className="h-4 w-4 text-cyan-400" /> : null}
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link href={href("/dashboard")} onClick={() => setMobileNav(false)} className="rounded-lg px-3 py-2.5 text-sm text-cyan-300">
                My Products
              </Link>
            ) : (
              <>
                <Link href={href("/login")} onClick={() => setMobileNav(false)} className="rounded-lg px-3 py-2.5 text-sm text-slate-300">Sign In</Link>
                <Link href={href("/signup")} onClick={() => setMobileNav(false)} className="rounded-lg bg-cyan-500 px-3 py-2.5 text-center text-sm font-semibold text-white">Get Started</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
