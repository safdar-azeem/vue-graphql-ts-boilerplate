import { createApollo } from 'vue-apollo-client'

const env = import.meta.env

export const apollo = createApollo({
	endPoints: {
		default: `${env.VITE_API_URL}/graphql`,
	},
	tokenKey: 'auth_token',
	allowOffline: true,
})
