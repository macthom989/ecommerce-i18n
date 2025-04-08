import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from 'date-fns/format';
import { Post } from '@services/types';
import { imageLoader } from '@utils/image-loader';

interface BlogCardProps {
  post: Post;
}

export function BlogCard2({ post }: BlogCardProps) {
  return (
    <article className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <Link href={`/blog/${post?.slug}`} className="block overflow-hidden">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={
              post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              '/assets/placeholder/products/product-thumbnail.svg'
            }
            alt={post.title.rendered}
            fill
            loader={imageLoader}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          {/*{post.badge && (*/}
          {/*  <div className="absolute top-3 right-3 bg-yellow-500 text-white px-2 py-1 text-xs font-medium rounded">*/}
          {/*    {post.badge}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/blog/${post?.slug}`}>
          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-tight text-gray-900 hover:text-blue-600">
            {post.title.rendered}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <Link href={`/category/${post.slug}`} className="hover:text-blue-600">
            {post?.slug}
          </Link>
          <time dateTime={post.date}>{formatDate(post?.date, 'PP')}</time>
        </div>
      </div>
    </article>
  );
}
