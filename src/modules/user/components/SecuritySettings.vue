<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  useMeQuery,
  useInit2faEnrollmentMutation,
  useConfirm2faEnrollmentMutation,
  useDisable2faMutation,
  TwoFactorMethod,
} from '@/graphql'
import { Button, Input, OTPInput } from 'vlite3'

const { result, refetch } = useMeQuery()
const isEnabled = computed(() => result.value?.me?.mfaSettings?.isEnabled ?? false)
const currentMethod = computed(() => result.value?.me?.mfaSettings?.method)

const isEnrolling = ref(false)
const selectedMethod = ref<TwoFactorMethod>(TwoFactorMethod.Authenticator)
const qrCodeUrl = ref('')
const secret = ref('')
const backupCodes = ref<string[]>([])
const otpCode = ref('')
const disablePassword = ref('')
const disableError = ref('')
const confirmErrorMsg = ref('')

const {
  mutate: initEnrollment,
  loading: initLoading,
  error: initError,
} = useInit2faEnrollmentMutation()
const {
  mutate: confirmEnrollment,
  loading: confirmLoading,
  error: confirmError,
} = useConfirm2faEnrollmentMutation()
const {
  mutate: disable2faMutation,
  loading: disableLoading,
  error: disableErrorMutation,
} = useDisable2faMutation()

const startEnrollment = async () => {
  try {
    const { data } = await initEnrollment({ method: selectedMethod.value })
    if (data?.init2faEnrollment) {
      qrCodeUrl.value = data.init2faEnrollment.qrCode
      secret.value = data.init2faEnrollment.secret
      backupCodes.value = data.init2faEnrollment.backupCodes
      isEnrolling.value = true
      otpCode.value = ''
      confirmErrorMsg.value = ''
    }
  } catch (e) {
    console.error('Init Error:', e)
  }
}

const finishEnrollment = async () => {
  if (otpCode.value.length < 6) return
  try {
    await confirmEnrollment({
      otp: otpCode?.value,
    })
    await refetch()
    isEnrolling.value = false
    otpCode.value = ''
    // Reset state
    qrCodeUrl.value = ''
  } catch (e: any) {
    confirmErrorMsg.value = e.message
    console.error(e)
  }
}

const handleDisable = async () => {
  if (!disablePassword.value) return
  try {
    await disable2faMutation({ password: disablePassword.value })
    await refetch()
    disablePassword.value = ''
    disableError.value = ''
  } catch (e: any) {
    disableError.value = e.message || 'Failed to disable 2FA'
    console.error(e)
  }
}

const cancelEnrollment = () => {
  isEnrolling.value = false
  qrCodeUrl.value = ''
  otpCode.value = ''
}
</script>

<template>
  <div class="p-6 bg-white rounded-lg border shadow-sm">
    <h3 class="text-lg font-semibold mb-4">Two-Factor Authentication</h3>

    <div v-if="isEnabled" class="space-y-6">
      <div
        class="flex flex-col gap-2 p-4 bg-green-50 text-green-700 rounded-md border border-green-200">
        <div class="flex items-center gap-2">
          <div class="w-2 h-2 rounded-full bg-green-500"></div>
          <span class="font-medium">Status: Enabled</span>
        </div>
        <div class="text-sm">Method: {{ currentMethod }}</div>
        <div class="text-sm">Your account is secured with two-factor authentication.</div>
      </div>

      <div class="pt-6 border-t space-y-4">
        <h4 class="font-medium text-gray-900">Disable 2FA</h4>
        <p class="text-sm text-gray-500">To disable 2FA, please enter your password to confirm.</p>

        <div
          v-if="disableError || disableErrorMutation"
          class="p-3 bg-red-50 text-red-600 text-sm rounded-md">
          {{ disableError || disableErrorMutation?.message }}
        </div>

        <div class="flex flex-col sm:flex-row gap-4 items-end">
          <div class="w-full sm:flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
            <Input
              v-model="disablePassword"
              type="password"
              placeholder="Current Password"
              class="w-full" />
          </div>
          <Button
            variant="danger"
            :loading="disableLoading"
            :disabled="!disablePassword"
            @click="handleDisable">
            Disable 2FA
          </Button>
        </div>
      </div>
    </div>

    <div v-else-if="!isEnrolling" class="space-y-6">
      <div
        class="p-4 bg-gray-50 text-gray-700 rounded-md border border-gray-200 flex items-center gap-3">
        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
        <span class="font-medium">Status: Disabled</span>
      </div>
      <p class="text-sm text-gray-600">
        Protect your account by enabling two-factor authentication. You can use an authenticator app
        (like Google Authenticator) or email to receive verification codes.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 items-center bg-gray-50 p-4 rounded-lg">
        <div class="w-full sm:w-auto">
          <label class="block text-xs font-medium text-gray-500 mb-1 uppercase">Method</label>
          <select
            v-model="selectedMethod"
            class="w-full border rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500">
            <option :value="TwoFactorMethod.Authenticator">Authenticator App (Recommended)</option>
            <option :value="TwoFactorMethod.Email">Email Verification</option>
          </select>
        </div>
        <Button @click="startEnrollment" :loading="initLoading" class="w-full sm:w-auto sm:mt-5"
          >Set Up 2FA</Button
        >
      </div>
      <div v-if="initError" class="text-red-600 text-sm mt-2">
        {{ initError.message }}
      </div>
    </div>

    <div v-else class="space-y-6">
      <div class="flex items-center justify-between border-b pb-4">
        <h4 class="font-medium text-lg">
          Setup
          {{
            selectedMethod === TwoFactorMethod.Authenticator
              ? 'Authenticator App'
              : 'Email Verification'
          }}
        </h4>
        <button
          @click="cancelEnrollment"
          class="text-sm text-gray-500 hover:text-gray-900 font-medium">
          Cancel
        </button>
      </div>

      <div v-if="initError" class="p-3 bg-red-50 text-red-600 text-sm rounded-md">
        {{ initError.message }}
      </div>

      <div v-if="initLoading" class="text-center py-8 text-gray-500">
        <div
          class="animate-spin h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-2"></div>
        Initializing...
      </div>

      <div v-else class="space-y-8">
        <!-- Helper for Authenticator -->
        <div v-if="selectedMethod === TwoFactorMethod.Authenticator" class="space-y-6">
          <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 space-y-2">
            <p>1. Open your authenticator app (e.g. Google Authenticator, Authy).</p>
            <p>2. Scan the QR code below or enter the secret key manually.</p>
            <p>3. Enter the 6-digit code generated by the app.</p>
          </div>

          <div class="flex flex-col items-center gap-4">
            <div v-if="qrCodeUrl" class="bg-white p-2 border rounded-lg shadow-sm">
              <img :src="qrCodeUrl" alt="QR Code" class="w-48 h-48 object-contain" />
            </div>
          </div>
        </div>

        <!-- Helper for Email -->
        <div
          v-if="selectedMethod === TwoFactorMethod.Email"
          class="p-4 bg-blue-50 text-blue-700 rounded-md text-sm flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mt-0.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
          </svg>
          <div>
            <p class="font-medium">Check your email</p>
            <p>
              We've sent a 6-digit verification code to your email address. It may take a minute to
              arrive.
            </p>
          </div>
        </div>

        <div class="space-y-4 max-w-xs mx-auto">
          <div class="space-y-2 text-center">
            <label class="block text-sm font-medium text-gray-700">Enter Verification Code</label>
            <div class="flex justify-center">
              <OTPInput
                v-model="otpCode"
                :length="6"
                @complete="finishEnrollment"
                class="justify-center" />
            </div>
          </div>

          <div
            v-if="confirmError || confirmErrorMsg"
            class="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
            {{ confirmError?.message || confirmErrorMsg }}
          </div>

          <Button
            class="w-full"
            :loading="confirmLoading"
            :disabled="otpCode.length < 6"
            @click="finishEnrollment">
            Verify & Enable
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
