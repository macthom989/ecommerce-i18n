import axios, { AxiosResponse, Method } from 'axios';
import ls, { lsKeys } from './local-storage';

type ConfigKey = Record<string, any>;

type Resp<T> = {
  contents(contents: any): unknown;
  success: any;
  orderCode: any;
  amount: any;
  balance(balance: any): unknown;
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, any>;
  config: Record<string, any>;
  request?: any;
} & any;

const fetcher = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false,
});

let isRefreshing = false;
let refreshQueue: any[] = [];
// const getAccessToken = () => ls.get(lsKeys.TOKEN);
const getRefreshToken = () => ls.get(lsKeys.REFRESH_TOKEN);

fetcher.interceptors.request.use(async (config: any) => {
  const token = ls.get(lsKeys.TOKEN);
  config.headers['x-app-os'] = 'web';
  config.headers['x-api-version'] = '2.0.48';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const lng = localStorage.getItem('i18nextLng');

  if (lng) {
    config.headers['language'] = lng.slice(0, 2);
  }

  return config;
});

const handleLogout = () => {
  ls.remove(lsKeys.TOKEN);
  ls.remove(lsKeys.REFRESH_TOKEN);
  ls.remove(lsKeys.USER);
  ls.remove(lsKeys.PERMISSION);
  ls.remove(lsKeys.SITE);
  window.location.href = '/login';
};

fetcher.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = getRefreshToken();
    const isUnauthorized = error.response?.status === 401;
    if (isUnauthorized && refreshToken && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshQueue.push((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(fetcher(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const dataToken = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint.REFRESHTOKEN}`, {
          refreshToken,
        });
        const newAccessToken = dataToken?.data?.data?.token;
        if (
          dataToken?.data.message === 'ERR_CREATE_FAILED' ||
          dataToken?.data.message === 'ERR_UPDATE_FAILED' ||
          dataToken?.data.message === 'ERR_USER_NOT_EXIST'
        ) {
          handleLogout();
          return Promise.reject(error);
        }
        if (newAccessToken) {
          ls.set(lsKeys.TOKEN, newAccessToken);
          refreshQueue.forEach((cb) => cb(newAccessToken));
          refreshQueue = [];
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return fetcher(originalRequest);
        }
      } catch (error) {
        ls.remove(lsKeys.TOKEN);
        ls.remove(lsKeys.REFRESH_TOKEN);
      } finally {
        isRefreshing = false;
      }
    }
    if (isUnauthorized && !refreshToken) {
      ls.remove(lsKeys.TOKEN);
      ls.remove(lsKeys.REFRESH_TOKEN);
    }

    return Promise.reject(error);
  },
);

export const fetchFn = async <T = any,>(
  method: Method,
  endpoint: string,
  data?: ConfigKey,
  extraConfig?: ConfigKey,
): Promise<AxiosResponse<Resp<T>>> => {
  const config: { params?: ConfigKey; data?: ConfigKey; headers?: ConfigKey } = {
    ...extraConfig,
  };
  if (data) {
    switch (method) {
      case 'GET':
        config.params = data;
        break;
      case 'POST':
        config.data = data;
        break;
      case 'PUT':
        config.data = data;
        break;
      case 'PATCH':
        config.data = data;
        break;

      default:
        break;
    }
  }

  return await fetcher(endpoint, { method, ...config })
    .then((res) => res)
    .catch((err) => err.response);
};

export default fetcher;
