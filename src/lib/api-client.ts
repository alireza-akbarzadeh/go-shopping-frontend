// src/lib/api-client.ts
import Axios, { AxiosError, HttpStatusCode, type InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';

export const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:8080/api/v1';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: BASE_URL,
  withCredentials: true // sends HttpOnly cookies automatically
});

// ---------- Refresh token queue ----------
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
      // Attach token to the original request header (optional, cookie may suffice)
      config.headers.Authorization = `Bearer ${token}`;
      resolve(AXIOS_INSTANCE(config));
    }
  });
  failedQueue = [];
};

// ---------- Response interceptor (refresh + error toasts) ----------
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Helper to show generic error toast (non‑401 cases)
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

    // If it's not a 401 or already retried → show error and reject
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

    // Mark as retried to avoid infinite loops
    originalRequest._retry = true;

    // If a refresh is already in progress, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    isRefreshing = true;

    try {
      // Call our internal refresh endpoint (which uses the server action)
      const refreshResponse = await Axios.post(
        '/api/auth/refresh',
        {},
        {
          baseURL: '', // relative to the same origin
          withCredentials: true
        }
      );

      const newToken = refreshResponse.data.access_token;

      // Process all queued requests with the new token
      processQueue(null, newToken);

      // Retry the original request
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
      }
      return AXIOS_INSTANCE(originalRequest);
    } catch (refreshError) {
      // Refresh failed – force logout
      processQueue(refreshError as Error, null);
      toast.error('Session expired. Please log in again.');
      // Optionally redirect to login page
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export const customInstance = <T>(): ((config: InternalAxiosRequestConfig) => Promise<T>) => {
  return (config: InternalAxiosRequestConfig) => {
    const promise = AXIOS_INSTANCE(config).then(({ data }) => data);
    return promise;
  };
};

export default customInstance;
