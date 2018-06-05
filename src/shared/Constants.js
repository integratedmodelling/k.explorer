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
  CONNECTION_UNKNOWN: Number.MIN_VALUE,
  CONNECTION_UP: 1,
  CONNECTION_DOWN: 0,
  CONNECTION_WORKING: 2,
  CONNECTION_ERROR: -1,

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

