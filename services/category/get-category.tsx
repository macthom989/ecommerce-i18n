import { Category, QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchCategory = async () => {
  const {
    data: { data },
  } = await http.get(API_ENDPOINTS.CATEGORIES);
  return { category: { data } };
};
export const useCategoriesQuery = (options: QueryOptionsType) => {
  return useQuery<{ category: { data: Category[] } }, Error>({
    queryKey: [API_ENDPOINTS.CATEGORIES, options],
    queryFn: fetchCategory,
  });
};
