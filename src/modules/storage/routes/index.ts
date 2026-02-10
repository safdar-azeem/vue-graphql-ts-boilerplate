import type { RouteRecordRaw } from 'vue-router'

export const storageRoutes: RouteRecordRaw[] = [
	{
		path: '/storage',
		name: 'Storage',
		component: () => import('../pages/StoragePage.vue'),
		meta: { requiresAuth: true },
	},
]
