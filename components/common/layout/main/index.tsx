'use client';
import Search from '@components/common/search';
// import CookieBar from '@components/common/cookie-bar';
import { useAcceptCookies } from '@utils/use-accept-cookies';
// import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Header from '@components/common/layout/header';
import Footer from '@components/common/layout/footer';
import CookieBar from '@components/common/cookie-bar';
import Button from '@components/common/button';
import MobileNavigation from '@components/common/layout/mobile-navigation';

export default function Layout({ children }: React.PropsWithChildren<object>) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const t = useTranslations('common');
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
