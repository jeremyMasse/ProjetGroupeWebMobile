import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import 'intl-pluralrules';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';

const languageDetector = {
  type: 'languageDetector',
  async: false,
  detect: () => RNLocalize.getLocales()[0].languageCode,
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {translation: en},
      fr: {translation: fr},
    },
    lng: '',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
