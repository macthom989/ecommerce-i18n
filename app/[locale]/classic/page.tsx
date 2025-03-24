import ExclusiveBlock from '@blocks/exclusive-block';
import Container from '@components/ui/container';
import CategoryBlock from '@blocks/category-block';
import ProductsFeatured from '@blocks/products-featured-block';
import BannerBlock from '@components/banner/banner-block';
import { homeFiveBanner } from '@configs/banner';
import BannerWithProducts from '@blocks/banner-with-products-block';
import BannerSliderBlock from '@blocks/banner-slider-block';
import ProductsFlashSaleBlock from '@blocks/products-flash-sale-block';
import BrandGridBlock from '@blocks/brand-grid-block';
import BannerCard from '@components/banner/banner-card';
import { ROUTES } from '@utils/routes';
import NewArrivalsProductFeed from '@components/product/feeds/new-arrivals-product-feed';
import DownloadApps from '@components/ui/download-app';
import Support from '@components/ui/support';
import Instagram from '@components/ui/instagram';
import Subscription from '@components/ui/subscription';
import Divider from '@components/ui/divider';

export default function Classic() {
  return (
    <>
      <ExclusiveBlock className="mb-12 md:mb-14 xl:mb-16 px-2.5 mx-auto max-w-[1920px]" />
      <Container>
        <CategoryBlock sectionHeading="text-shop-by-category" />
        <ProductsFeatured sectionHeading="text-featured-products" variant="center" />
      </Container>
      <BannerBlock />
      <Container>
        <BannerWithProducts sectionHeading="text-on-selling-products" categorySlug="/#" />
      </Container>
      <BannerSliderBlock />
      <Container>
        <ProductsFlashSaleBlock date={'2024-12-01T01:02:03'} />
      </Container>
      <BannerBlock />
      <Container>
        <BrandGridBlock sectionHeading="text-top-brands" />
        <BannerCard
          banner={homeFiveBanner}
          href={`${ROUTES.COLLECTIONS}/${homeFiveBanner.slug}`}
          className="mb-11 md:mb-12 lg:mb-14 2xl:mb-16"
          effectActive={true}
        />
        <NewArrivalsProductFeed />
        <DownloadApps />
        <Support />
        <Instagram />
        <Subscription className="px-8 bg-opacity-0 sm:px-16 xl:px-0" />
      </Container>
      <Divider className="mb-0" />
    </>
  );
}
