// src/lib/api-client.ts
import Axios from 'axios';
import type { AxiosRequestConfig } from 'axios';

export const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:8080/api/v1';

export const AXIOS_INSTANCE = Axios.create({ baseURL: BASE_URL });

export const useCustomInstance = <T>(): ((config: AxiosRequestConfig) => Promise<T>) => {
  return (config: AxiosRequestConfig) => {
    const promise = AXIOS_INSTANCE({ ...config }).then(({ data }) => data);

    return promise;
  };
};

export default useCustomInstance;
