import { CategoriesQueryOptionsType, Category } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchCategories = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.CATEGORIES);
  return data;
};

const fetchAncientCategories = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.CATEGORIES_ANCIENT);
  return data;
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery< Category[], Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.CATEGORIES_ANCIENT, options]
        : [API_ENDPOINTS.CATEGORIES, options],
    queryFn: options.demoVariant === 'ancient' ? fetchAncientCategories : fetchCategories,
  });
};
