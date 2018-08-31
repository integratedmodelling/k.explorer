import { OUT } from './MessagesConstants';
import { djvValidator } from 'plugins/djv';
import moment from 'moment';

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
function buildMessage(messageClass, type, payloadClass, toCheckPayload, session) {
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
      inResponseTo: null,
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

  SEARCH_REQUEST: ({
    queryString,
    requestId,
    contextId = null,
    matchTypes = null,
  }) => ({
    ...(contextId !== null && { contextId }),
    ...(matchTypes !== null && { matchTypes }),
    queryString,
    requestId,
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
    requestId,
    contextId = null,
    matchTypes = null,
    cancelSearch = false,
    maxResults,
    session,
  }) => buildMessage(
    OUT.CLASS_SEARCH,
    OUT.TYPE_SUBMITSEARCH,
    OUT.PAYLOAD_CLASS_SEARCHREQUEST,
    {
      ...(contextId !== null && { contextId }),
      ...(matchTypes !== null && { matchTypes }),
      queryString,
      requestId,
      cancelSearch,
      maxResults,
    },
    session,
  ),

  OBSERVATION_REQUEST: ({
    urn,
    contextId,
    searchContextId = null,
    session,
  }) => buildMessage(
    OUT.CLASS_OBSERVATIONLIFECYCLE,
    OUT.TYPE_REQUESTOBSERVATION,
    OUT.PAYLOAD_CLASS_OBSERVATIONREQUEST,
    {
      urn,
      ...(contextId !== null && { contextId }),
      ...(searchContextId !== null && { searchContextId }),
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
};
