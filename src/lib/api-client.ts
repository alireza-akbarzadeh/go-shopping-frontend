// src/lib/api-client.ts
import type { AxiosError, AxiosRequestConfig } from 'axios';

import Axios from 'axios';

// ---------- Custom Error Classes ----------
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
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: BASE_URL,
  timeout: 30_000,
  withCredentials: true, // sends cookies automatically
  headers: { 'Content-Type': 'application/json' }
});

// ---------- Response Interceptor (only error transformation, no retries) ----------
AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Network error (no response)
    if (!error.response) {
      throw new NetworkError(error.message);
    }

    const { status, data } = error.response;
    const message = (data as any)?.message || error.message;

    // Handle specific status codes
    switch (status) {
      case 401: {
        // Optional: redirect to login in browser
        if (globalThis.window !== undefined && !globalThis.location.pathname.includes('/login')) {
          globalThis.location.href = '/login';
        }
        throw new AuthError(message);
      }

      case 403: {
        throw new ForbiddenError(message);
      }

      case 404:
      case 422: {
        throw new ApiError(message, status, data);
      }

      case 500:
      case 502:
      case 503: {
        throw new ApiError(message, status, data);
      }

      default: {
        throw new ApiError(message, status, data);
      }
    }
  }
);

// ---------- Orval Mutator ----------
const customInstance = <T>(config: AxiosRequestConfig): Promise<T> =>
  AXIOS_INSTANCE(config).then(({ data }) => data);

export default customInstance;
