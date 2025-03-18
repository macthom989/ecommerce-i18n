import Image from 'next/legacy/image';
import Link from '@components/ui/link';
import { siteSettings } from '@configs/site';
import { AnchorProps } from '@services/types';
import { cn } from '@lib/utils';

const Logo: React.FC<AnchorProps> = ({
                                       className,
                                       ...props
                                     }) => {
  return (
    <Link
      href={siteSettings.logo.href}
      className={cn('inline-flex focus:outline-none', className)}
      {...props}
    >
      <Image
        src={siteSettings.logo.url}
        alt={siteSettings.logo.alt}
        height={siteSettings.logo.height}
        width={siteSettings.logo.width}
        layout="fixed"
        loading="eager"
      />
    </Link>
  );
};

export default Logo;
