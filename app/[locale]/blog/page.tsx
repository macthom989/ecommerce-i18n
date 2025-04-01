'use client';

import { useCallback, useState } from 'react';
import { usePostsQuery } from '@services/post/get-all-posts';
import Container from '@components/ui/container';
import BlogGridBlock from '@blocks/blog-grid-block';
import BlogPageLoading from '@components/common/loaders/blog-grid-loader';
import BlogFilterBlock from '@components/blog/blog-filter';
import { Pagination } from '@components/common/pagination-dynamic';

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState<string>('');
  const [sortBy, setSortBy] = useState('date_desc');

  // Query posts with all parameters
  const { data, isLoading } = usePostsQuery(page, perPage, searchString, sortBy);

  // Handle search
  const handleSearch = useCallback((value: string) => {
    setSearchString(value);
    setPage(1); // Reset to first page on new search
  }, []);

  // Handle sort
  const handleSort = useCallback((value: string) => {
    setSortBy(value);
    setPage(1); // Reset to first page on new sort
  }, []);

  return (
    <Container>
      <div className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-0">
        <BlogFilterBlock onSearch={handleSearch} onSort={(value) => handleSort(value)} />
        {isLoading && !data ? <BlogPageLoading /> : data && <BlogGridBlock posts={data?.posts} />}
        {Boolean(data?.totalPages && data?.totalPages > 1) && (
          <div className="flex justify-center mt-8 sm:mt-12 overflow-x-auto w-full">
            <Pagination totalPages={data?.totalPages} currentPage={page} onPageChange={setPage} />
          </div>
        )}
      </div>
    </Container>
  );
}
