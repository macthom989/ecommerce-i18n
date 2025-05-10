'use client';
import ProductCard from '@components/product/product-card';
import { useProductsQuery } from '@services/product/get-all-products';
import ProductFeedLoader from '@components/common/loaders/product-feed-loader';
import { Product } from '@services/types';
import { useTranslations } from 'next-intl';
import Button from '@components/common/button';
import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  className?: string;
  slug?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ className = '', slug }) => {
  const searchParams = useSearchParams();
  const queryObject = Object.fromEntries(searchParams.entries());
  const limit = parseInt(searchParams.get('per_page') || '10', 10);
  const {
    isFetching: isLoading,
    isFetchingNextPage: loadingMore,
    fetchNextPage,
    hasNextPage,
    data,
    error,
  } = useProductsQuery({ limit: limit, slug, ...queryObject });

  const t = useTranslations('common');

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">
        {error.message.includes('Category not found') ? 'Không có danh mục' : error.message}
      </div>
    );
  }

  const hasProducts = data?.pages?.some((page) => page?.data?.length > 0);
  return (
    <>
      {!hasProducts && !isLoading ? (
        <p className="text-center text-gray-500 font-semibold">Không có sản phẩm thuộc danh mục này</p>
      ) : (
        <>
          <div
            className={`grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-3 lg:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 ${className}`}
          >
            {isLoading && !data?.pages?.length ? (
              <ProductFeedLoader limit={20} uniqueKey="search-product" />
            ) : (
              data?.pages?.map((page) =>
                page?.data?.map((product: Product) => (
                  <ProductCard key={`product--key${product.id}`} product={product} variant="grid" />
                )),
              )
            )}
          </div>
          <div className="text-center pt-8 xl:pt-14">
            {hasNextPage && (
              <Button loading={loadingMore} disabled={loadingMore} onClick={() => fetchNextPage()} variant="slim">
                {t('button-load-more')}
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
};
