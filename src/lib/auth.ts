/**
 * Auth utilities — stub implementation.
 *
 * These functions will be implemented in the Auth task.
 * The api-client imports getAccessToken() from here so we avoid circular dependencies later.
 */

/**
 * Returns the current access token from the secure token store.
 * Will be implemented with httpOnly Cookie handling in the Auth task.
 */
export function getAccessToken(): string | null {
  // TODO: implement in Auth task — read token from secure cookie / in-memory store
  return null;
}

/**
 * Clears the current session (called on 401 from the API client).
 * Will redirect to /login after clearing auth state.
 */
export function clearAuthSession(): void {
  // TODO: implement in Auth task — clear tokens + redirect to login
}
