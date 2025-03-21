import { SwiperSlide } from 'swiper/react';
import { ROUTES } from '@utils/routes';
import BannerCard from '@components/banner/banner-card';
import Carousel from '@components/carousel';

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
  bannerData: any;
}

const BannerCarouselBlock: React.FC<BannerProps> = ({
  className = 'mb-12 md:mb-12 lg:mb-14 pb-0.5 xl:pb-1.5',
  bannerData,
}) => {
  return (
    <div className={className}>
      <Carousel breakpoints={breakpoints} autoplay={{ delay: 5000 }}>
        {bannerData?.map((banner: any) => (
          <SwiperSlide key={`promotion-banner-key-${banner?.id}`}>
            <BannerCard banner={banner} href={`${ROUTES.COLLECTIONS}/${banner.slug}`} effectActive={true} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarouselBlock;
