import { create } from 'zustand';
import { i18n } from 'i18n';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type {} from '@redux-devtools/extension'; // required for devtools typing
import { zustandStorage } from 'utils/zustand';
import { SUPPORTED_LOCALES } from 'constants/language';

export interface CommonState {
  language: `${SUPPORTED_LOCALES}`;
  setLanguage: (language: `${SUPPORTED_LOCALES}`) => void;
}

export const commonStore = create<CommonState>()(
  devtools(
    persist(
      (set, _get) => ({
        language: 'en',
        setLanguage: language => {
          i18n.locale = language;
          set({ language });
        },
      }),
      {
        // Manually call rehydrate in MainApp.tsx to avoid blocking the UI thread
        skipHydration: true,
        name: 'common-storage',
        storage: createJSONStorage(() => zustandStorage),
      },
    ),
  ),
);
