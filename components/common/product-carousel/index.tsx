import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';
import { useSsrCompatible } from '@utils/use-ssr-compatible';
import { useWindowSize } from '@utils/use-window-size';

interface ProductCarouselProps {
  images: { src: string }[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const { width } = useSsrCompatible(useWindowSize(), { width: 0, height: 0 });
  const thumbnailSub: { perView: number; height: string; width: string } =
    width > 1488
      ? {
          perView: 5,
          height: 'h-[850px]',
          width: 'w-28',
        }
      : width > 1284
        ? {
            perView: 4,

            height: 'h-[720px]',
            width: 'w-28',
          }
        : {
            perView: 3,

            height: 'h-[542px]',
            width: 'w-28',
          };

  const thumbnailMain: { perView: number; height: string; width: string } =
    width > 1488
      ? {
          perView: 5,
          height: 'h-[850px]',
          width: 'w-[600px]',
        }
      : width > 1284
        ? {
            perView: 4,

            height: 'h-[720px]',
            width: 'w-[480px]',
          }
        : {
            perView: 3,

            height: 'h-[542px]',
            width: 'w-[354px]',
          };
  return (
    <div className="flex gap-2">
      <div>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={thumbnailSub.perView}
          watchSlidesProgress
          className={`${thumbnailSub.width} ${thumbnailSub.height}`}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={`Thumbnail ${index}`} className="w-full cursor-pointer" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div>
        <Swiper
          modules={[Thumbs, Navigation]}
          spaceBetween={10}
          navigation
          thumbs={{ swiper: thumbsSwiper }}
          className={`${thumbnailMain.width} ${thumbnailMain.height}`}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={`Product ${index}`} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
