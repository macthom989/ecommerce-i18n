import { Category, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchCategory = async (): Promise<Category[]> => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.CATEGORIES}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.CATEGORIES}:`, error);
    throw error;
  }
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategory,
  });
};
