import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchFeaturedProducts = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.FEATURED_PRODUCTS);
  return data as Product[];
};

const fetchAncientFeaturedProducts = async () => {
  const { data } = await await fetchFn('GET', API_ENDPOINTS.FEATURED_PRODUCTS_ANCIENT);
  return data as Product[];
};

export const useFeaturedProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.FEATURED_PRODUCTS_ANCIENT, options]
        : [API_ENDPOINTS.FEATURED_PRODUCTS, options],
    queryFn: options.demoVariant === 'ancient' ? fetchAncientFeaturedProducts : fetchFeaturedProducts,
  });
};
