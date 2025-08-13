import i18n, { type ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import intervalPlural from 'i18next-intervalplural-postprocessor';
import en from 'i18n/resources/en.json';
import en_override from 'i18n/resources/en.override.json';
import et from 'i18n/resources/et.json';

const override = (cur: ResourceLanguage, override: ResourceLanguage) => ({
  translation: {
    ...cur,
    ...(process.env.NODE_ENV !== 'development' ? override : {}),
  },
});

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(intervalPlural)
  .init({
    debug: false,
    fallbackLng: 'et',
    supportedLngs: ['et', 'en'],
    resources: {
      en: override(en, en_override),
      et: { translation: et },
    },
  });

// changeLanguage('en')

export default i18n;
