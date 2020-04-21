import Stack from 'classes/Stack';
import { CONSTANTS } from 'shared/Constants';
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
   * @property observable: the observable label
   * @property type: one of GEOMETRY_CONSTANTS.TYPE_
   * @property viewerIdx: index of viewer,
   * @property viewerType: type of viewer, one of VIEWERS constants,
   * @property children[]: array of children (loaded)
   * @property childrenCount: total of children
   * @property siblingCount: total of siblings
   * @property parentArtifactId: the parent artifact id
   * @property tickable: true is tickable
   * @property disabled: true is disable,
   * @property empty: true if node is empty,
   * @property actions: actions to show on right click,
   * @property header: one of the possible tree node type of slot header: default / folder / main,
   * @property parentId: if has a parent, the id of it,
   * @property parentArtifactId: if has a parent artifact, the id of it,
   * @property userNode: is node added to the user tree (need to filter)
   * @property exportFormats: the export formats
   * @property rootContextId: the root context id (needed to link the observation to the seame context,
   * @property observationType: observation type,
   * @property idx: index of children to show X of Y (is X var)
   */

  tree: [],

  /**
   * User tree of observation, a subset of all the observations.
   * This tree is filled with the observations with main: true, and then with all the observations
   * that the user can drop to it or remove from it
   * The content of node is the same of the node in the normal tree:
   * @property id: observation id
   * @property label: the label to show in tree
   * @property observable: the observable label
   * @property type: one of GEOMETRY_CONSTANTS.TYPE_
   * @property viewerIdx: index of viewer,
   * @property viewerType: type of viewer, one of VIEWERS constants,
   * @property children[]: array of children (loaded)
   * @property childrenCount: total of children
   * @property siblingCount: total of siblings
   * @property parentArtifactId: the parent artifact id
   * @property tickable: true is tickable
   * @property disabled: true is disable,
   * @property empty: true if node is empty,
   * @property actions: actions to show on right click,
   * @property header: one of the possible tree node type of slot header: default / folder / main,
   * @property parentId: if has a parent, the id of it,
   * @property parentArtifactId: if has a parent artifact, the id of it,
   * @property userNode: is node added to the user tree (need to filter)
   * @property exportFormats: the export formats
   * @property rootContextId: the root context id (needed to link the observation to the seame context,
   * @property observationType: observation type,
   * @property idx: index of children to show X of Y (is X var)
   */
  userTree: [],

  /**
   * Last elements in folder that need more children
   * LAST:
   * @property parentId: the parent id
   * @property observationId: the observation,
   * @property offsetToAdd: offset of element (last index),
   * @property total: real total we need,
   */
  lasts: [],

  /**
   * The stack of contexts
   *
   */
  contexts: new Stack(),
  contextCustomLabel: null,

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
    "timeResolutionMultiplier" : {
      "type" : "number"
    },
    "timeUnit" : {
      "type" : "string",
      "enum" : [ "MILLENNIUM", "CENTURY", "DECADE", "YEAR", "MONTH", "WEEK", "DAY", "HOUR", "MINUTE", "SECOND", "MILLISECOND" ]
    },
    "timeResolutionDescription" : {
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
   * Ir a context is setted, we can ask for a "rescale".
   * The new scale is stored here until refresh and confirmation
   */
  nextScale: null,
  /**
   * Store of all observation data
   Observatio object: {
    "shapeType",
   "encodedShape"
   "spatialProjection"
   "id"
   "rootContextId"
   "label"
   "observable"
   "valueType"
   "observationType"
   "semantics": [],
   "geometryTypes": [],
   "literalValue"
   "traits": [],
   "metadata": { ... },
   "taskId"
   "empty"
   "style"
   "main"
   "primary"
   "dataSummary"
   "exportFormats": [
   {
     "label"
     "value"
     "adapter
     "extension"
   }
   ],
   "scaleReference"
   "childrenCount"
   "roles": [],
   "observableType"
   "parentId"
   "children"
   "actions": [
   {
     "actionLabel"
     "actionId"
     "downloadUrl"
     "downloadFileExtension"
     "enabled"
     "separator"
     "submenu": []
   }
   ],
   "structure": [],
   "contextTime"
   "creationTime"
   "urn"
   "valueCount"
   "previouslyNotified"
   "lastUpdate"
   "notified"
   "viewerIdx"
   "visible"
   "top"
   "zIndex"
   "layerOpacity"
   "colormap"
   */
  observations: [],

  /**
   * Modification Events
   * {
   *  "id": modified observation id,
   *  "contextId",
   *  "timestamp": in ms,
   *  "newAttributes": value | null,
   *  "newScale": value | null,
   *  "newName": value | null,
   *  "newSemantics": value | null,
   *  "newSize": integer,
   *  "newMainStatus": true | false,
   *  "newValues": true | false,
   *  "terminated": true | false (is the observation terminated?)
   * }
   */
  timeEvents: [],
  modificationsTask: null,

  /**
   * Indicate the selected timestamp, need to retrieve the correct observations layer
   */
  timestamp: -1,

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
   * Info about the selected dataflow element
   * Object: {
   *  elementId
   *  elementType
   *  html
   * }
   */
  dataflowInfo: null,

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
   * When we ask for children, we ask for a number that depends of view, but we store here for confort
   * and with a default value given from history
   */
  childrenToAskFor: CONSTANTS.CHILDREN_TO_ASK_FOR,

  /**
   * Interactive mode on / off
   */
  interactiveMode: false,

  /**
   * indicate if we are crossing IDL, so we cannot make observation
   */
  crossingIDL: false,

  /**
   * Contain the capabilities returned from engine
   */
  capabilities: {},

  /**
   * Version
   */
  packageVersion: process.env.PACKAGE_VERSION || '0',
  packageBuild: process.env.PACKAGE_BUILD || '0',
};
