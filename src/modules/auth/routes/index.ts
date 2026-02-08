import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
	{
		path: '/auth',
		component: () => import('../layouts/AuthLayout.vue'),
		children: [
			{
				path: 'login',
				component: () => import('../pages/LoginPage.vue'),
			},
			{
				path: 'signup',
				component: () => import('../pages/SignupPage.vue'),
			},
			{
				path: 'forgot-password',
				component: () => import('../pages/ForgotPasswordPage.vue'),
			},
			{
				path: 'reset-password',
				component: () => import('../pages/ResetPasswordPage.vue'),
			},
			{
				path: 'verify-otp',
				component: () => import('../pages/VerifyOtpPage.vue'),
			},
		],
	},
]
