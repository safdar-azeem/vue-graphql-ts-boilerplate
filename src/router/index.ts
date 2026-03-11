import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '../modules/auth/routes'
import { userRoutes } from '../modules/user/routes'
import { storageRoutes } from '../modules/storage/routes'
import { ROUTES } from '@/constants/routes'
import { authGuard } from '@/composables/useAuth'

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
router.beforeEach(authGuard)

export default router
