import { AxiosError, HttpStatusCode, type AxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import type { ApiClientOptions, ApiErrorResponse } from './type';

/**
 * Handle API errors with appropriate toast notifications
 * @param axiosError - The axios error object
 * @param config - The request configuration
 * @param apiOptions - Additional API client options
 */
export const handleApiError = (
  axiosError: AxiosError<ApiErrorResponse>,
  config: AxiosRequestConfig,
  apiOptions: ApiClientOptions
): void => {
  if (typeof window === 'undefined' || apiOptions.skipToast) {
    return;
  }
  if (axiosError.response) {
    const status = axiosError.response.status;

    switch (status) {
      case HttpStatusCode.Unauthorized:
        // Show a specific message for 401 errors
        toast.error('Authentication need');
        break;

      case HttpStatusCode.Forbidden:
        // Already handled in interceptor
        break;

      case HttpStatusCode.BadRequest:
      case HttpStatusCode.NotFound:
      case HttpStatusCode.Conflict:
      case HttpStatusCode.UnprocessableEntity:
        // Client errors (4xx)
        if (axiosError.code === 'exception' || axiosError.code === 'ERR_BAD_REQUEST') {
          toast.error('server error');
        }
        break;

      case HttpStatusCode.InternalServerError:
      case HttpStatusCode.BadGateway:
      case HttpStatusCode.ServiceUnavailable:
      case HttpStatusCode.GatewayTimeout:
        // Server errors (5xx)
        if (!config.url?.includes('Insight')) {
          toast.error('server error');
        }
        break;
    }
  }
};
