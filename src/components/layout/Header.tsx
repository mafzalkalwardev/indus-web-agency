"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "@/components/auth/SessionProvider";
import { href, basePath } from "@/lib/paths";
import { LayoutDashboard, ChevronDown, LogOut, Shield, Package, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
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
    <header className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link href={href("/")} className="group flex shrink-0 items-center gap-2.5">
          <Image
            src={`${bp}/images/logo-icon.png`}
            alt=""
            width={44}
            height={44}
            className="h-9 w-9 object-contain transition-transform duration-500 group-hover:rotate-[8deg]"
            priority
          />
          <div className="leading-none">
            <span className="block font-display text-lg font-medium tracking-tight text-ink">
              INDUS
            </span>
            <span className="mt-0.5 block font-mono text-[0.6rem] uppercase tracking-[0.28em] text-muted">
              Studio
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={href(item.href)}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive(item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink"
              }`}
            >
              <span className="link-underline">{item.label}</span>
            </Link>
          ))}
          {user && (
            <Link
              href={href("/dashboard")}
              className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                isActive("/dashboard") ? "text-accent-strong" : "text-accent hover:text-accent-strong"
              }`}
            >
              My Products
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileNav(!mobileNav)}
            className="rounded-lg p-2 text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileNav ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {loading ? (
            <div className="hidden h-9 w-24 animate-pulse rounded-full bg-ink/5 sm:block" />
          ) : user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-full border border-line-strong bg-paper-raised px-2 py-1.5 pr-3 text-sm font-medium text-ink transition hover:border-ink"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-bold text-paper">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden max-w-[100px] truncate md:inline">{user.name.split(" ")[0]}</span>
                <ChevronDown className="h-4 w-4 text-muted" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-line bg-paper-raised py-2 shadow-xl shadow-ink/5">
                    <div className="border-b border-line px-4 py-2">
                      <p className="truncate text-sm font-semibold text-ink">{user.name}</p>
                      <p className="truncate text-xs text-muted">{user.email}</p>
                    </div>
                    <Link href={href("/dashboard")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-ink/5">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link href={href("/products")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-ink hover:bg-ink/5">
                      <Package className="h-4 w-4" /> Browse Products
                    </Link>
                    {user.role === "admin" && (
                      <Link href={href("/admin")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-accent-strong hover:bg-accent-tint/40">
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
                className="hidden text-sm text-muted transition hover:text-ink sm:block"
              >
                Sign in
              </Link>
              <Link
                href={href("/start-project")}
                className="hidden rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-all hover:-translate-y-0.5 hover:bg-ink-soft sm:inline-flex sm:items-center sm:gap-1.5"
              >
                Start a project
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileNav && (
        <nav className="border-t border-line px-5 py-4 lg:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={href(item.href)}
                onClick={() => setMobileNav(false)}
                className={`rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive(item.href) ? "bg-ink/5 text-ink" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Link href={href("/dashboard")} onClick={() => setMobileNav(false)} className="rounded-lg px-3 py-2.5 text-sm text-accent">
                My Products
              </Link>
            ) : (
              <>
                <Link href={href("/start-project")} onClick={() => setMobileNav(false)} className="mt-1 rounded-full bg-ink px-3 py-2.5 text-center text-sm font-medium text-paper">Start a project</Link>
                <Link href={href("/login")} onClick={() => setMobileNav(false)} className="rounded-lg px-3 py-2.5 text-sm text-muted">Sign in</Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
