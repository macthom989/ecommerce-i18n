import type React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ManagedUIContext } from '@/contexts/ui.context';
import { getDirection } from '@utils/get-direction';
import { ToastContainer } from 'react-toastify';
import TanStackQueryProvider from '@contexts/tanstack-query-provider';
import ManagedDrawer from '@/components/common/drawer/managed-drawer';
import Layout from '@/components/common/layout/main';
import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
type paramsType = Promise<{ locale: string }>;
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: paramsType }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const dir = getDirection(locale as string);
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script src="/worker-register.js" defer></script>
      </head>
      <body>
        <TanStackQueryProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ManagedUIContext>
              <Layout>{children}</Layout>
              <ToastContainer toastClassName="!text-white" />
              <ManagedDrawer />
            </ManagedUIContext>
          </NextIntlClientProvider>
        </TanStackQueryProvider>
      </body>
    </html>
  );
}
