/**
 * Messages constants shared between in messages and out messages
 * @type {Object}
 */
export const SHARED = Object.freeze({
  TYPE_DEBUG: 'Debug',
  TYPE_INFO: 'Info',
  TYPE_WARNING: 'Warning',
  TYPE_ERROR: 'Error',

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

  PAYLOAD_CLASS_SPATIALEXTENT: 'SpatialExtent',
  PAYLOAD_CLASS_TEMPORALEXTENT: 'TemporalExtent',
  PAYLOAD_CLASS_SEARCHREQUEST: 'SearchRequest',
  PAYLOAD_CLASS_SEARCHMATCHACTION: 'SearchMatchAction',

  TYPE_REGIONOFINTEREST: 'RegionOfInterest',
  TYPE_PERIODOFINTEREST: 'PeriodOfInterest',
  TYPE_SUBMITSEARCH: 'SubmitSearch',
  TYPE_MATCHACTION: 'MatchAction',
});

/**
 * Messages sended from k.LAB to k.explorer
 * @type {Object}
 */
export const IN = Object.freeze({

  CLASS_TASKLIFECYCLE: 'TaskLifecycle',
  CLASS_OBSERVATIONLIFECYCLE: 'ObservationLifecycle',
  CLASS_QUERY: 'Query',

  PAYLOAD_CLASS_TASKREFERENCE: 'TaskReference',
  PAYLOAD_CLASS_DATAFLOWREFERENCE: 'DataflowReference',
  PAYLOAD_CLASS_OBSERVATIONREFERENCE: 'ObservationReference',
  PAYLOAD_CLASS_SEARCHRESPONSE: 'SearchResponse',

  TYPE_TASKSTARTED: 'TaskStarted',
  TYPE_TASKFINISHED: 'TaskFinished',
  TYPE_TASKABORTED: 'TaskAborted',
  TYPE_INFO: 'Info',

  TYPE_DATAFLOWCOMPILED: 'DataflowCompiled',
  TYPE_NEWOBSERVATION: 'NewObservation',
  TYPE_MODIFIEDOBSERVATION: 'ModifiedObservation',
  TYPE_QUERYRESULT: 'QueryResult',
});
