'use client';

import Image from 'next/image';
import Text from '../../common/text';
import { FaLink } from 'react-icons/fa';
import Link, { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { imageLoader } from '@/utils/image-loader';
import { cn } from '@lib/utils';

interface Props {
  item: any;
  size?: 'small' | 'medium';
  imgSize?: 'large';
  effectActive?: boolean;
  effectActiveScale?: boolean;
  href: LinkProps['href'];
  disableBorderRadius?: boolean;
}

// Extract image URL from HTML img tag
const extractImageUrlFromHtml = (html) => {
  if (!html) return null;

  const match = html.match(/<img[^>]+src="([^">]+)"/);
  return match ? match[1] : null;
};

const BlogCategoryCard: React.FC<Props> = ({
  item,
  size = 'medium',
  effectActive = false,
  effectActiveScale = false,
  href,
  imgSize,
  disableBorderRadius = false,
}) => {
  const { name, image, description } = item ?? {};
  const imageSize: any = (imgSize === 'large' && 375) || (size === 'small' && 180) || (size === 'medium' && 198);

  const hasRadius = !disableBorderRadius;
  const placeholderImage = `/assets/placeholder/card-${size}.svg`;
  const t = useTranslations('common');

  // Check if description contains image tag and extract URL
  const descriptionImageUrl = extractImageUrlFromHtml(description);
  const imageUrl = descriptionImageUrl || image?.src || placeholderImage;

  return (
    <Link href={href} className="group flex justify-center text-center flex-col">
      <div
        className={cn('relative inline-flex mx-auto overflow-hidden', hasRadius && 'rounded-md')}
        style={{
          width: imageSize,
          height: imageSize,
        }}
      >
        <div className={cn('relative flex w-full h-full aspect-square overflow-hidden')}>
          <Image
            loader={imageLoader}
            src={imageUrl}
            alt={name || t('text-card-thumbnail')}
            width={imageSize}
            height={imageSize}
            quality={100}
            className={cn(
              'object-cover bg-gray-300',
              hasRadius && 'rounded-md',
              effectActiveScale && 'group-hover:scale-105 transition-transform duration-300',
            )}
          />
        </div>

        {/* Fixed center name overlay - always displayed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 px-3 py-2 rounded">
            <Text variant="heading" className="capitalize text-white">
              {name || t('text-unnamed-item')}
            </Text>
          </div>
        </div>

        {effectActive && (
          <>
            <div
              className={cn(
                'absolute inset-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30',
                hasRadius && 'rounded-md',
              )}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default BlogCategoryCard;
