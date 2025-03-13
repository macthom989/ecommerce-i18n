import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function BannerGrid() {
  const t = useTranslations('home');

  return (
    <div className="mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto">
      {/* Helper function để render banner */}
      {[
        { src: '/banner-1.webp', span: 'sm:col-span-5' },
        { src: '/banner-2.webp', span: 'sm:col-span-2' },
        { src: '/banner-3.webp', span: 'sm:col-span-2' },
        { src: '/banner-4.webp', span: 'sm:col-span-2' },
        { src: '/banner-5.webp', span: 'sm:col-span-2' },
        { src: '/banner-6.webp', span: 'sm:col-span-5' },
      ].map((banner, index) => (
        <div key={index} className={`mx-auto col-span-1 ${banner.span}`}>
          <div className="w-full h-full group relative">
            <Image
              src={banner.src}
              alt={t('menCollection')}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
              priority={index === 0}
              quality={80}
            />
            <span className="shine-effect" />
          </div>
        </div>
      ))}
    </div>
  );
}
