/**
 * Data states
 */
export default {

  /**
   * Tree of observation
   * Only store simple information:
   * NODE:
   * id: observation id
   * label: the label to show in tree
   * type: one of Constants TREE_XXX
   * children: array of children. Empty on node add
   */
  tree: [],
  /**
   * If not null, a context was established and saved in this object
   */
  context: null,
  /**
   * Actual node selected in tree
   * Managed from kLabTree component
   */
  nodeSelected: null,

  /**
   * Store of all observation data
   * Observation will add a viewerIdx with the id of the assigned viewer
   * OBSERVATION (only remarcables fields):
   * id: id of observation, the same in tree
   * shapeType: shape type
   * encodedShape: WKF shape
   * spatialProjection: spatial projection
   * label: the label to show
   * siblingCount: has siblings?
   * folderId: TODO use this
   * folderLabel: TODO use this
   * children: TODO use this?
   * siblings: TODO use this?
   * viewerIdx: index of the viewer where is shows
   */
  observations: [],

  /**
   * The session id given from url and used everywhere
   */
  session: null,
  /**
   * Old observations for this session
   * Will be an array of object like
   * {
   *  time: [timestamp of saved]
   *  contextId
   *  contextLabel
   * }
   */
  history: [],

  /**
   * if an observation is received without parent,
   * it is stored in this array for later use
   */
  orphans: [],
};
