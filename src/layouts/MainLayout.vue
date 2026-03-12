<script setup lang="ts">
import { Navbar, SidebarMenu, Button, Icon } from 'vlite3'
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
  <div class="flex max-md:flex-col h-screen overflow-hidden">
    <Navbar variant="sidebar" mobile-breakpoint="md" class="border-r border-gray-200 w-56">
      <template #logo>
        <Logo />
      </template>

      <template #header="{ toggle }">
        <div class="flex justify-between py-4 px-2">
          <Logo class="md:hidden" />
          <!-- Mobile hamburger -->
          <Button
            icon="lucide:menu"
            variant="ghost"
            class="md:hidden"
            icon-class="h-4! w-4!"
            @click="toggle">
          </Button>
        </div>
      </template>

      <template #default>
        <div class="flex flex-col h-full gap-4 md:py-4 md:px-2">
          <Logo class="max-md:hidden" />
          <div class="flex-1 overflow-y-auto">
            <SidebarMenu :items="menuItems" />
          </div>
        </div>
      </template>

      <template #right>
        <div class="flex flex-col gap-2 md:p-1.5">
          <Button
            variant="ghost"
            class="w-full justify-start"
            icon="lucide:log-out"
            @click="handleLogout">
            Logout
          </Button>
        </div>
      </template>
      <template #main>
        <main class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <div class="flex-1 overflow-y-auto w-full">
            <div class="max-w-6xl mx-auto pb-20 px-4">
              <router-view v-slot="{ Component }">
                <transition name="fade" mode="out-in">
                  <component :is="Component" />
                </transition>
              </router-view>
            </div>
          </div>
        </main>
      </template>
    </Navbar>
  </div>
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
