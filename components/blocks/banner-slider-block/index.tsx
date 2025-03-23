import BannerCard from '@components/banner/banner-card';
import Carousel from '@components/carousel';
import { SwiperSlide } from 'swiper/react';
import { ROUTES } from '@utils/routes';
import { promotionBanner } from '@configs/banner';

interface BannerProps {
  className?: string;
}

const breakpoints = {
  '0': {
    slidesPerView: 1,
  },
  '768': {
    slidesPerView: 1.5,
  },
};

const BannerSliderBlock: React.FC<BannerProps> = ({ className = 'mb-12 md:mb-14 xl:mb-16' }) => {
  return (
    <div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
      <Carousel
        breakpoints={breakpoints}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
        }}
        pagination={{
          clickable: true,
        }}
        paginationVariant="circle"
        buttonGroupClassName="hidden"
      >
        {promotionBanner.map((banner: any) => (
          <SwiperSlide key={`banner--key${banner.id}`} className="px-1.5 md:px-2.5 xl:px-3.5">
            <BannerCard banner={banner} effectActive={true} href={`${ROUTES.COLLECTIONS}/${banner.slug}`} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerSliderBlock;
