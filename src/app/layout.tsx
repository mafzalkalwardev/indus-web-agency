import type { Metadata } from "next";
import { Inter, Fraunces, Geist_Mono } from "next/font/google";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { SessionProvider } from "@/components/auth/SessionProvider";
import { SITE_CONTACT, SITE_SEO } from "@/lib/site-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONTACT.siteUrl),
  applicationName: SITE_SEO.name,
  title: {
    default: SITE_SEO.title,
    template: "%s | INDUS Web Agency",
  },
  description: SITE_SEO.description,
  keywords: [...SITE_SEO.keywords],
  authors: [{ name: SITE_SEO.name, url: SITE_CONTACT.siteUrl }],
  creator: SITE_SEO.name,
  publisher: SITE_SEO.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/favicon-32.png",
    apple: "/images/apple-icon.png",
  },
  openGraph: {
    type: "website",
    url: SITE_CONTACT.siteUrl,
    siteName: SITE_SEO.name,
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    images: [
      {
        url: "/images/logo-trimmed.png",
        width: 1200,
        height: 630,
        alt: "INDUS Web Agency business automation software",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_SEO.title,
    description: SITE_SEO.description,
    images: ["/images/logo-trimmed.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_SEO.name,
  legalName: SITE_SEO.legalName,
  url: SITE_CONTACT.siteUrl,
  logo: `${SITE_CONTACT.siteUrl}/images/logo-trimmed.png`,
  email: SITE_CONTACT.email,
  telephone: SITE_CONTACT.whatsapp,
  sameAs: [SITE_CONTACT.whatsappUrl],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SITE_CONTACT.email,
      telephone: SITE_CONTACT.whatsapp,
      availableLanguage: ["en"],
    },
  ],
  knowsAbout: SITE_SEO.keywords,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_SEO.name,
  url: SITE_CONTACT.siteUrl,
  description: SITE_SEO.description,
  inLanguage: "en",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationJsonLd, websiteJsonLd]) }}
        />
        <SessionProvider>
          <SiteChrome>{children}</SiteChrome>
        </SessionProvider>
      </body>
    </html>
  );
}
