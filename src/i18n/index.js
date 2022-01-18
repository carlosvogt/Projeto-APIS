import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import ptBr from './translations/pt-BR';

const languageSettings = RNLocalize.getLocales();

const resources = {
  'pt-br': ptBr,
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng:
    languageSettings.length > 0
      ? languageSettings[0].languageTag.toLocaleLowerCase()
      : 'pt-br',
  fallbackLng: 'pt-br',
  lowerCaseLng: true,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
