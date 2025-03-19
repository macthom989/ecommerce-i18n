import { QueryOptionsType } from '@services/types';
import http from '@services/utils/axiosInstance';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';
import { useQuery } from '@tanstack/react-query';

export const fetchFlashSaleProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS);
  return data;
};

const fetchAncientFlashSaleProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT);
  return data;
};

export const useFlashSaleProductsQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>({
    queryKey:
      options.demoVariant === 'ancient'
        ? [API_ENDPOINTS.FLASH_SALE_PRODUCTS_ANCIENT, options]
        : [API_ENDPOINTS.FLASH_SALE_PRODUCTS, options],
    queryFn:
      options.demoVariant === 'ancient'
        ? fetchAncientFlashSaleProducts
        : fetchFlashSaleProducts,
  });
};
