"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/components/auth/SessionProvider";
import { href, basePath } from "@/lib/paths";
import {
  STUDIO_NAV,
  PRODUCT_NAV,
  COMPANY_NAV,
  PRODUCT_CATEGORIES,
  RESOURCE_NAV,
} from "@/lib/site-nav";
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
import { useState, useRef, useEffect } from "react";

type NavItem = { href: string; label: string; hint?: string };

function useClickOutside(ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [ref, onClose]);
}

function NavDropdown({
  label,
  items,
  isActive,
  wide,
  children,
}: {
  label: string;
  items?: readonly NavItem[];
  isActive: boolean;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          isActive
            ? "bg-white/10 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
        aria-expanded={open}
      >
        {label}
        <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          className={`absolute left-0 top-full z-50 mt-2 rounded-xl border border-slate-200 bg-white shadow-2xl ${
            wide ? "w-[min(100vw-2rem,400px)]" : "w-52"
          }`}
        >
          {children ?? (
            <div className="py-1.5">
              {items?.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 transition hover:bg-slate-50"
                >
                  <span className="text-sm font-medium text-[#0c2340]">{item.label}</span>
                  {item.hint && <span className="mt-0.5 block text-xs text-slate-500">{item.hint}</span>}
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProductsMenu({ isActive }: { isActive: (path: string) => boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  const productsActive =
    isActive("/products") ||
    isActive("/demos") ||
    isActive("/pricing") ||
    isActive("/compare");

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition ${
          productsActive
            ? "bg-white/10 text-white"
            : "text-slate-300 hover:bg-white/10 hover:text-white"
        }`}
        aria-expanded={open}
      >
        Products
        <ChevronDown className={`h-3.5 w-3.5 opacity-70 transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-[min(100vw-2rem,380px)] rounded-xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="grid gap-1 sm:grid-cols-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <Link
                key={cat.href}
                href={href(cat.href)}
                onClick={() => setOpen(false)}
                className="rounded-lg p-3 transition hover:bg-slate-50"
              >
                <p className="text-sm font-semibold text-[#0c2340]">{cat.label}</p>
                <p className="text-xs text-slate-500">{cat.hint}</p>
              </Link>
            ))}
          </div>
          <div className="mt-3 space-y-0.5 border-t border-slate-100 pt-3">
            {PRODUCT_NAV.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-[#0c2340] transition hover:bg-slate-50"
              >
                <span className="font-medium">{item.label}</span>
                {item.hint && <span className="text-xs text-slate-400">{item.hint}</span>}
              </Link>
            ))}
          </div>
        </div>
      )}
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

  const studioActive = STUDIO_NAV.some((i) => isActive(i.href));
  const resourcesActive = RESOURCE_NAV.some((i) => isActive(i.href));
  const companyActive = COMPANY_NAV.some((i) => isActive(i.href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0c2340]/95 shadow-lg shadow-[#0c2340]/20 backdrop-blur-md print:hidden">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
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
            <span className="hidden truncate text-[10px] font-medium text-cyan-400 sm:block sm:text-[11px]">
              Build custom · License software
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavDropdown label="Studio" items={STUDIO_NAV} isActive={studioActive} />
          <ProductsMenu isActive={isActive} />
          <NavDropdown label="Resources" items={RESOURCE_NAV} isActive={resourcesActive} />
          <NavDropdown label="Company" items={COMPANY_NAV} isActive={companyActive} />
          {user && (
            <Link
              href={href("/dashboard")}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive("/dashboard") ? "bg-cyan-500/20 text-cyan-200" : "text-cyan-300 hover:bg-cyan-500/15"
              }`}
            >
              Dashboard
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

      {mobileNav && (
        <nav className="border-t border-white/10 bg-[#0a1d33] px-4 py-4 lg:hidden">
          <div className="space-y-5">
            <div>
              <p className="mb-2 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-cyan-400">
                Custom builds
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
                Software shelf
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
