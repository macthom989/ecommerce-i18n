import { ROUTES } from '@utils/routes';

import BannerCard from '@components/banner/banner-card';
import { useUI } from '@/contexts/managed-ui-provider';

interface BannerImage {
  url: string;
  width: number;
  height: number;
}

export interface BannerItem {
  id: number;
  title: string;
  slug: string;
  image: {
    mobile: BannerImage;
    desktop: BannerImage;
  };
  type: string;
}

interface BannerProps {
  className?: string;
}

const BannerBlock: React.FC<BannerProps> = ({ className = 'mb-12 md:mb-14 xl:mb-16 px-2.5' }) => {
  const { siteSettings } = useUI();
  const data = siteSettings?.banners;
  return (
    <div className={`${className} grid grid-cols-2 sm:grid-cols-9 gap-2 md:gap-2.5 max-w-[1920px] mx-auto`}>
      {data &&
        data?.map((banner: BannerItem) => (
          <BannerCard
            key={`banner--key${banner.id}`}
            banner={banner}
            href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
            effectActive={true}
            variant="default"
            className={banner.type === 'medium' ? 'col-span-full sm:col-span-5' : 'col-span-1 sm:col-span-2'}
          />
        ))}
    </div>
  );
};

export default BannerBlock;
