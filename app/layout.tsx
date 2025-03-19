import type React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import '@fontsource/open-sans';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/satisfy';

import './globals.css';
import '@styles/custom-plugins.css';
import '@styles/rc-drawer.css';
import '@styles/swiper-carousel.css';
import '@styles/scrollbar.css';

import { getMessages } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { Metadata } from 'next';
import { ManagedUIContext } from '@/contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { ToastContainer } from 'react-toastify';
import TanStackQueryProvider from '@contexts/tanstack-query-provider';
import ManagedDrawer from '@/components/common/drawer/managed-drawer';
import Layout from '@/components/common/layout/main';

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getUserLocale();
  const dir = getDirection(locale);
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script src="/worker-register.js" defer></script>
      </head>
      <body className={inter.className}>
        {/*<AnimatePresence mode="wait" onExitComplete={handleExitComplete}>*/}
        <TanStackQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ManagedUIContext>
              <Layout>{children}</Layout>
              <ToastContainer toastClassName="!text-white" />
              {/* <ManagedModal /> */}
              <ManagedDrawer />
            </ManagedUIContext>
          </NextIntlClientProvider>
        </TanStackQueryProvider>
        {/*</AnimatePresence>*/}
      </body>
    </html>
  );
}
