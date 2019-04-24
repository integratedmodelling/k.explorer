/**
 * Useful constants in app
 */
export const COLORS = {
  SPINNER_STOPPED_COLOR: 'rgb(17, 170, 187)', // $main-control-main-color
  SPINNER_LOADING_COLOR: 'rgb(255, 195, 0)', // $main-control-yellow
  SPINNER_MC_RED: 'rgb(255, 100, 100)', // $main-control-red
  SPINNER_ERROR_COLOR: 'negative',
};
export const LEFTMENU_VISIBILITY = {
  LEFTMENU_MAXSIZE: 512,
  LEFTMENU_MINSIZE: 80,
  LEFTMENU_MAXIMIZED: 'max',
  LEFTMENU_MINIMIZED: 'min',
  LEFTMENU_HIDDEN: 'hidden',
};

/**
 * The viewers asociated component for left menu
 * @type {{DATA_VIEWER_COMPONENT: string, REPORT_VIEWER_COMPONENT: string, DATAFLOW_VIEWER_COMPONENT: string, PROVENANCE_VIEWER_COMPONENT: string, LOG_COMPONENT: string}}
 */
export const LEFTMENU_COMPONENTS = {
  DATA_VIEWER_COMPONENT: 'klab-main-control',
  DOCKED_DATA_VIEWER_COMPONENT: 'docked-main-control',
  REPORT_VIEWER_COMPONENT: 'reports-details',
  DATAFLOW_VIEWER_COMPONENT: 'dataflow-details',
  PROVENANCE_VIEWER_COMPONENT: 'provenance-details',
  LOG_COMPONENT: 'klab-log-pane',
};

/**
 * Viewers:
 * DATA_VIEWER: container for maps, graph or everything that represent an observation
 * REPORT_VIEWER: container for reports
 * DATAFLOW_VIEWER: container for dataflow
 * PROVENANCE_VIEWER: container for provenance (not implemented)
 * @type {{VIEWER: {
 *   name: string,
 *   leftMenuState: string,
 *   leftMenuContent: undefined,
 *   mainControl: boolean
 * }
 * }}
 */
export const VIEWERS = {
  DATA_VIEWER: {
    name: 'DataViewer',
    leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_HIDDEN,
    leftMenuContent: LEFTMENU_COMPONENTS.DATA_VIEWER_COMPONENT,
    mainControl: true,
  },
  DOCKED_DATA_VIEWER: {
    name: 'DataViewer',
    leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_MAXIMIZED,
    leftMenuContent: LEFTMENU_COMPONENTS.DOCKED_DATA_VIEWER_COMPONENT,
    mainControl: false,
  },
  REPORT_VIEWER: {
    name: 'ReportViewer',
    leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_COMPONENTS.REPORT_VIEWER_COMPONENT,
    mainControl: false,
  },
  DATAFLOW_VIEWER: {
    name: 'DataflowViewer',
    leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_COMPONENTS.DATAFLOW_VIEWER_COMPONENT,
    mainControl: false,
  },
  PROVENANCE_VIEWER: {
    name: 'ProvenanceViewer',
    leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_COMPONENTS.PROVENANCE_VIEWER_COMPONENT,
    mainControl: false,
  },
};

/**
 * Used to centralize the default empty map selection
 * @type {{pixelSelected: null, layerSelected: null, value: null}}
 */
export const EMPTY_MAP_SELECTION = {
  pixelSelected: null,
  layerSelected: null,
  value: null,
};

export const MATCH_TYPES = {
  CONCEPT: {
    label: 'Concept',
    symbol: 'C',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  PREFIX_OPERATOR: {
    label: 'Prefix operator',
    symbol: 'Po',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  INFIX_OPERATOR: {
    label: 'Infix operator',
    symbol: 'Io',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  OBSERVATION: {
    label: 'Observation',
    symbol: 'O',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  MODEL: {
    label: 'Model',
    symbol: 'Ml',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  MODIFIER: {
    label: 'Modifier',
    symbol: 'Mf',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  PRESET_OBSERVABLE: { // subject returned when using default results
    label: 'Preset observable',
    symbol: 'Po',
    color: 'sem-preset-observable',
    rgb: 'rgb(240, 240, 240)',
  },
  SEPARATOR: {
    label: 'Separator',
    symbol: 'S',
    color: 'sem-separator',
    rgb: 'rgb(10, 10, 10)',
  },
};

/**
 * Semantic Types
 */

export const SEMANTIC_TYPES = {
  QUALITY: {
    label: 'Quality',
    symbol: 'Q',
    color: 'sem-quality',
    rgb: 'rgb(0, 153, 0)',
  },
  SUBJECT: {
    label: 'Subject',
    symbol: 'S',
    color: 'sem-subject',
    rgb: 'rgb(153, 76, 0)',
  },
  IDENTITY: {
    label: 'identity',
    symbol: 'Id',
    color: 'sem-identity',
    rgb: 'rgb(0, 102, 204)',
  },
  ATTRIBUTE: {
    label: 'Attribute',
    symbol: 'A',
    color: 'sem-attribute',
    rgb: 'rgb(0, 102, 204)',
  },
  REALM: {
    label: 'Realm',
    symbol: 'R',
    color: 'sem-realm',
    rgb: 'rgb(0, 102, 204)',
  },
  TRAIT: {
    label: 'Trait',
    symbol: 'T',
    color: 'sem-trait',
    rgb: 'rgb(0, 102, 204)',
  },
  EVENT: {
    label: 'Event',
    symbol: 'E',
    color: 'sem-event',
    rgb: 'rgb(53, 153, 0)',
  },
  RELATIONSHIP: {
    label: 'Relationship',
    symbol: 'R',
    color: 'sem-relationship',
    rgb: 'rgb(210, 170, 0)',
  },
  PROCESS: {
    label: 'Process',
    symbol: 'P',
    color: 'sem-process',
    rgb: 'rgb(204, 0, 0)',
  },
  ROLE: {
    label: 'Role',
    symbol: 'R',
    color: 'sem-role',
    rgb: 'rgb(0, 86, 163)',
  },
  CONFIGURATION: {
    label: 'Configuration',
    symbol: 'C',
    color: 'sem-configuration',
    rgb: 'rgb(98, 98, 98)',
  },
  DOMAIN: {
    label: 'Domain',
    symbol: 'D',
    color: 'sem-domain',
    rgb: 'rgb(240, 240, 240)',
  },
};

export default {
  EMPTY_MAP_SELECTION,
  /**
   * Max length of an array contains history (f.e. log)
   */
  HIST_MAX_LENGTH: 50,

  /**
   * Default siblings to ask for
   * substituted by store.data.siblingsToAskFor
   */
  // SIBLINGS_TO_ASK_FOR: 25,

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
  TYPE_DEBUG: 'debug',
  TYPE_WARNING: 'warning',
  TYPE_ERROR: 'error',
  TYPE_INFO: 'info',

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

  MATCH_TYPES,
  SEMANTIC_TYPES,

  /**
   * URL params
   */
  PARAMS_MODE: 'mode',
  PARAMS_MODE_IDE: 'ide',
  PARAMS_MODE_STANDALONE: 'standalone',
  PARAMS_SESSION: 'session',
  PARAMS_LOG: 'log',
  PARAMS_LOG_HIDDEN: 'hidden',
  PARAMS_LOG_VISIBLE: 'visible',
  PARAMS_NOTIFIED: 'notified',
  PARAMS_NOTIFIED_ONLY: 'only',
  PARAMS_NOTIFIED_ALL: 'all',

  /**
   * Cookies name
   */
  COOKIE_LANG: 'klab_exp_lang',
  COOKIE_SESSION: 'klab_session', // TODO will be useless?
  COOKIE_MODE: 'klab_mode',
  COOKIE_LOG: 'klab_log',
  COOKIE_BASELAYER: 'klab_baselayer',
  COOKIE_NOTIFIED: 'klab_notified',
  COOKIE_MAPDEFAULT: 'klab_mapdefault',
  COOKIE_SAVELOCATION: 'klab_saveLocation',

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

  PARAM_VIEWPORT_SIZE: 800, // default viewport for image layer
  PARAM_VIEWPORT_MAX_SIZE: 7680, // 8K, possibly highest on August 2018
  PARAM_VIEWPORT_MULTIPLIER: 2, // default viewport multiplier

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

  SPINNER_LOADING: {
    color: COLORS.SPINNER_LOADING_COLOR,
    animated: true,
  },

  SPINNER_STOPPED: {
    color: COLORS.SPINNER_STOPPED_COLOR,
    animated: false,
  },

  SPINNER_ERROR: {
    color: COLORS.SPINNER_ERROR_COLOR,
    animated: false,
    time: 2,
    then: {
      color: COLORS.SPINNER_STOPPED_COLOR,
      animated: false,
    },
  },
};

export const FAKE_TEXTS = {
  UNKNOWN_SEARCH_OBSERVATION: '$$UNKNOWN_SEARCH_OBSERVATION$$',
};

export const DATAFLOW_STATUS = {
  WAITING: 'waiting',
  PROCESSING: 'processing',
  PROCESSED: 'processed',
  ABORTED: 'aborted',
};

export const CUSTOM_EVENTS = {
  MAP_SIZE_CHANGED: 'mapsizechanged',
  UPDATE_FOLDER: 'updatefolder',
  GRAPH_NODE_SELECTED: 'graphnodeselected',
  SPINNER_DOUBLE_CLICK: 'spinnerdoubleclick',
  SHOW_NODE: 'shownode', // show a tree node, emitted from ObservationInfo
  ASK_FOR_UNDOCK: 'askforundock',
  // from any part of explorer, we can ask to show suggestions.
  // if search is not started, it start with suggestion
  // if search is not focused, it focus
  // if search is started and focused, it stop. The event object can contains this attributes:
  // noStore = false : the search is not store in history
  // noDelete = false : actual search is not deleted
  ASK_FOR_SUGGESTIONS: 'askforsuggestions',
  // If something need fit the map
  NEED_FIT_MAP: 'needfitmap',
  // send a map click to inform. For now used by mainControlMenu to close itself
  MAP_CLICK: 'mapclick',
};
