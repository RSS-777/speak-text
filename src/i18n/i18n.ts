import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import ua from '@/locales/ua.json';
import pl from '@/locales/pl.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { common: en },
      ua: { common: ua },
      pl: { common: pl },
    },
    lng: 'ua',        
    fallbackLng: 'ua',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18next;
