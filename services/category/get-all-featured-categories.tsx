import { Category, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchFeaturedCategories = async (): Promise<Category[]> => {
  try {
    const { data } = await fetchFn('GET', API_ENDPOINTS.FEATURED_CATEGORIES);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.FEATURED_CATEGORIES}:`, error);
    throw error;
  }
};
export const useFeaturedCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.FEATURED_CATEGORIES, options],
    queryFn: fetchFeaturedCategories,
  });
};
