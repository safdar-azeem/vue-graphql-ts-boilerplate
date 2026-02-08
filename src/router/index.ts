import { createRouter, createWebHistory } from 'vue-router'
import { authRoutes } from '../modules/auth/routes'
import { userRoutes } from '../modules/user/routes'
import { getToken } from 'vue-apollo-client'

const routes = [
	{
		path: '/',
		redirect: '/user/dashboard',
	},
	...authRoutes,
	...userRoutes,
	{
		path: '/:pathMatch(.*)*',
		redirect: '/auth/login',
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
		next('/auth/login')
	} else if (to.path.startsWith('/auth') && isAuthenticated) {
		next('/user/dashboard')
	} else {
		next()
	}
})

export default router
