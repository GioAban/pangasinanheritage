// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pangasinanheritage",
  // assetPrefix: "/pangasinanheritage", // Minsan optional na ito pag may basePath na
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
