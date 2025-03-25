import { Product, QueryOptionsType } from '@/services/types';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchSearchedProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.SEARCH}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.SEARCH}:`, error);
    throw error;
  }
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.SEARCH, options],
    queryFn: fetchSearchedProducts,
  });
};
