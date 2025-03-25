import { useUI } from '@/contexts/managed-ui-provider';
import { imageLoader } from '@/utils/image-loader';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  const { siteSettings } = useUI();
  const logoUrl = siteSettings?.logo?.url ?? '/assets/images/logo.svg';

  return (
    <Link href={siteSettings?.logo?.href ?? '/'}>
      <Image
        loader={imageLoader}
        src={logoUrl}
        alt={siteSettings?.logo?.alt ?? 'logo'}
        height={siteSettings?.logo?.height ?? 30}
        width={siteSettings?.logo?.width ?? 95}
        loading="eager"
        fetchPriority="high"
        priority
        unoptimized
      />
    </Link>
  );
};

export default Logo;
