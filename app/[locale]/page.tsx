'use client';

import BannerBlock from '@/components/banner/banner-block';
import { homeThreeBanner, homeThreeMasonryBanner } from '@configs/banner';
import Container from '@components/ui/container';
import BannerSliderBlock from '@blocks/banner-slider-block';
import BrandGridBlock from '@blocks/brand-grid-block';
import ProductsFlashSaleBlock from '@blocks/products-flash-sale-block';
import Divider from '@components/ui/divider';
import Subscription from '@components/ui/subscription';
import Instagram from '@components/ui/instagram';
import Support from '@components/ui/support';
import DownloadApps from '@components/ui/download-app';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import ExclusiveBlock from '@blocks/exclusive-block';
import BannerWithProducts from '@blocks/banner-with-products-block';
import { ROUTES } from '@utils/routes';
import BannerCard from '@components/banner/banner-card';
import ProductsFeatured from '@blocks/products-featured-block';
import CategoryBlock from '@blocks/category-block';

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <div
        className="relative flex-grow"
        style={{
          minHeight: '-webkit-fill-available',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <BannerBlock data={homeThreeMasonryBanner} />
        <Container>
          <ProductsFlashSaleBlock date={'2025-12-01T01:02:03'} />
        </Container>
        <BannerSliderBlock />
        <Container>
          <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" />
          <ProductsFeatured sectionHeading="text-featured-products" limit={5} />
          <BannerCard
            key={`banner--key${homeThreeBanner[0].id}`}
            banner={homeThreeBanner[0]}
            href={`${ROUTES.COLLECTIONS}/${homeThreeBanner[0].slug}`}
            className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          />

          <BrandGridBlock sectionHeading="text-top-brands" />
          <BannerCard
            key={`banner--key${homeThreeBanner[1].id}`}
            banner={homeThreeBanner[1]}
            href={`${ROUTES.COLLECTIONS}/${homeThreeBanner[1].slug}`}
            className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          />
          <BannerWithProducts sectionHeading="text-on-selling-products" categorySlug="/search" />
          <ExclusiveBlock />
          <NewArrivalsProductFeed />
          <DownloadApps />
          <Support />
          <Instagram />
          <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" />
        </Container>
        <Divider className="mb-0" />
      </div>
    </div>
  );
}
