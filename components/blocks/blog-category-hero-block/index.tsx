import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';
import { extractImageUrlFromHtml } from '@components/blog/blog-category-card';
import { cn } from '@lib/utils';
import { PostCategory } from '@services/types';

import { CategoryHeaderSkeleton } from '@components/common/loaders/blog-category-header-loader';

interface CategoryHeaderProps {
  category: PostCategory;
  loading?: boolean;
}

export default function CategoryHeader({ category, loading }: CategoryHeaderProps) {
  if (loading) return <CategoryHeaderSkeleton />;

  if (!category) return null;

  const imageUrl = extractImageUrlFromHtml?.(category.description) || '/placeholder.svg?height=600&width=800';

  return (
    <section
      className={cn(
        'w-full overflow-hidden bg-gradient-to-r from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-900 mb-16',
      )}
    >
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-3 ">
          {/* Content Column */}
          <div className="flex flex-col justify-center order-2 md:order-1 px-8 mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Về {category.name}
            </h1>
            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: `Thông tin về ${category.name}`,
              }}
            />
          </div>

          {/* Image Column */}
          <div className="relative  w-full h-full aspect-[428/273] md:aspect-[39/25] order-1 md:order-2  overflow-hidden shadow-xl">
            <Image
              src={imageUrl || '/placeholder.svg'}
              alt={`${category.name} image`}
              fill
              loader={imageLoader}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
