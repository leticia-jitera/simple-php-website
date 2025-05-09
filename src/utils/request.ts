import axios from 'axios';
import { Config } from 'react-native-config';
import * as SecureStore from 'expo-secure-store';
import { handleRefreshToken } from 'services/authentication/requests';
import { SESSION_KEYS } from 'constants/session';
import { authenticationStore } from 'states/authentication';
import { SECURE_KEYS } from 'constants/secure';

import { sessionStorage } from './session-storage';

export const request = axios.create();

request.interceptors.request.use(function (config) {
  config.baseURL = Config.API_URL;
  config.headers['Accept'] = 'application/json';
  return config;
});

export const requestAuthenticated = axios.create();
let refreshProcess: Promise<string | undefined> | undefined;

requestAuthenticated.interceptors.request.use(async function (config) {
  let accessToken = sessionStorage.getItem(SESSION_KEYS.ACCESS_TOKEN);

  if (refreshProcess) {
    accessToken = await refreshProcess;
  }

  config.baseURL = Config.API_URL;
  config.headers['Accept'] = 'application/json';

  if (!accessToken) {
    return config;
  }
  config.headers['Accept'] = 'application/json';
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

requestAuthenticated.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // Try to refresh token in this case
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      error.config &&
      !('_retry' in error.config && !error.config._retry)
    ) {
      // @ts-ignore
      error.config._retry = true;
      const accessToken = await refreshProcessHandler();
      if (error.config?.headers && accessToken) {
        error.config.headers['Authorization'] = `Bearer ${accessToken}`;
      } else {
        Promise.reject(error);
      }
      return request.request(error.config || {});
    }
    return Promise.reject(error);
  },
);

async function refreshProcessHandler() {
  const authenticationInfo =
    authenticationStore.getState().authentication?.user;
  const refreshToken = await SecureStore.getItemAsync(
    SECURE_KEYS.REFRESH_TOKEN,
  );
  if (!refreshToken || authenticationInfo?.scope) {
    return;
  }
  if (!refreshProcess) {
    refreshProcess = handleRefreshToken(
      `${refreshToken}`,
      `${authenticationInfo?.scope}`,
    ).then(result => {
      refreshProcess = undefined;
      return result;
    });
  }
  return refreshProcess;
}
