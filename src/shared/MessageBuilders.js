import { djvValidator } from 'plugins/djv';
import moment from 'moment';
import { OUT } from './MessagesConstants';

/**
 * Fuction to create message to Engine with default values
 * Used in real message definitions
 * @param messageClass
 * @param type
 * @param payloadClass
 * @param payload
 * @param session
 * @returns {{messageClass: *, type: *, payloadClass: *, payload: *,
 *          identity: *, timestamp: number, inResponseTo: null}}
 */
function buildMessage(messageClass, type, payloadClass, toCheckPayload, session, inResponseTo = null) {
  const valid = payloadClass !== OUT.PAYLOAD_CLASS_EMPTY ? djvValidator.validateJsonSchema(toCheckPayload, payloadClass) : toCheckPayload;
  return {
    validated: valid,
    body: {
      messageClass,
      type,
      payloadClass,
      payload: toCheckPayload,
      identity: session,
      timestamp: moment().valueOf(),
      inResponseTo,
    },
  };
}

export const PAYLOAD_BUILDERS = {

  /**
   * Transform ol extent [west, south, east, north] coord array
   * to SpacialExtent object of k.lab with named properties
   * @param olExtent open layer extent
   * @returns {{south, west, north, east}} k.LAB SpacialExtent object
   */
  SPATIAL_EXTENT: ([west, south, east, north]) => ({
    south,
    // west: `${west}w`,
    west,
    north,
    east,
  }),
};

/**
 * Builders for real messages
 */
export const MESSAGES_BUILDERS = {
  /**
   * Region of interest
   * Type: output
   * @param olExtent extent in open layer style
   * @param session session
   * @constructor
   */
  REGION_OF_INTEREST: (olExtent, session) => buildMessage(
    OUT.CLASS_USERCONTEXTCHANGE,
    OUT.TYPE_REGIONOFINTEREST,
    OUT.PAYLOAD_CLASS_SPATIALEXTENT,
    PAYLOAD_BUILDERS.SPATIAL_EXTENT(olExtent),
    session,
  ),

  SEARCH_REQUEST: ({
    queryString,
    searchMode,
    requestId,
    contextId = null,
    matchTypes = null,
    cancelSearch = false,
    defaultResults = false,
    maxResults,
  }, session) => buildMessage(
    OUT.CLASS_SEARCH,
    OUT.TYPE_SUBMITSEARCH,
    OUT.PAYLOAD_CLASS_SEARCHREQUEST,
    {
      ...(contextId !== null && { contextId }),
      ...(matchTypes !== null && { matchTypes }),
      queryString,
      searchMode,
      requestId,
      cancelSearch,
      defaultResults,
      maxResults,
    },
    session,
  ),

  SEARCH_MATCH: ({
    contextId,
    matchId,
    matchIndex,
    added,
  }, session) => buildMessage(
    OUT.CLASS_SEARCH,
    OUT.TYPE_MATCHACTION,
    OUT.PAYLOAD_CLASS_SEARCHMATCHACTION,
    {
      contextId,
      matchId,
      matchIndex,
      added,
    },
    session,
  ),

  OBSERVATION_REQUEST: ({
    urn,
    contextId,
    searchContextId = null,
    estimate = false,
    estimatedCost = 0,
  }, session) => buildMessage(
    OUT.CLASS_OBSERVATIONLIFECYCLE,
    OUT.TYPE_REQUESTOBSERVATION,
    OUT.PAYLOAD_CLASS_OBSERVATIONREQUEST,
    {
      urn,
      ...(contextId !== null && { contextId }),
      ...(searchContextId !== null && { searchContextId }),
      estimate,
      estimatedCost,
    },
    session,
  ),

  RESET_CONTEXT: session => buildMessage(
    OUT.CLASS_USERCONTEXTCHANGE,
    OUT.TYPE_RESETCONTEXT,
    OUT.PAYLOAD_CLASS_EMPTY,
    '',
    session,
  ),

  CONTEXTUALIZATION_REQUEST: ({ contextUrn, contextId, parentContext, contextQuery }, session) => buildMessage(
    OUT.CLASS_OBSERVATIONLIFECYCLE,
    OUT.TYPE_RECONTEXTUALIZE,
    OUT.PAYLOAD_CLASS_CONTEXTUALIZATIONREQUEST,
    {
      ...(typeof contextUrn !== 'undefined' && { contextUrn }),
      ...(typeof contextId !== 'undefined' && { contextId }),
      ...(typeof parentContext !== 'undefined' && { parentContext }),
      ...(typeof contextQuery !== 'undefined' && { contextQuery }),
    },
    session,
  ),

  TASK_INTERRUPTED: ({ taskId, forceInterruption = true }, session) => buildMessage(
    OUT.CLASS_TASKLIFECYCLE,
    OUT.TYPE_TASKINTERRUPTED,
    OUT.PAYLOAD_CLASS_INTERRUPTTASK,
    {
      taskId,
      forceInterruption,
    },
    session,
  ),

  SCALE_REFERENCE: ({
    scaleReference,
    spaceResolution,
    spaceUnit,
    timeResolutionMultiplier,
    timeUnit,
    start,
    end,
    timeResolutionDescription = '',
    contextId = '',
    shape = '',
    timeType = '',
    timeGeometry = '',
    spaceGeometry = '',
  }, session) => buildMessage(
    OUT.CLASS_USERCONTEXTDEFINITION,
    OUT.TYPE_SCALEDEFINED,
    OUT.PAYLOAD_CLASS_SCALEREFERENCE,
    {
      ...scaleReference,
      name: '',
      contextId,
      shape,
      timeType,
      timeGeometry,
      spaceGeometry,
      timeResolutionDescription: timeResolutionDescription === null ? '' : timeResolutionDescription,
      ...(typeof spaceResolution !== 'undefined' && { spaceResolution }),
      ...(typeof spaceUnit !== 'undefined' && { spaceUnit }),
      ...(typeof timeResolutionMultiplier !== 'undefined' && { timeResolutionMultiplier }),
      ...(typeof timeUnit !== 'undefined' && { timeUnit }),
      ...(typeof start !== 'undefined' && { start }),
      ...(typeof end !== 'undefined' && { end }),
      // spaceResolutionConverted: null,
    },
    session,
  ),

  SPATIAL_LOCATION: ({ wktShape, contextId = null }, session) => buildMessage(
    OUT.CLASS_USERCONTEXTCHANGE,
    OUT.TYPE_FEATUREADDED,
    OUT.PAYLOAD_CLASS_SPATIALLOCATION,
    {
      easting: Number.MIN_VALUE,
      northing: Number.MIN_VALUE,
      wktShape,
      ...(contextId !== null && { contextId }),
    },
    session,
  ),

  DATAFLOW_NODE_DETAILS: ({ nodeId, contextId }, session) => buildMessage(
    OUT.CLASS_TASKLIFECYCLE,
    OUT.TYPE_DATAFLOWNODEDETAIL,
    OUT.PAYLOAD_CLASS_DATAFLOWSTATE,
    {
      nodeId,
      monitorable: false,
      rating: -1,
      progress: 0,
      contextId,
    },
    session,
  ),

  DATAFLOW_NODE_RATING: ({ nodeId, contextId, rating, comment = null }, session) => buildMessage(
    OUT.CLASS_TASKLIFECYCLE,
    OUT.TYPE_DATAFLOWNODERATING,
    OUT.PAYLOAD_CLASS_DATAFLOWSTATE,
    {
      nodeId,
      monitorable: false,
      progress: 0,
      rating,
      ...(comment !== null && { comment }),
      contextId,
    },
    session,
  ),

  SETTING_CHANGE_REQUEST: ({ setting, value }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_CHANGESETTING,
    OUT.PAYLOAD_CLASS_SETTINGCHANGEREQUEST,
    {
      setting,
      previousValue: (!value).toString(),
      newValue: value.toString(),
    },
    session,
  ),

  USER_INPUT_RESPONSE: ({ messageId, requestId, cancelRun = false, values = {} }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_USERINPUTPROVIDED,
    OUT.PAYLOAD_CLASS_USERINPUTRESPONSE,
    {
      requestId,
      cancelRun,
      values,
    },
    session,
    messageId,
  ),

  WATCH_REQUEST: ({ active, eventType, observationId, rootContextId }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_WATCHOBSERVATION,
    OUT.PAYLOAD_CLASS_WATCHREQUEST,
    {
      active,
      observationId,
      rootContextId,
      ...(eventType && { eventType }),
    },
    session,
  ),

  WATCH_ENGINE_EVENT: ({ active, eventType }, session) => buildMessage(
    OUT.CLASS_NOTIFICATION,
    OUT.TYPE_ENGINEEVENT,
    OUT.PAYLOAD_CLASS_WATCHREQUEST,
    {
      active,
      eventType,
    },
    session,
  ),

  VIEW_ACTION: ({
    component,
    componentTag = null,
    applicationId = null,
    booleanValue = null,
    doubleValue = null,
    intValue = null,
    stringValue = null,
    listValue = [],
    dateValue = null,
    data = null,
  }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_VIEWACTION,
    OUT.PAYLOAD_CLASS_VIEWACTION,
    {
      component,
      componentTag,
      applicationId,
      booleanValue,
      doubleValue,
      intValue,
      stringValue,
      listValue,
      dateValue,
      data,
    },
    session,
  ),

  MENU_ACTION: ({
    identity,
    applicationId,
    menuId,
  }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_VIEWACTION,
    OUT.PAYLOAD_CLASS_MENUACTION,
    {
      identity,
      applicationId,
      menuId,
    },
    session,
  ),

  RUN_APPLICATION: ({ applicationId, test = false, stop = false }, session) => buildMessage(
    OUT.CLASS_RUN,
    OUT.TYPE_RUNAPP,
    OUT.PAYLOAD_CLASS_LOADAPPLICATIONREQUEST,
    {
      // scriptUrl: null,
      behavior: applicationId,
      test,
      stop,
      parameters: {},
    },
    session,
  ),

  CONSOLE_CREATED: ({ consoleId, consoleType }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_CONSOLECREATED,
    OUT.PAYLOAD_CLASS_CONSOLENOTIFICATION,
    {
      // scriptUrl: null,
      consoleId,
      consoleType,
    },
    session,
  ),
  CONSOLE_CLOSED: ({ consoleId, consoleType }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_CONSOLECLOSED,
    OUT.PAYLOAD_CLASS_CONSOLENOTIFICATION,
    {
      // scriptUrl: null,
      consoleId,
      consoleType,
    },
    session,
  ),
  COMMAND_REQUEST: ({ consoleId, consoleType, commandId, payload }, session) => buildMessage(
    OUT.CLASS_USERINTERFACE,
    OUT.TYPE_COMMANDREQUEST,
    OUT.PAYLOAD_CLASS_CONSOLENOTIFICATION,
    {
      // scriptUrl: null,
      consoleId,
      consoleType,
      commandId,
      payload,
    },
    session,
  ),
};
