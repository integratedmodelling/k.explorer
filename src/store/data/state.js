/**
 * Data states
 */
export default {
  /**
   * Tree of observation
   */
  tree: [],
  /**
   * If not null, a context was established and saved in this object
   */
  context: null,
  /**
   * Actual leaf selected in tree
   * Managed fro kLabTree component
   */
  leafSelected: null,
  /**
   * Viewer layout using vue-grid-layout
   * {@link https://github.com/jbaysolutions/vue-grid-layout}
   * Each element will be an object like this:
   * {
   *    "x":[x position],
   *    "y":[y position],
   *    "w":[weight in cell],
   *    "h":[will be something],
   *    "index":[index]
   *    "type": element type
   *    "data": element data
   * }
   */
  viewerLayout: [],
  /**
   * Every viewer has an autonumeric id
   */
  lastViewerId: 0,
  /**
   * The session id given from url and used everywhere
   */
  session: null,
};
