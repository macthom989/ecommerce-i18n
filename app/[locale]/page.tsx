'use client';

import BannerBlock from '@/components/banner/banner-block';
import { homeThreeBanner } from '@configs/banner';
import Container from '@components/ui/container';

import ProductsFlashSaleBlock from '@blocks/products-flash-sale-block';
import Divider from '@components/ui/divider';
import Instagram from '@components/ui/instagram';
import Support from '@components/ui/support';
import DownloadApps from '@components/ui/download-app';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import { ROUTES } from '@utils/routes';
import BannerCard from '@components/banner/banner-card';
import dynamic from 'next/dynamic';
import Subscription from '@components/ui/subscription';
import { useUI } from '@/contexts/managed-ui-provider';
const ProductsFeatured = dynamic(() => import('@blocks/products-featured-block'), { ssr: false });
const BannerSliderBlock = dynamic(() => import('@blocks/banner-slider-block'), { ssr: false });
const BrandGridBlock = dynamic(() => import('@blocks/brand-grid-block'), { ssr: false });
const CategoryBlock = dynamic(() => import('@blocks/category-block'), { ssr: false });
const ExclusiveBlock = dynamic(() => import('@blocks/exclusive-block'), { ssr: false });
const BannerWithProducts = dynamic(() => import('@blocks/banner-with-products-block'), { ssr: false });

export default function Page() {
  const { siteSettings } = useUI();
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative flex-grow"
        style={{
          minHeight: '-webkit-fill-available',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <BannerBlock />
        <Container>
          <ProductsFlashSaleBlock
            date={
              siteSettings.flash_sale_time_type === 'loop'
                ? new Date(Date.now() + siteSettings.flash_sale_loop_hours * 60 * 60 * 1000).toISOString()
                : siteSettings.flash_sale_end_time_block
            }
          />
        </Container>
        <BannerSliderBlock />
        <Container>
          <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
          <ProductsFeatured sectionHeading="text-featured-products" limit={5} />
          {siteSettings.bannerTheme && (
            <BannerCard
              key={`banner--key${siteSettings?.bannerTheme?.BannerCard[0].id}`}
              banner={siteSettings?.bannerTheme?.BannerCard[0]}
              href={`${ROUTES.COLLECTIONS}/${siteSettings?.bannerTheme?.BannerCard[0].slug}`}
              className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
            />
          )}

          <BrandGridBlock sectionHeading="text-top-brands" />
          {siteSettings.bannerTheme && (
            <BannerCard
              key={`banner--key${siteSettings?.bannerTheme?.BannerCard[1].id}`}
              banner={siteSettings?.bannerTheme?.BannerCard[1]}
              href={`${ROUTES.COLLECTIONS}/${siteSettings?.bannerTheme?.BannerCard[1].slug}`}
              className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
            />
          )}
          <BannerWithProducts sectionHeading="text-on-selling-products" categorySlug="/search" />
          <ExclusiveBlock />
          <NewArrivalsProductFeed />
          <DownloadApps />
          {/* <Support /> */}
          <Instagram />
          <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" />
        </Container>
        <Divider className="mb-0" />
      </div>
    </div>
  );
}
