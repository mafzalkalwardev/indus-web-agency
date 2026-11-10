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
  async headers() {
    if (isGhPages) return [];
    return [{ source: "/(.*)", headers: securityHeaders() }];
  },
};

export default nextConfig;
