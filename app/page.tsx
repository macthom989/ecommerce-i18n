import { Header } from '@/components/header'
import { getTranslations } from 'next-intl/server'
import { BannerGrid } from '@/components/banner-grid'
import { Footer } from '@/components/footer'

export default async function Home() {
  const t = await getTranslations("home")

  return (
    <>
      <Header />
    <main className={'relative flex-grow'}>
      <BannerGrid/>


    </main>
      <Footer/>
  </>
      )
}

