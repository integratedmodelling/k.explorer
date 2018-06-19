/**
 * State of view
 */
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
  viewersLayout: [],

  /**
   * Every viewer has an autonumeric id
   */
  lastViewerId: 0,

  /**
   * Layer with the context shape shared between viewers
   */
  contextLayer: null,
};
