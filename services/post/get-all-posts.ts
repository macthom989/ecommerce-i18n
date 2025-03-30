import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { Post } from '@/app/[locale]/blog/_data/types';

export type PostsResponse = {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  posts: Post[];
};

interface FetchPostsParams {
  page: number;
  perPage: number;
  search?: string;
  sortBy?: string;
  categoryId?: number;
  tagId?: number;
}

/**
 * Maps sort options to WordPress API parameters
 */
const mapSortToWordPress = (sortBy: string): { orderby: string; order: string } => {
  switch (sortBy) {
    case 'date_desc':
      return { orderby: 'date', order: 'desc' };
    case 'date_asc':
      return { orderby: 'date', order: 'asc' };
    case 'title_asc':
      return { orderby: 'title', order: 'asc' };
    case 'title_desc':
      return { orderby: 'title', order: 'desc' };
    default:
      return { orderby: 'date', order: 'desc' }; // Default sort
  }
};

const fetchPosts = async ({
  page,
  perPage,
  search,
  sortBy = 'date_desc',
  categoryId,
  tagId,
}: FetchPostsParams): Promise<PostsResponse> => {
  // Build query parameters
  const queryParams = new URLSearchParams();
  // Add required parameters
  queryParams.append('page', page.toString());
  queryParams.append('per_page', perPage.toString());

  // WordPress requires _embed to include featured media and author data
  queryParams.append('_embed', 'true');

  // Add optional parameters if they exist
  if (search && search.trim() !== '') {
    queryParams.append('search', search);
  }

  // Handle sorting - map to WordPress parameters
  const { orderby, order } = mapSortToWordPress(sortBy);
  queryParams.append('orderby', orderby);
  queryParams.append('order', order);

  // Add category and tag filters if provided
  if (categoryId) {
    queryParams.append('categories', categoryId.toString());
  }

  if (tagId) {
    queryParams.append('tags', tagId.toString());
  }

  // Make the API request
  const response = await fetchFn('GET', `${API_ENDPOINTS.POST}?${queryParams.toString()}`);

  if (!response.success || !response.data) {
    throw new Error(response.message || 'Unknown Error');
  }

  return response.data;
};

export const usePostsQuery = (
  page: number,
  perPage = 10,
  search?: string,
  sortBy = 'date_desc',
  categoryId?: number,
  tagId?: number,
) => {
  return useQuery<PostsResponse, Error>({
    queryKey: [API_ENDPOINTS.POST, page, perPage, search, sortBy, categoryId, tagId],
    queryFn: () => fetchPosts({ page, perPage, search, sortBy, categoryId, tagId }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // Only retry once on failure
  });
};
