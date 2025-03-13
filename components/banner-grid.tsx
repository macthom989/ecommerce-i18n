import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function BannerGrid() {
  const t = useTranslations('home');

  const banners = [
    {
      src: '/banner-1.webp',
      span: 'sm:col-span-5',
      alt: t('menCollection'),
      width: 970,
      height: 400,
      fullMobile: true,
    },
    { src: '/banner-2.webp', span: 'sm:col-span-2', alt: '', width: 400, height: 400 },
    { src: '/banner-3.webp', span: 'sm:col-span-2', alt: "t('women')", width: 400, height: 400 },
    { src: '/banner-4.webp', span: 'sm:col-span-2', alt: "t('sunglasses')", width: 400, height: 400 },
    { src: '/banner-5.webp', span: 'sm:col-span-2', alt: "t('coupons')", width: 400, height: 400 },
    {
      src: '/banner-6.webp',
      span: 'sm:col-span-5',
      alt: " t('newBackpack')",
      width: 800,
      height: 400,
      fullMobile: true,
    },
  ];

  return (
    <div className="mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-3 max-w-[1920px] mx-auto">
      {banners.map((banner, index) => (
        <div key={index} className={`relative ${banner.fullMobile ? 'col-span-2 w-full' : ''} ${banner.span}`}>
          <Image
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            sizes={banner.fullMobile ? '(max-width: 640px) 100vw, (min-width: 641px) 50vw' : '33vw'}
            priority={index === 0}
            quality={80}
          />
        </div>
      ))}
    </div>
  );
}
