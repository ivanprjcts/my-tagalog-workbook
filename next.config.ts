import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  /* Add these for GitHub Pages */
  output: 'export', // Outputs a static 'out' folder instead of a SSR server
  basePath: process.env.NODE_ENV === 'production' ? '/my-tagalog-workbook' : '',

  images: {
    unoptimized: true, // Required because GitHub Pages doesn't support Next.js Image Optimization API
  },
};

export default nextConfig;
