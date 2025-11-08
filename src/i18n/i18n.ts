import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import uk from '@/locales/uk.json';
import pl from '@/locales/pl.json';

const resources = { en: { common: en }, uk: { common: uk }, pl: { common: pl } };

const getUserLanguage = () => {
  if (typeof navigator !== 'undefined') {
    const browserLang = navigator.language.slice(0, 2);
    if (Object.keys(resources).includes(browserLang)) return browserLang;
  }
  return 'en'; 
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: getUserLanguage(),        
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18next;
