<script setup lang="ts">
import { Navbar, SidebarMenu, Button, Icon } from 'vlite3'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { removeToken } from 'vue-apollo-client'

const router = useRouter()

const menuItems = [
	{
		label: 'Dashboard',
		icon: 'lucide:layout-dashboard',
		to: ROUTES.USER.DASHBOARD,
	},
	{
		label: 'Storage',
		icon: 'lucide:hard-drive',
		to: ROUTES.STORAGE,
	},
]

const handleLogout = () => {
	removeToken()
	router.push(ROUTES.AUTH.LOGIN)
}
</script>

<template>
	<div class="flex max-md:flex-col h-screen overflow-hidden bg-gray-50">
		<Navbar
			variant="sidebar"
			mobile-breakpoint="md"
			width="w-56"
			class="border-r border-gray-200 flex flex-col z-30 md:h-full">
			<template #logo>
				<div
					class="flex items-center gap-3 px-2 font-bold text-xl text-gray-900 tracking-tight">
					<div
						class="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shadow-sm">
						<Icon
							icon="lucide:box"
							class="w-5 h-5" />
					</div>
					Builto
				</div>
			</template>

			<template #default>
				<div class="flex flex-col h-full">
					<div class="flex-1 overflow-y-auto">
						<SidebarMenu :items="menuItems" />
					</div>
				</div>
			</template>

			<template #right>
				<div>
					<Button
						variant="ghost"
						class="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
						icon="lucide:log-out"
						@click="handleLogout">
						Logout
					</Button>
				</div>
			</template>
		</Navbar>

		<main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
			<div class="flex-1 overflow-y-auto w-full">
				<div class="max-w-6xl mx-auto pt-6 pb-20">
					<router-view v-slot="{ Component }">
						<transition
							name="fade"
							mode="out-in">
							<component :is="Component" />
						</transition>
					</router-view>
				</div>
			</div>
		</main>
	</div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
