import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';

function BlogImage({ image, title }: { image?: string; title: string }) {
  return (
    <div className="relative h-56 xs:h-64 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-lg">
      <Image
        src={image ?? '/assets/placeholder/products/product-thumbnail.svg'}
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

export default BlogImage;
