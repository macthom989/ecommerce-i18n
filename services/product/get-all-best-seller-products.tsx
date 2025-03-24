import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchBestSellerProducts = async (): Promise<Product[]> => {
  try {
    const res = await fetch(`/api/${API_ENDPOINTS.BEST_SELLER_PRODUCTS}`);
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result: { data: Product[] } = await res.json();
    return result.data;
  } catch (error) {
    console.error('Failed to fetch Products:', error);
    throw error;
  }
};
export const useBestSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    queryFn: fetchBestSellerProducts,
  });
};
