import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchOnSellingProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.PRODUCTS);
  return data;
};
export const useOnSellingProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.ON_SELLING_PRODUCTS, options],
    queryFn: fetchOnSellingProducts,
  });
};
