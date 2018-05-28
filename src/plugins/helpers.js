import { helpers, constants } from 'helpers/helpers';
import { Cookies } from 'quasar';
import defaultTestTree from 'helpers/test_tree';

// leave the export, even if you don't use it
export default ({ Vue, store }) => {
  Vue.prototype.$constants = constants;
  Vue.prototype.$helpers = helpers;
  console.log('Loading session...');
  // Session and mode
  const urlParams = new URLSearchParams(window.location.search);
  const session = urlParams.get(constants.PARAMS_SESSION)
    || Cookies.get(constants.PARAMS_SESSION);
  const mode = urlParams.get(constants.PARAMS_MODE)
    || Cookies.get(constants.PARAMS_MODE);
  const testTree = urlParams.get('test_tree') || false;
  if (testTree) {
    store.state.data.tree = defaultTestTree;
  }
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  console.log(`Session: ${session} / mode: ${mode}`);
};

