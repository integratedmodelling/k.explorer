/**
 * State of view
 */
import Constants, { LEFTMENU_VISIBILITY } from 'shared/Constants';

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

  /**
   * The content of left menu. Is decided using the mainViewer leftMenuContent or punctual action (like open log)
   * Will be a string with the component name
   */
  leftMenuContent: null,
  /**
   * The state of left menu. Will be one of LEFTMENU_VISIBILITY constants
   */
  leftMenuState: LEFTMENU_VISIBILITY.LEFTMENU_HIDDEN,

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
  spinner: Constants.SPINNER_STOPPED,
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
   * If true, when report button is clicked, we ask for report
   * Need to notify that we have unview report too
   */
  reloadReport: false,

  /**
   * If true, when dataflow button is clicked, if dataflow not exists we ask for it.
   * Need to notify that we have unview dataflow too
   */
  reloadDataflow: false,


  /**
   * More info content
   */
  observationInfo: null,
  mapSelection: Constants.EMPTY_MAP_SELECTION,

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
  showNotified: null,
  saveLocation: true,

  modalMode: false,

  inputRequests: [],
};
