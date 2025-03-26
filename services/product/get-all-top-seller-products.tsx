import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchTopSellerProducts = async (): Promise<Product[]> => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.TOP_SELLER_PRODUCTS);
  return data;
};
export const useTopSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.TOP_SELLER_PRODUCTS, options],
    queryFn: fetchTopSellerProducts,
  });
};
