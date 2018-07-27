// we import the external package
import VueI18n from 'vue-i18n';

// let's say we have a file in /src/i18n containing the language pack
import messages from 'src/i18n';

import { Cookies } from 'quasar';
import Constants from 'shared/Constants';

export default ({ app, Vue }) => {
  // we tell Vue to use our Vue package:
  Vue.use(VueI18n);

  // Set i18n instance on app;
  // We inject it into root component by doing so;
  // new Vue({..., i18n: ... }).$mount(...)
  let cookieLocale = 'en';
  if (Cookies.has(Constants.COOKIE_LANG)) {
    cookieLocale = Cookies.get(Constants.COOKIE_LANG);
    console.log(`Locale setted from cookie to ${cookieLocale}`);
  } else {
    Cookies.set(Constants.COOKIE_LANG, cookieLocale, {
      expires: 30,
      path: '/',
    });
    console.log(`Lang cookie setted to ${cookieLocale}`);
  }

  app.i18n = new VueI18n({
    locale: cookieLocale,
    fallbackLocale: 'en',
    messages,
  });
};
