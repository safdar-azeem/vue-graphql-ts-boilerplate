import './style.css'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { apollo } from './config/apollo.config'

const app = createApp(App)

app.use(router)
app.use(apollo)

app.mount('#app')
