import { QueryOptionsType, Product } from "@/services/types";
import http from "@/services/utils/axiosInstance";
import { API_ENDPOINTS } from "@/services/utils/api-endpoints";
import { useQuery } from "@tanstack/react-query";

export const fetchSearchedProducts = async () => {
  const { data } = await http.get(API_ENDPOINTS.SEARCH);
  return data;
};
export const useSearchQuery = (options: QueryOptionsType) => {
  return useQuery<Product[], Error>({
    queryKey: [API_ENDPOINTS.SEARCH, options],
    queryFn: fetchSearchedProducts
  });
};
