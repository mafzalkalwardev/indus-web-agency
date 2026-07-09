import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SessionProvider } from "@/components/auth/SessionProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://indus-web-agency.vercel.app"),
  title: "INDUS Web Agency — Automation Tools & Subscriptions",
  description:
    "Subscribe to professional auto dialers, email marketing tools, and web scrapers. Download and use for your subscription period.",
  keywords: ["auto dialer", "email verifier", "web scraper", "mailforge", "INDUS"],
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-icon.png",
  },
  openGraph: {
    title: "INDUS Web Agency",
    description: "Professional automation tools with subscription access",
    images: ["/images/logo-trimmed.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-[#0c2340]">
        <SessionProvider>
          <SiteChrome>{children}</SiteChrome>
        </SessionProvider>
      </body>
    </html>
  );
}
