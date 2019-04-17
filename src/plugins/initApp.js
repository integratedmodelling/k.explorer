import { Helpers, Constants } from 'shared/Helpers';
import { MAP_CONSTANTS, DEFAULT_OPTIONS } from 'shared/MapConstants';
import { Cookies, colors } from 'quasar';
import Vue from 'vue';

const eventBus = new Vue();

export default ({ store }) => {
  const urlParams = new URLSearchParams(window.location.search);
  Vue.prototype.$urlParams = urlParams;

  // helpers and costants as global resources
  Vue.prototype.$constants = Constants;
  Vue.prototype.$helpers = Helpers;

  // Session and mode
  const session = urlParams.get(Constants.PARAMS_SESSION)
    || Cookies.get(Constants.COOKIE_SESSION);
  const mode = urlParams.get(Constants.PARAMS_MODE)
    || Cookies.get(Constants.COOKIE_MODE) || Constants.PARAMS_MODE_IDE;
  const log = urlParams.get(Constants.PARAMS_LOG)
    || Cookies.get(Constants.COOKIE_LOG) || Constants.PARAMS_LOG_HIDDEN;
  const baseLayer = Cookies.get(Constants.COOKIE_BASELAYER) || MAP_CONSTANTS.DEFAULT_BASELAYER;
  const notified = urlParams.get(Constants.PARAMS_NOTIFIED)
    || Cookies.get(Constants.COOKIE_NOTIFIED) || Constants.PARAMS_NOTIFIED_ONLY;
  const mapDefaults = Cookies.get(Constants.COOKIE_MAPDEFAULT) || { center: DEFAULT_OPTIONS.center, zoom: DEFAULT_OPTIONS.zoom };
  const saveLocation = Cookies.has(Constants.COOKIE_SAVELOCATION) ? Cookies.get(Constants.COOKIE_SAVELOCATION) : true;

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
  Vue.prototype.$eventBus = eventBus;

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
  store.state.view.showNotified = notified;
  Cookies.set(Constants.COOKIE_NOTIFIED, notified, {
    expires: 30,
    path: '/',
  });
  Vue.prototype.$mapDefaults = mapDefaults;
  store.state.view.saveLocation = saveLocation;
  Cookies.set(Constants.COOKIE_SAVELOCATION, saveLocation, {
    expires: 30,
    path: '/',
  });
  console.info(`Session: ${session} / mode: ${mode}`);

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
  */
};

export { eventBus };
