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
};

