import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizeCss: true,
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Optimize for performance
  poweredByHeader: false,
  compress: true,

  // images: {
  //   localPatterns: [
  //     {
  //       pathname: '@/public/assets/images/**',
  //       search: '',
  //     },
  //   ],
  // }, // Reference: https://nextjs.org/docs/app/building-your-application/optimizing/images#local-images
};

export default withNextIntl(nextConfig);
