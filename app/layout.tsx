import type React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

// Load Open Sans and satisfy typeface font
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

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

// Metadata replaces NextSEO in the App Router
export const metadata: Metadata = {
  title: 'ChawkBazar React - React Next E-commerce Template',
  description: 'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
  openGraph: {
    title: 'ChawkBazar React - React Next E-commerce Template',
    description: 'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
    url: 'https://chawkbazar.vercel.app',
    siteName: 'ChawkBazar',
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

// function handleExitComplete() {
//   if (typeof window !== 'undefined') {
//     window.scrollTo({ top: 0 });
//   }
// }

export default async function RootLayout({
                                           children,
                                         }: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getUserLocale();
  const dir = getDirection(locale);
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
    <body className={inter.className}>
    {/*<AnimatePresence mode="wait" onExitComplete={handleExitComplete}>*/}
    <TanStackQueryProvider>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ManagedUIContext>
          {children}
          <ToastContainer toastClassName="!text-white" />
          {/*<ManagedModal />*/}
          {/*<ManagedDrawer />*/}
        </ManagedUIContext>
      </NextIntlClientProvider>
    </TanStackQueryProvider>
    {/*</AnimatePresence>*/}
    </body>

    </html>
  );
}
