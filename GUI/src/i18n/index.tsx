import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import commonEN from 'i18n/en/common.json';
import commonET from 'i18n/et/common.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'et',
    supportedLngs: ['et', 'en'],
    resources: {
      en: {
        common: commonEN,
      },
      et: {
        common: commonET,
      },
    },
    defaultNS: 'common',
  });

// changeLanguage('en')

export default i18n;
