'use client';

import type React from 'react';

import { useCategoriesPostQuery } from '@services/post/get-all-categories-post';
import { ROUTES } from '@utils/routes';
import Carousel from '@components/carousel/carousel';
import { SwiperSlide } from 'swiper/react';
import Alert from '@components/ui/alert';
import BlogCategoryCard from '@components/blog/blog-category-card';
import SectionHeader from '@components/ui/section-header';
import { BlogCategoryCardSkeleton } from '@components/common/loaders/blog-category-card-loader';

interface CategoriesProps {
  sectionHeading?: string;
  className?: string;
  roundedItemCount?: number;
  roundedSpaceBetween?: number;
  imgSize?: 'large';
  disableBorderRadius?: boolean;
}

const BlogCategorySliderBlock: React.FC<CategoriesProps> = ({
  className = 'mb-10 md:mb-11 lg:mb-12 xl:mb-14',
  sectionHeading,
  roundedItemCount,
  roundedSpaceBetween,
  imgSize,
  disableBorderRadius = false,
}) => {
  const { data, error, isLoading } = useCategoriesPostQuery();

  const breakpoints = {
    '1720': {
      slidesPerView: roundedItemCount === 5 ? 5 : 8,
      spaceBetween: roundedSpaceBetween || 28,
    },
    '1400': { slidesPerView: roundedItemCount === 5 ? 5 : 7, spaceBetween: roundedSpaceBetween || 28 },
    '1024': { slidesPerView: roundedItemCount === 5 ? 4 : 6, spaceBetween: roundedSpaceBetween || 20 },
    '768': { slidesPerView: roundedItemCount === 5 ? 3 : 5, spaceBetween: roundedSpaceBetween || 20 },
    '500': { slidesPerView: roundedItemCount === 5 ? 2 : 4, spaceBetween: roundedSpaceBetween || 12 },
    '0': { slidesPerView: roundedItemCount === 5 ? 2 : 3, spaceBetween: roundedSpaceBetween || 12 },
  };
  if (error) {
    return (
      <div className={className}>
        {sectionHeading && <SectionHeader sectionHeading={sectionHeading} />}
        <Alert message={error?.message} />
      </div>
    );
  }

  return (
    <div className={className}>
      {sectionHeading && <SectionHeader sectionHeading={sectionHeading} />}

      <Carousel
        breakpoints={breakpoints}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        centeredSlides={true}
      >
        {isLoading && !data
          ? Array.from({ length: roundedItemCount || 10 }).map((_, idx) => (
              <SwiperSlide key={`card-rounded-${idx}`}>
                <BlogCategoryCardSkeleton delay={idx * 100} />
              </SwiperSlide>
            ))
          : data?.map((category, index) => (
              <SwiperSlide key={`category--key-${index}`}>
                <BlogCategoryCard
                  imgSize={imgSize}
                  item={category}
                  href={`${ROUTES.BLOG_2}/${category.slug}`}
                  effectActiveScale={true}
                  disableBorderRadius={disableBorderRadius}
                />
              </SwiperSlide>
            ))}
      </Carousel>
    </div>
  );
};

export default BlogCategorySliderBlock;
