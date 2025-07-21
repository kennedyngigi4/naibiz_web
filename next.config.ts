import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ["127.0.0.1", 'nairobibusiness.co.ke', 'api.nairobibusiness.co.ke' ]
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables ESLint checks during production builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
