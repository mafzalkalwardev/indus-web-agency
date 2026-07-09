"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SupportFab } from "@/components/support/SupportFab";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {!isAdmin && <SupportFab />}
    </>
  );
}
