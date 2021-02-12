import i18n from 'i18next';
import english from './en/translation.json';
import spanish from './es/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: {
    english
  },
  es: {
    spanish
  }
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  resources,
});