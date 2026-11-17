import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security-headers";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath: isGhPages ? "/indus-web-agency" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: isGhPages ? "/indus-web-agency" : "",
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
  images: {
    unoptimized: isGhPages,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "github.com" },
    ],
  },
  trailingSlash: isGhPages,
  // Vercel (production) does not use a trailing slash. Next's built-in
  // `/path/` → `/path` redirect is inserted ahead of these rules, so a
  // stale `/blog/` would 308 to `/blog` and only then to `/`. Skipping it
  // lets each stale path, with or without the slash, 308 straight to its
  // target. The catch-all below keeps that strip for every other path.
  // The GitHub Pages export ignores redirects, so it keeps Next's handler.
  skipTrailingSlashRedirect: !isGhPages,
  async redirects() {
    const legacy = [
      { source: "/blog", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/work", permanent: true },
      { source: "/team", destination: "/about", permanent: true },
      { source: "/careers", destination: "/contact", permanent: true },
    ];
    if (isGhPages) return legacy;
    return [
      ...legacy,
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
  async headers() {
    if (isGhPages) return [];
    return [{ source: "/(.*)", headers: securityHeaders() }];
  },
};

export default nextConfig;
