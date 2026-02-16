import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { apollo } from './config/apollo.config'
import { createVLite, env, GoogleSignInPlugin } from 'vlite3'
import { uploadHandler } from './services/upload.service'

const app = createApp(App)

const vlite = createVLite({
  services: {
    upload: uploadHandler,
  },
})

app.use(GoogleSignInPlugin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.use(router)
app.use(apollo)
app.use(vlite)

app.mount('#app')
