import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { env } from "@/lib/env";
import { clearAuthSession, getAccessToken } from "@/lib/auth";

/**
 * Typed API response wrapper — all backend responses follow this shape.
 * Adjust to match the actual backend response envelope when defined.
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Typed API error — Backend validation/business errors.
 */
export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  statusCode: number;
}

/**
 * Central Axios instance for all API calls.
 *
 * Request interceptor  → attaches Authorization header from the secure token store.
 * Response interceptor → catches 401 and triggers the unauthorized callback
 *                        (clears session + redirects to login).
 */
export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 15_000,
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error),
);

// ─── Response Interceptor ────────────────────────────────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear session and redirect to login
      onUnauthorized();
    }
    return Promise.reject(error);
  },
);

/**
 * Called when the API returns 401 Unauthorized.
 * Stub — will call clearAuthSession() once the Auth task is implemented.
 */
function onUnauthorized(): void {
  clearAuthSession();
}
