import type { RouteRecordRaw } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { getRelativeRoute } from '@/utils/route.utils'

export const userRoutes: RouteRecordRaw[] = [
	{
		path: '/user',
		component: () => import('@/App.vue'),
		meta: { requiresAuth: true },
		children: [
			{
				path: getRelativeRoute(ROUTES.USER.DASHBOARD, '/user/'),
				component: () => import('../pages/DashboardPage.vue'),
			},
		],
	},
]
