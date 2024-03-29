import { WEB_CONSTANTS, HELP_CONSTANTS } from 'shared/Constants';
import { MAP_CONSTANTS, DEFAULT_OPTIONS } from 'shared/MapConstants';
import * as colors from 'shared/colors';
import { axiosInstance } from 'plugins/axios';
import { Cookies } from 'quasar';
import Vue from 'vue';

const eventBus = new Vue();

export default ({ store }) => {
  const urlParams = new URLSearchParams(window.location.search);

  // Session and mode
  const session = urlParams.get(WEB_CONSTANTS.PARAMS_SESSION)
    || Cookies.get(WEB_CONSTANTS.COOKIE_SESSION);
  const mode = urlParams.get(WEB_CONSTANTS.PARAMS_MODE)
    || Cookies.get(WEB_CONSTANTS.COOKIE_MODE) || WEB_CONSTANTS.PARAMS_MODE_IDE;
  const log = urlParams.get(WEB_CONSTANTS.PARAMS_LOG)
    || Cookies.get(WEB_CONSTANTS.COOKIE_LOG) || WEB_CONSTANTS.PARAMS_LOG_HIDDEN;
  const baseLayer = Cookies.get(WEB_CONSTANTS.COOKIE_BASELAYER) || MAP_CONSTANTS.DEFAULT_BASELAYER;

  const mapDefaults = Cookies.get(WEB_CONSTANTS.COOKIE_MAPDEFAULT) || { center: DEFAULT_OPTIONS.center, zoom: DEFAULT_OPTIONS.zoom };
  const saveLocation = Cookies.has(WEB_CONSTANTS.COOKIE_SAVELOCATION) ? Cookies.get(WEB_CONSTANTS.COOKIE_SAVELOCATION) : true;
  const saveDockedStatus = Cookies.has(WEB_CONSTANTS.COOKIE_DOCKED_STATUS);

  const remoteDebug = urlParams.get(WEB_CONSTANTS.PARAMS_DEBUG_REMOTE);
  let local;
  if (remoteDebug) {
    local = remoteDebug !== 'true';
  } else {
    // TODO temporary check if we are in integratedmodelling.org
    const host = window.location.hostname.toLowerCase();
    local = host.indexOf('integratedmodelling.org') === -1 && host.indexOf('klab.officialstatistics.org') === -1;
  }

  const token = urlParams.get(WEB_CONSTANTS.PARAMS_TOKEN);

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
      isAcceptedKey(key) {
        const charList = 'abcdefghijklmnopqrstuvwxyz0123456789.<>=!()+-*/^';
        key = key.toLowerCase();
        return charList.indexOf(key) !== -1;
      },
    },
  });

  // create an event bus. For now only to inform map change size
  Vue.prototype.$eventBus = eventBus;

  // session only is stored here and never touched, so directly changed
  store.state.data.session = session;
  Vue.prototype.$mode = mode;
  Cookies.set(WEB_CONSTANTS.COOKIE_MODE, mode, {
    expires: 30,
    path: '/',
    secure: true,
  });
  Vue.prototype.$logVisibility = log;
  Cookies.set(WEB_CONSTANTS.COOKIE_LOG, log, {
    expires: 30,
    path: '/',
    secure: true,
  });
  Vue.prototype.$baseLayer = baseLayer;
  Cookies.set(WEB_CONSTANTS.COOKIE_BASELAYER, baseLayer, {
    expires: 30,
    path: '/',
    secure: true,
  });
  Vue.prototype.$mapDefaults = mapDefaults;
  store.state.view.saveLocation = saveLocation;
  Cookies.set(WEB_CONSTANTS.COOKIE_SAVELOCATION, saveLocation, {
    expires: 30,
    path: '/',
    secure: true,
  });
  store.state.view.saveDockedStatus = saveDockedStatus;
  if (saveDockedStatus) {
    store.state.view.mainControlDocked = Cookies.get(WEB_CONSTANTS.COOKIE_DOCKED_STATUS);
  }
  store.state.view.viewCoordinates = Cookies.has(WEB_CONSTANTS.COOKIE_VIEW_COORDINATES) && Cookies.get(WEB_CONSTANTS.COOKIE_VIEW_COORDINATES);

  store.state.data.local = local;
  store.state.data.token = token;
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
  /**
   * local help
   */
  const localHelp = urlParams.get(WEB_CONSTANTS.PARAMS_LOCAL_HELP);
  if (localHelp) {
    store.state.view.helpBaseUrl = `http://${localHelp}`;
  } else {
    store.state.view.helpBaseUrl = HELP_CONSTANTS.DEFAULT_HELP_BASE_URL;
  }

  const app = urlParams.get(WEB_CONSTANTS.PARAMS_APP);
  if (app) {
    store.state.view.klabApp = app;
  }

  /**
   * Capabilities
   */
  axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}/capabilities`, {}).then(({ data: capabilities }) => {
    if (typeof capabilities === 'object') {
      if (Object.keys(capabilities).length === 0) {
        throw Error('Capabilities are empty, check it');
      }
      store.state.data.capabilities = capabilities;
    } else {
      throw Error('Error asking for capabilities: no data');
    }
  })
    .catch((error) => {
      console.error(`Error trying to retrieve capabilities: ${error}`);
    });
};

export { eventBus };
