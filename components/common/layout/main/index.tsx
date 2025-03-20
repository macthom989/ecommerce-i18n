'use client';
import Search from '@components/common/search';
import Header from '../header';
import Footer from '../footer/footer';
import MobileNavigation from '../mobile-navigation/mobile-navigation';

export default function Layout({ children }: React.PropsWithChildren<object>) {
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
    </div>
  );
}
