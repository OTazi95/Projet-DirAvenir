import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: {
        translation: {
          welcome: "Bienvenue sur DirAvenir",
          // ...ajoute les autres textes ici
        }
      },
      en: {
        translation: {
          welcome: "Welcome to DirAvenir",
          // ...ajoute les autres textes ici
        }
      },
      ar: {
        translation: {
          welcome: "مرحبًا بكم في DirAvenir",
          // ...ajoute les autres textes ici
        }
      }
    },
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
