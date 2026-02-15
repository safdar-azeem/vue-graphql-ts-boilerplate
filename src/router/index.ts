import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '../modules/auth/routes'
import { userRoutes } from '../modules/user/routes'
import { storageRoutes } from '../modules/storage/routes'
import { getToken } from 'vue-apollo-client'
import { ROUTES } from '@/constants/routes'

const routes = [
  {
    path: ROUTES.HOME,
    redirect: ROUTES.USER.DASHBOARD,
  },
  ...authRoutes,
  ...userRoutes,
  ...storageRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.AUTH.LOGIN,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Navigation Guard
router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!getToken()
  const requiresAuth = to.meta.requiresAuth

  if (requiresAuth && !isAuthenticated) {
    next(ROUTES.AUTH.LOGIN)
  } else if (to.path.startsWith('/auth') && isAuthenticated) {
    next(ROUTES.USER.DASHBOARD)
  } else {
    next()
  }
})

export default router
