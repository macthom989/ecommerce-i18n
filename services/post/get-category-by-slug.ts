import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { fetchFn } from '@lib/fetcher-local';

export function useCategoryBySlug({ slug }: { slug: string }) {
  return useQuery({
    queryKey: [API_ENDPOINTS.CATEGORY_POST_BY_SLUG, { slug }],
    queryFn: async () => {
      if (!slug) return [];
      const { data } = await fetchFn('GET', `${API_ENDPOINTS.CATEGORY_POST_BY_SLUG}/${slug}`);
      return data;
    },
    enabled: !!slug,
  });
}
