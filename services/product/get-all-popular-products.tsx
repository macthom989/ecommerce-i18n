import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchNewArrivalProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.POPULAR_PRODUCTS);
  return data as Product[];
};

export const usePopularProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.POPULAR_PRODUCTS, options],
    queryFn: fetchNewArrivalProducts,
  });
};
