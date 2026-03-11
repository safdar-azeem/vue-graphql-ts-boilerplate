import { ref } from 'vue'
import { getToken, loadApolloClients, removeToken } from 'vue-apollo-client'
import { useMeQuery } from '@/graphql'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import '../router/types'

export const currentUser = ref<any>(null)
export const isAuthenticated = ref(false)

let _authPromise: Promise<boolean> | null = null

export const hasPermission = (permission: string | string[]): boolean => {
  if (!currentUser.value) return false
  if (currentUser.value.userType === 'OWNER') return true

  const userPerms: string[] = currentUser.value.permissions || []
  const required = Array.isArray(permission) ? permission : [permission]

  if (required.length === 0) return true
  return required.some((p) => userPerms.includes(p))
}

/**
 * Validates the session against the backend.
 *
 * Rules:
 * - If the access token is expired, Apollo's refreshToken middleware retries
 * transparently. We must NOT removeToken() here or the refresh breaks.
 * - Only removeToken() when the backend explicitly returns no user (deleted)
 * AND the error is not a network/transient error.
 * - On a definitive auth failure (user deleted), also reset _authPromise so
 * the guard stops looping.
 */
export function verifyAuthWithBackend(): Promise<boolean> {
  if (_authPromise) return _authPromise

  loadApolloClients()
  const { onResult, onError } = useMeQuery({ fetchPolicy: 'network-only' })

  _authPromise = new Promise<boolean>((resolve) => {
    onResult((result) => {
      const me = result?.data?.me

      if (me) {
        currentUser.value = me
        isAuthenticated.value = true
        resolve(true)
        return
      }

      // Backend responded but returned no user → user was deleted.
      // Safe to remove token here because this is NOT a token expiry —
      // it is a definitive "this user does not exist" response.
      _invalidateSession()
      resolve(false)
    })

    onError((error) => {
      const isNetworkError = !error.graphQLErrors?.length

      if (isNetworkError) {
        // Transient network failure or token refresh in progress.
        // Do NOT remove the token — let the user stay logged in.
        // Reset singleton so the next navigation retries the check.
        _authPromise = null
        currentUser.value = null
        isAuthenticated.value = false
        resolve(false)
        return
      }

      // GraphQL error (e.g. UNAUTHENTICATED after refresh also failed,
      // or user deleted and backend throws).
      // Now it is safe to remove the token.
      _invalidateSession()
      resolve(false)
    })
  })

  return _authPromise
}

/**
 * Clears cached auth state. Call on intentional logout.
 */
export function clearAuthCache(): void {
  _authPromise = null
  currentUser.value = null
  isAuthenticated.value = false
}

/** Legacy export kept for backward compatibility */
export function useAuth() {
  return { authPromise: verifyAuthWithBackend() }
}

// ── private ───────────────────────────────────────────────────────────────────

/**
 * Full session teardown. Only call when certain the user/token is invalid —
 * NOT on transient network errors or token refresh attempts.
 */
function _invalidateSession(): void {
  removeToken()
  currentUser.value = null
  isAuthenticated.value = false
  // Reset so a fresh login triggers a new check
  _authPromise = null
}

export async function authGuard(
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
): Promise<void> {
  const isAuthRoute = to.path.startsWith('/auth')
  const requiresAuth = !!to.meta.requiresAuth

  // ── 1. No token locally → fast path, no backend call ────────────────────
  const token = getToken()
  if (!token) {
    if (requiresAuth) {
      return next({ path: ROUTES.AUTH.LOGIN, query: to.query })
    }
    return next()
  }

  // ── 2. Has token + visiting an auth page → go to dashboard ──────────────
  // Allow authenticated users to visit the reset-password page
  if (isAuthRoute && to.path !== ROUTES.AUTH.RESET_PASSWORD) {
    return next(ROUTES.HOME)
  }

  // ── 3. Protected route → verify token against backend ───────────────────
  if (requiresAuth) {
    const valid = await verifyAuthWithBackend()

    if (!valid) {
      // Token already removed inside verifyAuthWithBackend — no loop risk
      return next({
        path: ROUTES.AUTH.LOGIN,
        query: { reason: 'session_expired' },
      })
    }

    // ── 4. Route Permission Verification ────────────────────────────────
    const requiredPermissions = to.meta.permissions as string | string[] | undefined
    if (requiredPermissions && !hasPermission(requiredPermissions)) {
      return next('/403') // Redirect to Forbidden Page
    }
  }

  next()
}
