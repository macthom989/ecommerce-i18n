import { Product } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchProduct = async (_slug: string): Promise<Product> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.PRODUCT}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.PRODUCT}:`, error);
    throw error;
  }
};
export const useProductQuery = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: [API_ENDPOINTS.PRODUCT, slug],
    queryFn: () => fetchProduct(slug),
  });
};
