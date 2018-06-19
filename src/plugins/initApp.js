import { Helpers, Constants } from 'shared/Helpers';

import { Cookies } from 'quasar';


export default ({ Vue, store }) => {
  const urlParams = new URLSearchParams(window.location.search);
  Vue.prototype.$urlParams = urlParams;

  // helpers and costants as global resources
  Vue.prototype.$constants = Constants;
  Vue.prototype.$helpers = Helpers;

  // Session and mode
  const session = urlParams.get(Constants.PARAMS_SESSION)
    || Cookies.get(Constants.PARAMS_SESSION);
  const mode = urlParams.get(Constants.PARAMS_MODE)
    || Cookies.get(Constants.PARAMS_MODE);

  Vue.mixin({
    methods: {
      loadTree(tree) {
        store.state.data.tree = tree;
        tree.forEach((leaf) => {
          store.dispatch('data/addViewerElement', {
            type: Constants.VIEW_MAP,
            data: leaf,
          });
        });
      },
    },
  });

  // session only is stored here and never touched, so directly changed
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  console.log(`Session: ${session} / mode: ${mode}`);

  Vue.prototype.$colors = {
    primary: '#da1f26',
    secondary: '#26A69A',
    tertiary: '#555',
    neutral: '#E0E1E2',
    positive: '#21BA45',
    negative: '#DB2828',
    info: '#31CCEC',
    warning: '#F2C037',
  };
  /*
  // init viewer
  Helpers.VIEWER_DEFAULT.forEach((viewer) => {
    store.dispatch('data/addViewerElement', viewer);
  });
  */
  // store.state.data.viewersLayout = Helpers.VIEWER_DEFAULT;
  // console.log(`Init viewersLayout ${Helpers.VIEWER_DEFAULT}`);
};

