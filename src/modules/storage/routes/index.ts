import type { RouteRecordRaw } from 'vue-router'

export const storageRoutes: RouteRecordRaw[] = [
  {
    path: '/storage',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'Storage',
        component: () => import('../pages/StoragePage.vue'),
      },
    ],
  },
]
