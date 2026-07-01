"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/components/auth/SessionProvider";
import { href, basePath } from "@/lib/paths";
import { LayoutDashboard, ChevronDown, User, LogOut, Shield, Package, MonitorPlay } from "lucide-react";
import { useState } from "react";

export function Header() {
  const { user, loading, logout } = useSession();
  const bp = basePath();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href={href("/")} className="flex items-center gap-3">
          <Image
            src={`${bp}/images/logo.jpg`}
            alt="INDUS Web Agency"
            width={44}
            height={44}
            className="rounded-lg object-cover ring-2 ring-cyan-100"
          />
          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-[#0c2340]">INDUS</span>
            <span className="block text-xs font-semibold text-cyan-600">Web Agency</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <Link href={href("/products")} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0c2340]">
            <span className="flex items-center gap-1.5"><Package className="h-4 w-4" /> Products</span>
          </Link>
          <Link href={href("/demos")} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0c2340]">
            <span className="flex items-center gap-1.5"><MonitorPlay className="h-4 w-4" /> Live Demos</span>
          </Link>
          <Link href={href("/pricing")} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0c2340]">
            Pricing
          </Link>
          <Link href={href("/compare")} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-[#0c2340]">
            Compare
          </Link>
          {user && (
            <Link href={href("/dashboard")} className="rounded-lg px-3 py-2 text-sm font-medium text-cyan-700 hover:bg-cyan-50">
              My Products
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-slate-100" />
          ) : user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0c2340] text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden max-w-[100px] truncate sm:inline">{user.name.split(" ")[0]}</span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
                    <div className="border-b border-slate-100 px-4 py-2">
                      <p className="truncate text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-xs text-slate-500">{user.email}</p>
                    </div>
                    <Link href={href("/dashboard")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50">
                      <LayoutDashboard className="h-4 w-4" /> My Dashboard
                    </Link>
                    <Link href={href("/products")} onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-slate-50">
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
              <Link href={href("/login")} className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 sm:block">
                Sign In
              </Link>
              <Link href={href("/signup")} className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
