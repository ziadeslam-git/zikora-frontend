/**
 * Environment variable configuration.
 *
 * LOCAL DEV (no backend yet):
 *   If NEXT_PUBLIC_API_BASE_URL is missing, we emit a console.warn and fall
 *   back to a clearly-fake placeholder URL so the app can run without throwing.
 *   All API calls will fail until a real URL is added to .env.local.
 *
 * CI / PRODUCTION:
 *   Set NEXT_PUBLIC_API_BASE_URL to the real backend base URL. The warn is a
 *   no-op since the value will be present.
 */

const API_BASE_URL_PLACEHOLDER = "http://localhost:0/api-not-configured";

const rawApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!rawApiBaseUrl) {
  // eslint-disable-next-line no-console
  console.warn(
    "[env] NEXT_PUBLIC_API_BASE_URL is not set — using a placeholder. " +
      "API calls will fail until a real backend URL is configured in .env.local.",
  );
}

export const env = {
  apiBaseUrl: rawApiBaseUrl ?? API_BASE_URL_PLACEHOLDER,
  appEnv: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
} as const;

