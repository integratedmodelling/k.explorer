import { Helpers, Constants } from 'shared/Helpers';
import defaultTestTree from 'shared/test_tree';
import { Cookies } from 'quasar';


export default ({ Vue, store }) => {
  // helpers and costants as global resources
  Vue.prototype.$constants = Constants;
  Vue.prototype.$helpers = Helpers;
  console.log('Loading session...');
  // Session and mode
  const urlParams = new URLSearchParams(window.location.search);
  const session = urlParams.get(Constants.PARAMS_SESSION)
    || Cookies.get(Constants.PARAMS_SESSION);
  const mode = urlParams.get(Constants.PARAMS_MODE)
    || Cookies.get(Constants.PARAMS_MODE);
  // TODO only for test proposal
  const testTree = urlParams.get('test_tree') || false;
  if (testTree) {
    store.state.data.tree = defaultTestTree;
  }
  // session only is stored here and never touched, so directly changed
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  console.log(`Session: ${session} / mode: ${mode}`);

  // init viewer
  store.state.data.viewerLayout = Helpers.VIEWER_DEFAULT;
  console.log(`Init viewerLayout ${Helpers.VIEWER_DEFAULT}`);
};

