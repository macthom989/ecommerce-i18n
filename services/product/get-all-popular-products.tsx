import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchPopularProduct = async (): Promise<Product[]> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.POPULAR_PRODUCTS}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.POPULAR_PRODUCTS}:`, error);
    throw error;
  }
};

export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    queryFn: fetchPopularProduct,
  });
};
