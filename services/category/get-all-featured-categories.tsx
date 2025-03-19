import { Category, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchFeaturedCategories = async () => {
  const { data } = await http.get(API_ENDPOINTS.FEATURED_CATEGORIES);
  return data as Category[];
};
export const useFeaturedCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<Category[], Error>({
    queryKey: [API_ENDPOINTS.FEATURED_CATEGORIES, options],
    queryFn: fetchFeaturedCategories,
  });
};
