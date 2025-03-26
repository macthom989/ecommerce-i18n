'use client';
import Search from '@components/common/search';
import { useAcceptCookies } from '@utils/use-accept-cookies';
import { useTranslations } from 'next-intl';
import Header from '@components/common/layout/header';
import Footer from '@components/common/layout/footer';
import CookieBar from '@components/common/cookie-bar';
import Button from '@components/common/button';
import MobileNavigation from '@components/common/layout/mobile-navigation';
import { useEffect } from 'react';
import { fetchFn } from '@/lib/fetcher-local';
import { useUI } from '@/contexts/managed-ui-provider';
import ls, { lsKeys } from '@/lib/local-storage';
import { useQuery } from '@tanstack/react-query';
import HomeLoader from '../../loaders/home-loader';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';

export default function Layout({ children }: React.PropsWithChildren<object>) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const t = useTranslations('common');
  const { setSiteSettings } = useUI();

  const { data, error, isLoading } = useQuery({
    queryKey: ['siteSettings'],
    queryFn: () => fetchFn('GET', API_ENDPOINTS.SETTING).then((res) => res.data),
    staleTime: 1000 * 60 * 60,
  });

  useEffect(() => {
    if (data) {
      setSiteSettings(data);
      ls.set(lsKeys.SITESETTINGS, JSON.stringify(data));
    }
  }, [JSON.stringify(data)]);

  if (isLoading) return <HomeLoader />;

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
          <Button onClick={() => onAcceptCookies()} variant="slim">
            {t('text-accept-cookies')}
          </Button>
        }
      />
    </div>
  );
}
