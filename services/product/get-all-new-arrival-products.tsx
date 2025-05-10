import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchNewArrivalProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS);
  return data as Product[];
};

const fetchNewArrivalAncientProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT);
  return data as Product[];
};

export const useNewArrivalProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS_ANCIENT, options]
        : [API_ENDPOINTS.NEW_ARRIVAL_PRODUCTS, options],
    queryFn: options.demoVariant === 'ancient' ? fetchNewArrivalAncientProducts : fetchNewArrivalProducts,
  });
};
