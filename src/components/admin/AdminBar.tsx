"use client";

import Link from "next/link";
import { LogOut, Shield } from "lucide-react";
import { href } from "@/lib/paths";
import { useSession } from "@/components/auth/SessionProvider";

export function AdminBar({ pendingCount }: { pendingCount: number }) {
  const { logout } = useSession();

  return (
    <div className="border-b border-amber-200/60 bg-amber-50/90">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-900">
            <Shield className="h-4 w-4" /> Admin
          </span>
          <span className="text-amber-700/50">·</span>
          <span className="text-amber-800">
            Pending{" "}
            <span className="rounded-full bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">
              {pendingCount}
            </span>
          </span>
          <span className="hidden text-amber-700/50 sm:inline">·</span>
          <Link href={href("/")} className="hidden text-amber-800 hover:text-amber-950 sm:inline">
            ← Public site
          </Link>
        </div>
        <button
          type="button"
          onClick={() => logout()}
          className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300/80 bg-white px-3 py-1.5 text-xs font-medium text-amber-900 hover:bg-amber-100"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </div>
    </div>
  );
}
