import type { NextConfig } from "next";

const basePath = process.env.NODE_ENV === 'production' ? '/my-tagalog-workbook' : '';

const nextConfig: NextConfig = {
  reactCompiler: true,

  /* Add these for GitHub Pages */
  output: 'export', // Outputs a static 'out' folder instead of a SSR server
  basePath,

  // Client components need the base path for audio and other static assets.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  images: {
    unoptimized: true, // Required because GitHub Pages doesn't support Next.js Image Optimization API
  },
};

export default nextConfig;
