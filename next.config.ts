import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withPWA from 'next-pwa';

const withNextIntl = createNextIntlPlugin();

const isDevelopment = process.env.NODE_ENV === 'development';

const pwaConfig = {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: isDevelopment,
  buildExcludes: [/middleware-manifest\.json$/],
  maximumFileSizeToCacheInBytes: 3000000,
};

const baseConfig: NextConfig = {
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
  devIndicators: {
    buildActivity: false,
  },
  webpack: (config: any) => {
    config.resolve.alias['react-icons$'] = 'react-icons/fa/index.mjs';
    return config;
  },
  env: {
    NEXT_PUBLIC_REST_API_ENDPOINT: process.env.NEXT_PUBLIC_REST_API_ENDPOINT,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

// Apply plugins
const nextConfig = withPWA({
  ...baseConfig,
  pwa: pwaConfig,
});

export default withNextIntl(nextConfig);
