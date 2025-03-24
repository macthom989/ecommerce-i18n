import axios, { AxiosRequestConfig, AxiosResponse, Method,AxiosResponseHeaders } from 'axios';

const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
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
  config?: AxiosRequestConfig,
): Promise<{ success: boolean; data?: T; message?: string }> => {
  try {
    const response: AxiosResponse<T> = await fetcher(endpoint, {
      method,
      data,
      auth: process.env.WOOCOMMERCE_KEY
        ? { username: process.env.WOOCOMMERCE_KEY, password: process.env.WOOCOMMERCE_SECRET || '' }
        : undefined,
      ...config,
    });
    return { success: true, data: response.data };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
};

export default fetcher;
