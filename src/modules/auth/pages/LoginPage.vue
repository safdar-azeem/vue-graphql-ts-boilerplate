<script setup lang="ts">
import { ref } from 'vue'
import { Form, Button, useNotifications } from 'vlite3'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { getRefreshToken, setToken } from 'vue-apollo-client'
import VerifyOtp from '../components/VerifyOtp.vue'
import { loginSchema } from '../schema/login.schema'
import { useLoginMutation } from '@/graphql/generated'

const router = useRouter()
const showOTP = ref(false)
const token = ref('')
const { showToast } = useNotifications()
const { mutate: login, error, loading } = useLoginMutation()

const handleLogin = async (payload: any) => {
	const { data } = await login({
		data: {
			email: payload.values.email,
			password: payload.values.password,
		},
	})

	if (data?.login?.token) {
		if (data.login.user.mfaSettings?.isEnabled) {
			token.value = data?.login?.token
			showOTP.value = true
			return
		}
		setToken({
			token: data.login.token,
			refreshToken: (data.login as any).refreshToken,
		})

		showToast('login succesfully')

		router.push(ROUTES.USER.DASHBOARD)
	}
}
</script>

<template>
	<div
		class="space-y-6"
		v-if="!showOTP">
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
				:to="ROUTES.AUTH.FORGOT_PASSWORD"
				class="text-primary hover:underline"
				>Forgot password?</router-link
			>
			<div class="text-gray-500">
				No account?
				<router-link
					:to="ROUTES.AUTH.SIGNUP"
					class="text-primary font-medium hover:underline"
					>Sign up</router-link
				>
			</div>
		</div>
	</div>
	<VerifyOtp
		v-else
		:token="token" />
</template>
