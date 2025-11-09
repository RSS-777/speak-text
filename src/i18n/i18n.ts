import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import uk from '@/locales/uk.json';
import pl from '@/locales/pl.json';

const resources = { en: { common: en }, uk: { common: uk }, pl: { common: pl } };

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: typeof window !== 'undefined' ? navigator.language.slice(0, 2) : 'uk',     
    fallbackLng: 'uk',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18next;
