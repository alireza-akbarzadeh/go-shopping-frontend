import type { AxiosError, AxiosRequestConfig } from 'axios';

import Axios from 'axios';

export const AXIOS_INSTANCE = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL });

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Add response interceptor for token refresh (minimal version)
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // you can add refresh logic later
    throw error;
  }
);

const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  return AXIOS_INSTANCE(config).then(({ data }) => data);
};

export default customInstance;
