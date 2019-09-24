export default {
  label: {
    appTitle: 'k.LAB Explorer EN',
    appRunning: 'Running on Quasar v{version}',
    appClose: 'Close',
    appOK: 'Ok',
    appCancel: 'Cancel',
    appRetry: 'Retry',
    appNext: 'Next',
    appPrevious: 'Previous',
    appWarning: 'Warning',
    klabNoMessage: 'No message',
    klabUnknownError: 'Unknown error',
    klabNoDate: 'No date',
    klabMessagesToSend: 'There are one message in queue',
    modalNoConnection: 'No connection, please wait',
    appFooter: 'k.LAB Explorer - 2018',
    treeTitle: 'Observation',
    reconnect: 'Reconnect',
    unknownLabel: 'Unknown',
    context: 'context',
    noContext: '',
    noContextPlaceholder: '',
    contextShape: 'context shape',
    noObservation: 'No observations available',
    searchPlaceholder: 'Search knowledge',
    fuzzySearchPlaceholder: 'Free search',
    askForObservation: 'Observing {urn}',
    noTokenDescription: 'No description available',
    btnContextReset: 'Reset context',
    contextReset: 'Context reset',
    itemCounter: '{loaded} of {total}',
    logTab: 'Log',
    treeTab: 'Tree',
    noHistogramData: 'No data',
    noInfoValues: '',
    noScaleReference: '',
    mcMenuScale: 'Space & time:',
    mcMenuContext: 'Context',
    mcMenuOption: 'Options',
    mcMenuSettings: 'Settings',
    titleOutputFormat: 'Download observation',
    askForOuputFormat: 'Select format',
    titleChangeScale: 'Change {type} scale',
    askForNewScale: 'Select new scale',
    resolutionLabel: 'Resolution value',
    unitLabel: 'Unit value',
    clickToEditScale: 'Click to edit',
    clickToLock: 'Click to lock scale',
    clickToUnlock: 'Click to unlock scale',
    scaleLocked: '{type} scale locked',
    spaceScale: 'Space',
    timeScale: 'Time',
    labelCm: 'Centimeters',
    labelM: 'Meters',
    labelKm: 'Kilometers',
    labelSpatial: 'spatial',
    labelTemporal: 'temporal',
    newContext: 'New context',
    previousContexts: 'Previous contexts',
    drawCustomContext: 'Draw context',
    eraseCustomContext: 'Erase custom context',
    addToCustomContext: 'Add shape',
    drawPoint: 'Point',
    drawLineString: 'Line',
    drawPolygon: 'Polygon',
    drawCircle: 'Circle',
    optionShowAll: 'Show all',
    optionSaveLocation: 'Remember location',
    saveDockedStatus: 'Remember docked status',
    noNodes: 'No observations',
    loadShowData: 'Load and show data',
    interactiveMode: 'Interactive mode',
    noInputSectionTitle: 'No section title',
    cancelInputRequest: 'Cancel run',
    resetInputRequest: 'Use defaults',
    submitInputRequest: 'Submit',
    IDLAlertTitle: 'Warning!',
    recontextualization: 'Set as context',
    rememberDecision: 'Don\'t show again',
    titleCommentResource: 'Comment on resource',
    sendComment: 'Send',
  },
  messages: {
    connectionClosed: 'Connection closed',
    connectionWorking: 'Trying to reconnect',
    connectionUnknown: 'Starting...',
    noSpaceAllowedInSearch: 'Spaces cannot be used in the search box',
    noSearchResults: 'No search results',
    noActionForObservation: 'No actions available',
    noTime: 'no time',
    emptyReport: '<div id="mc-empty-report" class="print-hide">Empty report</div>',
    noLoadedReport: 'No report loaded',
    copiedToClipboard: 'Copied to clipboard',
    customCopyToClipboard: '{what} copied to clipboard',
    changeScaleResolutionError: 'Resolution must be positive',
    updateScale: 'Updated {type} scale, new value: {resolution} {unit}',
    updateNextScale: 'New {type} scale have been stored, press refresh to update',
    invalidGeometry: 'Polygon is not valid',
    spatialLocationSent: 'Spatial location sent',
    geolocationWaitingTitle: 'Enable geolocation?',
    geolocationWaitingText: '<em>k.Explorer</em> can detect your current location to initialize the geographical viewer.<br />In order to do so, <em>you need to authorize geolocation</em>.<br />This is merely for your convenience and <em>does not affect operation</em>.<br />Your choice will be remembered and can be changed at any time.',
    geolocationErrorPermissionDenied: 'Geolocation has not been authorized',
    geolocationErrorPositionUnavailable: 'Location information is unavailable',
    geolocationErrorTimeout: 'A request to get the user location timed out',
    geolocationErrorUnknown: 'An unknown error occurred',
    unknownSearchObservation: 'Previous observations results',
    noLogItems: 'Empty log',
    uploadComplete: 'Upload of file {fileName} complete',
    IDLAlertText: 'Actual view crossing the International Date Line. A drawn context is needed',
    lastTermAlertText: 'No more terms allowed',
    parenthesisAlertText: 'You have open parenthesis',
    emptyFreeTextSearch: 'Empty search is not allowed',
    fuzzyModeOff: 'Free search off',
    fuzzyModeOn: 'Free search on',
    treeNoResult: 'No results',
    treeNoNodes: 'No data',
    treeNoResultUser: 'No main observations',
    treeNoResultUserWaiting: 'Computing...',
    treeNoResultNoUser: 'No observations',
    treeNoMainSummary: 'Other observations',
    thankComment: 'Comment has been sent',
    confirmRescaleContext: 'The context will be recreate with new resolution.\nAre you sure?',
    loadingChildren: 'Loading children...',
    availableInFuture: 'This feature will be available soon',
    youHaveGOT: 'Winter is coming',
  },
  tooltips: {
    treePane: 'View tree',
    showLogPane: 'View log',
    hideLogPane: 'Hide log',
    resetContext: 'Reset context',
    interruptTask: 'Interrupt task {taskDescription}',
    dataViewer: 'View data',
    reportViewer: 'View report',
    scenarios: 'Scenarios',
    observers: 'Observers',
    noReportTask: 'Cannot view report,\nwait for task end',
    noReportObservation: 'Report not available,\nno observations',
    noDataflow: 'Dataflow not availble',
    noDataflowInfo: 'No details',
    dataflowViewer: 'View data flow',
    provenanceViewer: 'View provenance (will be...)',
    undock: 'Undock',
    copyEncodedShapeToClipboard: 'Copy context shape to clipboard',
    cancelInputRequest: 'Cancel run',
    resetInputRequest: 'Use default values',
    submitInputRequest: 'Submit values',
    displayMainTree: 'Display main tree',
    hideMainTree: 'Hide main tree',
    rateIt: 'Rate resource',
    commentIt: 'Comment on resource',
    refreshScale: 'Refresh context with new scale(s)',
    clickToEdit: 'Click to edit {type} scale',
  },
  errors: {
    connectionError: 'Connection error',
    searchTimeout: 'Search timeout',
    uploadError: 'Upload error for the file {fileName}',
  },
  langName: 'English',
};
