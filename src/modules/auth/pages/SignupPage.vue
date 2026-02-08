<script setup lang="ts">
import { Form } from 'vlite3'
import { signupSchema } from '../schema/signup.schema'
import { useSignupMutation } from '@/graphql/generated'
import { useRouter } from 'vue-router'
import { setToken } from 'vue-apollo-client'
import { ref } from 'vue'

const router = useRouter()
const { mutate: signup, error, loading } = useSignupMutation()

const handleSignup = async (payload: any) => {
	const { data } = await signup({
		data: {
			username: payload.values.username,
			email: payload.values.email,
			password: payload.values.password,
		},
	})

	if (data?.signup?.token) {
		setToken(data.signup.token)
		router.push('/user/dashboard')
	}
}
</script>

<template>
	<div class="space-y-6">
		<div class="text-center space-y-1">
			<h1 class="text-2xl font-bold">Create Account</h1>
			<p class="text-sm text-gray-500">
				Join us and start building today
			</p>
		</div>

		<div
			v-if="error"
			class="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
			{{ error?.message }}
		</div>

		<Form
			:schema="signupSchema"
			:footer="false"
			@on-submit="handleSignup">
			<template #default>
				<Button
					type="submit"
					text="Create Account"
					:loading="loading"
					class="w-full mt-4.5" />
			</template>
		</Form>

		<div class="text-center text-sm text-gray-500">
			Already have an account?
			<router-link
				to="/auth/login"
				class="text-primary font-medium hover:underline"
				>Log in</router-link
			>
		</div>
	</div>
</template>
