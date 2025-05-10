import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';
import { LuClock, LuHeart, LuMessageSquare, LuShare2 } from 'react-icons/lu';
import { PostAuthor } from '@services/types';

function BlogFooter({ author, date }: { author?: PostAuthor[]; date: string }) {
  return (
    <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between mt-4 pt-4 border-t border-gray-100 gap-3 xs:gap-0">
      <div className="flex items-center gap-2">
        <div className="relative rounded-full aspect-square">
          <Image
            alt={author?.[0]?.name ?? 'unknown'}
            src={author?.[0]?.avatar_urls?.[0] ?? '/assets/placeholder/products/product-thumbnail.svg'}
            className="size-8 rounded-full object-cover"
            width={32}
            height={32}
            loader={imageLoader}
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

export default BlogFooter;
