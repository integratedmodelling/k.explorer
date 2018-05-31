import { helpers } from './helpers';
import moment from 'moment';

export function buildMessage(messageClass, type, payloadClass, payload, session) {
  return {
    messageClass,
    type,
    payloadClass,
    payload: helpers.validateJsonSchema(payload, payloadClass),
    identity: session,
    timestamp: moment().valueOf(),
    inResponseTo: null,
  };
}

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

export const MESSAGES_BUILDERS = {
  REGION_OF_INTEREST: (olExtent, session) => buildMessage(
    MESSAGES_CONSTANTS.CLASS_USERCONTEXTCHANGE,
    MESSAGES_CONSTANTS.TYPE_REGIONOFINTEREST,
    MESSAGES_CONSTANTS.PAYLOAD_CLASS_SPATIALEXTENT,
    helpers.toKlabExtent(olExtent),
    session,
  ),

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
