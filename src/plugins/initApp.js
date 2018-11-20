import { Helpers, Constants } from 'shared/Helpers';
import { MAP_CONSTANTS } from 'shared/MapConstants';
import { Cookies, colors } from 'quasar';
import ELK from 'elkjs';

export default ({ Vue, store }) => {
  const urlParams = new URLSearchParams(window.location.search);
  Vue.prototype.$urlParams = urlParams;

  // helpers and costants as global resources
  Vue.prototype.$constants = Constants;
  Vue.prototype.$helpers = Helpers;

  Vue.prototype.$ELK = new ELK();

  // Session and mode
  const session = urlParams.get(Constants.PARAMS_SESSION)
    || Cookies.get(Constants.COOKIE_SESSION);
  const mode = urlParams.get(Constants.PARAMS_MODE)
    || Cookies.get(Constants.COOKIE_MODE) || Constants.PARAMS_MODE_IDE;
  const log = urlParams.get(Constants.PARAMS_LOG)
    || Cookies.get(Constants.COOKIE_LOG) || Constants.PARAMS_LOG_HIDDEN;
  const baseLayer = Cookies.get(Constants.COOKIE_BASELAYER) || MAP_CONSTANTS.DEFAULT_BASELAYER;

  Vue.mixin({
    methods: {
      /**
       * return an RGB as r,g,b
       * @param color
       * @returns {*}
       */
      hexToRgbValues(color) {
        if (typeof color !== 'undefined') {
          const rgb = colors.hexToRgb(color);
          return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
        }
        return 'black';
      },
    },
  });

  // create an event bus. For now only to inform map change size
  Vue.prototype.$eventBus = new Vue();

  // session only is stored here and never touched, so directly changed
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  Cookies.set(Constants.COOKIE_MODE, mode, {
    expires: 30,
    path: '/',
  });
  Vue.prototype.$logVisibility = log;
  Cookies.set(Constants.COOKIE_LOG, log, {
    expires: 30,
    path: '/',
  });
  Vue.prototype.$baseLayer = baseLayer;
  Cookies.set(Constants.COOKIE_BASELAYER, baseLayer, {
    expires: 30,
    path: '/',
  });
  console.log(`Session: ${session} / mode: ${mode}`);

  /*
  Use color.getBrand(xxx)
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
