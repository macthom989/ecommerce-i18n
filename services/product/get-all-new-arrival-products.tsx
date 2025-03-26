import { Product, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchNewArrivalProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.PRODUCTS);
  return data as Product[];
};

const fetchNewArrivalAncientProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.PRODUCTS);
  return data as Product[];
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options]
        : [API_ENDPOINTS.PRODUCTS_ANCIENT, options],
    queryFn: options.demoVariant === 'ancient' ? fetchNewArrivalAncientProducts : fetchNewArrivalProducts,
  });
};
