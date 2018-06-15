import Style from 'ol/style/style';
import Fill from 'ol/style/fill';
import Stroke from 'ol/style/stroke';
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
  TYPE_MESSAGE: 'MSG',
  TYPE_ALL: 'ALL',

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

  /**
   * Maps utility
   */
  REGEXP_SHAPE_COORD: /[\d.-]+/g,
  DEFAULT_PROJ_VIEW: 'EPSG:3857',
  DEFAULT_PROJ_DATA: 'EPSG:4326',

  POLYGON_STYLE: new Style({
    stroke: new Stroke({
      color: 'rgb(38, 166, 154)',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(38, 166, 154, 0.1)',
    }),
  }),
};

