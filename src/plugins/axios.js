import axios from 'axios';

const axiosInstance = axios.create();

export default ({ Vue, store }) => {
  if (store.state.data.session) {
    axiosInstance.defaults.headers.common['WWW-Authenticate'] = store.state.data.session;
    // axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  } else {
    console.warn('No session established en axios header, check what it means');
  }
  Vue.prototype.$axios = axiosInstance;
};

export { axiosInstance };
