/**
 * Data states
 */
export default {

  /**
   * Tree of observation
   * Store subdomain of observation and some visual attribute:
   * NODE:
   * @property id: observation id
   * @property label: the label to show in tree
   * @property type: one of Constants TREE_XXX
   * @property viewerIdx: index of viewer,
   * @property header: one of the possible tree node type of slot header: default / folder / main,
   * @property tickable: true is tickable
   * @property disabled: true is disable,
   * @property actions: actions to show on right click,
   * @property folderId: if has a folder, the id of it,
   * @property main: is a main observation (need for style)
   * @property children: array of children. Empty on node add
   * @property siblingCount: siblings count in tree, need for show X of Y (is Y var)
   * @property siblingsLoaded: siblings loaded at this moment
   * @property idx: index of sibling to show X of Y (is X var)
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
   * Contain scale info
   *"properties" : {
    "east" : {
      "type" : "number"
    },
    "west" : {
      "type" : "number"
    },
    "north" : {
      "type" : "number"
    },
    "south" : {
      "type" : "number"
    },
    "start" : {
      "type" : "integer"
    },
    "end" : {
      "type" : "integer"
    },
    "step" : {
      "type" : "integer"
    },
    "spaceScale" : {
      "type" : "integer"
    },
    "timeScale" : {
      "type" : "integer"
    },
    "spaceResolution" : {
      "type" : "number"
    },
    "spaceResolutionDescription" : {
      "type" : "string"
    },
    "spaceResolutionConverted" : {
      "type" : "number"
    },
    "spaceUnit" : {
      "type" : "string"
    },
    "timeResolution" : {
      "type" : "number"
    },
    "timeResolutionDescription" : {
      "type" : "string"
    },
    "timeUnit" : {
      "type" : "string"
    },
    "unlockSpace" : {
      "type" : "boolean"
    },
    "unlockTime" : {
      "type" : "boolean"
    },
    "resolutionDescription" : {
      "type" : "string"
    }
   */
  scaleReference: null,
  scaleLocked: {
    space: false,
    time: false,
  },
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
   * The dataflow of context as JSON ELK object
   */
  dataflow: null,
  /**
   * Used to store the state of task processed
   * { id: [id of observation]; status: [DATAFLOW_STATUS.WAITING|DATAFLOW_STATUS.PROCESSING|DATAFLOW_STATUS.PROCESSED]
   */
  dataflowStatuses: [],

  /**
   * The session id given from url and used everywhere
   */
  session: null,
  /**
   * Contexts for this session
   * Will be an array of object like
   * {
   *  time: [timestamp of saved]
   *  contextId
   *  contextLabel
   * }
   */
  contextsHistory: [],


  /**
   * This variable store an eventual context id that will be loaded on previous reset
   * Getter and Mutation are given to change it atomically
   */
  waitingForReset: null,

  /**
   * if an observation is received without parent but is an observation of actual context,
   * it is stored in this array for later use
   */
  orphans: [],

  /**
   * Search results
   */
  searchResult: null,

  /**
   * When we ask for siblings, we ask for a number that depends of view, but we store here for confort
   * and with a default value given from history
   */
  siblingsToAskFor: 25,
};
