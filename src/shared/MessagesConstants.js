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
 * Messages sent from k.Explorer to k.LAB
 * @type {Object}
 */
export const OUT = Object.freeze({

  CLASS_USERCONTEXTCHANGE: 'UserContextChange',
  CLASS_SEARCH: 'Search',
  CLASS_OBSERVATIONLIFECYCLE: 'ObservationLifecycle',
  CLASS_TASKLIFECYCLE: 'TaskLifecycle',
  CLASS_USERCONTEXTDEFINITION: 'UserContextDefinition',
  CLASS_USERINTERFACE: 'UserInterface',

  TYPE_REGIONOFINTEREST: 'RegionOfInterest',
  TYPE_FEATUREADDED: 'FeatureAdded',
  TYPE_PERIODOFINTEREST: 'PeriodOfInterest',
  TYPE_SUBMITSEARCH: 'SubmitSearch',
  TYPE_MATCHACTION: 'MatchAction',
  TYPE_REQUESTOBSERVATION: 'RequestObservation',
  TYPE_RESETCONTEXT: 'ResetContext',
  TYPE_RECONTEXTUALIZE: 'Recontextualize',
  TYPE_TASKINTERRUPTED: 'TaskInterrupted',
  TYPE_SCALEDEFINED: 'ScaleDefined',
  TYPE_DATAFLOWNODEDETAIL: 'DataflowNodeDetail',
  TYPE_DATAFLOWNODERATING: 'DataflowNodeRating',
  TYPE_CHANGESETTING: 'ChangeSetting',
  TYPE_USERINPUTPROVIDED: 'UserInputProvided',

  PAYLOAD_CLASS_SPATIALEXTENT: 'SpatialExtent',
  PAYLOAD_CLASS_SPATIALLOCATION: 'SpatialLocation',
  PAYLOAD_CLASS_TEMPORALEXTENT: 'TemporalExtent',
  PAYLOAD_CLASS_SEARCHREQUEST: 'SearchRequest',
  PAYLOAD_CLASS_SEARCHMATCHACTION: 'SearchMatchAction',
  PAYLOAD_CLASS_OBSERVATIONREQUEST: 'ObservationRequest',
  PAYLOAD_CLASS_INTERRUPTTASK: 'InterruptTask',
  PAYLOAD_CLASS_SCALEREFERENCE: 'ScaleReference',
  PAYLOAD_CLASS_DATAFLOWSTATE: 'DataflowState',
  PAYLOAD_CLASS_CONTEXTUALIZATIONREQUEST: 'ContextualizationRequest',
  PAYLOAD_CLASS_SETTINGCHANGEREQUEST: 'SettingChangeRequest',
  PAYLOAD_CLASS_USERINPUTRESPONSE: 'UserInputResponse',
  PAYLOAD_CLASS_EMPTY: 'String',
});

/**
 * Messages sent from k.LAB to k.Explorer
 * @type {Object}
 */
export const IN = Object.freeze({

  CLASS_TASKLIFECYCLE: 'TaskLifecycle',
  CLASS_OBSERVATIONLIFECYCLE: 'ObservationLifecycle',
  CLASS_QUERY: 'Query',
  CLASS_USERCONTEXTCHANGE: 'UserContextChange',
  CLASS_NOTIFICATION: 'Notification',
  CLASS_USERCONTEXTDEFINITION: 'UserContextDefinition',
  CLASS_USERINTERFACE: 'UserInterface',
  CLASS_AUTHORIZATION: 'Authorization',

  TYPE_DATAFLOWCOMPILED: 'DataflowCompiled',
  TYPE_DATAFLOWSTATECHANGED: 'DataflowStateChanged',
  TYPE_DATAFLOWDOCUMENTATION: 'DataflowDocumentation',
  TYPE_NEWOBSERVATION: 'NewObservation',
  TYPE_MODIFIEDOBSERVATION: 'ModifiedObservation',
  TYPE_QUERYRESULT: 'QueryResult',
  TYPE_RESETCONTEXT: 'ResetContext',
  TYPE_SCALEDEFINED: 'ScaleDefined',
  TYPE_USERINPUTREQUESTED: 'UserInputRequested',
  TYPE_USERPROJECTOPENED: 'UserProjectOpened',
  TYPE_SCHEDULINGSTARTED: 'SchedulingStarted',
  TYPE_SCHEDULINGFINISHED: 'SchedulingFinished',
  TYPE_NETWORKSTATUS: 'NetworkStatus',

  TYPE_TASKSTARTED: 'TaskStarted',
  TYPE_TASKFINISHED: 'TaskFinished',
  TYPE_TASKABORTED: 'TaskAborted',
  TYPE_DEBUG: 'Debug',
  TYPE_INFO: 'Info',
  TYPE_WARNING: 'Warning',
  TYPE_ERROR: 'Error',

  PAYLOAD_CLASS_TASKREFERENCE: 'TaskReference',
  PAYLOAD_CLASS_DATAFLOWREFERENCE: 'DataflowReference',
  PAYLOAD_CLASS_DATAFLOWSTATE: 'DataflowState',
  PAYLOAD_CLASS_OBSERVATIONREFERENCE: 'ObservationReference',
  PAYLOAD_CLASS_SEARCHRESPONSE: 'SearchResponse',
  PAYLOAD_CLASS_SCALEREFERENCE: 'ScaleReference',
  PAYLOAD_CLASS_USERINPUTREQUEST: 'UserInputRequest',
  PAYLOAD_CLASS_SCHEDULERNOTIFICATION: 'SchedulerNotification',
  PAYLOAD_CLASS_NETWORKREFERENCE: 'NetworkReference',
  PAYLOAD_CLASS_EMPTY: 'String',
});
