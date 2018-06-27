import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
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

  TREE_FOLDER: 'FOLDER',
  TREE_SHAPE: 'SHAPE',

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
  VIEW_BLOB: 'BlobViewer',

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
  // Group 1: projection, Group 2: geometry
  REGEXP_WKT: /(EPSG:\d{4})?\s?(.*)/g,
  */
  PROJ_EPSG_4326: 'EPSG:4326',
  PROJ_EPSG_3857: 'EPSG:3857',

  POLYGON_CONTEXT_STYLE: new Style({
    stroke: new Stroke({
      color: 'rgb(38, 166, 154)',
      width: 6,
    }),
    fill: new Fill({
      color: 'rgba(38, 166, 154, 0.1)',
    }),
  }),
  POLYGON_OBSERVATION_STYLE: new Style({
    stroke: new Stroke({
      // color: colors.getBrand('secondary'),
      color: 'rgb(255, 102, 0)',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 102, 0, 0.1)',
    }),
  }),
};

