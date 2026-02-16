<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { setToken } from 'vue-apollo-client'
import { useLoginMutation, useGoogleLoginMutation } from '@/graphql'
import { Form, Button, showToast, GoogleLogin } from 'vlite3'
import VerifyOtp from '../components/VerifyOtp.vue'
import { loginSchema } from '../schema/login.schema'

const router = useRouter()
const showOTP = ref(false)
const token = ref('')
const { mutate: login, error, loading } = useLoginMutation()
const { mutate: googleLoginMutate } = useGoogleLoginMutation()

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

const handleGoogleSuccess = async (response: any) => {
  try {
    console.log('response :>> ', response)
    const { data } = await googleLoginMutate({ token: response.access_token })

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

      showToast('login succesfully')
      router.push(ROUTES.USER.DASHBOARD)
    }
  } catch (e: any) {
    showToast(e.message || 'Google login failed', 'error')
  }
}
</script>

<template>
  <div class="space-y-6" v-if="!showOTP">
    <div v-if="error" class="p-3 rounded-md bg-red-50 text-red-600 text-sm text-center">
      {{ error.message }}
    </div>

    <Form :schema="loginSchema" :footer="false" :loading="loading" @on-submit="handleLogin">
      <template #default>
        <Button type="submit" text="Sign In" :loading="loading" class="w-full mt-4.5" />
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
        buttonText="Sign in with Google"
        class="w-full"
        @success="handleGoogleSuccess"
        @error="() => showToast('Google login failed', 'error')" />
    </div>

    <div class="flex items-center justify-between text-sm mt-4">
      <router-link :to="ROUTES.AUTH.FORGOT_PASSWORD" class="text-primary hover:underline"
        >Forgot password?</router-link
      >
      <div class="text-gray-500">
        No account?
        <router-link :to="ROUTES.AUTH.SIGNUP" class="text-primary font-medium hover:underline"
          >Sign up</router-link
        >
      </div>
    </div>
  </div>
  <VerifyOtp v-else :token="token" />
</template>
