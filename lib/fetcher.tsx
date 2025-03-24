import axios, { AxiosResponse, Method } from 'axios';

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: false,
});

fetcher.interceptors.request.use((config: any) => {
  return config;
});

fetcher.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const fetchFn = async <T = any,>(
  method: Method,
  endpoint: string,
  data?: any,
): Promise<{ success: boolean; data?: T; message?: string }> => {
  const response: AxiosResponse<T> = await fetcher(endpoint, {
    method,
    data,
    auth: {
      username: process.env.WOOCOMMERCE_KEY || '',
      password: process.env.WOOCOMMERCE_SECRET || '',
    },
  });
  return { success: true, data: response.data };
};

export default fetcher;
