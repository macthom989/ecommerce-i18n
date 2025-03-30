import isEmpty from 'lodash/isEmpty';
import { Post } from '@/app/[locale]/blog/_data/types';
import BlogCard from '@/app/[locale]/blog/_components/blog-card';

interface BlogsGridProps {
  posts: Post[];
}

const BlogsGridBlock: React.FC<BlogsGridProps> = ({ posts = [] }) => {
  if (isEmpty(posts)) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">No more post found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogsGridBlock;
