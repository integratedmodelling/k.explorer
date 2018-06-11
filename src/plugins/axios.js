import axios from 'axios';


export default ({ Vue, store }) => {
  if (store.state.data.session) {
    axios.defaults.headers.common['WWW-Authenticate'] = store.state.data.session;
  } else {
    console.warn('No session established en axios header, check what it means');
  }
  Vue.prototype.$axios = axios;
};
