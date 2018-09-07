/**
 * State of view
 */
import Constants from 'shared/Constants';

export default {
  mainWin: {
    /**
     * Indicate if palette is visible
     */
    paletteVisible: true,
  },
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
   * Active viewers
   */
  viewers: [],

  /**
   * Every viewer has an autonumeric id
   */
  lastViewerId: 0,

  /**
   * Layer with the context shape shared between viewers
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
};
