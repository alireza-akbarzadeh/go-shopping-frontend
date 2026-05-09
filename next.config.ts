/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import './src/env';

import type { NextConfig } from 'next';

const config = {
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  }
} satisfies NextConfig;

export default config;
