import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: Disables ESLint during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
