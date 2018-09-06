/**
 * Data states
 */
export default {

  /**
   * Tree of observation
   * Store subdomain of observation and some visual attribute:
   * NODE:
   * id: observation id
   * label: the label to show in tree
   * type: one of Constants TREE_XXX
   * viewerIdx: index of viewer,
   * header: one of the possible tree node type of slot header: default / folder / main,
   * tickable: true is tickable
   * disabled: true is disable,
   * actions: actions to show on right click,
   * folderId: if has a folder, the id of it,
   * main: is a main observation (need for style)
   * children: array of children. Empty on node add
   * siblingCount: siblings count in tree, need for show X of Y (is Y var)
   * siblingsLoaded: siblings loaded at this moment
   * idx: index of sibling to show X of Y (is X var)
   */
  tree: [],

  /**
   * Last elements in folder that need more siblings
   * LAST:
   * @property folderId: the folder id
   * @property observationId: the observation,
   * @property offset: offset of element (last index),
   * @property total: real total we need,
   */
  lasts: [],
  /**
   * If not null, a context was established and saved in this object
   */
  context: null,

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
   * folderId:
   * folderLabel:
   * children:
   * siblings:
   * viewerIdx: index of the viewer where is shows
   * TODO update comment
   */
  observations: [],

  /**
   * Redundant array to find observation by task id. tasks.[taskId] = [observations]
   * IMPORTANT: observations are stored as references, so if something change, everything change!
   */
  tasks: [],

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

  /**
   * Search results
   */
  searchResult: null,
};
