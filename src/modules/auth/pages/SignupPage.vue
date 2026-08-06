<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { setToken } from 'vue-apollo-client'
import { useSignupMutation, useGoogleLoginMutation } from '@/graphql'
import { signupSchema } from '../schema/signup.schema'
import { Button, Form, showToast, GoogleLogin } from 'vlite3'
import VerifyOtp from '../components/VerifyOtp.vue'
import { env } from '@/utils'

const router = useRouter()
const showOTP = ref(false)
const token = ref('')
const { mutate: signup, error, loading } = useSignupMutation()
const { mutate: googleLoginMutate } = useGoogleLoginMutation()

const handleSignup = async (payload: any) => {
  try {
    const { data } = await signup({
      data: {
        username: payload.values.username,
        email: payload.values.email,
        password: payload.values.password,
        workspaceName: payload.values.workspaceName.trim(),
      },
    })

    if (data?.signup?.token) {
      setToken({
        token: data.signup.token,
        refreshToken: (data.signup as any).refreshToken,
      })
      showToast('Account Created..', 'success')
      router.push(ROUTES.USER.DASHBOARD)
    }
  } catch (e: any) {
    showToast(e.message || 'Signup failed', 'error')
  }
}

const handleGoogleSuccess = async (response: any) => {
  try {
    const { data } = await googleLoginMutate({ token: response.credential })

    if (data?.googleLogin?.token) {
      if (data.googleLogin.user.mfaSettings?.isEnabled) {
        token.value = data.googleLogin.token
        showOTP.value = true
        return
      }
      setToken({
        token: data.googleLogin.token,
        refreshToken: (data.googleLogin as any).refreshToken,
      })

      showToast('Account Created successfully', 'success')
      router.push(ROUTES.USER.DASHBOARD)
    }
  } catch (e: any) {
    showToast(e.message || 'Google signup failed', 'error')
  }
}
</script>

<template>
  <div v-if="!showOTP">
    <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
      {{ error?.message }}
    </div>

    <Form :schema="signupSchema" :footer="false" @on-submit="handleSignup">
      <template #default>
        <Button type="submit" text="Create Account" :loading="loading" class="w-full mt-4.5" />
      </template>
    </Form>

    <div class="relative flex items-center justify-center mt-6 mb-2">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-200"></div>
      </div>
      <div class="relative bg-white px-4 text-sm text-gray-500">Or continue with</div>
    </div>

    <div class="flex justify-center">
      <GoogleLogin
        :clientId="env.VITE_GOOGLE_CLIENT_ID || ''"
        buttonText="Sign up with Google"
        class="w-full"
        @success="handleGoogleSuccess"
        @error="() => showToast('Google signup failed', 'error')" />
    </div>

    <div class="text-center text-sm text-gray-500 mt-4">
      Already have an account?
      <router-link :to="ROUTES.AUTH.LOGIN" class="text-primary font-medium hover:underline"
        >Log in</router-link
      >
    </div>
  </div>
  <VerifyOtp v-else :token="token" />
</template>
