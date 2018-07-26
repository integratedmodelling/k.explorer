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
   * Array with actions ocurred from app start
   * Using an array of MAX_LENGTH
   * Log action object structure is:
   */
  logActions: [],

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
  contextLayer: null,

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
   * In firefox, first char is lost, so store it
   */
  searchFirstChar: null,

  /**
   * indicate if search input has focused
   */
  searchFocus: false,
};
