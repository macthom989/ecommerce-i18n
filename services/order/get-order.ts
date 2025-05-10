'use client';

import { Order } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';

export const fetchOrder = async (_slug: string) => {
  const { data } = await fetchFn('GET', `${API_ENDPOINTS.ORDER}/${_slug}`);
  if (!data) return;
  return data;
};
export const useOrderQuery = (slug: string) => {
  return useQuery<Order, Error>({
    queryKey: [API_ENDPOINTS.ORDER, slug],
    queryFn: () => fetchOrder(slug),
  });
};
