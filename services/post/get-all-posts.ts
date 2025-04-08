import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { Post } from '@services/types';

export type PostsResponse = {
  count: number;
  currentPage: number;
  perPage: number;
  totalPages: number;
  posts: Post[];
};

export type SortOptionValue = 'date_desc' | 'date_asc' | 'title_asc' | 'title_desc';

export interface PostsQueryParams {
  page?: number;
  perPage?: number;
  search?: string;
  sortBy?: SortOptionValue;
  categoryId?: number;
  tagId?: number;
  enabled?: boolean;
}

export interface PostsQueryOptions<TData = PostsResponse>
  extends Omit<UseQueryOptions<PostsResponse, Error, TData, QueryKey>, 'queryKey' | 'queryFn'> {
  select?: (data: PostsResponse) => TData;
}

/**
 * Maps sort options to WordPress API parameters
 */
const mapSortToWordPress = (sortBy: SortOptionValue = 'date_desc'): { orderby: string; order: string } => {
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
  page = 1,
  perPage = 10,
  search,
  sortBy = 'date_desc',
  categoryId,
  tagId,
}: PostsQueryParams): Promise<PostsResponse> => {
  // Build query parameters
  const queryParams = new URLSearchParams();

  // Add required parameters
  queryParams.append('page', page.toString());
  queryParams.append('per_page', perPage.toString());
  queryParams.append('_embed', 'true'); // WordPress requires _embed to include featured media and author data

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

  const endpoint = `${API_ENDPOINTS.POST}?${queryParams.toString()}`;

  // Make the API request
  const response = await fetchFn('GET', endpoint);

  if (!response.success || !response.data) {
    throw new Error(response.message || 'Failed to fetch posts');
  }

  return response.data;
};

/**
 * Custom hook for fetching posts with support for data transformation
 * @template TData The type of transformed result data
 */
export const usePostsQuery = <TData = PostsResponse>({
  page = 1,
  perPage = 10,
  search,
  sortBy = 'date_desc',
  categoryId,
  tagId,
  enabled = true,
  ...options
}: PostsQueryParams & PostsQueryOptions<TData> = {}) => {
  return useQuery<PostsResponse, Error, TData>({
    queryKey: ['posts', { page, perPage, search, sortBy, categoryId, tagId }],
    queryFn: () => fetchPosts({ page, perPage, search, sortBy, categoryId, tagId }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
    retry: 1, // Only retry once on failure
    refetchOnWindowFocus: false,
    enabled,
    ...options,
  });
};

export const postsSelectors = {
  simplifiedPosts: (data: PostsResponse) =>
    data.posts.map((post) => ({
      id: post.id,
      title: post?.title?.rendered,
      slug: post.slug,
      excerpt: post?.excerpt?.rendered,
      featuredImage: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
      date: post?.date,
    })),
};
