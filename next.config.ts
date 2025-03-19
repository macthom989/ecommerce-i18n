import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,

    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Optimize for performance
  poweredByHeader: false,
  compress: true,

  webpack: (config) => {
    config.resolve.alias['react-icons$'] = 'react-icons/fa/index.mjs';
    return config;
  },
};

export default withNextIntl(nextConfig);
