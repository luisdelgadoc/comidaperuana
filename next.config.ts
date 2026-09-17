import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only: the app is opened both as localhost and as 127.0.0.1, which Next
  // treats as separate origins and blocks by default.
  allowedDevOrigins: ["127.0.0.1"],
  images: {
    formats: ["image/avif"],
    deviceSizes: [640, 828, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
