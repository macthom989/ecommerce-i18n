import { AnchorProps } from '@services/types';
import { cn } from '@lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { siteSettings } from '@configs/site-settings';

const Logo: React.FC<AnchorProps> = ({ className, ...props }) => {
  return (
    <Link href={siteSettings.logo.href} className={cn('inline-flex focus:outline-none', className)} {...props}>
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
