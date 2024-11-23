import axios from 'axios';
import { KEYCLOAK } from '../shared/Constants';

const axiosInstance = axios.create();

export default ({ Vue, store }) => {
  if (localStorage.getItem(KEYCLOAK.TOKEN)) {
    axiosInstance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(KEYCLOAK.TOKEN)}`;
  }
  console.debug(store.state.data.session);
  if (store.state.data.session) {
    axiosInstance.defaults.headers.common.Klab_Authorization = store.state.data.session;

    // axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  } else {
    console.warn('No session established en axios header, check it');
  }
  if (store.state.data.token) {
    axiosInstance.defaults.headers.common.Authentication = store.state.data.token;
  }

  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
