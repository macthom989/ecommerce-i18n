import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

type PaginatedProduct = {
  count: number;
  data: Product[];
  paginatorInfo: {
    nextPageUrl: number | null;
  };
};

const fetchProducts = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, QueryOptionsType];
  pageParam?: number;
}): Promise<PaginatedProduct> => {
  const [, options] = queryKey;
  const perPage = options.limit ?? 10;

  const response = await fetchFn('GET', `/tags/${options.slug}?page=${pageParam}&per_page=${perPage}`);

  if (!response?.data || !response.data.products?.length) {
    throw new Error('Không có sản phẩm');
  }

  return {
    count: response.data.count,
    data: response.data.products ?? [],
    paginatorInfo: {
      nextPageUrl: response.data.currentPage < response.data.totalPages ? pageParam + 1 : null,
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
