<script setup lang="ts">
import { ref, computed } from 'vue'
import { Form, Button } from 'vlite3'
import { ROUTES } from '@/constants/routes'
import { useRoute, useRouter } from 'vue-router'
import { useResetPasswordMutation } from '@/graphql'
import { resetPasswordSchema } from '../schema/reset-forget-password.schema'

const route = useRoute()
const router = useRouter()

const token = computed(() => {
  const t = route.query.token
  return Array.isArray(t) ? t[0] : (t as string)
})

const { mutate: resetPassword, loading, error } = useResetPasswordMutation()
const success = ref(false)

const handleReset = async (payload: any) => {
  if (!token.value) return

  try {
    const { data } = await resetPassword({
      token: token.value,
      password: payload.values.password,
    })

    if (data?.resetPassword) {
      success.value = true
      setTimeout(() => router.push(ROUTES.AUTH.LOGIN), 3000)
    }
  } catch (e) {
    console.error(e)
  }
}
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="!token"
      class="p-4 rounded-md bg-yellow-50 text-yellow-700 text-sm text-center border border-yellow-100">
      <p class="font-medium">Invalid or missing token</p>
      <p class="mt-1">Please ensure you copied the full link from your email.</p>
      <div class="mt-4">
        <router-link :to="ROUTES.AUTH.LOGIN" class="text-primary hover:underline">
          Back to Login
        </router-link>
      </div>
    </div>

    <div
      v-else-if="success"
      class="p-6 rounded-md bg-green-50 text-green-700 text-center border border-green-100">
      <div class="flex justify-center mb-3">
        <div class="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 class="text-lg font-medium text-green-800">Password Reset Successful!</h3>
      <p class="mt-2 text-sm text-green-600">You can now log in with your new password.</p>
      <p class="mt-4 text-xs text-green-600">Redirecting to login in 3 seconds...</p>
      <Button class="mt-4 w-full" variant="outline" @click="router.push(ROUTES.AUTH.LOGIN)">
        Go to Login Now
      </Button>
    </div>

    <div v-else>
      <div
        v-if="error"
        class="p-3 mb-4 rounded-md bg-red-50 text-red-600 text-sm text-center border border-red-100">
        {{ error.message || 'An error occurred. The link may have expired.' }}
      </div>

      <Form
        :schema="resetPasswordSchema"
        submit-text="Set New Password"
        :loading="loading"
        :submit-props="{
          class: 'w-full',
        }"
        @on-submit="handleReset" />

      <div class="mt-4 text-center">
        <router-link
          :to="ROUTES.AUTH.LOGIN"
          class="text-sm text-muted hover:text-gray-900 transition-colors">
          &larr; Back to Login
        </router-link>
      </div>
    </div>
  </div>
</template>
