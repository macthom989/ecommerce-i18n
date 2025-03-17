import type React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import './globals.css';
// import '../styles/custom-plugins.css';
// import '../styles/rc-drawer.css';
// import '../styles/swiper-carousel.css';
// import '../styles/scrollbar.css';
import { getMessages } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { Metadata } from 'next';
import { ManagedUIContext } from '@/contexts/ui.context';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

// Metadata replaces NextSEO in the App Router
export const metadata: Metadata = {
  title: "ChawkBazar React - React Next E-commerce Template",
  description: "Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.",
  openGraph: {
    title: "ChawkBazar React - React Next E-commerce Template",
    description: "Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.",
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
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getUserLocale();
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* @ts-ignore */}
          <ManagedUIContext>
            {children}
            </ManagedUIContext>
        </NextIntlClientProvider>
      </body>

    </html>
  );
}
