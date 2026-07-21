import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
      {
        protocol: 'https',
        hostname: 'uploadthing.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Vercel-specific optimizations
  poweredByHeader: false,
  compress: true,
  // Ensure Prisma client is available in serverless functions
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Performance optimizations
  swcMinify: true,
  reactStrictMode: true,
  // Optimize chunking
  experimental: {
    optimizePackageImports: ['lucide-react', 'motion/react'],
  },
};

export default nextConfig;
