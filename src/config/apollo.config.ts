import { createApollo, getRefreshToken, setToken } from 'vue-apollo-client'

const env = import.meta.env

export const apollo = createApollo({
  endPoints: {
    default: `${env.VITE_API_URL}/graphql`,
  },
  tokenKey: 'auth_token',
  allowOffline: true,
  onLogout: () => {
    console.log('logout')
  },
  refreshToken: async () => {
    const refreshToken = getRefreshToken()
    if (!refreshToken) {
      return null
    }
    const response = await fetch(`${env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation RefreshTokens($refreshToken: String!) {
            refreshTokens(refreshToken: $refreshToken) {
                token
                refreshToken
            }
          }
        `,
        variables: {
          refreshToken,
        },
      }),
    })

    const { data, errors } = await response.json()

    if (errors || !data?.refreshTokens?.token) {
      return null
    }

    console.log(data)

    const { token: newToken, refreshToken: newRefreshToken } = data.refreshTokens

    setToken({
      token: newToken,
      refreshToken: newRefreshToken,
    })

    return newToken
  },
})
