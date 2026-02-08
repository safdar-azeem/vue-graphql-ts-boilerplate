<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { OTPInput, Button } from 'vlite3'
import { ROUTES } from '@/constants/routes'
import { setToken } from 'vue-apollo-client'
import { useVerify2FaMutation } from '@/graphql/generated'

const props = defineProps<{
	token: string
}>()

const router = useRouter()
const otpCode = ref('')
const { mutate: verify2Fa, loading, error } = useVerify2FaMutation()

const handleVerify = async () => {
	if (otpCode.value.length < 6) return
	try {
		const { data } = await verify2Fa({
			otp: otpCode.value,
			token: props?.token,
		})
		if (data?.verify2FA?.token) {
			setToken(data.verify2FA.token)
			router.push(ROUTES.USER.DASHBOARD)
		}
	} catch (e) {
		console.error(e)
	}
}
</script>

<template>
	<div class="space-y-6 text-center">
		<div class="space-y-1">
			<h1 class="text-2xl font-bold">Two-Factor Auth</h1>
			<p class="text-sm text-gray-500">
				Enter the 6-digit code from your authenticator app
			</p>
		</div>

		<div
			v-if="error"
			class="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
			{{ error.message }}
		</div>

		<div class="flex justify-center py-4">
			<OTPInput
				v-model="otpCode"
				:length="6"
				variant="outline"
				size="lg"
				attached
				@complete="handleVerify" />
		</div>

		<Button
			class="w-full"
			:loading="loading"
			:disabled="otpCode.length < 6"
			@click="handleVerify">
			Verify & Login
		</Button>

		<div class="text-sm">
			<router-link
				:to="ROUTES.AUTH.LOGIN"
				class="text-gray-500 hover:text-gray-900"
				>Back to Login</router-link
			>
		</div>
	</div>
</template>
