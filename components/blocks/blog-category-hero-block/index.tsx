import Image from 'next/image';
import { imageLoader } from '@utils/image-loader';

interface CategoryHeaderProps {
  category: any;
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  if (!category) return null;

  const imageUrl = category.image || '/placeholder.svg?height=400&width=600';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 bg-gray-500">
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Về {category.name}</h1>
        <p className="text-gray-600">{category.description || `Thông tin về ${category.name}`}</p>
      </div>

      <div className="relative h-64 md:h-auto overflow-hidden rounded-md">
        <Image
          src={imageUrl || '/placeholder.svg'}
          alt={category.name}
          fill
          loader={imageLoader}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
    </div>
  );
}
