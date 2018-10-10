import { IN } from './MessagesConstants';
import { Constants } from './Helpers';

function addToKexplorerLog(dispatch, type, message, attach, important = false) {
  dispatch('view/addToKexplorerLog', { type, payload: { message, attach }, important }, { root: true });
}

const PARSERS = {
  [IN.TYPE_TASKSTARTED]: (task, dispatch) => {
    dispatch('stomp/taskStart', task, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Started task with id ${task.id}`);
  },
  [IN.TYPE_TASKABORTED]: (task, dispatch) => {
    dispatch('stomp/taskAbort', task, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_ERROR, `Aborted task with id ${task.id}`);
  },
  [IN.TYPE_TASKFINISHED]: (task, dispatch) => {
    dispatch('stomp/taskEnd', task, { root: true });
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Ended task with id ${task.id}`);
  },
  [IN.TYPE_DATAFLOWCOMPILED]: (payload, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, `Dataflow compiled in task ${payload.taskId}`);
  },
  [IN.TYPE_NEWOBSERVATION]: (observation, dispatch) => {
    addToKexplorerLog(
      dispatch,
      Constants.TYPE_DEBUG,
      `New observation received with id ${observation.id}`,
      JSON.stringify(observation, null, 4),
    );
    // TODO check the definitive condition
    if (observation.parentId === null || observation.parentId === observation.id) {
      // new context
      dispatch('data/setContext', observation, { root: true });
    } else {
      dispatch('data/addObservation', { observation }, { root: true });
    }
  },
  [IN.TYPE_QUERYRESULT]: (results, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received search results', JSON.stringify(results));
    dispatch('data/storeSearchResult', results, { root: true });
  },
  [IN.TYPE_RESETCONTEXT]: (message, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received context reset');
    dispatch('data/resetContext', null, { root: true });
  },
  [IN.TYPE_SCALEDEFINED]: (scaleReference, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, 'Received scale reference', JSON.stringify(scaleReference));
    dispatch('data/setScaleReference', scaleReference, { root: true });
  },
  // k.LAB log messages
  [IN.TYPE_DEBUG]: (message, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_DEBUG, message);
  },
  [IN.TYPE_INFO]: (message, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_INFO, message);
  },
  [IN.TYPE_WARNING]: (message, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_WARNING, message);
  },
  [IN.TYPE_ERROR]: (message, dispatch) => {
    addToKexplorerLog(dispatch, Constants.TYPE_ERROR, message);
  },
};

/**
 * Find and execute action(s) for a message
 * @param body
 * @param dispatch
 * @returns {*}
 */
export const parseAndExecute = ({ body }, dispatch = null) => {
  const parsedBody = JSON.parse(body);
  if (parsedBody.messageClass === IN.CLASS_NOTIFICATION) {
    dispatch('view/addToKlabLog', parsedBody, { root: true });
  }
  if (!Object.prototype.hasOwnProperty.call(PARSERS, parsedBody.type)) {
    console.log(`Unknown parser ${parsedBody.type}`); // : return payload`);
    return false; // parsedBody.payload;
  }
  return PARSERS[parsedBody.type](parsedBody.payload, dispatch);
};

/*
  ({
  [IN.TYPE_TASKSTARTED]: PARSERS.taskStarted,
  [IN.TYPE_TASKABORTED]: PARSERS.taskAborted,
  [IN.TYPE_TASKFINISHED]: PARSERS.taskFinished,
  })[message.type];
  */

export const otro = {};
