import Vue from 'vue';
import VueI18n from 'vue-i18n';

// let's say we have a file in /src/i18n containing the language pack
import messages from 'src/i18n';

import { Cookies } from 'quasar';
import { WEB_CONSTANTS } from 'shared/Constants';

let klabI18N = null;

export function getI18N(reload = false) {
  if (reload || klabI18N === null) {
    Vue.use(VueI18n);

    // Set i18n instance on app;
    // We inject it into root component by doing so;
    // new Vue({..., i18n: ... }).$mount(...)
    let cookieLocale = 'en';
    if (Cookies.has(WEB_CONSTANTS.COOKIE_LANG)) {
      cookieLocale = Cookies.get(WEB_CONSTANTS.COOKIE_LANG);
      console.debug(`Locale setted from cookie to ${cookieLocale}`);
    } else {
      Cookies.set(WEB_CONSTANTS.COOKIE_LANG, cookieLocale, {
        expires: 30,
        path: '/',
      });
      console.debug(`Lang cookie setted to ${cookieLocale}`);
    }
    klabI18N = new VueI18n({
      locale: cookieLocale,
      fallbackLocale: 'en',
      messages,
    });
  }
  return klabI18N;
}

export default ({ app }) => {
  // we tell Vue to use our Vue package:
  app.i18n = getI18N();
};
