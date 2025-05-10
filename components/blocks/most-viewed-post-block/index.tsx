import { PostCategory } from '@services/types';
import { usePostsQuery } from '@services/post/get-all-posts';
import { MostViewedPostsSkeleton } from '@components/common/loaders/posts-most-view-loader';
import { cn } from '@lib/utils';
import SectionHeader from '@components/ui/section-header';
import Link from 'next/link';
import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';
import { AiOutlineCalendar, AiOutlineEye } from 'react-icons/ai';
import { format } from 'date-fns';
import React from 'react';

export function MostViewedPostsBlock({ category, loading }: { category?: PostCategory; loading?: boolean }) {
  const {
    data: { count, posts } = {},
    error,
    isLoading,
  } = usePostsQuery({
    categoryId: category?.id,
    perPage: 4,
    enabled: !!category?.id,
  });
  if (isLoading || loading) {
    return <MostViewedPostsSkeleton />;
  }

  if (error || !count || !posts?.length) {
    return null;
  }

  return (
    <div className={cn('space-y-4 lg:col-span-5')}>
      <SectionHeader sectionHeading={'text-most-viewed'} />

      <div className="space-y-4">
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
                <div className="relative flex-shrink-0 aspect-[4/3] w-40 h-40 overflow-hidden rounded-md">
                  <Image
                    src={imageUrl || '/placeholder.svg'}
                    alt={post.title.rendered}
                    fill
                    loader={imageLoader}
                    className="object-cover transition-transform duration-300 group-hover:scale-110 "
                    priority={index === 0}
                  />
                </div>

                <div className="flex flex-col flex-grow min-w-0">
                  <h3 className="font-semibold text-base sm:text-2xl line-clamp-2 group-hover:text-primary transition-colors duration-200">
                    {post.title.rendered}
                  </h3>

                  {excerpt && (
                    <p className="text-gray-600 text-sm sm:text-lg mt-1 line-clamp-2 hidden sm:block">{excerpt}</p>
                  )}

                  <div className="flex items-center justify-between flex-wrap gap-2 text-sm sm:text-lg text-gray-500 mt-auto pt-2">
                    <span className="font-medium">{category?.name || 'Blog'}</span>
                    <time className="flex items-center">
                      <AiOutlineCalendar className="h-3 w-3 mr-1" />
                      {format(new Date(post.date), 'dd/MM/yyyy')}
                    </time>
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
