<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'vlite3'
import { ROUTES } from '@/constants/routes'
import { useForgotPasswordMutation } from '@/graphql/generated'
import { forgotPasswordSchema } from '../schema/reset-forget-password.schema'

const { mutate: forgotPassword, loading, error } = useForgotPasswordMutation()
const successMessage = ref('')

const handleSubmit = async (payload: any) => {
	try {
		const { data } = await forgotPassword({ email: payload.values.email })
		if (data?.forgotPassword) {
			successMessage.value =
				'If an account exists, a reset link has been sent.'
		}
	} catch (e) {
		console.error(e)
	}
}
</script>

<template>
	<div class="space-y-6">
		<div class="text-center space-y-1">
			<h1 class="text-2xl font-bold">Forgot Password</h1>
			<p class="text-sm text-gray-500">
				Enter your email to receive a reset link
			</p>
		</div>

		<div
			v-if="successMessage"
			class="p-4 rounded-md bg-green-50 text-green-700 text-sm text-center">
			{{ successMessage }}
		</div>

		<div v-else>
			<div
				v-if="error"
				class="p-3 mb-4 rounded-md bg-red-50 text-red-600 text-sm text-center">
				{{ error.message }}
			</div>

			<Form
				:schema="forgotPasswordSchema"
				submit-text="Send Reset Link"
				:loading="loading"
				@on-submit="handleSubmit" />
		</div>

		<div class="text-center">
			<router-link
				:to="ROUTES.AUTH.LOGIN"
				class="text-sm text-gray-500 hover:text-gray-900">
				&larr; Back to Login
			</router-link>
		</div>
	</div>
</template>
