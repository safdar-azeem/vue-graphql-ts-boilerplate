import type { RouteRecordRaw } from 'vue-router' // <--- Add 'type' here

export const userRoutes: RouteRecordRaw[] = [
	{
		path: '/user',
		component: () => import('@/App.vue'),
		meta: { requiresAuth: true },
		children: [
			{
				path: 'dashboard',
				component: () => import('./pages/DashboardPage.vue'),
			},
		],
	},
]
