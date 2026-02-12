<script setup lang="ts">
import { useMeQuery } from '@/graphql/generated'
import { Button, Avatar } from 'vlite3'
import { removeToken } from 'vue-apollo-client'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import SecuritySettings from '../components/SecuritySettings.vue'
import ProfileUpdate from '../components/ProfileUpdate.vue'

const router = useRouter()
const { result, loading, error } = useMeQuery()

const handleLogout = async () => {
	removeToken()
	router.push(ROUTES.AUTH.LOGIN)
}
</script>

<template>
	<div>
		<div class="space-y-6">
			<div
				class="bg-white rounded-xl border p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					<div
						v-if="loading"
						class="h-12 w-12 bg-gray-200 rounded-full animate-pulse"></div>

					<template v-else>
						<Avatar
							size="lg"
							:src="result?.me?.avatar"
							:alt="result?.me?.username"
							:fallback="
								result?.me?.username?.charAt(0).toUpperCase()
							" />
						<div>
							<h1 class="text-2xl font-bold text-gray-900">
								{{ `Hello, ${result?.me?.username}` }}
							</h1>
							<p class="text-gray-500 text-sm">
								{{ result?.me?.email }}
							</p>
						</div>
					</template>
				</div>

				<Button
					variant="outline"
					icon="lucide:log-out"
					@click="handleLogout">
					Logout
				</Button>
			</div>

			<div
				v-if="error"
				class="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200 text-center">
				{{ error.message }}
			</div>

			<div
				v-if="result?.me"
				class="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<div class="space-y-6">
					<ProfileUpdate />
				</div>

				<div class="space-y-6">
					<SecuritySettings />
				</div>
			</div>
		</div>
	</div>
</template>
