import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { zustandStorage } from 'utils/zustand';
import { AuthenticationResponse } from 'interfaces/authentication';

export interface AuthenticationState {
  authentication?: {
    session: string;
    user: Omit<AuthenticationResponse, 'access_token' | 'refresh_token'>;
  };
  clear: () => void;
  setAuthentication: (
    session: string,
    user: Omit<AuthenticationResponse, 'access_token' | 'refresh_token'>,
  ) => void;
  isAuthenticated: () => boolean;
  updateAuthenticatedInfo: (
    user: Omit<AuthenticationResponse, 'access_token' | 'refresh_token'>,
  ) => void;
}

export const authenticationStore = create<AuthenticationState>()(
  devtools(
    persist(
      (set, get) => ({
        authentication: undefined,
        isAuthenticated: () => {
          return !!get().authentication;
        },
        clear: () => set({ authentication: undefined }),
        setAuthentication: (session, user) =>
          set({ authentication: { session, user } }),
        updateAuthenticatedInfo: user => {
          set(state => {
            if (!state.authentication) {
              return state;
            }
            return {
              authentication: { session: state.authentication.session, user },
            };
          });
        },
      }),
      {
        // Manually call rehydrate in MainApp.tsx to avoid blocking the UI thread
        skipHydration: true,
        name: 'authentication-storage',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);
