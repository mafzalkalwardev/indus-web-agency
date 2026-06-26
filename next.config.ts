import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: isGhPages ? "export" : undefined,
  basePath: isGhPages ? "/indus-web-agency" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: isGhPages,
};

export default nextConfig;
