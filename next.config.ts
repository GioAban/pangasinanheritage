// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/pangasinanheritage",
  // Subukan nating tanggalin muna ang assetPrefix kung meron ka,
  // dahil ang basePath ay sapat na para sa karamihan ng GH Pages setup.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
