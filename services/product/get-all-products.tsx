import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import http from '@services/utils/axiosInstance';
import shuffle from 'lodash/shuffle';
import { useInfiniteQuery } from '@tanstack/react-query';

type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS);
  return {
    data: shuffle(data),
    paginatorInfo: {
      nextPageUrl: '',
    },
  };
};

const useProductsQuery = (options: QueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: fetchProducts,
    initialPageParam: 0,
    getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
  });
};

export { useProductsQuery, fetchProducts };
