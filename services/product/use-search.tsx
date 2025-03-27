import { Product, QueryOptionsType } from '@/services/types';
import { API_ENDPOINTS } from '@/services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchSearchedProducts = async (searchText: string): Promise<Product[]> => {
  const { data } = await fetchFn('GET', `${API_ENDPOINTS.SEARCH}?search=${searchText}`);
  return data;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS, options],
    queryFn: () => fetchSearchedProducts(options.text ?? ''),
  });
};
