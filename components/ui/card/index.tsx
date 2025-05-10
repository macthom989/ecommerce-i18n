import Image from 'next/image';
import Text from '../../common/text';
import { FaLink } from 'react-icons/fa';
import Link, { LinkProps } from 'next/link';
import { useTranslations } from 'next-intl';
import { imageLoader } from '@/utils/image-loader';
import { cn } from '@lib/utils';

interface Props {
  item: any;
  variant?: 'rounded' | 'circle';
  size?: 'small' | 'medium';
  imgSize?: 'large';
  effectActive?: boolean;
  effectActiveScale?: boolean;
  href: LinkProps['href'];
  showName?: boolean;
  namePosition?: 'bottom' | 'center';
  disableBorderRadius?: boolean;
}

const Card: React.FC<Props> = ({
  item,
  variant = 'circle',
  size = 'small',
  effectActive = false,
  effectActiveScale = false,
  href,
  showName = true,
  namePosition = 'bottom',
  imgSize,
  disableBorderRadius = false,
}) => {
  const { name, image } = item ?? {};
  const imageSize: any = (imgSize === 'large' && 375) || (size === 'small' && 180) || (size === 'medium' && 198);
  const isRounded = variant === 'rounded';
  const isCircle = variant === 'circle';
  const hasRadius = !disableBorderRadius;
  const placeholderImage = `/assets/placeholder/card-${size}.svg`;
  const t = useTranslations('common');

  return (
    <Link href={href} className="group flex justify-center text-center flex-col">
      <div
        className={cn(
          'group relative inline-flex mb-3.5 md:mb-4 lg:mb-5 xl:mb-6 mx-auto overflow-hidden',
          hasRadius && (isRounded ? 'rounded-md' : 'rounded-full'),
        )}
        style={{
          width: imageSize,
          height: imageSize,
        }}
      >
        <div
          className={cn(
            'relative flex w-full h-full',
            isCircle && 'aspect-square',
            isRounded && 'aspect-square', // Ensure consistent square dimensions for rounded type
          )}
        >
          <Image
            loader={imageLoader}
            src={image?.src ?? placeholderImage}
            alt={name || t('text-card-thumbnail')}
            width={imageSize}
            height={imageSize}
            quality={100}
            className={cn(
              'object-cover bg-gray-300 w-full h-full',
              hasRadius && (isRounded ? 'rounded-md' : 'rounded-full'),
              effectActiveScale && 'group-hover:scale-105 transition-transform duration-300',
            )}
            sizes={`${imageSize}px`}
          />
        </div>

        {/* Center name position overlay */}
        {showName && namePosition === 'center' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black bg-opacity-40 px-3 py-2 rounded">
              <Text variant="heading" className="capitalize text-white">
                {name}
              </Text>
            </div>
          </div>
        )}

        {effectActive && (
          <>
            <div
              className={cn(
                'absolute inset-0 bg-black w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-30',
                hasRadius && (isRounded ? 'rounded-md' : 'rounded-full'),
              )}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <FaLink className="text-white text-base sm:text-xl lg:text-2xl xl:text-3xl transform opacity-0 scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100" />
            </div>
          </>
        )}
      </div>
      {/* Bottom name position (original behavior) */}
      {showName && namePosition === 'bottom' && (
        <Text variant="heading" className="capitalize">
          {name}
        </Text>
      )}
    </Link>
  );
};

export default Card;
