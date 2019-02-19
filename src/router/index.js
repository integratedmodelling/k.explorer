import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

const Router = new VueRouter({
  /*
   * NOTE! Change Vue Router mode from quasar.conf.js -> build -> vueRouterMode
   *
   * When going with "history" mode, please also make sure "build.publicPath"
   * is set to something other than an empty string.
   * Example: '/' instead of ''
   */

  // Leave as is and change from quasar.conf.js instead!
  // Change here because it doesn't work from quasar.conf. We must investigate it
  // Those changes are done to make report anchor work
  mode: 'history',
  base: '/modeler/ui/',
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: `[id='${to.hash.slice(1)}']` };
    }
    return { x: 0, y: 0 };
  },
  routes,
});

export default Router;
