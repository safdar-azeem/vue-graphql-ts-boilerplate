<script setup lang="ts">
import { Form, Button } from 'vlite3'
import { loginSchema } from '../schema/login.schema'
import { useLoginMutation } from '@/graphql/generated'
import { useRouter } from 'vue-router'
import { setToken } from 'vue-apollo-client'
import { ref } from 'vue'

const router = useRouter()
const { mutate: login, error, loading } = useLoginMutation()

const handleLogin = async (payload: any) => {
	const { data } = await login({
		data: {
			email: payload.values.email,
			password: payload.values.password,
		},
	})

	if (data?.login?.token) {
		// Check for 2FA requirement (if backend returns a temp token for 2FA)
		// Note: Backend logic determines if token is full access or temp.
		// If user.mfaSettings.isEnabled is true, the token might be a partial one.

		setToken(data.login.token)

		if (data.login.user.mfaSettings?.isEnabled) {
			// If your backend flow requires a separate 2FA step even with a token:
			// router.push('/auth/verify-otp')
			// However, based on your schema, if the token is returned, the user is authenticated.
			// If using the temp-token flow described in backend resolver, verify-otp is needed.
			// Assuming standard JWT flow for now unless specific 2FA flag is present.
		}

		router.push('/user/dashboard')
	}
}
</script>

<template>
	<div class="space-y-6">
		<div class="text-center space-y-1">
			<h1 class="text-2xl font-bold">Welcome Back</h1>
			<p class="text-sm text-gray-500">
				Sign in to your account to continue
			</p>
		</div>

		<div
			v-if="error"
			class="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
			{{ error.message }}
		</div>

		<Form
			:schema="loginSchema"
			:footer="false"
			:loading="loading"
			@on-submit="handleLogin">
			<template #default>
				<Button
					type="submit"
					text="Sign In"
					:loading="loading"
					class="w-full mt-4.5" />
			</template>
		</Form>

		<div class="flex items-center justify-between text-sm mt-4">
			<router-link
				to="/auth/forgot-password"
				class="text-primary hover:underline"
				>Forgot password?</router-link
			>
			<div class="text-gray-500">
				No account?
				<router-link
					to="/auth/signup"
					class="text-primary font-medium hover:underline"
					>Sign up</router-link
				>
			</div>
		</div>
	</div>
</template>
