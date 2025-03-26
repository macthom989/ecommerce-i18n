import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.PRODUCTS_2);
  return data;
};
export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_2, options],
    queryFn: fetchProducts,
  });
};
