/**
 * Messages constants shared between in messages and out messages
 * @type {Object}
 */
export const SHARED = Object.freeze({
  SEARCH_TYPES: [
    { enumId: 'CONCEPT', name: 'CONCEPT', color: '#ff0000' },
    { enumId: 'OPERATOR', name: 'OPERATOR', color: '#ffff00' },
    { enumId: 'OBSERVATION', name: 'OBSERVATION', color: '#ff00ff' },
    { enumId: 'MODEL', name: 'MODEL', color: '#0000ff' },
  ],
});

/**
 * Messages sended from k.explorer to k.LAB
 * @type {Object}
 */
export const OUT = Object.freeze({

  CLASS_USERCONTEXTCHANGE: 'UserContextChange',
  CLASS_SEARCH: 'Search',
  CLASS_OBSERVATIONLIFECYCLE: 'ObservationLifecycle',

  PAYLOAD_CLASS_SPATIALEXTENT: 'SpatialExtent',
  PAYLOAD_CLASS_TEMPORALEXTENT: 'TemporalExtent',
  PAYLOAD_CLASS_SEARCHREQUEST: 'SearchRequest',
  PAYLOAD_CLASS_SEARCHMATCHACTION: 'SearchMatchAction',
  PAYLOAD_CLASS_OBSERVATIONREQUEST: 'ObservationRequest',
  PAYLOAD_CLASS_EMPTY: 'String',

  TYPE_REGIONOFINTEREST: 'RegionOfInterest',
  TYPE_PERIODOFINTEREST: 'PeriodOfInterest',
  TYPE_SUBMITSEARCH: 'SubmitSearch',
  TYPE_MATCHACTION: 'MatchAction',
  TYPE_REQUESTOBSERVATION: 'RequestObservation',
  TYPE_RESETCONTEXT: 'ResetContext',
});

/**
 * Messages sended from k.LAB to k.explorer
 * @type {Object}
 */
export const IN = Object.freeze({

  CLASS_TASKLIFECYCLE: 'TaskLifecycle',
  CLASS_OBSERVATIONLIFECYCLE: 'ObservationLifecycle',
  CLASS_QUERY: 'Query',
  CLASS_USERCONTEXTCHANGE: 'UserContextChange',
  CLASS_NOTIFICATION: 'Notification',

  PAYLOAD_CLASS_TASKREFERENCE: 'TaskReference',
  PAYLOAD_CLASS_DATAFLOWREFERENCE: 'DataflowReference',
  PAYLOAD_CLASS_OBSERVATIONREFERENCE: 'ObservationReference',
  PAYLOAD_CLASS_SEARCHRESPONSE: 'SearchResponse',
  PAYLOAD_CLASS_EMPTY: 'String',

  TYPE_TASKSTARTED: 'TaskStarted',
  TYPE_TASKFINISHED: 'TaskFinished',
  TYPE_TASKABORTED: 'TaskAborted',
  TYPE_DEBUG: 'Debug',
  TYPE_INFO: 'Info',
  TYPE_WARNING: 'Warning',
  TYPE_ERROR: 'Error',

  TYPE_DATAFLOWCOMPILED: 'DataflowCompiled',
  TYPE_NEWOBSERVATION: 'NewObservation',
  TYPE_MODIFIEDOBSERVATION: 'ModifiedObservation',
  TYPE_QUERYRESULT: 'QueryResult',
  TYPE_RESETCONTEXT: 'ResetContext',
});
