import type React from 'react';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { getUserLocale } from '@/services/locale';
import { Metadata } from 'next';
import { ManagedUIContext } from '@/contexts/ui.context';
import Layout from '@/components/common/layout/main';
import ManagedDrawer from '@/components/common/drawer/managed-drawer';

import './globals.css';
import '../styles/scrollbar.css';
import '../styles/swiper-carousel.css';
import '../styles/rc-drawer.css';

const inter = Inter({ subsets: ['latin', 'vietnamese'] });

export const metadata: Metadata = {
  title: 'Ecommerce Shop',
  description: 'Demo',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getUserLocale();
  const messages = await getMessages({ locale });

  return (
    <RootLayoutContent locale={locale} messages={messages}>
      {children}
    </RootLayoutContent>
  );
}

function RootLayoutContent({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: any;
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ManagedUIContext>
            <Layout>{children}</Layout>
            <ManagedDrawer />
          </ManagedUIContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
