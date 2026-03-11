import './style.css'
import App from './App.vue'
import router from './router'
import { env } from './utils'
import { createApp } from 'vue'
import { i18n } from './config/i18n.config'
import { apollo } from './config/apollo.config'
import { createVLite, GoogleSignInPlugin } from 'vlite3'
import { uploadHandler } from './services/upload.service'

const app = createApp(App)

const vlite = createVLite({
  services: {
    upload: uploadHandler,
    t: (key: string, ...args: any[]) => {
      // @ts-ignore
      return i18n.global.t(key, ...args)
    },
  },
})

if (env.VITE_GOOGLE_CLIENT_ID) {
  app.use(GoogleSignInPlugin, {
    clientId: env.VITE_GOOGLE_CLIENT_ID,
  })
}

app.use(router)
app.use(apollo)
app.use(vlite)
app.use(i18n)

app.mount('#app')
