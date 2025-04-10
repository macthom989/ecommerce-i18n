import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Post } from '@services/types';
import { imageLoader } from '@utils/image-loader';
import { AiOutlineCalendar, AiOutlineTag } from 'react-icons/ai';
import PlusIcon from '@components/icons/plus-icon';

interface BlogCardProps {
  post?: Post;
}

export function BlogCard2({ post }: BlogCardProps) {
  if (!post) {
    return null;
  }

  const categories = post?._embedded?.['wp:term']?.[0]?.map((category) => category);

  return (
    <Link href={`/post/${post?.slug}`} className="block h-full">
      <article className="group h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md flex flex-col">
        {/* Image container with increased height */}
        <div className="relative w-full overflow-hidden aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]">
          <Image
            src={
              post?._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
              '/assets/placeholder/products/product-thumbnail.svg' ||
              '/placeholder.svg'
            }
            alt={post.title.rendered}
            fill
            loader={imageLoader}
            className="object-cover "
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={false}
          />
          {/* Category badge */}(
          <div className={'absolute top-3 left-3 flex gap-2'}>
            {categories &&
              (categories.length >= 3 ? (
                <>
                  <div className=" bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800 flex items-center">
                    <AiOutlineTag className="w-3 h-3 mr-1" />
                    {categories[0].name}
                  </div>
                  <div className=" bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800 flex items-center gap-0.5">
                    <PlusIcon width={'6px'} height={'6px'} /> {categories.length - 1}
                  </div>
                </>
              ) : (
                categories.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-gray-800 flex items-center"
                  >
                    <AiOutlineTag className="w-3 h-3 mr-1" />
                    {item.name}
                  </div>
                ))
              ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-4">
          <h3 className="line-clamp-2 text-lg font-bold leading-tight text-gray-900 mb-2 group-hover:text-gray-700">
            {post.title.rendered}
          </h3>

          {/* Optional excerpt */}
          {post.excerpt?.rendered && (
            <div
              className="line-clamp-2 text-sm text-gray-600 mb-3"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          )}

          {/* Date */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <time dateTime={post.date} className="text-xs text-gray-500 flex items-center">
              <AiOutlineCalendar className="w-3 h-3 mr-1" />
              {format(new Date(post.date), 'MMM d, yyyy')}
            </time>
          </div>
        </div>
      </article>
    </Link>
  );
}
