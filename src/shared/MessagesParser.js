import { IN } from './MessagesConstants';
import { Constants } from './Helpers';
import { DATAFLOW_STATUS } from './Constants';

function addToKexplorerLog(dispatch, type, message, attach, important = false) {
  dispatch('view/addToKexplorerLog', { type, payload: { message, attach }, important }, { root: true });
}

const PARSERS = {
  [IN.TYPE_TASKSTARTED]: (task, { dispatch }) => {
    dispatch('stomp/taskStart', task, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Started task with id ${task.id}`);
    dispatch('view/addToStatusTexts', { id: task.id, text: task.description }, { root: true });
  },
  [IN.TYPE_TASKABORTED]: (task, { dispatch }) => {
    dispatch('stomp/taskAbort', task, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_ERROR, `Aborted task with id ${task.id}`);
    dispatch('view/removeFromStatusTexts', task.id, { root: true });
  },
  [IN.TYPE_TASKFINISHED]: (task, { dispatch }) => {
    dispatch('stomp/taskEnd', task, { root: true });
    dispatch('data/recalculateTree', { taskId: task.id, fromTask: true }, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Ended task with id ${task.id}`);
    dispatch('view/removeFromStatusTexts', task.id, { root: true });
  },
  [IN.TYPE_DATAFLOWCOMPILED]: (payload, { dispatch }) => {
    if (typeof payload.jsonElkLayout !== 'undefined' && payload.jsonElkLayout !== null) {
      try {
        const jsonEklLayout = JSON.parse(payload.jsonElkLayout);
        addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Dataflow compiled in task ${payload.taskId}`);
        dispatch('data/addDataflow', jsonEklLayout, { root: true });
      } catch (e) {
        addToKexplorerLog(dispatch, Constants.TYPE_ERROR, `Error in dataflos layout in task ${payload.taskId}: ${e}`);
      }
    } else {
      addToKexplorerLog(dispatch, Constants.TYPE_WARN, `Dataflow in task ${payload.taskId} has no layout`);
    }
  },
  [IN.TYPE_DATAFLOWSTATECHANGED]: (payload, { dispatch }) => {
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
  [IN.TYPE_NEWOBSERVATION]: (observation, context) => {
    const { rootState, dispatch } = context;
    // check if taskId exists
    if (typeof rootState.stomp.tasks.find(task => task.id === observation.taskId) === 'undefined') {
      dispatch('stomp/taskStart', { id: observation.taskId, description: 'Previous observations results' }, { root: true });
      dispatch('view/addToStatusTexts', { id: observation.taskId, text: 'Previous observations results' }, { root: true });
    }
    // check if is context
    if (observation.parentId === null) { // || observation.parentId === observation.id) {
      // new context
      addToKexplorerLog(
        dispatch,
        Constants.TYPE_DEBUG,
        `New context received with id ${observation.id}`,
        JSON.stringify(observation, null, 4),
      );
      dispatch('data/setContext', observation, { root: true });
    } else if (rootState.data.context !== null && rootState.data.context.id === observation.rootContextId) {
      // check if it is an observation linkable to actual context (checking rootContextId)
      addToKexplorerLog(
        dispatch,
        Constants.TYPE_INFO,
        `New observation received with id ${observation.id} and rootContextId ${observation.rootContextId}`,
        JSON.stringify(observation, null, 4),
      );
      observation.previouslyNotified = true; // needed in case of observation added to a reloaded context
      dispatch('data/addObservation', { observation }, { root: true });
    } else {
      addToKexplorerLog(
        dispatch,
        Constants.TYPE_INFO,
        'Received an observation of different actual context',
        JSON.stringify(observation, null, 4),
      );
    }
  },
  [IN.TYPE_QUERYRESULT]: (results, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received search results', JSON.stringify(results));
    dispatch('data/storeSearchResult', results, { root: true });
  },
  [IN.TYPE_RESETCONTEXT]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received context reset');
    dispatch('data/resetContext', null, { root: true });
  },
  [IN.TYPE_SCALEDEFINED]: (scaleReference, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received scale reference', JSON.stringify(scaleReference));
    dispatch('data/setScaleReference', scaleReference, { root: true });
  },
  // k.LAB log messages
  [IN.TYPE_DEBUG]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, message);
  },
  [IN.TYPE_INFO]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, message);
  },
  [IN.TYPE_WARNING]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_WARNING, message);
  },
  [IN.TYPE_ERROR]: (message, { dispatch }) => {
    addToKexplorerLog(dispatch, Constants.TYPE_ERROR, message);
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
    console.log(`Unknown parser ${parsedBody.type}`); // : return payload`);
    return false; // parsedBody.payload;
  }
  return PARSERS[parsedBody.type](parsedBody.payload, context);
};

/*
  ({
  [IN.TYPE_TASKSTARTED]: PARSERS.taskStarted,
  [IN.TYPE_TASKABORTED]: PARSERS.taskAborted,
  [IN.TYPE_TASKFINISHED]: PARSERS.taskFinished,
  })[message.type];
  */

export const otro = {};
