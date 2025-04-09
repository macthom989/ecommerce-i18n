'use client';

import type React from 'react';

import { usePostsQuery } from '@services/post/get-all-posts';
import { BlogCard2 } from '@components/blog/blog-card-2';
import { FiAlertCircle } from 'react-icons/fi';
import { BlogCategorySkeleton } from '@components/common/loaders/blog-category-loader';

interface Props {
  page?: number;
  perPage?: number;
  categoryId: number;
  className?: string;
  countLoader?: number;
}

const BlogCategoryBlock: React.FC<Props> = ({ page = 1, perPage = 4, categoryId, className, countLoader }) => {
  const { data, isLoading, error } = usePostsQuery({
    page,
    perPage,
    categoryId: categoryId,
  });

  // Handle loading state
  if (isLoading) {
    return <BlogCategorySkeleton count={countLoader} />;
  }

  // Handle error state
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 flex items-center">
        <FiAlertCircle className="h-4 w-4 mr-2" />
        Failed to load blog posts. Please try again later.
      </div>
    );
  }

  // No posts found
  if (!data?.posts?.length) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 h-32 flex justify-center items-center">
        No posts found for this category.
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 ${className || ''}`}>
      {data.posts.map((post) => (
        <div key={post.id} className="transform transition duration-300 hover:-translate-y-1">
          <BlogCard2 post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogCategoryBlock;
