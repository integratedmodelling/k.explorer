/**
 * Useful constants in app
 */

/**
 * Constants of application
 */
export const CONSTANTS = {
  /**
   * Used to centralize the default empty map selection
   * @type {{pixelSelected: null, layerSelected: null, value: null}}
   */
  EMPTY_MAP_SELECTION: {
    pixelSelected: null,
    layerSelected: null,
    value: null,
    locked: false,
  },

  /**
   * Max length of an array contains history (f.e. log)
   */
  HIST_MAX_LENGTH: 50,

  /**
   * Default children to ask for
   */
  CHILDREN_TO_ASK_FOR: 25,

  /**
   * increment in pixel for the searchbar
   */
  SEARCHBAR_SIZE: 512,
  SEARCHBAR_INCREMENT: 128,
  MAX_SEARCHBAR_INCREMENTS: 6,
};

export const LEFTMENU_CONSTANTS = {
  /**
   * Left menu visibility
    */
  LEFTMENU_MAXSIZE: 512,
  LEFTMENU_MINSIZE: 80,
  LEFTMENU_MAXIMIZED: 'max',
  LEFTMENU_MINIMIZED: 'min',
  LEFTMENU_HIDDEN: 'hidden',
  /**
   * The viewers associated component for left menu
   * @type {{DATA_VIEWER_COMPONENT: string, REPORT_VIEWER_COMPONENT: string, DATAFLOW_VIEWER_COMPONENT: string, PROVENANCE_VIEWER_COMPONENT: string, LOG_COMPONENT: string}}
   */
  DATA_VIEWER_COMPONENT: 'klab-main-control',
  DOCKED_DATA_VIEWER_COMPONENT: 'docked-main-control',
  REPORT_VIEWER_COMPONENT: 'reports-details',
  DATAFLOW_VIEWER_COMPONENT: 'dataflow-details',
  DATAFLOW_INFO_COMPONENT: 'dataflow-info',
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
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN,
    leftMenuContent: LEFTMENU_CONSTANTS.DATA_VIEWER_COMPONENT,
    mainControl: true,
  },
  DOCKED_DATA_VIEWER: {
    name: 'DataViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MAXIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.DOCKED_DATA_VIEWER_COMPONENT,
    mainControl: false,
  },
  REPORT_VIEWER: {
    name: 'ReportViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.REPORT_VIEWER_COMPONENT,
    mainControl: false,
  },
  DATAFLOW_VIEWER: {
    name: 'DataflowViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.DATAFLOW_VIEWER_COMPONENT,
    mainControl: false,
  },
  PROVENANCE_VIEWER: {
    name: 'ProvenanceViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.PROVENANCE_VIEWER_COMPONENT,
    mainControl: false,
  },
};

/**
 * Viewer components type
 */
export const VIEWER_COMPONENTS = {
  VIEW_MAP: {
    component: 'MapViewer',
    label: 'Maps',
    hideable: false,
    forceNew: false,
  },
  VIEW_CHART: {
    component: 'ChartViewer',
    label: 'Chart',
    hideable: true,
    forceNew: true,
  },
  VIEW_GRAPH: {
    component: 'GraphViewer',
    label: 'Graph',
    hideable: true,
    forceNew: true,
  },
  VIEW_BLOB: {
    component: 'BlobViewer',
    label: 'Blob',
    hideable: false,
    forceNew: false,
  },
  VIEW_UNKNOWN: {
    component: 'UnknownViewer',
    label: 'Unknown',
    hideable: false,
    forceNew: false,
  },
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
    symbol: 'O',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  INFIX_OPERATOR: {
    label: 'Infix operator',
    symbol: 'O',
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
    symbol: 'M',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  MODIFIER: {
    label: 'Modifier',
    symbol: 'O',
    color: 'sem-types',
    rgb: 'rgb(38, 50, 56)',
  },
  PRESET_OBSERVABLE: { // subject returned when using default results
    label: 'Preset observable',
    symbol: 'O',
    color: 'sem-preset-observable',
    rgb: 'rgb(240, 240, 240)',
  },
  SEPARATOR: {
    label: 'Separator',
    symbol: 'S',
    color: 'sem-separator',
    rgb: 'rgb(10, 10, 10)',
  },
  NEXT_TOKENS: {
    TOKEN: 'TOKEN',
    TEXT: 'TEXT',
    INTEGER: 'INTEGER',
    DOUBLE: 'DOUBLE',
    BOOLEAN: 'BOOLEAN',
    UNIT: 'UNIT',
    CURRENCY: 'CURRENCY',
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

export const graphDefaultData = {
  nodes: [],
  links: [],
  showMenu: false,
  selected: {},
  showSelection: false,
  linksSelected: {},
  options: {
    canvas: false,
    size: {
      w: 500,
      h: 500,
    },
    force: 350,
    offset: {
      x: 0,
      y: 0,
    },
    nodeSize: 20,
    linkWidth: 1,
    nodeLabels: true,
    linkLabels: false,
    strLinks: true,
  },
};

/**
 * Connections states
 */
export const CONNECTION_CONSTANTS = {
  CONNECTION_UNKNOWN: 'UNKNOWN',
  CONNECTION_UP: 'UP',
  CONNECTION_DOWN: 'DOWN',
  CONNECTION_WORKING: 'WORKING',
  CONNECTION_ERROR: 'ERROR',
};

/**
 * Message types
 */
export const MESSAGE_TYPES = {
  TYPE_DEBUG: 'debug',
  TYPE_WARNING: 'warning',
  TYPE_ERROR: 'error',
  TYPE_INFO: 'info',

  TYPE_MESSAGE: 'MSG',
  TYPE_ALL: 'ALL',
};

/**
 * Observation types
 */
export const OBSERVATION_CONSTANTS = {
  TYPE_PROCESS: 'PROCESS',
  TYPE_STATE: 'STATE',
  TYPE_SUBJECT: 'SUBJECT',
  TYPE_CONFIGURATION: 'CONFIGURATION',
  TYPE_EVENT: 'EVENT',
  TYPE_RELATIONSHIP: 'RELATIONSHIP',
  TYPE_GROUP: 'GROUP',
  TYPE_VIEW: 'VIEW',
  TYPE_INITIAL: 'INITIAL', // wildcard for initial state
};

/**
 * DEFAULT Viewer on start
 */
export const OBSERVATION_DEFAULT = {
  shapeType: 'POINT',
  encodedShape: 'POINT (40.299841 9.343971)',
  id: null,
  label: 'DEFAULT',
  parentId: -1,
  visible: true,
  spatialProjection: 'EPSG:4326',
  observationType: OBSERVATION_CONSTANTS.TYPE_INITIAL,
};

/**
 * Value types
 */
export const VALUE_CONSTANTS = {
  TYPE_VOID: 'VOID',
  TYPE_NUMBER: 'NUMBER',
  TYPE_BOOLEAN: 'BOOLEAN',
  TYPE_CATEGORY: 'CATEGORY',
  TYPE_DISTRIBUTION: 'DISTRIBUTION',
};

/**
 * Constants relatives to observations geometry
 */
export const GEOMETRY_CONSTANTS = {
  /**
   * Geometries types
   */
  TYPE_RASTER: 'RASTER',
  TYPE_SHAPE: 'SHAPE',
  TYPE_SCALAR: 'SCALAR',
  TYPE_TIMESERIES: 'TIMESERIES',
  TYPE_NETWORK: 'NETWORK',
  TYPE_PROPORTIONS: 'PROPORTIONS',
  /**
   * Shapes types
   */
  SHAPE_POLYGON: 'POLYGON',
  SHAPE_POINT: 'POINT',
  /**
   * Viewport constants
   */
  PARAM_VIEWPORT_SIZE: 800, // default viewport for image layer
  PARAM_VIEWPORT_MAX_SIZE: 7680, // 8K, possibly highest on August 2018
  PARAM_VIEWPORT_MULTIPLIER: 2, // default viewport multiplier

};

/**
 * Constants for fron end part only
 */
export const FRONT_END_CONSTANTS = {
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
};

/*
export const APP_PARAM_CONSTANTS = {
  /**
   * APP params
   *
  PARAMS_SHOW: 'notified',
  PARAMS_SHOW_MAIN: 'only',
  PARAMS_SHOW_ALL: 'all',
};
*/

/**
 * Constants relative to web page
 */
export const WEB_CONSTANTS = {
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
  /**
   * Cookies name
   */
  COOKIE_LANG: 'klab_exp_lang',
  COOKIE_SESSION: 'klab_session', // TODO will be useless?
  COOKIE_MODE: 'klab_mode',
  COOKIE_LOG: 'klab_log',
  COOKIE_BASELAYER: 'klab_baselayer',
  // COOKIE_NOTIFIED: 'klab_notified',
  COOKIE_MAPDEFAULT: 'klab_mapdefault',
  COOKIE_SAVELOCATION: 'klab_saveLocation',
  COOKIE_HELP_ON_START: 'klab_helponstart',
};

export const SPINNER_COLORS = {
  SPINNER_STOPPED_COLOR: 'rgb(17, 170, 187)', // $main-control-main-color
  SPINNER_LOADING_COLOR: 'rgb(255, 195, 0)', // $main-control-yellow
  SPINNER_MC_RED: 'rgb(255, 100, 100)', // $main-control-red
  SPINNER_ERROR_COLOR: 'negative',
};

export const SPINNER_CONSTANTS = {
  SPINNER_LOADING: {
    color: SPINNER_COLORS.SPINNER_LOADING_COLOR,
    animated: true,
  },

  SPINNER_STOPPED: {
    color: SPINNER_COLORS.SPINNER_STOPPED_COLOR,
    animated: false,
  },

  SPINNER_ERROR: {
    color: SPINNER_COLORS.SPINNER_ERROR_COLOR,
    animated: false,
    time: 2,
    then: {
      color: SPINNER_COLORS.SPINNER_STOPPED_COLOR,
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
  VIEWER_CLICK: 'viewerclick',
  VIEWER_SELECTED: 'viewerselected', // fired when a minimize viewer is maximize
  VIEWER_CLOSED: 'viewerclosed',
  OBSERVATION_INFO_CLOSED: 'observationinfoclosed', // when the observation info panel is close, I must close any mapinfo
  SEND_REGION_OF_INTEREST: 'sendregionofinterest', // when scale is unlocked, we need to refresh region of interest
};

export const SCALE_TYPE = {
  ST_SPACE: 'space',
  ST_TIME: 'time',
};

export const SEARCH_MODES = {
  SEMANTIC: 'SEMANTIC',
  FREETEXT: 'FREETEXT',
};

export const SETTING_NAMES = {
  INTERACTIVE_MODE: 'InteractiveMode',
  LOCK_SPACE: 'LockSpace',
  LOCK_TIME: 'LockTime',
};

export default {
  CONSTANTS,
  LEFTMENU_CONSTANTS,
  VIEWERS,
  VIEWER_COMPONENTS,
  MATCH_TYPES,
  SEMANTIC_TYPES,
  graphDefaultData,
  CONNECTION_CONSTANTS,
  MESSAGE_TYPES,
  OBSERVATION_CONSTANTS,
  OBSERVATION_DEFAULT,
  VALUE_CONSTANTS,
  GEOMETRY_CONSTANTS,
  FRONT_END_CONSTANTS,
  // APP_PARAM_CONSTANTS,
  WEB_CONSTANTS,
  SPINNER_COLORS,
  SPINNER_CONSTANTS,
  FAKE_TEXTS,
  DATAFLOW_STATUS,
  CUSTOM_EVENTS,
  SCALE_TYPE,
  SETTING_NAMES,
};
