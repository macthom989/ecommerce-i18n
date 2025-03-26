import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, QueryOptionsType];
  pageParam?: number;
}) => {
  const [, options] = queryKey;
  const perPage = options.limit ?? 10;
  const { data } = await fetchFn('GET', `/category/${options.slug}?page=${pageParam}&per_page=${perPage}`);
  if (!data || data.products.length === 0) {
    throw new Error('Không có sản phẩm');
  }

  return {
    data: data.products ?? [],
    paginatorInfo: {
      nextPageUrl: data.currentPage < data.totalPages ? pageParam + 1 : null,
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: fetchProducts as any,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.paginatorInfo.nextPageUrl ?? undefined,
  });
};

export { useProductsQuery, fetchProducts };
