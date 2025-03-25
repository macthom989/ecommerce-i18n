import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchRelatedProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.RELATED_PRODUCTS}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.RELATED_PRODUCTS}:`, error);
    throw error;
  }
};
export const useRelatedProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.RELATED_PRODUCTS, options],
    queryFn: fetchRelatedProducts,
  });
};
