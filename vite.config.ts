import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { vueApollo } from 'vue-apollo-client/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      vue(),
      tailwindcss(),
      vueApollo({
        schema: `${env.VITE_API_URL}/graphql`,
      }),
    ],
    resolve: {
      alias: {
        '@/graphql': fileURLToPath(new URL('./src/graphql/generated', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 3000,
    },
  }
})
