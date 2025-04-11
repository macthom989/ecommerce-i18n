import { PostCategory } from '@services/types';
import { usePostsQuery } from '@services/post/get-all-posts';
import { FeaturedPostsSkeleton } from '@components/common/loaders/featured-posts-loader';
import Carousel from '@components/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';
import Link from 'next/link';
import React from 'react';

export function FeaturedPostsBlock({ category, loading }: { category?: PostCategory; loading?: boolean }) {
  const { data: { count, posts } = {}, isLoading } = usePostsQuery({
    categoryId: category?.id,
    enabled: !!category?.id,
  });

  if (isLoading || loading) return <FeaturedPostsSkeleton />;

  if (!count) return null;

  return (
    <div className="lg:col-span-7">
      <Carousel
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        paginationVariant="default"
        buttonGroupClassName="hidden"
      >
        {posts?.map((post) => {
          const imageUrl =
            post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg?height=200&width=200';

          return (
            <SwiperSlide key={post.id}>
              <div className="relative rounded-lg overflow-hidden shadow-md bg-blue-50">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={post?.slug ?? 'alt'}
                    fill
                    loader={imageLoader}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                  />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-blue-900/80 to-transparent text-white">
                  <div className="flex justify-between gap-4">
                    <div className="w-full">
                      <div className="text-xl md:text-2xl font-bold mb-2 line-camp-1">{post?.title?.rendered}</div>
                      <div
                        className="text-sm md:text-base "
                        dangerouslySetInnerHTML={{ __html: post?.content?.rendered ?? '' }}
                      />
                    </div>
                    <div>
                      <Link
                        href={`/post/${post?.slug}`}
                        className="inline-block bg-white text-blue-800 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                      >
                        More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Carousel>
    </div>
  );
}
