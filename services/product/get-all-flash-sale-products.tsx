'use client';

import { Product, QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@/lib/fetcher-local';

export const fetchFlashSaleProducts = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

const fetchAncientFlashSaleProducts = async () => {
  const { data } = await fetchFn('GET', API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options]
        : [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn: options.demoVariant === 'ancient' ? fetchAncientFlashSaleProducts : fetchFlashSaleProducts,
  });
};
