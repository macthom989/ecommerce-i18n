import type { Swiper as SwiperClass } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useState } from 'react';

interface ProductCarouselProps {
  images: { src: string }[];
}

export default function ProductCarousel({ images }: ProductCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="flex gap-2">
      <div>
        <Swiper
          onSwiper={setThumbsSwiper}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={5}
          watchSlidesProgress
          className="w-28 h-[850px]"
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
          className="w-[600px] h-[850px]"
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
