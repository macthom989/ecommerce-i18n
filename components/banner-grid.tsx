import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function BannerGrid() {
  const t = useTranslations('home');

  return (
    <div className="mb-12 md:mb-14 xl:mb-16 px-2.5 grid grid-cols-2 sm:grid-cols-9  gap-2 md:gap-2.5 max-w-[1920px] mx-auto">
      {/* Men's Collection Banner */}
      <div className="mx-auto col-span-full sm:col-span-5">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-1.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>

      {/* Sports Banners */}
      <div className="mx-auto col-span-1 sm:col-span-2">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-2.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>

      <div className="mx-auto col-span-1 sm:col-span-2">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-3.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>
      <div className="mx-auto col-span-1 sm:col-span-2">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-4.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>
      <div className="mx-auto col-span-1 sm:col-span-2">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-5.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>

      {/* Women Collection Banner */}
      <div className="mx-auto col-span-full sm:col-span-5">
        <div className="w-full h-full group relative">
          <Image
            src="/banner-6.webp"
            alt={t('menCollection')}
            width={0}
            height={0}
            sizes="1000vw"
            style={{ width: '100%', height: '100%' }} // optional
          />
          <span className="shine-effect" />
        </div>
      </div>
    </div>
  );
}
