/**
 * State of view
 */
import { CONSTANTS, LEFTMENU_CONSTANTS, SPINNER_CONSTANTS, HELP_CONSTANTS, DOCUMENTATION_VIEWS } from 'shared/Constants';
import { IN } from 'shared/MessagesConstants';

export default {
  /**
   * Array with app logs
   * Using an array of MAX_LENGTH
   * Log object structure is:
   * type: [TYPE_[DEBUG | INFO | WARNING | ERROR]
   * time: moment object
   * payload: {
   *  message: message
   *  attach: more info in various mode
   * }
   */
  kexplorerLog: [],

  /**
   * Status for main control bar
   * Each entry will be an identifier and description
   * {id: [ID], text: [TEXT]}
   */
  statusTexts: [],

  /**
   * Array with engine logs
   * Using an array of MAX_LENGTH
   * Log object structure is:
   * type: [TYPE_[DEBUG | INFO | WARNING | ERROR]
   * timestamp: timestamp from engine
   * payload: message
   * id: engine id for message
   */
  klabLog: [],

  /**
   * Active dataViewers
   * idx: automatic id,
   * main: if true is the main,
   * type: one of Constants.VIEW_XXXX,
   * observationType: the first observation type,
   * observations array of observations linked to this viewer,
   */
  dataViewers: [],
  /**
   * Main data viewer idx
   * Use only for comodity
   * We don't need to check each time all the array
   * Is managed by dataViewers mutations
   */
  mainDataViewerIdx: 0,

  /**
   * Every viewer has an autonumeric id
   */
  lastViewerId: 0,

  /**
   * In index, the main viewer can be a DataViewer, ReportViewer, DataflowViewer or ProvenanceViewer
   * Each viewer has this structure:
   * {
   *   name: [name of component]
   *   leftMenuState: [default show in left menu]
   *   mainControl: [default show in main control]
   * }
   */
  mainViewer: undefined,
  treeVisible: true,

  /**
   * The content of left menu. Is decided using the mainViewer leftMenuContent or punctual action (like open log)
   * Will be a string with the component name
   */
  leftMenuContent: null,
  /**
   * The state of left menu. Will be one of LEFTMENU_VISIBILITY constants
   */
  leftMenuState: LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN,

  /**
   * Indicate if main control is docked
   */
  mainControlDocked: false,

  /**
   * Layer with the context shape shared between dataViewers
   */
  contextGeometry: null,

  /**
   * State of elephant
   * option:
   * color: one of named colors
   * animated: true | false
   * time: time in seconds of temporary state
   * then: other option object to decide the state after time is gone
   */
  spinner: SPINNER_CONSTANTS.SPINNER_STOPPED,
  spinnerOwners: [],

  /**
   * indicate if search option is active
   */
  searchActive: false,
  /**
   * indicate if search input has focused
   */
  searchFocus: false,
  /**
   * a char that will be lost
   */
  searchLostChar: '',
  /**
   * Previous searches are stored here
   */
  searchHistory: [],
  /**
   * Search is focused in app
   */
  searchInApp: false,

  /**
   * If true, when dataflow button is clicked, if dataflow not exists we ask for it.
   * Need to notify that we have unview dataflow too
   */
  reloadDataflow: false,
  dataflowInfoOpen: false,

  /**
   * More info content
   */
  observationInfo: null,
  mapSelection: CONSTANTS.EMPTY_MAP_SELECTION,

  /**
   * Indicate if explore map mode is active
   */
  exploreMapMode: false,

  /**
   * Tree infos
   */
  treeSelected: null,
  treeTicked: [],
  treeExpanded: [],
  /**
   * The raster layer on the top
   * Vector layer are not used
  */
  topLayer: null,
  /**
   * true if we are editing the scale. Need for no intercept events
   */
  scaleEditing: {
    active: false,
    type: null,
  },

  drawMode: false,
  customContext: false,

  saveLocation: true,
  saveDockedStatus: false,

  modalMode: false,

  inputRequests: [],
  waitingGeolocation: true,
  helpShown: false,
  modalSize: HELP_CONSTANTS.DEFAULT_MODAL_SIZE,
  fuzzyMode: false, // search with free text
  largeMode: 0, // search bar steps 0: normal; >0: larger
  helpBaseUrl: null,
  timeRunning: false,

  /**
   * View components coming from k.LAb
   * Array contains all layout objects.
   * Each one contains the main panels and each of them has components
   * Layout object
   * {
      "id": null,
      "identity": null,
      "applicationId": null,
      "parentId": null,
      "type": "View",
      "name": "example.ui.minimal",
      "style": null,
      "title": null,
      "contentType": null,
      "content": null,
      "tree": null,
      "components": [],
      "attributes": {},
      "panels": [...panelObjects...],
      "leftPanels": [],
      "rightPanels": [],
      "header": null,
      "footer": null,
      "receivingIdentity": null
    }
    Panel object:
    {
      "id": "main",
      "identity": null,
      "applicationId": null,
      "parentId": null,
      "type": null,
      "name": "main",
      "style": null,
      "title": null,
      "contentType": null,
      "content": null,
      "tree": null,
      "components": [...],
      "attributes": {}
    }
   */
  layout: null,
  windowSide: 'left',
  dialogs: [],
  modalWindow: null,

  /**
   * Engine events
   */
  engineEvents: [],

  klabApp: null,

  /**
   * Log levels
   * Initialized with the start options
   */
  levels: [IN.TYPE_INFO, IN.TYPE_WARNING, IN.TYPE_ERROR],

  showSettings: true,

  /**
   * The notifications params:
   * {
   *   valid-from: date (empty: no from)
   *   valid-to: date (empty: not to)
   *   groups: array of groups (empty: all groups)
   *   apps: array of apps (empty: open in k.Explorer)
   * }
   */
  notificationsParams: null,
  /**
   * If true, when report button is clicked, we ask for report
   * Need to notify that we have unview report too
   */
  reloadViews: [],
  /**
   * Selected documentation view
   */
  documentationView: DOCUMENTATION_VIEWS.REPORT,
  documentationSelected: null,
  documentationCache: new Map(),
  tableFontSize: 12,
  textFontSize: 10,
  viewCoordinates: true,
};
