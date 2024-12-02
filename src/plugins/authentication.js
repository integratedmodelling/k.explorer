import Keycloak from 'keycloak-js';
/* global __ENV__ */

const options = {
  url: __ENV__.KEYCLOAK_URL,
  realm: 'im',
  clientId: 'k.Explorer',
  enableCors: true,
};

const keycloak = new Keycloak(options);

const Plugin = {
  install(Vue) {
    Vue.$keycloak = keycloak;
  },
};

Plugin.install = (Vue) => {
  Vue.$keycloak = keycloak;
  Object.defineProperties(Vue.prototype, {
    $keycloak: {
      get() {
        return keycloak;
      },
    },
  });
};

import Vue from 'vue';

Vue.use(Plugin);

export default Plugin;
