import { PostCategory } from '@services/types';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { fetchFn } from '@lib/fetcher-local';

export function useCategoriesPostQuery() {
  return useQuery<PostCategory[], Error>({
    queryKey: [API_ENDPOINTS.CATEGORY_POST],
    queryFn: async () => {
      const { data } = await fetchFn('GET', API_ENDPOINTS.CATEGORY_POST);
      return data;
    },
    staleTime: 60 * 1000,
  });
}
