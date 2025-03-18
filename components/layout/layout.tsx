import BannerBlock from '@/components/banner/banner-block';
import Header from '@/components/header/header';
import Footer from '@components/footer/footer';

export default async function LayoutWrapper() {
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
        <BannerBlock data={[]} />
      </main>
      <Footer />
    </div>
  );
}
