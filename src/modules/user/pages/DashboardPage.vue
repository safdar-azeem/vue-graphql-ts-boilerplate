<script setup lang="ts">
import { useMeQuery } from '@/graphql/generated'
import { Button, Avatar } from 'vlite3'
import { removeToken } from 'vue-apollo-client'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import SecuritySettings from '../components/SecuritySettings.vue'

const router = useRouter()
const { result, loading, error } = useMeQuery()

const handleLogout = async () => {
	removeToken()
	router.push(ROUTES.AUTH.LOGIN)
}
</script>

<template>
	<div class="min-h-screen bg-gray-50 p-8">
		<div class="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border p-8">
			<div class="flex items-center justify-between border-b pb-6 mb-6">
				<h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
				<Button
					variant="outline"
					icon="lucide:log-out"
					@click="handleLogout"
					>Logout</Button
				>
			</div>

			<div
				v-if="loading"
				class="text-center py-10 text-gray-500">
				Loading profile...
			</div>
			<div
				v-else-if="error"
				class="text-center py-10 text-red-500">
				{{ error.message }}
			</div>

			<div
				v-else-if="result && result.me"
				class="space-y-6">
				<div class="flex items-center gap-4">
					<Avatar
						size="xl"
						:alt="result.me.username" />
					<div>
						<h2 class="text-xl font-semibold">
							{{ result.me.username }}
						</h2>
						<p class="text-gray-500">{{ result.me.email }}</p>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div class="p-6 bg-gray-50 rounded-lg border">
						<h3 class="font-medium text-gray-900 mb-2">
							Account Details
						</h3>
						<ul class="text-sm text-gray-600 space-y-2">
							<li><strong>ID:</strong> {{ result.me.id }}</li>
							<li>
								<strong>Joined:</strong>
								{{
									new Date(
										result.me.createdAt,
									).toLocaleDateString()
								}}
							</li>
						</ul>
					</div>

					<SecuritySettings />
				</div>
			</div>
		</div>
	</div>
</template>
