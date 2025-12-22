import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // This forces standard Webpack behavior if anything was defaulting to Turbo
  experimental: {
    turbo: {
      // Intentionally empty to override defaults
    }
  }
};

export default nextConfig;