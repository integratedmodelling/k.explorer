/**
 * Constants of application
 */
import { getI18N } from 'plugins/vue-i18n';

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
  LEFTMENU_DOCUMENTATION_SIZE: 360,
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
  DOCUMENTATION_VIEWER_COMPONENT: 'documentation-tree',
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
 * @type {{DATA_VIEWER: {name: string, leftMenuState: string, leftMenuContent: {DATA_VIEWER_COMPONENT: string, REPORT_VIEWER_COMPONENT: string, DATAFLOW_VIEWER_COMPONENT: string, PROVENANCE_VIEWER_COMPONENT: string, LOG_COMPONENT: string}, mainControl: boolean}, DOCKED_DATA_VIEWER: {name: string, leftMenuState: string, leftMenuContent: string, mainControl: boolean}, REPORT_VIEWER: {name: string, leftMenuState: string, leftMenuContent: string, mainControl: boolean}, DATAFLOW_VIEWER: {name: string, leftMenuState: string, leftMenuContent: string, mainControl: boolean}, PROVENANCE_VIEWER: {name: string, leftMenuState: string, leftMenuContent: string, mainControl: boolean}}}
 */
export const VIEWERS = {
  DATA_VIEWER: {
    name: 'DataViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN,
    leftMenuContent: LEFTMENU_CONSTANTS.DATA_VIEWER_COMPONENT,
    mainControl: true,
    hasSearch: true,
  },
  DOCKED_DATA_VIEWER: {
    name: 'DataViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MAXIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.DOCKED_DATA_VIEWER_COMPONENT,
    mainControl: false,
    hasSearch: true,
  },
  DOCUMENTATION_VIEWER: {
    name: 'KlabDocumentation',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.DOCUMENTATION_VIEWER_COMPONENT,
    mainControl: false,
    hasSearch: false,
  },
  REPORT_VIEWER: {
    name: 'ReportViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.REPORT_VIEWER_COMPONENT,
    mainControl: false,
    hasSearch: false,
  },
  DATAFLOW_VIEWER: {
    name: 'DataflowViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.DATAFLOW_VIEWER_COMPONENT,
    mainControl: false,
    hasSearch: false,
  },
  PROVENANCE_VIEWER: {
    name: 'ProvenanceViewer',
    leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_MINIMIZED,
    leftMenuContent: LEFTMENU_CONSTANTS.PROVENANCE_VIEWER_COMPONENT,
    mainControl: false,
    hasSearch: false,
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
    label: 'Under construction',
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
  PARAM_VIEWPORT_MULTIPLIER: 1, // default viewport multiplier

};

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
  PARAMS_LOCAL_HELP: 'localhelp',
  PARAMS_APP: 'app',
  PARAMS_LOCAL: 'local',
  PARAMS_STOMP_DEBUG: 'stomp-debug',
  PARAMS_TOKEN: 'token',
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
  COOKIE_DOCKED_STATUS: 'klab_dockedstatus', // will be true | false | not set
  COOKIE_NOTIFICATIONS: 'klab_notifications',
  COOKIE_TERMINAL_SIZE: 'klab_terminalsize',
  LOCAL_STORAGE_APP_ID: 'klab:appId',
  LOCAL_STORAGE_TERMINAL_COMMANDS: 'klab:terminalCommands',
};

export const APP_URLS = {
  NOTIFICATIONS_URL: `${process.env.WEB_BASE_URL}/statics/notifications/index.php`,
};

export const COLORS = {
  MAIN_COLOR: 'rgb(17, 170, 187)',
  MAIN_GREEN: 'rgb(231,255,219)',
  MAIN_CYAN: 'rgb(228,253,255)',
  MAIN_YELLOW: 'rgb(255, 195, 0)',
  MAIN_RED_HEX: '#ff6464',
  MAIN_COLOR_HEX: '#11aabb',
  MAIN_GREEN_HEX: '#e7ffdb',
  MAIN_CYAN_HEX: '#e4fdff',
  MAIN_YELLOW_HEX: '#ffc300',
  MAIN_RED: 'rgb(255, 100, 100)',
  PRIMARY: '#DA1F26',
  SECONDARY: '#26A69A',
  TERTIARY: '#555',
  NEUTRAL: '#E0E1E2',
  POSITIVE: '#19A019',
  NEGATIVE: '#DB2828',
  INFO: '#1E88CE',
  WARNING: '#F2C037',
  PRIMARY_NAME: 'primary',
  SECONDARY_NAME: 'secondary',
  TERTIARY_NAME: 'tertiary',
  POSITIVE_NAME: 'positive',
  NEGATIVE_NAME: 'negative',
  INFO_NAME: 'info',
  WARNING_NAME: 'warning',
};

export const SPINNER_COLORS = {
  SPINNER_STOPPED_COLOR: COLORS.MAIN_COLOR,
  SPINNER_LOADING_COLOR: COLORS.MAIN_YELLOW,
  SPINNER_MC_RED: COLORS.MAIN_RED,
  SPINNER_ERROR_COLOR: COLORS.NEGATIVE_NAME,
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
  TREE_VISIBLE: 'treevisible',
  // send a map click to inform. For now used by mainControlMenu to close itself
  VIEWER_CLICK: 'viewerclick',
  VIEWER_SELECTED: 'viewerselected', // fired when a minimize viewer is maximize
  VIEWER_CLOSED: 'viewerclosed',
  OBSERVATION_INFO_CLOSED: 'observationinfoclosed', // when the observation info panel is close, I must close any mapinfo
  SEND_REGION_OF_INTEREST: 'sendregionofinterest', // when scale is unlocked, we need to refresh region of interest
  NEED_HELP: 'needhelp',
  OBSERVATION_BY_TIME: 'observationbytime',
  NEED_LAYER_BUFFER: 'needlayerbuffer',
  COMPONENT_ACTION: 'componentaction',
  LAYOUT_CHANGED: 'layoutchanged',
  SELECT_ELEMENT: 'selectelement',
  PROPOSED_CONTEXT_CHANGE: 'proposedcontextchange',
  NEW_SCHEDULING: 'newscheduling',
  SHOW_NOTIFICATIONS: 'shownotifications',
  TERMINAL_FOCUSED: 'terminalfocused',
  COMMAND_RESPONSE: 'commandresponse',
  REFRESH_DOCUMENTATION: 'refreshdocumentation',
  SHOW_DOCUMENTATION: 'showdowcumentation',
};

export const SCALE_TYPE = {
  ST_SPACE: 'space',
  ST_TIME: 'time',
};

export const SCALE_VALUES = {
  CENTIMETERS: 'cm',
  METERS: 'm',
  KILOMETERS: 'km',
  MILLENNIUM: 'MILLENNIUM',
  CENTURY: 'CENTURY',
  DECADE: 'DECADE',
  YEAR: 'YEAR',
  MONTH: 'MONTH',
  WEEK: 'WEEK',
  DAY: 'DAY',
  HOUR: 'HOUR',
  MINUTE: 'MINUTE',
  SECOND: 'SECOND',
  MILLISECOND: 'MILLISECOND',
};

/**
 * The admited scales units with this format:
 * i18nlabel: the i18n variable under group label
 * type: TIME or SPACE
 * value: the value to send to engine
 */
export const SCALE_UNITS = [
  {
    i18nlabel: 'unitCentimeter',
    type: SCALE_TYPE.ST_SPACE,
    value: SCALE_VALUES.CENTIMETERS,
    selectable: true,
  }, {
    i18nlabel: 'unitMeter',
    type: SCALE_TYPE.ST_SPACE,
    value: SCALE_VALUES.METERS,
    selectable: true,
  }, {
    i18nlabel: 'unitKilometer',
    type: SCALE_TYPE.ST_SPACE,
    value: SCALE_VALUES.KILOMETERS,
    selectable: true,
  }, {
    i18nlabel: 'unitMillennium',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.MILLENNIUM,
    selectable: false,
    momentShorthand: 'y',
    momentMultiplier: 1000,
    index: 0,
  }, {
    i18nlabel: 'unitCentury',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.CENTURY,
    selectable: true,
    momentShorthand: 'y',
    momentMultiplier: 100,
    index: 1,
  }, {
    i18nlabel: 'unitDecade',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.DECADE,
    selectable: true,
    momentShorthand: 'y',
    momentMultiplier: 10,
    index: 2,
  }, {
    i18nlabel: 'unitYear',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.YEAR,
    selectable: true,
    momentShorthand: 'y',
    momentMultiplier: 1,
    index: 3,
  }, {
    i18nlabel: 'unitMonth',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.MONTH,
    selectable: true,
    momentShorthand: 'M',
    momentMultiplier: 1,
    index: 4,
  }, {
    i18nlabel: 'unitWeek',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.WEEK,
    selectable: true,
    momentShorthand: 'W',
    momentMultiplier: 1,
    index: 5,
  }, {
    i18nlabel: 'unitDay',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.DAY,
    selectable: true,
    momentShorthand: 'd',
    momentMultiplier: 1,
    index: 6,
  }, {
    i18nlabel: 'unitHour',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.HOUR,
    selectable: true,
    momentShorthand: 'h',
    momentMultiplier: 1,
    index: 7,
  }, {
    i18nlabel: 'unitMinute',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.MINUTE,
    selectable: true,
    momentShorthand: 'm',
    momentMultiplier: 1,
    index: 8,
  }, {
    i18nlabel: 'unitSecond',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.SECOND,
    selectable: false,
    momentShorthand: 's',
    momentMultiplier: 1,
    index: 9,
  }, {
    i18nlabel: 'unitMillisecond',
    type: SCALE_TYPE.ST_TIME,
    value: SCALE_VALUES.MILLISECOND,
    selectable: false,
    momentShorthand: 'ms',
    momentMultiplier: 1,
    index: 10,
  },
];

export const MODIFICATIONS_TYPE = {
  /**
   * Spatial context has changed location
   */
  SPATIAL_TRANSLATION: 'SpatialTranslation',

  /**
   * Spatial context has changed shape
   */
  SPATIAL_CHANGE: 'SpatialChange',

  /**
   * Observation has been terminated and is no longer in the context
   */
  TERMINATION: 'Termination',

  /**
   * Number of children has changed: newSize contains the new number
   */
  STRUCTURE_CHANGE: 'StructureChange',

  /**
   * Name of object has changed
   */
  NAME_CHANGE: 'NameChange',

  /**
   * Attributes linked to an object or a folder have changed
   */
  ATTRIBUTE_CHANGE: 'AttributeChange',

  /**
   * Values of a state have changed
   */
  VALUE_CHANGE: 'ValueChange',

  /**
   * Observation becomes "main"
   */
  BRING_FORWARD: 'BringForward',

  /**
   * Observation becomes "main"
   */
  CONTEXTUALIZATION_COMPLETED: 'ContextualizationCompleted',
};

export const TIMES = {
  DEFAULT_STEP: 24 * 60 * 60 * 1000,
  DEFAULT_INTERVAL: 100,
  PIXEL_TIME_MULTIPLIER: 1,
  MIN_PLAY_TIME: 60 * 1000, // 1 minute
  MAX_PLAY_TIME: 1 * 60 * 1000, // 2 minutes
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

export const HELP_CONSTANTS = {
  DEFAULT_MODAL_SIZE: { width: 1024, height: 768 },
  DEFAULT_PROPORTIONS: { width: 4, height: 3 },
  DEFAULT_WIDTH_PERCENTAGE: 90,
  DEFAULT_HEIGHT_PERCENTAGE: 90,
  DEFAULT_HELP_BASE_URL: 'https://integratedmodelling.org/statics/help',
};

export const OBSERVATION_CONTEXT_EMPTY_ITEM = {
  actionLabel: null,
  actionId: null,
  downloadUrl: null,
  downloadFileExtension: null,
  enabled: false,
  separator: false,
  submenu: [],
};

export const OBSERVATION_CONTEXT_ITEMS = {
  SEPARATOR_ITEM: {
    ...OBSERVATION_CONTEXT_EMPTY_ITEM,
    enabled: true,
    separator: true,
  },
  RECONTEXTUALIZATION_ITEM: {
    ...OBSERVATION_CONTEXT_EMPTY_ITEM,
    actionId: 'Recontextualization',
    actionLabel: getI18N().tc('label.recontextualization'),
    enabled: true,
  },
};

export const KNOWLEDGE_VIEWS = [
  {
    viewClass: 'table',
    label: getI18N().tc('label.kwTable'),
    icon: 'mdi-table',
    exportIcons: [
      {
        type: 'xlsx', // adapter
        icon: 'mdi-file-excel',
      },
    ],
  },
  {
    viewClass: 'chart',
    label: getI18N().tc('label.kwChart'),
    icon: 'mdi-chart-bar',
    exportIcons: [],
  },
];

export const VIEW_SETTING = {
  OBSERVATION: 'Observation',
  VIEW: 'View',
  TREE: 'Tree',
  REPORT: 'Report',
  DATAFLOW: 'Dataflow',
  SHOW: 'Show',
  HIDE: 'Hide',
};

export const ENGINE_EVENTS = {
  RESOURCE_VALIDATION: 'ResourceValidation',
};

export const APPS_COMPONENTS = {
  PANEL: 'Panel',
  ALERT: 'Alert',
  PUSH_BUTTON: 'PushButton',
  CHECK_BUTTON: 'CheckButton',
  RADIO_BUTTON: 'RadioButton',
  TEXT_INPUT: 'TextInput',
  COMBO: 'Combo',
  GROUP: 'Group',
  MAP: 'Map',
  TREE: 'Tree',
  TREE_ITEM: 'TreeItem',
  CONFIRM: 'Confirm',
  VIEW: 'View',
  CONTAINER: 'Container',
  MULTICONTAINER: 'MultiContainer',
  LABEL: 'Label',
  TEXT: 'Text',
  TABLE: 'Table',
  NOTIFICATION: 'Notification',
  INPUT_GROUP: 'InputGroup',
  SEPARATOR: 'Separator',
};

export const APPS_OPERATION = {
  USER_ACTION: 'UserAction',
  ENABLE: 'Enable',
  HIDE: 'Hide',
  UPDATE: 'Update',
};

export const APPS_DEFAULT_VALUES = {
  LABEL_MIN_WIDTH: '150px',
  DEFAULT_LOGO: 'statics/klab-logo.png',
};

const VALUE_WITH_UNIT = /^\d+\D{1,2}/;

export const DEFAULT_STYLE_FUNCTION = (component) => {
  const retStyle = {};
  Object.keys(component.attributes).forEach((key) => {
    const value = component.attributes[key];
    switch (key) {
      case 'width':
        if (value === 'content') {
          retStyle['flex-basis'] = '0';
        } else if (value.startsWith('col')) {
          retStyle['flex-grow'] = value.substring(3);
        } else {
          retStyle.width = `${value}${VALUE_WITH_UNIT.test(value) ? '' : 'px'}`;
          // retStyle['flex-basis'] = 'auto';
        }
        break;
      case 'height':
        retStyle.height = `${value}${VALUE_WITH_UNIT.test(value) ? '' : 'px'}`;
        /*
        if (component.type !== 'Group' && component.type !== 'Tree') {
          retStyle['line-height'] = `${value}${VALUE_WITH_UNIT.test(value) ? '' : 'px'}`;
        }
        */
        // retStyle['line-height'] = `${value}${VALUE_WITH_UNIT.test(value) ? '' : 'px'}`;
        break;
      case 'hfill':
        if (component.attributes.hbox) {
          retStyle['flex-wrap'] = 'nowrap';
        }
        retStyle.width = '100%';
        break;
      case 'vfill':
        retStyle['flex-grow'] = 1;
        break;
      case 'top':
      case 'bottom':
      case 'center':
        if (component.attributes.parentAttributes && component.attributes.parentAttributes.hbox) {
          retStyle['align-self'] = key === 'top' ? 'flex-start' : key === 'bottom' ? 'flex-end' : 'center';
        } else {
          retStyle['vertical-align'] = key;
        }
        break;
      case 'hbox':
      case 'vbox':
        retStyle['flex-direction'] = key === 'hbox' ? 'row' : 'column';
        // retStyle['align-items'] = 'center';
        break;
      case 'left':
      case 'right':
        retStyle['text-align'] = key;
        break;
      default:
        // retStyle.key = value;
        break;
    }
    /*
    if (component.attributes.parentAttributes) {
      if (component.attributes.parentAttributes.hbox) {

      }
    }
    */
  });
  return retStyle;
};

export const DEFAULT_STYLES = {
  dark: {
    'main-color': 'white',
    'background-color': 'black',
    'text-color': 'white',
    'title-color': 'white',
    'font-family': '\'Roboto\', \'-apple-system\', \'Helvetica Neue\', Helvetica, Arial, sans-serif',
    'font-size': '1em',
    'title-size': '26px',
    'subtitle-size': '16px',
    'line-height': 'auto',
  },
  light: {
    'main-color': 'black',
    'background-color': 'white',
    'text-color': 'black',
    'title-color': 'black',
    'font-family': '\'Roboto\', \'-apple-system\', \'Helvetica Neue\', Helvetica, Arial, sans-serif',
    'font-size': '1em',
    'title-size': '26px',
    'subtitle-size': '16px',
    'line-height': '1em',
  },
  worst: {
    'main-color': 'Green',
    'background-color': 'yellow',
    'text-color': 'Red',
    'title-color': 'Indigo',
    'font-family': 'comics',
    'font-size': '1.2em',
    'title-size': '32px',
    'subtitle-size': '20px',
    'line-height': '1.2em',
  },
  default: {
    'main-color': 'rgb(0, 92, 129)',
    'background-color': 'rgb(250, 250, 250)',
    'text-color': 'rgb(0, 92, 129)',
    'title-color': 'rgb(0, 92, 129)',
    'alt-color': 'rgb(0, 164, 161)',
    'font-family': '\'Roboto\', \'-apple-system\', \'Helvetica Neue\', Helvetica, Arial, sans-serif',
    'font-size': '1em',
    'title-size': '26px',
    'subtitle-size': '16px',
    'line-height': '1em',
  },
};

export const TERMINAL_TYPES = {
  DEBUGGER: 'Debugger',
  CONSOLE: 'Console',
};

export const TERMINAL_SIZE_OPTIONS = [
  {
    value: '80x24',
    label: '80x24',
    cols: 80,
    rows: 24,
  }, {
    value: '80x43',
    label: '80x43',
    cols: 80,
    rows: 43,
  }, {
    value: '132x24',
    label: '132x24',
    cols: 132,
    rows: 24,
  }, {
    value: '132x43',
    label: '132x43',
    cols: 132,
    rows: 43,
  },
];

export const DOCUMENTATION_VIEWS = {
  REPORT: 'REPORT',
  FIGURES: 'FIGURES',
  TABLES: 'TABLES',
  RESOURCES: 'RESOURCES',
  MODELS: 'MODELS',
  PROVENANCE: 'PROVENANCE',
};

export const DOCUMENTATION_TYPES = {
  REPORT: 'Report',
  SECTION: 'Section',
  PARAGRAPH: 'Paragraph',
  TABLE: 'Table',
  CHART: 'Chart',
  FIGURE: 'Figure',
  RESOURCE: 'Resource',
  MODEL: 'Model',
  REFERENCE: 'Reference',
  CITATION: 'Citation',
  VIEW: 'View',
  LINK: 'Link',
  ANCHOR: 'Anchor',
};

export const TABLE_TYPES = {
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN',
  CONCEPT: 'CONCEPT',
  PROCESS: 'PROCESS',
  EVENT: 'EVENT',
  OBJECT: 'OBJECT',
  TEXT: 'TEXT',
  VALUE: 'VALUE',
  RANGE: 'RANGE',
  ENUM: 'ENUM',
  EXTENT: 'EXTENT',
  TEMPORALEXTENT: 'TEMPORALEXTENT',
  SPATIALEXTENT: 'SPATIALEXTENT',
  ANNOTATION: 'ANNOTATION',
  LIST: 'LIST',
  VOID: 'VOID',
  MAP: 'MAP',
  TABLE: 'TABLE',
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
  WEB_CONSTANTS,
  APP_URLS,
  COLORS,
  SPINNER_COLORS,
  SPINNER_CONSTANTS,
  FAKE_TEXTS,
  DATAFLOW_STATUS,
  CUSTOM_EVENTS,
  SCALE_TYPE,
  SCALE_VALUES,
  SCALE_UNITS,
  MODIFICATIONS_TYPE,
  TIMES,
  SEARCH_MODES,
  SETTING_NAMES,
  HELP_CONSTANTS,
  OBSERVATION_CONTEXT_EMPTY_ITEM,
  OBSERVATION_CONTEXT_ITEMS,
  KNOWLEDGE_VIEWS,
  VIEW_SETTING,
  ENGINE_EVENTS,
  APPS_COMPONENTS,
  APPS_OPERATION,
  APPS_DEFAULT_VALUES,
  VALUE_WITH_UNIT,
  DEFAULT_STYLES,
  TERMINAL_TYPES,
  TERMINAL_SIZE_OPTIONS,
  DOCUMENTATION_VIEWS,
  DOCUMENTATION_TYPES,
  TABLE_TYPES,
  DEFAULT_STYLE_FUNCTION,
};
