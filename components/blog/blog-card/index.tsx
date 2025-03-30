import BlogImage from '@components/blog/blog-card/blog-image';
import BlogBadge from '@components/blog/blog-card/blog-badge';
import BlogContent from '@components/blog/blog-card/blog-content';
import BlogFooter from '@components/blog/blog-card/blog-footer';
import { Post } from '@services/types';

function BlogCard({ post }: { post: Post }) {
  return (
    <div className="group bg-white rounded-lg hover:shadow-vendorCardHover shadow-vendorCard transition-all duration-300 flex flex-col h-full p-3 sm:p-4">
      <BlogImage image={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} title={post.title.rendered} />
      <div className="flex-grow flex flex-col">
        <BlogBadge category={post._embedded?.['wp:term']?.[0]} />
        <BlogContent title={post.title.rendered} excerpt={post.excerpt.rendered} />
        <div className="mt-auto">
          <BlogFooter author={post?._embedded?.author} date={post.date} />
        </div>
      </div>
    </div>
  );
}

export default BlogCard;
