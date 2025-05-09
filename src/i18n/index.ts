import { I18n } from 'i18n-js';
import en from './resources/en.json';
import { SUPPORTED_LOCALES } from 'constants/language';

export const i18n = new I18n(
  {
    en,
  },
  {
    defaultLocale: SUPPORTED_LOCALES.EN,
    enableFallback: true,
  },
);
