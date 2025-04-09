'use client';

import { PostCategory } from '@services/types';
import { useState } from 'react';
import BlogCategoryBlock from '@blocks/blog-catalog-block';

const PostsGridBlock = ({ category }: { category?: PostCategory }) => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  if (!category?.id) return null;

  return (
    <div>
      <div>Search</div>
      <BlogCategoryBlock categoryId={category.id} page={page} perPage={perPage} countLoader={12} />
    </div>
  );
};

export default PostsGridBlock;
