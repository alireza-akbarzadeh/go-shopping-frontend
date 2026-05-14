// src/lib/api/api-client.ts
import Axios, {
  AxiosError,
  HttpStatusCode,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios';
import { toast } from 'sonner';
import { APP_CONFIG } from '../config';
import { isRequestCancelled } from './api-utils';
import { logger } from './logger';
import type { ApiClientOptions, ApiErrorResponse } from './type';
import {handleApiError} from "@/lib/api/handle-api-error";

export const BASE_URL =
    process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:8080/api/v1';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: APP_CONFIG.API_DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// ---------- Refresh token queue ----------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
  config: InternalAxiosRequestConfig;

}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error);
    } else if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      resolve(AXIOS_INSTANCE(config));
    }
  });
  failedQueue = [];
};

// ---------- Response interceptor ----------
AXIOS_INSTANCE.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
          error.response?.status !== HttpStatusCode.Unauthorized ||
          originalRequest._retry
      ) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await Axios.post(
            '/api/auth/refresh',
            {},
            { baseURL: '', withCredentials: true }
        );
        const newToken: string = refreshResponse.data.access_token;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return AXIOS_INSTANCE(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        toast.error('Session expired. Please log in again.');
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
);



// ---------- customInstance — Orval-compatible signature ----------
/**
 * Orval generates calls as:  customInstance<T>(url, config?)
 * NOT as:                    customInstance<T>(config, options?)
 *
 * This overload set satisfies both the Orval-generated code AND any
 * direct call-sites that pass a full AxiosRequestConfig as the first arg.
 */

// Overload 1 — Orval style: customInstance<T>('/products', { method, params, signal })
export async function customInstance<T>(
    url: string,
    config?: AxiosRequestConfig & ApiClientOptions
): Promise<T>;

// Overload 2 — legacy style: customInstance<T>({ url, method, ... }, options?)
export async function customInstance<T>(
    config: AxiosRequestConfig,
    options?: ApiClientOptions
): Promise<T>;

// Implementation
export async function customInstance<T>(
    urlOrConfig: string | AxiosRequestConfig,
    configOrOptions?: (AxiosRequestConfig & ApiClientOptions) | ApiClientOptions
): Promise<T> {
  // Normalise arguments into a single AxiosRequestConfig + ApiClientOptions
  let axiosConfig: AxiosRequestConfig;
  let apiOptions: ApiClientOptions;

  if (typeof urlOrConfig === 'string') {
    // Orval path
    const { skipToast, logResponse, cancelToken, customErrorHandler, ...rest } =
    (configOrOptions as AxiosRequestConfig & ApiClientOptions) ?? {};
    axiosConfig = { url: urlOrConfig, ...rest };
    apiOptions = { skipToast, logResponse, cancelToken, customErrorHandler };
  } else {
    // Legacy path
    axiosConfig = urlOrConfig;
    apiOptions = (configOrOptions as ApiClientOptions) ?? {};
  }

  try {
    const response: AxiosResponse<T> = await AXIOS_INSTANCE({
      ...axiosConfig,
      cancelToken: apiOptions.cancelToken?.token
    });

    if (apiOptions.logResponse) {
      logger.info(`API Response [${axiosConfig.url}]:`, response.data);
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    if (isRequestCancelled(axiosError)) throw axiosError;

    if (apiOptions.customErrorHandler) {
      apiOptions.customErrorHandler(axiosError);
    } else {
      handleApiError(axiosError, axiosConfig, apiOptions);
    }

    // Re-throw so React Query / callers can react to the error state.
    // Do NOT silently return response.data on error — that breaks isError flags.
    throw axiosError;
  }
}