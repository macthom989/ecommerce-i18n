'use client';

import React, { useState } from 'react';

import { usePostsQuery } from '@services/post/get-all-posts';
import { BlogCard2 } from '@components/blog/blog-card-2';
import { FiAlertCircle } from 'react-icons/fi';
import { BlogCategorySkeleton } from '@components/common/loaders/blog-category-loader';
import { Pagination } from '@components/common/pagination-dynamic';

interface Props {
  categoryId?: number;
  className?: string;
  countLoader?: number;
  hiddenPagination?: boolean;
  perPage?: number;
  loading?: boolean;
}

const BlogCategoryBlock: React.FC<Props> = ({
  categoryId,
  className,
  countLoader = 4,
  hiddenPagination = true,
  perPage = 4,
  loading,
}) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePostsQuery({
    page,
    perPage,
    categoryId: categoryId,
    enabled: !!categoryId,
  });

  // Handle loading state
  if (isLoading || loading) {
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
      {!hiddenPagination && data.totalPages > 1 && (
        <Pagination currentPage={page} onPageChange={setPage} totalPages={data.totalPages} />
      )}
    </div>
  );
};

export default BlogCategoryBlock;
