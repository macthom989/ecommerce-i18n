import { Post, PostAuthor, PostWpTerm } from '@/app/[locale]/blog/_data/types';
import Image from 'next/image';
import { LuClock, LuHeart, LuMessageSquare, LuShare2 } from 'react-icons/lu';

function BlogImage({ image, title }: { image?: string; title: string }) {
  const imageLoader = ({ src }: { src: string }) => {
    return src.startsWith('http') ? src : '/assets/placeholder/products/product-thumbnail.svg';
  };
  return (
    <div className="relative h-56 xs:h-64 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg">
      <Image
        src={image || '/assets/placeholder/products/product-thumbnail.svg'}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        width={600}
        height={800}
        priority
        loader={imageLoader}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

function BlogContent({ title, excerpt }: { title: string; excerpt: string }) {
  return (
    <div className="space-y-1.5 sm:space-y-2 mt-3 sm:mt-4">
      <BlogTitle title={title} />
      <BlogExcerpt excerpt={excerpt} />
    </div>
  );
}

function BlogExcerpt({ excerpt }: { excerpt: string }) {
  return (
    <p className="text-sm sm:text-base text-gray-500 line-clamp-3" dangerouslySetInnerHTML={{ __html: excerpt }}></p>
  );
}

function BlogTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base sm:text-lg font-bold line-clamp-2 group-hover:text-pink-500 transition-colors duration-200">
      {title}
    </h3>
  );
}

function BlogFooter({ author, date }: { author?: PostAuthor[]; date: string }) {
  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mt-4 pt-4 border-t border-gray-100 gap-3 xs:gap-0">
      <div className="flex items-center gap-2">
        <div className="relative rounded-full aspect-square">
          <Image
            alt={author?.[0]?.name ?? 'unknown'}
            src={author?.[0]?.avatar_urls?.[0] || '/assets/placeholder/products/product-thumbnail.svg'}
            className="size-8 rounded-full object-cover"
            width={32}
            height={32}
          />
        </div>
        <div className="flex gap-1 flex-col justify-center">
          <div className="text-xs font-medium">{author?.[0]?.name ?? 'Unknown'}</div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
            <LuClock className="w-3 h-3" />
            {date}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <button className="hover:text-pink-500 transition-colors">
          <LuHeart className="w-4 h-4" />
        </button>
        <button className="hover:text-pink-500 transition-colors">
          <LuMessageSquare className="w-4 h-4" />
        </button>
        <button className="hover:text-pink-500 transition-colors">
          <LuShare2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function BlogBadge({ category }: { category?: PostWpTerm[] }) {
  if (!category) return null;
  return (
    <div className="flex gap-1 flex-wrap mt-2">
      {category?.map((item) => (
        <div key={item?.id} className="mb-1">
          <span className="bg-pink-500 text-white text-xs font-semibold px-2.5 py-1 rounded-3xl shadow-sm hover:bg-pink-600 transition-colors">
            {item?.name}
          </span>
        </div>
      ))}
    </div>
  );
}

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
