import { Product, QueryOptionsType } from '@/services/types';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchSearchedProducts = async (): Promise<Product[]> => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.SEARCH);
  return data;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.SEARCH, options],
    queryFn: fetchSearchedProducts,
  });
};
