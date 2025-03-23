import BannerCard from '@components/banner/banner-card';
import Carousel from '@components/carousel';
import { SwiperSlide } from 'swiper/react';

import { ROUTES } from '@utils/routes';
import { bannerGrid } from '@configs/banner';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { useWindowSize } from '@utils/use-window-size';

const breakpoints = {
  '1025': {
    slidesPerView: 3,
    spaceBetween: 28,
  },
  '480': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

interface BannerProps {
  className?: string;
}

const BannerGridBlock: React.FC<BannerProps> = ({ className = 'mb-12 lg:mb-14 xl:mb-16 lg:pb-1 xl:pb-0' }) => {
  const { width } = useSsrCompatible(useWindowSize(), {
    width: 0,
    height: 0,
  });
  return (
    <div className={`${className}`}>
      {width < 768 ? (
        <div>
          <Carousel breakpoints={breakpoints}>
            {bannerGrid?.map((banner: any) => (
              <SwiperSlide key={`banner--key${banner.id}`}>
                <BannerCard banner={banner} href={`${ROUTES.COLLECTIONS}/${banner.slug}`} className="h-full" />
              </SwiperSlide>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 md:gap-5 xl:gap-7 relative">
          {bannerGrid.map((banner: any) => (
            <BannerCard
              key={`banner--key${banner.id}`}
              banner={banner}
              href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
              className={banner.type === 'large' ? 'col-span-2' : 'col-span-1'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BannerGridBlock;
