"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { SupportFab } from "@/components/support/SupportFab";
import { MoneyPageCtaBar } from "@/components/conversion/MoneyPageCtaBar";

export function SiteChrome({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      {!isAdmin && footer}
      {!isAdmin && <MoneyPageCtaBar />}
      {!isAdmin && <SupportFab />}
    </>
  );
}
