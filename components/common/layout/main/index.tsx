'use client';
import Search from '@components/common/search';
import { useAcceptCookies } from '@utils/use-accept-cookies';
import { useTranslations } from 'next-intl';
import Header from '@components/common/layout/header';
import Footer from '@components/common/layout/footer';
import CookieBar from '@components/common/cookie-bar';
import Button from '@components/common/button';
import MobileNavigation from '@components/common/layout/mobile-navigation';
import { useCallback, useEffect } from 'react';
import { useUI } from '@/contexts/managed-ui-provider';
import ls, { lsKeys } from '@/lib/local-storage';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';

export default function Layout({ children }: React.PropsWithChildren<object>) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const t = useTranslations('common');
  const { setSiteSettings } = useUI();

  const { data, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => fetchFn('GET', API_ENDPOINTS.SETTING).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
    select: (newData) => {
      const storedData = JSON.parse(ls.get(lsKeys.SITESETTINGS) || '{}');
      return JSON.stringify(newData) === JSON.stringify(storedData) ? storedData : newData;
    },
  });

  useEffect(() => {
    if (data) {
      setSiteSettings(data);
      ls.set(lsKeys.SITESETTINGS, JSON.stringify(data));
    }
  }, [data]);

  const cookieAction = useCallback(() => {
    onAcceptCookies();
  }, [onAcceptCookies]);

  if (isLoading) return;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: '-webkit-fill-available',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Search />
      <CookieBar
        title={t('text-cookies-title')}
        hide={acceptedCookies}
        action={
          <Button onClick={cookieAction} variant="slim">
            {t('text-accept-cookies')}
          </Button>
        }
      />
    </div>
  );
}
