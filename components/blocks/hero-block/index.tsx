import { useWindowSize } from '@utils/use-window-size';
import { ROUTES } from '@utils/routes';
import { SwiperSlide } from 'swiper/react';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import Carousel from '@components/carousel';
import { homeOneHeroBanner } from '@configs/banner';
import BannerCard from '@components/banner/banner-card';

const breakpoints = {
  '1500': {
    slidesPerView: 2,
  },
  '0': {
    slidesPerView: 1,
  },
};

const HeroBlock: React.FC = () => {
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  return (
    <div className="heroBannerOne relative max-w-[1920px] mb-5 md:mb-12 lg:mb-14 2xl:mb-16 mx-auto overflow-hidden px-4 md:px-8 2xl:px-0">
      <Carousel
        loop={true}
        breakpoints={breakpoints}
        centeredSlides={width >= 1500}
        autoplay={{
          delay: 5000,
        }}
        className="mx-0"
        buttonGroupClassName="hidden"
        pagination={{
          clickable: true,
        }}
      >
        {homeOneHeroBanner?.map((banner: any) => (
          <SwiperSlide className="carouselItem px-0 2xl:px-3.5" key={`banner--key-${banner?.id}`}>
            <BannerCard banner={banner} href={`${ROUTES.COLLECTIONS}/${banner.slug}`} />
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBlock;
