import { CategoriesQueryOptionsType, Category } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.CATEGORIES_2}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.CATEGORIES_2}:`, error);
    throw error;
  }
};
export const useCategoriesQuery = (options: CategoriesQueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES_2, options],
    queryFn: fetchCategories,
  });
};
