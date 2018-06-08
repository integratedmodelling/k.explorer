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
  const valid = djvValidator.validateJsonSchema(toCheckPayload, payloadClass);
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
};
