import Keycloak from 'keycloak-js';

const options = {
  url: 'http://localhost:8078',
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
