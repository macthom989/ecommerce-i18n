import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

type PaginatedProduct = {
  count: number;
  data: Product[];
  paginatorInfo: any;
};

const fetchProducts = async ({
  queryKey,
  pageParam = 1,
}: {
  queryKey: [string, QueryOptionsType];
  pageParam?: number;
}): Promise<PaginatedProduct> => {
  const [, options] = queryKey;

  const params = new URLSearchParams();
  params.append('page', pageParam.toString());
  params.append('per_page', options.limit?.toString() ?? '10');

  Object.entries(options).forEach(([key, value]) => {
    if (value) params.append(key, value.toString());
  });

  const url = `${API_ENDPOINTS.SEARCH}?${params.toString()}`;

  const response = await fetchFn('GET', url);

  if (response?.data?.data?.length === 0) {
    return {
      count: 0,
      data: [],
      paginatorInfo: { nextPageUrl: null },
    };
  }

  return {
    count: response.data.count,
    data: response.data.data,
    paginatorInfo: {
      nextPageUrl: response.data.currentPage < response.data.totalPages ? pageParam + 1 : null,
    },
  };
};

const useProductsSearchQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: fetchProducts as any,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.paginatorInfo.nextPageUrl) {
        return lastPage.paginatorInfo.nextPageUrl;
      }
      return undefined;
    },
  });
};

export { useProductsSearchQuery, fetchProducts };
