'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaInstagram } from 'react-icons/fa';
import cn from 'classnames';
import { useTranslations } from 'next-intl';
import { imageLoader } from '@/utils/image-loader';

interface Props {
  className?: string;
  variant?: 'rounded';
  disableContainerBorderRadius?: boolean;
}

const Instagram: React.FC<Props> = ({ className = '', variant, disableContainerBorderRadius = false }) => {
  const t = useTranslations('common');
  const [posts, setPosts] = useState<any[]>([]);

  // 🔥 Hàm fetch dữ liệu từ Instagram API
  const fetchInstagramPosts = async () => {
    try {
      const accessToken =
        'IGAAOSQWKRjDNBZAE1VeHpZALWEyYXZAEUEtyaG5VWExlendYSDVscnJzU3BwcHNjREFyb2Job1RmNVJubm04UVFyYk9xSFQwR2l1UTFpazNuWDRNRzlsUFJTUGloeTc1b0FwYzgyeDZAUMWxwdXZAsRFZA0c1FyRHJzMzBucThoZATNWYwZDZD'; // 🔥 Thay bằng Access Token của bạn
      const userId = '17841409268757013';

      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,caption,media_type,media_url,permalink,timestamp&access_token=${accessToken}`,
      );
      const data = await response.json();
      setPosts(data.data || []);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu Instagram:', error);
    }
  };

  // Gọi API khi component được render
  useEffect(() => {
    fetchInstagramPosts();
  }, []);

  return (
    <div
      className={cn(
        'grid grid-cols-3 md:grid-cols-6 gap-0.5 sm:gap-1 overflow-hidden',
        {
          'rounded-md': !disableContainerBorderRadius,
        },
        className,
      )}
    >
      {posts.length > 0 ? (
        posts.map((post) => (
          <a
            className="group flex justify-center text-center relative"
            href={post.permalink}
            key={post.id}
            target="_blank"
          >
            <Image
              loader={imageLoader}
              src={post.media_url}
              alt={post.caption || t('text-instagram-thumbnail')}
              width={300}
              height={300}
              className={cn('bg-gray-300 object-cover', {
                'rounded-md': variant === 'rounded',
              })}
            />
            <div
              className={cn(
                'absolute top left bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-50',
                {
                  'rounded-md': variant === 'rounded',
                },
              )}
            />
            <div className="absolute top left h-full w-full flex items-center justify-center">
              <FaInstagram className="text-white text-base sm:text-xl md:text-3xl lg:text-5xl xl:text-6xl transform opacity-0 scale-400 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </a>
        ))
      ) : (
        <p className="text-center col-span-3 md:col-span-6">Đang tải dữ liệu Instagram...</p>
      )}
    </div>
  );
};

export default Instagram;
