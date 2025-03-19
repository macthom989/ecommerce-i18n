import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchBestSellerProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.BEST_SELLER_PRODUCTS);
  return data as Product[];
};
export const useBestSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.BEST_SELLER_PRODUCTS, options],
    queryFn: fetchBestSellerProducts,
  });
};
