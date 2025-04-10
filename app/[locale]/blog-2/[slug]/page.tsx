'use client';

import Container from '@components/ui/container';
import React, { use } from 'react';
import { BreadcrumbItems } from '@components/common/breadcrumb';
import ActiveLink from '@components/ui/active-link';
import { ROUTES } from '@utils/routes';
import { useTranslations } from 'next-intl';
import CategoryHeader from '@blocks/blog-category-hero-block';
import { useCategoryBySlug } from '@services/post/get-category-by-slug';
import { usePostsQuery } from '@services/post/get-all-posts';
import Link from 'next/link';
import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';
import { PostCategory } from '@services/types';
import { format } from 'date-fns';
import SectionHeader from '@components/ui/section-header';
import { Skeleton } from '@components/ui/skeleton';
import { cn } from '@lib/utils';
import { AiOutlineCalendar, AiOutlineEye } from 'react-icons/ai';
import PostsGridBlock from '@blocks/posts-grid-block';

export default function BlogByCategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = use(params).slug;
  const t = useTranslations('common');
  const { data: category, isLoading: loadingCategory } = useCategoryBySlug({ slug });
  return (
    <Container>
      <div className="py-4 md:py-6">
        <BreadcrumbItems separator=">">
          <ActiveLink href={'/'} activeClassName="font-semibold text-heading">
            {t('breadcrumb-home')}
          </ActiveLink>
          <ActiveLink href={ROUTES.BLOG_2} activeClassName="font-semibold text-heading" className="capitalize">
            Blog-2
          </ActiveLink>
          <ActiveLink href={'/'} activeClassName="font-semibold text-heading" className="capitalize">
            {slug}
          </ActiveLink>
        </BreadcrumbItems>
      </div>
      <CategoryHeader category={category} />
      <MostViewedPostsBlock category={category} />
      <PostsGridBlock category={category} />
    </Container>
  );
}

export function MostViewedPostsBlock({ category }: { category?: PostCategory }) {
  const {
    data: { count, posts } = {},
    error,
    isLoading,
  } = usePostsQuery({
    categoryId: category?.id,
    perPage: 4,
    enabled: !!category?.id,
  });
  if (isLoading) {
    return <MostViewedPostsSkeleton />;
  }

  if (error || !count || !posts?.length) {
    return null;
  }

  return (
    <div className={cn('space-y-6')}>
      <SectionHeader sectionHeading={'text-most-viewed'} />

      <div className="space-y-6">
        {posts.map((post, index) => {
          const imageUrl =
            post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder.svg?height=200&width=200';

          // Extract excerpt from post content if available
          const excerpt = post.excerpt?.rendered
            ? post.excerpt.rendered.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 120) + '...'
            : '';

          return (
            <Link key={post.id} href={`/post/${post.slug}`} className="group block">
              <div className="flex gap-4 items-center hover:bg-gray-50 p-2 -m-2 rounded-lg transition-colors duration-200">
                <div className="relative flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-md">
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={post.title.rendered}
                    fill
                    loader={imageLoader}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 96px, 112px"
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col flex-grow min-w-0">
                  <h3 className="font-semibold text-base sm:text-lg line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {post.title.rendered}
                  </h3>

                  {excerpt && <p className="text-gray-600 text-sm mt-1 line-clamp-2 hidden sm:block">{excerpt}</p>}

                  <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-auto pt-2">
                    <span className="font-medium">{category?.name || 'Blog'}</span>
                    <span className="mx-2">|</span>
                    <time className="flex items-center">
                      <AiOutlineCalendar className="h-3 w-3 mr-1" />
                      {format(new Date(post.date), 'dd/MM/yyyy')}
                    </time>
                    <span className="mx-2 hidden sm:inline">|</span>
                    <span className=" items-center hidden sm:flex">
                      <AiOutlineEye className="h-3 w-3 mr-1" />
                      {Math.floor(Math.random() * 1000) + 100} view
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function MostViewedPostsSkeleton() {
  return (
    <div className={cn('space-y-6')}>
      <Skeleton className="h-5 w-3/4" />

      <div className="space-y-6">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="flex gap-4 items-start" style={{ animationDelay: `${index * 100}ms` }}>
              <Skeleton className="flex-shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-md" />

              <div className="flex-grow space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-40 mt-2" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
