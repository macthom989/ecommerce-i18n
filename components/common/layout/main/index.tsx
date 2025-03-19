'use client';
import { NextSeo } from 'next-seo';
import Search from '@components/common/search';
// import CookieBar from '@components/common/cookie-bar';
import { useAcceptCookies } from '@utils/use-accept-cookies';
// import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Header from '../header';
import Footer from '../footer/footer';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

export default function Layout({ children }: React.PropsWithChildren<object>) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const t = useTranslations('common');
  return (
    <div className="flex flex-col min-h-screen">
      <NextSeo
        additionalMetaTags={[
          {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1.0',
          },
        ]}
        title="Hv-core React - React Next E-commerce Template"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS."
        canonical="https://theme-nextjs-hvcore.vercel.app/"
        openGraph={{
          url: 'https://theme-nextjs-hvcore.vercel.app',
          title: 'Hv-core React - React Next E-commerce Template',
          description:
            'Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.',
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
        }}
      />
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
    </div>
  );
}
