import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { apollo } from './config/apollo.config'
import { createVLite } from 'vlite3'
import { uploadHandler } from './services/upload.service'

const app = createApp(App)

// Initialize VLite with the global upload service
const vlite = createVLite({
  services: {
    upload: uploadHandler
  }
})

app.use(router)
app.use(apollo)
app.use(vlite)

app.mount('#app')
