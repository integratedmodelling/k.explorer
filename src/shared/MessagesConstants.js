import { Helpers } from './Helpers';
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
export function buildMessage(messageClass, type, payloadClass, toCheckPayload, session) {
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

/**
 * Messages constants (classes, payloadClasses, etc)
 * @type {Object}
 */
export const MESSAGES_CONSTANTS = Object.freeze({

  CLASS_USERCONTEXTCHANGE: 'UserContextChange',

  PAYLOAD_CLASS_SPATIALEXTENT: 'SpatialExtent',
  PAYLOAD_CLASS_TEMPORALEXTENT: 'TemporalExtent',

  TYPE_REGIONOFINTEREST: 'RegionOfInterest',
  TYPE_PERIODOFINTEREST: 'PeriodOfInterest',

  TYPE_DEBUG: 'Debug',
  TYPE_INFO: 'Info',
  TYPE_WARNING: 'Warning',
  TYPE_ERROR: 'Error',
});

/**
 * Builders for real messages
 */
export const MESSAGES_BUILDERS = {
  /**
   * Region of interest
   * @param olExtent extent in open layer style
   * @param session session
   * @constructor
   */
  REGION_OF_INTEREST: (olExtent, session) => buildMessage(
    MESSAGES_CONSTANTS.CLASS_USERCONTEXTCHANGE,
    MESSAGES_CONSTANTS.TYPE_REGIONOFINTEREST,
    MESSAGES_CONSTANTS.PAYLOAD_CLASS_SPATIALEXTENT,
    Helpers.toKlabExtent(olExtent),
    session,
  ),

  /**
   * Period of interest
   */
  PERIOD_OF_INTEREST: {
    messageClass: 'UserContextChange',
    type: 'PeriodOfInterest',
    payloadClass: 'TemporalExtent',
  },

  DEBUG: {
    messageClass: 'Message',
    type: 'Debug',
    payloadClass: '',
  },

  ERROR: {
    messageClass: 'Message',
    type: 'Error',
    payloadClass: '',
  },
  WARNING: {
    messageClass: 'Message',
    type: 'Warning',
    payloadClass: '',
  },
  INFO: {
    messageClass: 'Message',
    type: 'Info',
    payloadClass: '',
  },
};
