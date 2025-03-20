import type React from 'react';
import { Inter } from 'next/font/google';

import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/satisfy';

import './globals.css';
import '@styles/custom-plugins.css';
import '@styles/rc-drawer.css';
import '@styles/swiper-carousel.css';
import '@styles/scrollbar.css';

import { Metadata } from 'next';
import { getUserLocale } from '@/services/locale';
import { getDirection } from '@utils/get-direction';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Hv Core - React Next E-commerce Template',
  description:
    'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Hv Core',
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: '/icons/manifest-icon-192.png',
    shortcut: '/icons/manifest-icon-192.png',
    apple: '/icons/apple-icon-180.png',
  },
  openGraph: {
    title: 'Hv Core React - React Next E-commerce Template',
    description:
      'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
    url: 'https://theme-nextjs-hvcore.vercel.app',
    siteName: 'Hv Core - Ecommerce',
    images: [
      {
        url: '/assets/images/og-image-01.png',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: '/assets/images/og-image-02.png',
        width: 900,
        height: 800,
        alt: 'Og Image Alt Second',
      },
    ],
  },
};

export const viewport = {
  themeColor: '#ffffff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
