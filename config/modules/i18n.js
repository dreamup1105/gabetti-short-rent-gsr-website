  /*i18n configuration*/
 export const i18n = {
  baseUrl: process.env.APP_URL,
  locales: [{
    code: 'en',
    iso: 'en',
    name: 'English',
    file: 'en.json',
  },
    {
      code: 'it',
      iso: 'it',
      name: 'Italiano',
      file: 'it.json',
    },
  ],
  defaultLocale: 'it',
  strategy: 'prefix',
  vueI18n: {
    fallbackLocale: 'en',
    messages: {
      en: require('../../locales/en.json'),
      it: require('../../locales/it.json'),
    }
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    fallbackLocale: 'en',
    redirectOn: 'root',
    alwaysRedirect: true
  },
  lazy: false,
  langDir: 'locales/',
  parsePages: false,
}
