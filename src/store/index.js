import Vue from 'vue';
import Vuex from 'vuex';

import view from './view';
import data from './data';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    view,
    data,
  },
});

export default store;
