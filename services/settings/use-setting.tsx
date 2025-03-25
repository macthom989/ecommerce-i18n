import { useQuery } from '@tanstack/react-query';
import { fetchFn } from '@lib/fetcher-local';
import { QueryOptionsType } from '@services/types';
import { API_ENDPOINTS } from '@services/utils/api-endpoints';

export const fetchSetting = async () => {
  try {
    const { data } = await fetchFn('GET', `/api/${API_ENDPOINTS.SETTING}`);
    return data;
  } catch (error) {
    console.error(`Failed to fetch ${API_ENDPOINTS.SETTING}:`, error);
    throw error;
  }
};
export const useSettingQuery = (options: QueryOptionsType) => {
  return useQuery<any, Error>({
    queryKey: [API_ENDPOINTS.SETTING, options],
    queryFn: fetchSetting,
  });
};
