import { useCallback, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useStore } from 'zustand'
import { useMutation, MutateOptions, UseMutationOptions } from '@tanstack/react-query'

import { AuthenticationState, authenticationStore } from 'states/authentication'
import { SECURE_KEYS } from 'constants/secure'
import { sessionStorage } from 'utils/session-storage'
import { SESSION_KEYS } from 'constants/session'
import { AuthenticationResponse } from 'interfaces/authentication'

import { ExampleAuthenticationRequestBody, exampleAuthentication, logout } from './requests'

export const useAuthenticationData = (onAuthenticationDataChanges?: (state: AuthenticationState) => void) => {
  const authentication = useStore(authenticationStore)

  useEffect(() => authenticationStore.subscribe(
    state => {
      onAuthenticationDataChanges?.(state)
    }
  ), [])

  const init = useCallback(async () => {
    const token = await SecureStore.getItemAsync(SECURE_KEYS.ACCESS_TOKEN)
    if (!token) {
      authenticationStore.setState({ authentication: undefined })
    } else {
      sessionStorage.setItem(SESSION_KEYS.ACCESS_TOKEN, token)
      await authenticationStore.persist.rehydrate()
    }
  }, [])

  return {
    init,
    authentication,
  }
}

export const useLogoutMutation = (
  options: MutateOptions<unknown, unknown, unknown, unknown> = {},
) => useMutation({
  mutationFn: logout,
  ...options,
})

export const useExampleAuthenticationMutation = (
  options?: UseMutationOptions<
    AuthenticationResponse | null | undefined,
    unknown,
    ExampleAuthenticationRequestBody,
    unknown
  >,
) => {
  return useMutation<
    AuthenticationResponse | null | undefined,
    unknown,
    ExampleAuthenticationRequestBody,
    unknown
  >({
    mutationFn: exampleAuthentication,
    ...options,
  })
}
