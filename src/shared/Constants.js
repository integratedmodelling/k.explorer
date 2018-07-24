import Style from 'ol/style/Style';
import Fill from 'ol/style/Fill';
// import Stroke from 'ol/style/Stroke';
// import { colors } from 'quasar';
/**
 * Useful constants in app
 */
export default {
  /**
   * Max length of an array contains history (f.e. log)
   */
  HIST_MAX_LENGTH: 50,

  /**
   * Connections states
   */
  CONNECTION_UNKNOWN: 'UNKNOWN',
  CONNECTION_UP: 'UP',
  CONNECTION_DOWN: 'DOWN',
  CONNECTION_WORKING: 'WORKING',
  CONNECTION_ERROR: 'ERROR',

  /**
   * Messages types
   */
  TYPE_LOG: 'LOG',
  TYPE_WARN: 'WARN',
  TYPE_ERROR: 'ERROR',
  TYPE_INFO: 'INFO',

  TYPE_MESSAGE: 'MSG',
  TYPE_ALL: 'ALL',

  /**
   * Observation types
   */
  OBSTYP_PROCESS: 'PROCESS',
  OBSTYP_STATE: 'STATE',
  OBSTYP_SUBJECT: 'SUBJECT',
  OBSTYP_CONFIGURATION: 'CONFIGURATION',
  OBSTYP_EVENT: 'EVENT',
  OBSTYP_RELATIONSHIP: 'RELATIONSHIP',
  OBSTYP_INITIAL: 'INITIAL', // wildcard for initial state

  /**
   * Value types
   */
  VALTYP_VOID: 'VOID',
  VALTYP_NUMBER: 'NUMBER',
  VALTYP_BOOLEAN: 'BOOLEAN',
  VALTYP_CATEGORY: 'CATEGORY',
  VALTYP_DISTRIBUTION: 'DISTRIBUTION',

  GEOMTYP_RASTER: 'RASTER',
  GEOMTYP_SHAPE: 'SHAPE',
  GEOMTYP_SCALAR: 'SCALAR',
  GEOMTYP_TIMESERIES: 'TIMESERIES',
  GEOMTYP_NETWORK: 'NETWORK',
  GEOMTYP_PROPORTIONS: 'PROPORTIONS',
  GEOMTYP_FOLDER: 'FOLDER', // used only in frontend

  /**
   * URL params
   */
  PARAMS_MODE: 'mode',
  PARAMS_SESSION: 'session',
  PARAMS_MODE_IDE: 'ide',

  /**
   * Viewer components type
   */
  VIEW_MAP: 'MapViewer',
  VIEW_CHART: 'ChartViewer',
  VIEW_GRAPH: 'GraphViewer',
  VIEW_BLOB: 'BlobViewer',
  VIEW_UNKNOWN: 'UnknownViewer',
  VIEW_INITIAL: 'MapViewer',

  /**
   * Shapes types
   */
  SHAPE_POLYGON: 'POLYGON',
  SHAPE_POINT: 'POINT',

  /**
   * Maps utility
   */
  BING_KEY: '', // TODO we need it?
  COORD_BC3: [-2.968226, 43.332125],
  /*
  REGEXP_SHAPE_COORD: /[\d.-]+/g,
  // olGroup 1: projection, olGroup 2: geometry
  REGEXP_WKT: /(EPSG:\d{4})?\s?(.*)/g,
  */
  PROJ_EPSG_4326: 'EPSG:4326',
  PROJ_EPSG_3857: 'EPSG:3857',

  POLYGON_CONTEXT_STYLE: new Style({
    /*
    stroke: new Stroke({
      color: 'rgb(38, 166, 154)',
      width: 1,
    }),
    */
    fill: new Fill({
      color: 'rgba(38, 166, 154, 0.2)',
    }),
  }),
  POLYGON_OBSERVATION_STYLE: new Style({
    /*
    stroke: new Stroke({
      // color: colors.getBrand('secondary'),
      color: 'rgb(255, 102, 0)',
      width: 1,
    }),
    */
    fill: new Fill({
      color: 'rgba(255, 102, 0, 0.4)',
    }),
  }),

  COLOR_PRIMARY: 'primary',
  COLOR_SECONDARY: 'secondary',
  COLOR_TERTIARY: 'tertiary',
  COLOR_POSITIVE: 'positive',
  COLOR_NEGATIVE: 'negative',
  COLOR_INFO: 'info',
  COLOR_WARNING: 'warning',
  COLOR_LIGHT: 'light',
  COLOR_DARK: 'dark',
  COLOR_FADED: 'faded',

  SPINNER_LOADING: { color: 'positive', animated: true },
  SPINNER_STOPPED: { color: 'info', animated: false },
  SPINNER_ERROR: {
    color: 'negative',
    animated: false,
    time: 2,
    then: {
      color: 'info',
      animated: false,
    },
  },
};

