'use client';

import { postsSelectors, usePostsQuery } from '@services/post/get-all-posts';

interface Props {
  categoryId: number;
  className?: string;
}

type SimplifiedPost = ReturnType<typeof postsSelectors.simplifiedPosts>[0];

const BlogCategoryBlock: React.FC<Props> = ({ categoryId, className }) => {
  const { data, isLoading, error } = usePostsQuery<SimplifiedPost[]>({
    perPage: 4,
    categoryId: categoryId,
    select: postsSelectors.simplifiedPosts,
  });

  return <div></div>;
};

export default BlogCategoryBlock;
