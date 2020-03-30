import i18n from 'i18next';
import en from './locales/en';
import id from './locales/id';
// creating a language detection plugin using expo
// http://i18next.com/docs/ownplugin/#languagedetector
const languageDetector = {
  type: 'languageDetector',
  async: true, // async detection
  detect: cb => {
    // return Expo.Util.getCurrentLocaleAsync().then(lng => {
    //   cb(lng);
    // });
    cb('id');
  },
  // tslint:disable-next-line:no-console
  init: cb => {
    // console.warn('init i18n')
  },
  // tslint:disable-next-line:no-console
  cacheUserLanguage: () => {
    // console.warn('cache user language')
  },
};
const initOpts = {
  fallbackLng: 'id',
  // the translations
  // real world load that via xhr or bundle those using webpack
  react: {
    wait: true,
  },
  resources: {
    id,
    en,
    // have a initial namespace
    ns: ['translation'],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // not needed for react
    },
  },
};
i18n.use(languageDetector).init(initOpts);
export default i18n;
