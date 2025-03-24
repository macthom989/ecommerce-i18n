import { Brand, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchBrands = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.BRANDS);
  return data;
};
const fetchAncientBrands = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.BRANDS);
  return data;
};

export const useBrandsQuery = (options: QueryOptionsType) => {
  return useQuery<Brand[], Error>({
    queryKey:
      options.demoVariant === 'ancient' ? [API_ENDPOINTS.BRANDS_ANCIENT, options] : [API_ENDPOINTS.BRANDS, options],
    queryFn: options.demoVariant === 'ancient' ? fetchAncientBrands : fetchBrands,
  });
};
