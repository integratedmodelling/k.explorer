import { eventBus } from 'plugins/initApp';
import { IN } from 'shared/MessagesConstants';
import { CONNECTION_CONSTANTS, CUSTOM_EVENTS, DATAFLOW_STATUS, FAKE_TEXTS, MESSAGE_TYPES } from 'shared/Constants';

function addToKexplorerLog(dispatch, type, message, attach, important = false) {
  dispatch('view/addToKexplorerLog', { type, payload: { message, attach }, important }, { root: true });
}

const PARSERS = {
  [IN.TYPE_TASKSTARTED]: ({ payload: task }, { dispatch }) => {
    dispatch('stomp/taskStart', task, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, `Started task with id ${task.id}`);
    dispatch('view/addToStatusTexts', { id: task.id, text: task.description }, { root: true });
  },
  [IN.TYPE_TASKABORTED]: ({ payload: task }, { dispatch }) => {
    dispatch('stomp/taskAbort', task, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_ERROR, `Aborted task with id ${task.id}`, task);
    dispatch('view/removeFromStatusTexts', task.id, { root: true });
  },
  [IN.TYPE_TASKFINISHED]: ({ payload: task }, { dispatch }) => {
    dispatch('stomp/taskEnd', task, { root: true });
    // dispatch('data/recalculateTree', { taskId: task.id, fromTask: true }, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, `Ended task with id ${task.id}`);
    dispatch('view/removeFromStatusTexts', task.id, { root: true });
  },
  [IN.TYPE_PROVENANCECHANGED]: ({ payload }, { dispatch, rootGetters }) => {
    if (payload.contextId && rootGetters['data/context'] !== null && rootGetters['data/context'].id !== payload.contextId) {
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Provenance of incorrect context received');
      console.warn(rootGetters['data/context'].id, payload.contextId);
    } else {
      dispatch('data/setReloadFlowchart', { target: payload.target }, { root: true });
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, `Provenance available in context ${payload.contextId}`);
    }
  },
  [IN.TYPE_DATAFLOWCOMPILED]: ({ payload }, { dispatch, rootGetters }) => {
    if (payload.contextId && rootGetters['data/context'] !== null && rootGetters['data/context'].id !== payload.contextId) {
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Dataflow of incorrect context received');
      console.warn(rootGetters['data/context'].id, payload.contextId);
    } else {
      dispatch('data/setReloadFlowchart', { target: payload.target }, { root: true });
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, `Dataflow compiled in context ${payload.contextId}`);
    }
  },
  [IN.TYPE_DATAFLOWSTATECHANGED]: ({ payload }, { dispatch }) => {
    let status;
    if (payload.status === 'STARTED') {
      status = DATAFLOW_STATUS.PROCESSING;
    } else if (payload.status === 'FINISHED') {
      status = DATAFLOW_STATUS.PROCESSED;
    } else if (payload.status === 'ABORTED') {
      status = DATAFLOW_STATUS.ABORTED;
    } else {
      status = DATAFLOW_STATUS.WAITING;
    }
    dispatch('data/setDataflowStatus', { id: payload.nodeId, status }, { root: true });
  },
  [IN.TYPE_DATAFLOWDOCUMENTATION]: ({ payload }, { dispatch }) => {
    if (payload && payload.dataflowId && payload.htmlDescription) {
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, 'Dataflow element info received', payload);
      dispatch('data/setDataflowInfo', {
        id: payload.dataflowId,
        html: payload.htmlDescription,
        rateable: payload.rateable,
        rating: payload.rating,
        averageRating: payload.averageRating,
      }, { root: true });
    } else {
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_WARNING, 'Strange payload of dataflow element info received', payload);
    }
  },
  [IN.TYPE_NEWOBSERVATION]: ({ payload: observation }, vuexContext) => {
    const { rootState, rootGetters, dispatch } = vuexContext;
    const observationTask = rootState.stomp.tasks.find(task => task.id === observation.taskId);
    if (typeof observationTask === 'undefined'
      && rootState.data.contextsHistory.findIndex(ctx => ctx.id === observation.contextId) !== -1) {
      // task not exists and context is one of possible, so I start a fake task
      dispatch('stomp/taskStart', {
        id: observation.taskId,
        description: FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION,
        contextId: observation.contextId,
      }, { root: true });
      dispatch('view/addToStatusTexts', {
        id: observation.taskId,
        text: FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION,
      }, { root: true });
      addToKexplorerLog(
        dispatch,
        MESSAGE_TYPES.TYPE_INFO,
        'Received an observation of previous context with no task associated. Session was been reloaded?',
        observation,
      );
    }
    // check if is context and is a new context
    if (observation.parentId === null) { // || observation.parentId === observation.id) {
      if (rootGetters['data/context'] === null) {
        // new context
        addToKexplorerLog(
          dispatch,
          MESSAGE_TYPES.TYPE_DEBUG,
          `New context received with id ${observation.id}`,
          observation,
        );
        dispatch('data/setContext', { context: observation }, { root: true });
        if (typeof observation.scaleReference !== 'undefined' && observation.scaleReference !== null) {
          dispatch('data/setScaleReference', observation.scaleReference, { root: true });
        }
      } else {
        addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_ERROR,
          `Strange behaviour: observation with no parent in existing context: ${observation.id} - ${observation.label}`, observation);
      }// else is the second message, so nothing to do
    } else if (rootGetters['data/context'] !== null && (
      rootGetters['data/context'].id === observation.rootContextId
      || (observationTask && rootGetters['data/context'].id === observationTask.contextId))) {
      // check if it is an observation linkable to actual context (checking rootContextId)
      addToKexplorerLog(
        dispatch,
        MESSAGE_TYPES.TYPE_INFO,
        `New observation received with id ${observation.id}, rootContextId ${observation.rootContextId} and contextId ${observation.contextId}`,
        observation,
      );
      observation.notified = true; // needed in case of observation added to a reloaded context
      dispatch('data/addObservation', { observation }, { root: true });
    } else {
      addToKexplorerLog(
        dispatch,
        MESSAGE_TYPES.TYPE_INFO,
        'Received an observation of different context',
        observation, null, 4,
      );
    }
  },
  [IN.TYPE_MODIFIEDOBSERVATION]: ({ payload: modificationEvent }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG,
      'Received a modification event', modificationEvent);
    dispatch('data/addModificationEvent', modificationEvent, { root: true });
  },
  [IN.TYPE_QUERYRESULT]: ({ payload: results }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received search results', results);
    dispatch('data/storeSearchResult', results, { root: true });
  },
  [IN.TYPE_RESETCONTEXT]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received context reset');
    eventBus.$emit(CUSTOM_EVENTS.RESET_CONTEXT);
    dispatch('data/resetContext', null, { root: true });
  },
  [IN.TYPE_SCALEDEFINED]: ({ payload: scaleReference }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received scale reference', scaleReference);
    dispatch('data/setScaleReference', scaleReference, { root: true });
  },
  [IN.TYPE_USERINPUTREQUESTED]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received input request', message.payload);
    dispatch('view/inputRequest', message, { root: true });
  },
  [IN.TYPE_SCHEDULEADVANCED]: ({ payload: scheduling }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received schedule advanced', scheduling);
    dispatch('data/setScheduling', scheduling, { root: true }); // TODO implement IT
  },
  [IN.TYPE_SCHEDULINGSTARTED]: ({ payload: scheduling }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received scheduling started', scheduling);
    dispatch('data/setScheduling', scheduling, { root: true });
  },
  [IN.TYPE_SCHEDULINGFINISHED]: ({ payload: scheduling }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Received scheduling finished', scheduling);
    dispatch('data/setScheduling', scheduling, { root: true });
  },
  [IN.TYPE_ENGINEEVENT]: ({ payload: event }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Engine event received', event);
    dispatch('view/setEngineEvent', event, { root: true });
  },
  // k.LAB log messages
  [IN.TYPE_DEBUG]: ({ payload: message }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_DEBUG, message);
  },
  [IN.TYPE_INFO]: ({ payload: message }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, message);
  },
  [IN.TYPE_WARNING]: ({ payload: message }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_WARNING, message);
  },
  [IN.TYPE_ERROR]: ({ payload: message }, { dispatch }) => {
    if (message === CONNECTION_CONSTANTS.UNKNOWN_IDENTITY) {
      eventBus.$emit(CUSTOM_EVENTS.SESSION_CUT);
    } else {
      addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_ERROR, message);
    }
  },
  [IN.TYPE_USERPROJECTOPENED]: (context, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Project opened in k.Modeler');
  },
  [IN.TYPE_PROJECTFILEMODIFIED]: (context, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Project modified in k.Modeler');
  },
  [IN.TYPE_NETWORKSTATUS]: ({ payload: message }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Network status received', message);
  },
  [IN.TYPE_AUTHORITYDOCUMENTATION]: ({ payload: message }, { dispatch }) => {
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Authority documentation message received', message);
  },
  [IN.TYPE_SETUPINTERFACE]: ({ payload: layout }, { dispatch }) => {
    dispatch('view/setLayout', layout, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, `App ${layout.name} loaded`, layout, true);
  },
  [IN.TYPE_CREATEMODALWINDOW]: ({ payload: modal }, { dispatch }) => {
    dispatch('view/setModalWindow', modal, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, `Modal ${modal.name} loaded`, modal);
  },
  [IN.TYPE_CREATEVIEWCOMPONENT]: ({ payload: component }, { dispatch }) => {
    dispatch('view/createViewComponent', component, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'New create view component received', component);
  },
  [IN.TYPE_VIEWACTION]: ({ payload: action }, { dispatch }) => {
    dispatch('view/viewAction', action, { root: true });
    eventBus.$emit(CUSTOM_EVENTS.VIEW_ACTION);
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'New view action received', action);
  },
  [IN.TYPE_VIEWSETTING]: ({ payload: viewSetting }, { dispatch }) => {
    dispatch('view/viewSetting', viewSetting, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'New view setting received', viewSetting);
  },
  [IN.TYPE_VIEWAVAILABLE]: ({ payload: documentation }, { dispatch }) => {
    dispatch('view/setDocumentation', { id: documentation.viewId, view: documentation.viewClass }, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'New documentation available', documentation);
  },
  [IN.TYPE_DOCUMENTATIONCHANGED]: ({ payload: change }, { dispatch }) => {
    dispatch('view/changeInDocumentation', change, { root: true });
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'New change in documentation', change);
  },
  [IN.TYPE_COMMANDRESPONSE]: ({ payload }, { dispatch }) => {
    eventBus.$emit(CUSTOM_EVENTS.COMMAND_RESPONSE, payload);
    addToKexplorerLog(dispatch, MESSAGE_TYPES.TYPE_INFO, 'Command response received', payload);
  },

};

/**
 * Find and execute action(s) for a message
 * @param body
 * @param dispatch
 * @returns {*}
 */
export const parseAndExecute = ({ body }, context = null) => {
  const parsedBody = JSON.parse(body);
  const { dispatch } = context;
  if (parsedBody.messageClass === IN.CLASS_NOTIFICATION) {
    dispatch('view/addToKlabLog', parsedBody, { root: true });
  }
  if (!Object.prototype.hasOwnProperty.call(PARSERS, parsedBody.type)) {
    console.warn(`Unknown parser ${parsedBody.type}`); // : return payload`);
    return false; // parsedBody.payload;
  }
  return PARSERS[parsedBody.type](parsedBody, context);
};

/*
  ({
  [IN.TYPE_TASKSTARTED]: PARSERS.taskStarted,
  [IN.TYPE_TASKABORTED]: PARSERS.taskAborted,
  [IN.TYPE_TASKFINISHED]: PARSERS.taskFinished,
  })[message.type];
  */

export const otro = {};
