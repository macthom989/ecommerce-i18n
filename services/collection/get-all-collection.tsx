import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { fetchFn } from '@/lib/fetcher-local';
import { CollectionsQueryOptionsType, TagWoo } from '../types';

export const fetchCollections = async (): Promise<{ tags: TagWoo[] }> => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.TAGS);
  return data;
};

export const useCollectionsQuery = (options: CollectionsQueryOptionsType) => {
  return useQuery<{ tags: TagWoo[] }, Error>({
    queryKey: [API_ENDPOINTS.COLLECTIONS, options],
    queryFn: fetchCollections,
  });
};
