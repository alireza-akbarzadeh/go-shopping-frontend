import type { AxiosError, AxiosRequestConfig, CancelTokenSource } from 'axios';

export interface ApiClientOptions extends Omit<AxiosRequestConfig, 'cancelToken'> {
  skipToast?: boolean;
  cancelToken?: CancelTokenSource;
  customErrorHandler?: (error: AxiosError) => void;
  logResponse?: boolean;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  headers: Record<string, string>;
}

export interface ApiResponseWrapper<T> {
  data?: T;
  messages?: Array<{ message: string; code?: string }>;
  code?: number;
}

export interface ApiErrorResponse {
  error?: string;
  code?: number;
  message?: string;
}
