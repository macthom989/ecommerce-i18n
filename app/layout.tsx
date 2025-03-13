import type React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

import './globals.css';
import { getMessages } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Ecommerce Shop',
  description: 'Demo',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getUserLocale();
  const messages = await getMessages({ locale: locale });

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/*<ThemeProvider attribute="class" defaultTheme="light">*/}
          {children}
          {/*<Toaster />*/}
          {/*</ThemeProvider>*/}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
