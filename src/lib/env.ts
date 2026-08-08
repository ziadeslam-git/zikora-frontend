/**
 * Environment variable validation — runs at build time.
 * Throws a descriptive error immediately if a required variable is missing,
 * so we discover config issues in CI/CD rather than at runtime in production.
 */

const requiredEnvVars = ["NEXT_PUBLIC_API_BASE_URL"] as const;

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(
      `[env] Missing required environment variable: "${key}"\n` +
        `Make sure it is defined in .env.local (for local dev) or your deployment environment.`,
    );
  }
});

export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL!,
  appEnv: (process.env.NEXT_PUBLIC_APP_ENV ?? "development") as
    | "development"
    | "staging"
    | "production",
} as const;
