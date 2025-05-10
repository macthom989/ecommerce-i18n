'use client';
import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const userVideos = [
  'https://www.tiktok.com/@auaudouyin/video/7471523009665240328?is_from_webapp=1&sender_device=pc',
  'https://www.tiktok.com/@auaudouyin/video/7471523009665240328?is_from_webapp=1&sender_device=pc',
  'https://www.tiktok.com/@auaudouyin/video/7471523009665240328?is_from_webapp=1&sender_device=pc',
  'https://www.instagram.com/reel/DHkRYpNJtF0',
  'https://www.instagram.com/reel/DHkRYpNJtF0',
];

const getEmbedUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes('tiktok.com')) {
      const match = parsedUrl.pathname.match(/video\/(\d+)/);
      return match ? `https://www.tiktok.com/embed/${match[1]}` : null;
    }

    if (parsedUrl.hostname.includes('instagram.com') && parsedUrl.pathname.includes('/reel/')) {
      const match = parsedUrl.pathname.match(/reel\/([^\/?]+)/);
      return match ? `https://www.instagram.com/reel/${match[1]}/embed/` : null;
    }

    return null;
  } catch (error) {
    console.error('Invalid URL:', url);
    return null;
  }
};

export const ProductVideoSlider = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const iframesRef = useRef<(HTMLIFrameElement | null)[]>([]); // Lưu refs của các video

  const handleVideoClick = (index: number, link: string) => {
    // Dừng tất cả video trước khi phát video mới
    iframesRef.current.forEach((iframe, i) => {
      if (iframe && i !== index) {
        iframe.src = iframe.src; // Reload để dừng video
      }
    });

    // Cập nhật video đang phát
    setActiveVideo(link);
  };

  const validVideos = userVideos.map(getEmbedUrl).filter(Boolean);

  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        className="w-full"
      >
        <div className="w-[320px]">
          {/* {validVideos.length > 0
            ? validVideos.map((link, index) => (
                <SwiperSlide key={index} className="flex items-center w-[320px] justify-center">
                  <iframe
                    ref={(el) => (iframesRef.current[index] = el)}
                    src={activeVideo === link ? link : link.replace('?autoplay=1', '')} // Chỉ autoplay khi được chọn
                    className="w-full h-64"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    onClick={() => handleVideoClick(index, link)}
                  />
                </SwiperSlide>
              ))
            : ''} */}
        </div>
      </Swiper>
    </div>
  );
};
