// src/lib/api-client.ts
import Axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:8080/api/v1';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

// ---------- Refresh token queue (unchanged) ----------
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
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

// ---------- Response interceptor (unchanged) ----------
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const showErrorToast = () => {
      let errorMessage = 'An unexpected error occurred';
      if (error.response?.data) {
        const data = error.response.data as any;
        errorMessage = data.message || data.error || JSON.stringify(data);
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your network.';
      } else {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    };

    if (error.response?.status !== HttpStatusCode.Unauthorized || originalRequest._retry) {
      if (error.response?.status === HttpStatusCode.Unauthorized) {
        toast.error('Authentication failed. Please log in again.');
      } else if (error.response?.status === HttpStatusCode.Forbidden) {
        toast.error('You do not have permission to perform this action.');
      } else {
        showErrorToast();
      }
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
        {
          baseURL: '',
          withCredentials: true
        }
      );
      const newToken = refreshResponse.data.access_token;
      processQueue(null, newToken);
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return AXIOS_INSTANCE(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError as Error, null);
      toast.error('Session expired. Please log in again.');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ✅ EXPORT A PLAIN ASYNC FUNCTION (no hooks, no currying)
export async function customInstance<T>(
  url: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    params?: Record<string, any>;
    data?: any;
    signal?: AbortSignal;
  }
): Promise<T> {
  const response = await AXIOS_INSTANCE({
    url,
    method: options?.method || 'GET',
    headers: options?.headers,
    params: options?.params,
    data: options?.data,
    signal: options?.signal
  });
  return response.data;
}
