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
   * The session id given from url and used everywhere
   */
  session: null,
  /**
   * Old observations for this session
   * Will be an array of object like
   * {
   *  time: [timestamp of saved]
   *  context
   *  tree
   * }
   */
  history: [],
};
