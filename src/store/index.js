import Vue from 'vue';
import Vuex from 'vuex';

import view from './view';
import data from './data';
import stomp from './stomp';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    view,
    data,
    stomp,
  },
});

export default store;
