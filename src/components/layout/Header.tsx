"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/components/auth/SessionProvider";
import { href, basePath } from "@/lib/paths";
import { STUDIO_NAV, PRODUCT_NAV, COMPANY_NAV, RESOURCE_NAV } from "@/lib/site-nav";
import {
  LayoutDashboard,
  ChevronDown,
  LogOut,
  Shield,
  Package,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

function NavLink({
  path,
  label,
  isActive,
  className = "",
}: {
  path: string;
  label: string;
  isActive: (path: string) => boolean;
  className?: string;
}) {
  const active = isActive(path);
  return (
    <Link
      href={href(path)}
      className={`relative whitespace-nowrap px-1 py-1 text-sm font-medium transition ${
        active ? "text-white" : "text-slate-300 hover:text-white"
      } ${className}`}
    >
      {label}
      {active && (
        <span className="absolute inset-x-0 -bottom-1 h-0.5 rounded-full bg-cyan-400" aria-hidden />
      )}
    </Link>
  );
}

function NavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 xl:gap-4">
      <span className="hidden font-mono text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-cyan-400/90 sm:inline">
        {title}
      </span>
      <div className="flex items-center gap-3 xl:gap-4">{children}</div>
    </div>
  );
}

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c2340]/95 shadow-lg shadow-[#0c2340]/20 backdrop-blur-md print:hidden">
      {/* Top bar — brand + actions */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6">
        <Link href={href("/")} className="group flex min-w-0 shrink-0 items-center gap-2.5">
          <Image
            src={`${bp}/images/logo-icon.png`}
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 object-contain transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
            priority
          />
          <div className="min-w-0 leading-tight">
            <span className="block text-base font-bold tracking-wide text-white sm:text-lg">INDUS</span>
            <span className="hidden text-[10px] font-medium text-cyan-400 sm:block sm:text-[11px]">
              Build custom · License software
            </span>
          </div>
        </Link>

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
                <span className="hidden max-w-[90px] truncate md:inline">{user.name.split(" ")[0]}</span>
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
                    <Link
                      href={href("/dashboard")}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0c2340] hover:bg-slate-50"
                    >
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link
                      href={href("/products")}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-[#0c2340] hover:bg-slate-50"
                    >
                      <Package className="h-4 w-4" /> Browse Products
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        href={href("/admin")}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2.5 text-sm text-amber-700 hover:bg-amber-50"
                      >
                        <Shield className="h-4 w-4" /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 sm:flex">
              <Link
                href={href("/login")}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
              >
                Sign In
              </Link>
              <Link
                href={href("/start-project")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-cyan-900/30 transition hover:bg-cyan-400"
              >
                Start Project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Desktop nav strip — all links visible, grouped */}
      <nav
        className="hidden border-t border-white/10 bg-[#0a1d33]/60 lg:block"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-4 py-2.5 sm:px-6 xl:gap-x-8">
          <NavSection title="Studio">
            {STUDIO_NAV.map((item) => (
              <NavLink key={item.href} path={item.href} label={item.label} isActive={isActive} />
            ))}
          </NavSection>

          <span className="hidden h-4 w-px bg-white/15 xl:block" aria-hidden />

          <NavSection title="Products">
            <NavLink path="/products" label="Products" isActive={isActive} />
            <NavLink path="/pricing" label="Pricing" isActive={isActive} />
            <NavLink path="/compare" label="Compare" isActive={isActive} className="hidden xl:inline" />
            <NavLink path="/demos" label="Demos" isActive={isActive} className="hidden xl:inline" />
          </NavSection>

          <span className="hidden h-4 w-px bg-white/15 xl:block" aria-hidden />

          <div className="flex items-center gap-3 xl:gap-4">
            {COMPANY_NAV.filter((i) => i.href !== "/faq").map((item) => (
              <NavLink key={item.href} path={item.href} label={item.label} isActive={isActive} />
            ))}
            <NavLink path="/guides" label="Guides" isActive={isActive} className="hidden xl:inline" />
          </div>

          {user && (
            <>
              <span className="hidden h-4 w-px bg-white/15 xl:block" aria-hidden />
              <NavLink path="/dashboard" label="Dashboard" isActive={isActive} />
            </>
          )}
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileNav && (
        <nav className="border-t border-white/10 bg-[#0a1d33] px-4 py-4 lg:hidden">
          <div className="space-y-5">
            <div>
              <p className="mb-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
                Studio
              </p>
              <div className="flex flex-col gap-0.5">
                {STUDIO_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    onClick={() => setMobileNav(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive(item.href) ? "bg-white/10 text-white" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
                Products
              </p>
              <div className="flex flex-col gap-0.5">
                {PRODUCT_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    onClick={() => setMobileNav(false)}
                    className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                      isActive(item.href) ? "bg-white/10 text-white" : "text-slate-300"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
                Resources
              </p>
              <div className="flex flex-col gap-0.5">
                {RESOURCE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={href(item.href)}
                    onClick={() => setMobileNav(false)}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-0.5 border-t border-white/10 pt-4">
              {COMPANY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setMobileNav(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive(item.href) ? "bg-white/10 text-white" : "text-slate-300"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <Link
                  href={href("/dashboard")}
                  onClick={() => setMobileNav(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-cyan-300"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href={href("/start-project")}
                    onClick={() => setMobileNav(false)}
                    className="mt-2 rounded-lg bg-cyan-500 px-3 py-2.5 text-center text-sm font-semibold text-white"
                  >
                    Start a Project
                  </Link>
                  <Link
                    href={href("/login")}
                    onClick={() => setMobileNav(false)}
                    className="rounded-lg px-3 py-2.5 text-center text-sm text-slate-400"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
