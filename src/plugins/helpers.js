import { helpers, constants } from 'helpers/helpers';
import { Cookies } from 'quasar';
import defaultTestTree from 'helpers/test_tree';

export default ({ Vue, store }) => {
  // helpers and costants as global resources
  Vue.prototype.$constants = constants;
  Vue.prototype.$helpers = helpers;
  console.log('Loading session...');
  // Session and mode
  const urlParams = new URLSearchParams(window.location.search);
  const session = urlParams.get(constants.PARAMS_SESSION)
    || Cookies.get(constants.PARAMS_SESSION);
  const mode = urlParams.get(constants.PARAMS_MODE)
    || Cookies.get(constants.PARAMS_MODE);
  // TODO only for test proposal
  const testTree = urlParams.get('test_tree') || false;
  if (testTree) {
    store.state.data.tree = defaultTestTree;
  }
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  console.log(`Session: ${session} / mode: ${mode}`);
};

