<script setup lang="ts">
import { ThemeToggle, ToastNotification, useNotifications } from 'vlite3'
import { onMounted } from 'vue'

const { configure } = useNotifications()

onMounted(() => {
  configure({
    position: 'top-right',
    variant: 'success',
  })
})
</script>

<template>
  <theme-toggle
    class="justify-start fixed! bottom-4 right-4 w-11! h-11! max-w-11! z-9999 rounded-full!" />
  <router-view />
  <toast-notification />
</template>
