<script setup lang="ts">
import { initializeTheme, ToastNotification, useNotifications } from 'vlite3'
import { onMounted } from 'vue'
import { useLanguage } from './composables/useLanguage'

const { configure } = useNotifications()
const { initLanguage } = useLanguage()

onMounted(() => {
  configure({
    position: 'top-right',
    variant: 'success',
  })
  initLanguage()
  initializeTheme()
})
</script>

<template>
  <router-view />
  <toast-notification />
</template>
