import { useUI } from '@/contexts/managed-ui-provider';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  const { siteSettings } = useUI();
  const logoUrl = siteSettings?.logo?.url ?? '/assets/images/logo.svg';

  return (
    <Link href={siteSettings?.logo?.href ?? '/'}>
      {logoUrl.startsWith('http') ? (
        <Image
          src={logoUrl}
          alt={siteSettings?.logo?.alt ?? 'logo'}
          height={siteSettings?.logo?.height ?? 30}
          width={siteSettings?.logo?.width ?? 95}
          loading="eager"
          unoptimized
        />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoUrl} alt={siteSettings?.logo?.alt ?? 'logo'} width={siteSettings?.logo?.width ?? 95} />
        </>
      )}
    </Link>
  );
};

export default Logo;
