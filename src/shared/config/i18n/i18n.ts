import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
    .use(initReactI18next)
    .use(Backend)
    .use(LanguageDetector)
    .init({
        supportedLngs: ['en', 'ua'],
        fallbackLng: 'en',
        detection: { order: ['cookie', 'localStorage'], caches: ['cookie'] },
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json',
        },
    });

export default i18n;