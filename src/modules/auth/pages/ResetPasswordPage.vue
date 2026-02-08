<script setup lang="ts">
import { Form } from 'vlite3'
import { resetPasswordSchema } from '../schema/reset-forget-password.schema'
import { useResetPasswordMutation } from '@/graphql/generated'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

const route = useRoute()
const router = useRouter()
const token = route.query.token as string

const { mutate: resetPassword, loading, error } = useResetPasswordMutation()
const success = ref(false)

const handleReset = async (payload: any) => {
	try {
		const { data } = await resetPassword({
			token: token,
			password: payload.values.password,
		})
		if (data?.resetPassword) {
			success.value = true
			setTimeout(() => router.push('/auth/login'), 3000)
		}
	} catch (e) {
		console.error(e)
	}
}
</script>

<template>
	<div class="space-y-6">
		<div class="text-center space-y-1">
			<h1 class="text-2xl font-bold">Reset Password</h1>
			<p class="text-sm text-gray-500">Choose a strong new password</p>
		</div>

		<div
			v-if="!token"
			class="p-3 rounded-md bg-yellow-50 text-yellow-700 text-sm text-center">
			Invalid or missing token.
		</div>

		<div
			v-else-if="success"
			class="p-4 rounded-md bg-green-50 text-green-700 text-sm text-center">
			Password reset successfully! Redirecting to login...
		</div>

		<div v-else>
			<div
				v-if="error"
				class="p-3 mb-4 rounded-md bg-red-50 text-red-600 text-sm text-center">
				{{ error.message }}
			</div>

			<Form
				:schema="resetPasswordSchema"
				submit-text="Set New Password"
				:loading="loading"
				@on-submit="handleReset" />
		</div>
	</div>
</template>
