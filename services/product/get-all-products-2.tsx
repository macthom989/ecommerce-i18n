import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.PRODUCTS_2);
  return data as Product[];
};
export const useProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.PRODUCTS_2, options],
    queryFn: fetchProducts,
  });
};
