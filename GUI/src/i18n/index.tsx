import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from 'i18n/resources/en.json';
import et from 'i18n/resources/et.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'et',
    supportedLngs: ['et', 'en'],
    resources: {
      en: { translation: en },
      et: { translation: et },
    },
  });

// changeLanguage('en')

export default i18n;
