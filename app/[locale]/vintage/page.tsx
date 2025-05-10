import Container from '@components/ui/container';
import BannerSliderBlock from '@blocks/banner-slider-block';
import CategoryBlock from '@blocks/category-block';
import BannerWithProducts from '@blocks/banner-with-products-block';
import BannerCard from '@components/banner/banner-card';
import ProductsFeatured from '@blocks/products-featured-block';
import ProductsFlashSaleBlock from '@blocks/products-flash-sale-block';
import ExclusiveBlock from '@blocks/exclusive-block';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import DownloadApps from '@components/ui/download-app';
import Support from '@components/ui/support';
import Instagram from '@components/ui/instagram';
import Subscription from '@components/ui/subscription';
import HeroWithCategoryFlash from '@blocks/hero-with-category-flash-block';
import { ROUTES } from '@utils/routes';
import { homeFourBanner } from '@configs/banner';
import Divider from '@components/ui/divider';
import BrandBlock from '@blocks/brand-block';
import CategoryGridBlock from '@blocks/category-grid-block';

export default function Vintage() {
  return (
    <>
      <Container>
        <HeroWithCategoryFlash />
      </Container>
      <BannerSliderBlock />
      <Container>
        <CategoryBlock sectionHeading="text-shop-by-category" />
        <BannerWithProducts sectionHeading="text-on-selling-products" categorySlug="/search" variant="reverse" />
        <BannerCard
          banner={homeFourBanner[0]}
          href={`${ROUTES.COLLECTIONS}/${homeFourBanner[0].slug}`}
          className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
        />
        <ProductsFeatured sectionHeading="text-featured-products" variant="center" />
        <BannerCard
          banner={homeFourBanner[1]}
          href={`${ROUTES.COLLECTIONS}/${homeFourBanner[1].slug}`}
          className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
        />
        <ProductsFlashSaleBlock date={'2024-12-01T01:02:03'} />
        <BrandBlock sectionHeading="text-top-brands" />
        <ExclusiveBlock />
        <NewArrivalsProductFeed />
        <BannerCard
          banner={homeFourBanner[2]}
          href={`${ROUTES.COLLECTIONS}/${homeFourBanner[2].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        />
        <CategoryGridBlock sectionHeading="text-featured-categories" />
        <DownloadApps />
        <Support />
        <Instagram />
        <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}
