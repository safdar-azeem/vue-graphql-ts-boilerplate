<script setup lang="ts">
import { ToastNotification, useNotifications } from 'vlite3'
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
  <router-view />
  <toast-notification />
</template>
