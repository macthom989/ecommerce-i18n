import { CategoriesQueryOptionsType, Category } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchCategories = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.CATEGORIES);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

const fetchAncientCategories = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.CATEGORIES);
  return {
    categories: {
      data: data as Category[],
    },
  };
};

export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<{ categories: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: options.demoVariant === 'ancient' ? fetchAncientCategories : fetchCategories,
  });
};
