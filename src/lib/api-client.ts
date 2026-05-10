// src/lib/api-client.ts
import type { AxiosError, AxiosRequestConfig } from 'axios';
import Axios from 'axios';

// ---------- Custom Error Classes (unchanged) ----------
export class ApiError extends Error {
  public status: number;
  public details?: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export class NetworkError extends ApiError {
  constructor(message = 'Network error – please check your connection') {
    super(message, 0);
    this.name = 'NetworkError';
  }
}

export class AuthError extends ApiError {
  constructor(message = 'Authentication required – please log in again') {
    super(message, 401);
    this.name = 'AuthError';
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'You do not have permission to perform this action') {
    super(message, 403);
    this.name = 'ForbiddenError';
  }
}

// ---------- Configuration ----------
export const BASE_URL = process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:8080/api/v1';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Request logging (debug)
AXIOS_INSTANCE.interceptors.request.use((config) => {
  console.log(`🚀 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  if (config.data) {
    console.log('📦 Request body:', config.data);
  }
  return config;
});

// Response interceptor (unchanged)
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!error.response) throw new NetworkError(error.message);
    const { status, data } = error.response;
    const message = (data as any)?.message || error.message;
    switch (status) {
      case 401:
        if (globalThis.window !== undefined && !globalThis.location.pathname.includes('/login')) {
          globalThis.location.href = '/login';
        }
        throw new AuthError(message);
      case 403:
        throw new ForbiddenError(message);
      case 404:
      case 422:
        throw new ApiError(message, status, data);
      case 500:
      case 502:
      case 503:
        throw new ApiError(message, status, data);
      default:
        throw new ApiError(message, status, data);
    }
  }
);

// ---------- Universal Mutator – Supports both signatures ----------

const customInstance = <T>(
  urlOrConfig: string | AxiosRequestConfig,
  options?: RequestInit
): Promise<T> => {
  // If first argument is a string, treat as (url, options) fetch-style call
  if (typeof urlOrConfig === 'string') {
    const url = urlOrConfig;
    const fetchOptions = options || {};

    // Convert fetch-style options to axios config
    const method = (fetchOptions.method || 'GET').toUpperCase();
    const headers = { ...AXIOS_INSTANCE.defaults.headers.common, ...fetchOptions.headers };
    let data = undefined;

    // If method is POST/PUT/PATCH and there's a body, parse it
    if (fetchOptions.body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      try {
        data = JSON.parse(fetchOptions.body as string);
      } catch {
        data = fetchOptions.body;
      }
    }

    const axiosConfig: AxiosRequestConfig = {
      url,
      method,
      // @ts-expect-error - AxiosRequestConfig doesn't allow arbitrary headers, but we want to support them
      headers,
      data,
      // Preserve any other relevant fields
      withCredentials: fetchOptions.credentials === 'include'
    };
    return AXIOS_INSTANCE(axiosConfig).then((res) => res.data);
  }

  // Otherwise, treat as normal AxiosRequestConfig
  return AXIOS_INSTANCE(urlOrConfig).then((res) => res.data);
};

export default customInstance;

// ---------- Type-safe helpers (optional but recommended) ----------
export const apiClient = {
  get: <T>(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) =>
    AXIOS_INSTANCE.get<T>(url, config).then((res) => res.data),
  post: <T>(
    url: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) => AXIOS_INSTANCE.post<T>(url, data, config).then((res) => res.data),
  put: <T>(url: string, data?: any, config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>) =>
    AXIOS_INSTANCE.put<T>(url, data, config).then((res) => res.data),
  patch: <T>(
    url: string,
    data?: any,
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>
  ) => AXIOS_INSTANCE.patch<T>(url, data, config).then((res) => res.data),
  delete: <T>(url: string, config?: Omit<AxiosRequestConfig, 'method' | 'url'>) =>
    AXIOS_INSTANCE.delete<T>(url, config).then((res) => res.data)
};
