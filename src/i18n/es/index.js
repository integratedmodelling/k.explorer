export default {
  label: {
    appTitle: 'k.LAB Explorer ES',
    appRunning: 'Ejecutándose sobre Quasar v{version}',
    appClose: 'Cerrar',
    appOK: 'Ok',
    appCancel: 'Cancelar',
    appRetry: 'Reintentar',
    appNext: 'Siguiente',
    appPrevious: 'Precedente',
    klabNoMessage: 'No hay ningún mensaje',
    klabUnknownError: 'Error desconocido',
    klabNoDate: 'No hay fecha',
    klabMessagesToSend: 'Hay un mensaje en la cola', // NO QUERY SEND, ONLY ONE
    modalNoConnection: 'No hay conexi&oacute;n, esperar',
    appFooter: 'k.LAB Explorer - 2018',
    treeTitle: 'Observaciones',
    reconnect: 'Reconectar',
    unknownLabel: 'Desconocido',
    context: 'contesto',
    noContext: '',
    contextShape: 'context shape',
    noObservation: 'No hay observaciones',
    searchPlaceholder: 'Buscar in k.LAB',
    fuzzySearchPlaceholder: 'Buscar',
    askForObservation: 'Pidiendo {urn}',
    noTokenDescription: 'No hay descripción',
    btnContextReset: 'Resetear contexto',
    contextReset: 'Contexto reseteado',
    itemCounter: '{loaded} de {total}',
    logTab: 'Log',
    treeTab: 'Árbol',
    noHistogramData: 'No data',
    noInfoValues: '',
    noScaleReference: '',
    mcMenuScale: 'Espacio y tiempo:',
    mcMenuContext: 'Contexto',
    mcMenuOption: 'Optciones',
    titleOutputFormat: 'Download observación',
    askForOuputFormat: 'Seleccionar un formato',
    titleChangeScale: 'Cambiar escala',
    askForNewScale: 'Seleccionar nueva escala',
    resolutionLabel: 'Valor de la escala',
    unitLabel: 'Unidad de la escala',
    clickToEditScale: 'Click para modificar',
    clickToLock: 'Click para bloquear la escala',
    clickToUnlock: 'Click para desbloquear la escala',
    scaleLocked: '{type} escala bloqueada',
    spaceScale: 'Espacio',
    timeScale: 'Tiempo',
    labelCm: 'Centimetros',
    labelM: 'Metros',
    labelKm: 'Kilometros',
    labelSpatial: 'espacial',
    labelTemporal: 'temporal',
    newContext: 'Nuevo contexto',
    previousContexts: 'Contextos prévios',
    drawCustomContext: 'Dibujar contexto',
    eraseCustomContext: 'Borrar contexto',
    addToCustomContext: 'Añadir shape',
    drawPoint: 'Punto',
    drawLineString: 'Línea',
    drawPolygon: 'Polígono',
    drawCircle: 'Circulo',
    optionShowAll: 'Ver todas',
    optionSaveLocation: 'Recordar posición',
    noNodes: 'No results: is waiting?',
    loadShowData: 'Cargar y visualizar datos',
    interactiveMode: 'Modo interactivo',
    noInputSectionTitle: 'No section title',
    cancelInputRequest: 'Cancelar ejecución',
    resetInputRequest: 'Utilizar defaults',
    submitInputRequest: 'Enviar',
    IDLAlertTitle: 'Cuidado!',
    recontextualization: 'Fijar como contexto',
    rememberDecision: 'Recordar mi elección',
  },
  messages: {
    connectionClosed: 'Conexión cerrada',
    connectionWorking: 'Intentando reconectar',
    connectionUnknown: 'Inicializando...',
    noSpaceAllowedInSearch: 'No está permitido utilizar espacios en la búsqueda',
    noSearchResults: 'No hay resultados',
    noActionForObservation: 'No hay acciones disponibles',
    noTime: 'sin información',
    emptyReport: '<div id="mc-empty-report" class="print-hide">Report vacío</div>',
    noLoadedReport: 'No se ha cargado ningun report',
    copiedToClipboard: 'Copiado',
    customCopyToClipboard: '{what} copiado',
    changeScaleResolutionError: 'La resolución tiene que ser positiva',
    updateScale: 'Actualizada  la escala {type}, nuevo valor {resolution} {unit}',
    invalidGeometry: 'Polígono no válido',
    geolocationWaitingTitle: '¿Habilitar la geolocalización?',
    geolocationWaitingText: '<em>k.Explorer</em> puede detectar tu posición actual para inicializar la vista geográfica.<br />Para hacer eso, <em>hay que autorizar la geolocalización</em>.<br />Esto es solamente por comodidad y<em>no afecta a la operatividad</em>.<br />Your choice will be remembered and can be changed at any time.',
    geolocationErrorPermissionDenied: 'No se ha autorizado la geolocalización',
    geolocationErrorPositionUnavailable: 'No hay información de posicionamiento',
    geolocationErrorTimeout: 'Se ha superado el tiempo de espera para la geolocalización',
    geolocationErrorUnknown: 'Ha habido un error desconocido',
    needHelpTitle: 'How to use',
    needHelp0Text: 'To use this, you need to know various things:',
    needHelp1Text: 'The first',
    needHelp2Text: 'The second',
    needHelp3Text: 'The last',
    unknownSearchObservation: 'Resultado de observaciones previas',
    noLogItems: 'No hay elementos en el log',
    uploadComplete: 'Upload del file {fileName} completado',
    IDLAlertText: 'La selección actual cruza la IDL. Sólo está permitido en caso de dibujar un contexto',
    lastTermAlertText: 'No están permitidos mas tokens',
    parenthesisAlertText: 'Parentesis no balanceadas',
    emptyFreeTextSearch: 'Búsqueda vacía',
    fuzzyModeOff: 'Búsqueda libre desactivada',
    fuzzyModeOn: 'Búsqueda libre activada',
    youHaveGOT: 'Winter is coming',
  },
  tooltips: {
    treePane: 'Ver árbol',
    logPane: 'Ver log',
    resetContext: 'Reset context',
    interruptTask: 'Interrumpir proceso {taskDescription}',
    dataViewer: 'Ver datos',
    reportViewer: 'Ver report',
    noReportTask: 'Cannot view report,\nwait for task end',
    noReportObservation: 'Report no disponibile,\nno hay observaciones',
    noDataflow: 'Dataflow no disponible',
    dataflowViewer: 'Ver data flow',
    provenanceViewer: 'Ver provenance (will be...)',
    undock: 'Desacoplar',
    copyEncodedShapeToClipboard: 'Copiar el contexto en el portapapeles',
    cancelInputRequest: 'Cancelar ejecución',
    resetInputRequest: 'Utilizar default',
    submitInputRequest: 'Enviar',
  },
  errors: {
    connectionError: 'Error de conexión',
    searchTimeout: 'Tiempo de busqueda terminado',
    uploadError: 'Error durante el upload del file {fileName}',
  },
  langName: 'Español',
};
