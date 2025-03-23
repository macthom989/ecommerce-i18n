'use client';

import { useUI } from '@contexts/managed-ui-provider';
import HeroBlock from '@blocks/hero-block';
import Container from '@components/ui/container';
import { homeOneBanner, promotionBannerTwo } from '@configs/banner';
import BannerCarouselBlock from '@blocks/banner-carousel-block';
import CategoryBlock from '@blocks/category-block';
import Divider from '@components/ui/divider';
import BestSellerProductFeed from '@components/product/feeds/best-seller-product-feed';
import BannerCard from '@components/banner/banner-card';
import { ROUTES } from '@utils/routes';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import BrandBlock from '@blocks/brand-block';
import { collectionData } from '@configs/collection';
import CollectionBlock from '@blocks/collection-block';
import FeatureBlock from '@blocks/feature-block';
import DownloadApps from '@components/ui/download-app';
import Support from '@components/ui/support';
import Subscription from '@components/ui/subscription';
import FlashSaleBlock from '@components/product/feeds/flash-sale-product-feed';
import { useEffect } from 'react';

export default function Standard() {
  const { openModal, setModalView } = useUI();
  useEffect(() => {
    setModalView('NEWSLETTER_VIEW');
    setTimeout(() => {
      openModal();
    }, 2000);
  }, []);
  return (
    <>
      <HeroBlock />
      <Container>
        <FlashSaleBlock />
        <BannerCarouselBlock bannerData={promotionBannerTwo} />
        <CategoryBlock sectionHeading="text-shop-by-category" />
        <Divider />
        <BestSellerProductFeed />
        <BannerCard
          key={`banner--key${homeOneBanner.id}`}
          banner={homeOneBanner}
          href={`${ROUTES.COLLECTIONS}/${homeOneBanner.slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
          classNameInner="h-28 sm:h-auto"
        />
        <NewArrivalsProductFeed />
        <Divider />
        <BrandBlock sectionHeading="text-top-brands" />
        <CollectionBlock data={collectionData} />
        <FeatureBlock />
        <DownloadApps className="bg-linen" />
        <Support />
        <Subscription className="px-5 bg-linen sm:px-8 md:px-16 2xl:px-24" />
      </Container>
    </>
  );
}
