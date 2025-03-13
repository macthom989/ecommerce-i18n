import { Header } from '@/components/header';
import { BannerGrid } from '@/components/banner-grid';
import { Footer } from '@/components/footer';

export default async function Home() {
  return (
    <>
      <Header />
      <main className={'relative flex-grow'}>
        <BannerGrid />
      </main>
      <Footer />
    </>
  );
}
