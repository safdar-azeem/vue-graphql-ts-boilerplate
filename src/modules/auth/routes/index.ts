import type { RouteRecordRaw } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { getRelativeRoute } from '@/utils/route.utils'

export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/auth',
		component: () => import('../layouts/AuthLayout.vue'),
		children: [
			{
				path: getRelativeRoute(ROUTES.AUTH.LOGIN, '/auth/'),
				component: () => import('../pages/LoginPage.vue'),
			},
			{
				path: getRelativeRoute(ROUTES.AUTH.SIGNUP, '/auth/'),
				component: () => import('../pages/SignupPage.vue'),
			},
			{
				path: getRelativeRoute(ROUTES.AUTH.FORGOT_PASSWORD, '/auth/'),
				component: () => import('../pages/ForgotPasswordPage.vue'),
			},
			{
				path: getRelativeRoute(ROUTES.AUTH.RESET_PASSWORD, '/auth/'),
				component: () => import('../pages/ResetPasswordPage.vue'),
			},
		],
	},
]

