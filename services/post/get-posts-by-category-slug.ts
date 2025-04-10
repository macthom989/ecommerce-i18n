import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { fetchFn } from '@lib/fetcher-local';

export function usePostsByCategorySlug({ slug }: { slug: string }) {
  return useQuery({
    queryKey: [API_ENDPOINTS.POST_BY_CATEGORY_SLUG, { slug }],
    queryFn: async () => {
      if (!slug) return [];
      const { data } = await fetchFn('GET', `${API_ENDPOINTS.POST_BY_CATEGORY_SLUG}/${slug}`);
      return data;
    },
    enabled: !!slug, // chỉ chạy khi slug có giá trị
  });
}
