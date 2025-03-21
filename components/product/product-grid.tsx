import ProductCard from '@components/product/product-card';
import { useProductsQuery } from '@services/product/get-all-products';
import { useRouter } from 'next/router';
import ProductFeedLoader from '@components/common/loaders/product-feed-loader';
import { Product } from '@services/types';
import { useTranslations } from 'next-intl';
import Button from '@components/common/button';

interface ProductGridProps {
  className?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ className = '' }) => {
  const { query } = useRouter();
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: 10, ...query });
  const t = useTranslations('common');
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
      >
        {isLoading && !data?.pages?.length ? (
          <ProductFeedLoader limit={20} uniqueKey="search-product" />
        ) : (
          data?.pages?.map((page) => {
            return page?.data?.map((product: Product) => (
              <ProductCard
                key={`product--key${product.id}`}
                product={product}
                variant="grid"
              />
            ));
          })
        )}
      </div>
      <div className="text-center pt-8 xl:pt-14">
        {hasNextPage && (
          <Button
            loading={loadingMore}
            disabled={loadingMore}
            onClick={() => fetchNextPage()}
            variant="slim"
          >
            {t('button-load-more')}
          </Button>
        )}
      </div>
    </>
  );
};
