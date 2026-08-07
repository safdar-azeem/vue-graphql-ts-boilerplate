<script setup lang="ts">
import { AppShell, SidebarMenu, Button } from 'vlite3'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants/routes'
import { removeToken } from 'vue-apollo-client'
import Logo from '@/components/Logo.vue'

const router = useRouter()

const menuItems = [
  {
    label: 'Dashboard',
    icon: 'lucide:layout-dashboard',
    to: ROUTES.USER.DASHBOARD,
  },
  {
    label: 'Storage',
    icon: 'lucide:hard-drive',
    to: ROUTES.STORAGE,
  },
]

const handleLogout = () => {
  removeToken()
  router.push(ROUTES.AUTH.LOGIN)
}
</script>

<template>
  <AppShell variant="sidebar" layout-mode="variant1" mobile-breakpoint="md" class="w-56">
    <template #sidebar-header>
      <div class="p-4">
        <Logo />
      </div>
    </template>

    <template #sidebar>
      <SidebarMenu :items="menuItems" />
    </template>

    <template #sidebar-footer>
      <div class="p-2 border-t border-border">
        <Button
          variant="ghost"
          class="w-full justify-start"
          icon="lucide:log-out"
          @click="handleLogout">
          Logout
        </Button>
      </div>
    </template>

    <template #header="{ toggle }">
      <div class="flex items-center justify-between p-4 md:hidden">
        <Logo />
        <Button
          icon="lucide:menu"
          variant="ghost"
          icon-class="h-4! w-4!"
          @click="toggle">
        </Button>
      </div>
    </template>

    <template #main>
      <div class="max-w-6xl mx-auto pb-20 px-4 pt-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </template>
  </AppShell>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
