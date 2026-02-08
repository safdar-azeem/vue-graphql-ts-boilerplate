import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createApollo } from 'vue-apollo-client'
import router from './router'

const env = import.meta.env
const app = createApp(App)

const apollo = createApollo({
	endPoints: {
		default: `${env.VITE_API_URL}/graphql`,
	},
	tokenKey: 'auth_token',
	allowOffline: true,
})

app.use(apollo)
app.use(router)

app.mount('#app')
