import BannerCard from '@components/banner/banner-card';
import SectionHeader from '@components/ui/section-header';
import ProductCard from '@components/product/product-card';
import ProductCardListSmallLoader from '@components/common/loaders/product-card-small-list-loader';
import { useOnSellingProductsQuery } from '@services/product/get-all-on-selling-products';

import { ROUTES } from '@utils/routes';
import { Product } from '@services/types';
import { homeThreeProductsBanner } from '@configs/banner';
import Alert from '@components/ui/alert';

interface ProductsProps {
  sectionHeading: string;
  categorySlug?: string;
  className?: string;
  variant?: 'default' | 'reverse';
}

const BannerWithProducts: React.FC<ProductsProps> = ({
                                                       sectionHeading,
                                                       categorySlug,
                                                       variant = 'default',
                                                       className = 'mb-12 md:mb-14 xl:mb-16',
                                                     }) => {
  const { data, isLoading, error } = useOnSellingProductsQuery({
    limit: 10,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading={sectionHeading}
        categorySlug={categorySlug}
      />
      {error ? (
        <Alert message={error?.message} />
      ) : (
        <div className="grid grid-cols-4 gap-3 lg:gap-5 xl:gap-7">
          {variant === 'reverse' ? (
            <BannerCard
              banner={homeThreeProductsBanner[1]}
              href={`${ROUTES.COLLECTIONS}/${homeThreeProductsBanner[1].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          ) : (
            <BannerCard
              banner={homeThreeProductsBanner[0]}
              href={`${ROUTES.COLLECTIONS}/${homeThreeProductsBanner[0].slug}`}
              className="hidden 3xl:block"
              effectActive={true}
            />
          )}
          <div
            className={`col-span-full 3xl:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-5 xl:gap-7 ${
              variant === 'reverse' ? 'row-span-full' : ''
            }`}
          >
            {isLoading
              ? Array.from({ length: 9 }).map((_, idx) => (
                <ProductCardListSmallLoader
                  key={idx}
                  uniqueKey={`on-selling-${idx}`}
                />
              ))
              : data?.map((product: Product) => (
                <ProductCard
                  key={`product--key${product.id}`}
                  product={product}
                  imgWidth={176}
                  imgHeight={176}
                  variant="listSmall"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerWithProducts;
