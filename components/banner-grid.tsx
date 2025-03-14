import Image from 'next/image';

export function BannerGrid() {
  const banners = [
    { src: '/banner-1.webp', span: 'sm:col-span-5', alt: 'Men Collection', width: 800, height: 400 },
    { src: '/banner-2.webp', span: 'sm:col-span-2', alt: 'Sports', width: 320, height: 400 },
    { src: '/banner-3.webp', span: 'sm:col-span-2', alt: 'Women', width: 320, height: 400 },
    { src: '/banner-4.webp', span: 'sm:col-span-2', alt: 'Sunglasses', width: 320, height: 300 },
    { src: '/banner-5.webp', span: 'sm:col-span-2', alt: 'Coupons', width: 320, height: 300 },
    { src: '/banner-6.webp', span: 'sm:col-span-5', alt: 'New Backpack', width: 800, height: 400 },
  ];

  return (
    <div className="bg-rose-950 text-teal-400 p-8 mb-12  md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1440px] mx-auto">
      {banners.map((banner, index) => (
        <div key={index} className={`relative w-full ${banner.span}`}>
          <Image
            src={banner.src}
            alt={banner.alt}
            width={banner.width}
            height={banner.height}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            priority={index === 0}
            quality={80}
          />
        </div>
      ))}
    </div>
  );
}
