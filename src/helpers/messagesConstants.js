import { helpers } from './helpers';

export const MESSAGE_TYPES = Object.freeze({
  /*
  SPATIAL_EXTENT: {
    east: null,
    west: null,
    north: null,
    south: null,
  },
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
  REGION_OF_INTEREST: (olExtent, session) => ({
    messageClass: 'UserContextChange',
    type: 'RegionOfInterest',
    payloadClass: 'SpatialExtent',
    payload: helpers.toKlabExtent(olExtent),
    identity: session,
    inResponseTo: null,
  }),
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
});

export const OTHER = {};
