import React from 'react';
import Container from '@components/ui/container';
import BannerGridBlock from '@blocks/banner-grid-block';
import Divider from '@components/ui/divider';
import BannerCard from '@components/banner/banner-card';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import DownloadApps from '@components/ui/download-app';
import Support from '@components/ui/support';
import Subscription from '@components/ui/subscription';
import HeroWithCategory from '@blocks/hero-with-category';
import { homeOneBanner, homeTwoHeroBanner } from '@configs/banner';
import ProductsWithFlashSale from '@blocks/product-with-flash-sale-block';
import CategoryGridBlock from '@blocks/category-grid-block';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import { ROUTES } from '@utils/routes';
import BrandBlock from '@blocks/brand-block';
import FeatureBlock from '@blocks/feature-block';
import CollectionBlock from '@blocks/collection-block';
import { collectionData } from '@configs/collection';

const flashSaleCarouselBreakpoint = {
  '1280': {
    slidesPerView: 1,
    spaceBetween: 28,
  },
  '768': {
    slidesPerView: 2,
    spaceBetween: 20,
  },
  '0': {
    slidesPerView: 1,
    spaceBetween: 12,
  },
};

export default function Minimal() {
  return (
    <Container>
      <HeroWithCategory bannerData={homeTwoHeroBanner} />
      <ProductsWithFlashSale carouselBreakpoint={flashSaleCarouselBreakpoint} />
      <BannerGridBlock />
      <CategoryGridBlock sectionHeading="text-featured-categories" />
      <Divider />
      <BestSellerProductFeed />
      <BannerCard
        key={`banner--key${homeOneBanner.id}`}
        banner={homeOneBanner}
        href={`${ROUTES.COLLECTIONS}/${homeOneBanner.slug}`}
        className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
      />
      <NewArrivalsProductFeed />
      <Divider />
      <BrandBlock sectionHeading="text-top-brands" />
      <FeatureBlock />
      <CollectionBlock data={collectionData} />
      <DownloadApps />
      <Support />
      <Subscription />
    </Container>
  );
}
