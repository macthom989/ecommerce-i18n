import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchTopSellerProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.TOP_SELLER_PRODUCTS);
  return data;
};
export const useTopSellerProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.TOP_SELLER_PRODUCTS, options],
    queryFn: fetchTopSellerProducts,
  });
};
