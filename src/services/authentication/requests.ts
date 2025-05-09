import axios from 'axios'
import { Config } from "react-native-config"
import * as SecureStore from 'expo-secure-store';
import { SESSION_KEYS } from 'constants/session'
import { request } from 'utils/request'
import { sessionStorage } from 'utils/session-storage'
import { AuthenticationResponse } from 'interfaces/authentication'
import { authenticationStore } from 'states/authentication'
import { SECURE_KEYS } from 'constants/secure';

export const handleRefreshToken = async (refreshToken: string, scope: string) => {
  try {
    const res = await request({
      url: '/oauth/token',
      method: 'POST',
      data: {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
        client_id: `${Config.APP_CLIENT_ID}`,
        client_secret: `${Config.APP_CLIENT_SECRET}`,
        scope: scope,
      },
    })

    await SecureStore.setItemAsync(SECURE_KEYS.ACCESS_TOKEN, res.data.access_token);
    await SecureStore.setItemAsync(SECURE_KEYS.REFRESH_TOKEN, res.data.refresh_token);
    sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, res.data.access_token)
    return res.data.access_token
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      logout()
    }
    throw error
  }
}

export type ExampleAuthenticationRequestBody = {
  table: string
  username: string
}
export const exampleAuthentication = async (
  body: ExampleAuthenticationRequestBody,
): Promise<AuthenticationResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  // TODO: If used cookie just tored information without accessToken and refreshToken. Authentication will handle by cookie
  const result = {
    id: '1',
    resource_owner: 'User',
    resource_id: 1,
    access_token: '__THIS_IS_TOKEN__',
    refresh_token: '__THIS_IS_REFRESH_TOKEN__',
    expires_in: 10000000,
    token_type: 'Bearer',
    created_at: Date.now(),
    scope: body.table,
  }

  await SecureStore.setItemAsync(SECURE_KEYS.ACCESS_TOKEN, result.access_token)
  await SecureStore.setItemAsync(SECURE_KEYS.REFRESH_TOKEN, result.refresh_token)
  sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, result.access_token)
  authenticationStore.setState({
    authentication: {
      session: result.id,
      user: {
        id: '1',
      resource_owner: 'User',
      resource_id: 1,
      scope: body.table,
      token_type: 'Bearer',
      created_at: Date.now(),
      }
    }
  })
  return result
}

export const logout = async () => {
  authenticationStore.setState({ authentication: undefined })
  sessionStorage.removeItem(SESSION_KEYS.ACCESS_TOKEN)
}
