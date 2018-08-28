import { IN } from './MessagesConstants';
import { Constants } from './Helpers';

function addLogToStore(dispatch, type, message, attach) {
  dispatch('view/pushLogAction', { type, payload: { message, attach } }, { root: true });
}

const PARSERS = {
  [IN.TYPE_TASKSTARTED]: (task, dispatch) => {
    dispatch('stomp/taskStart', task, { root: true });
    addLogToStore(dispatch, Constants.TYPE_DEBUG, `Started task with id ${task.id}`);
  },
  [IN.TYPE_TASKABORTED]: (task, dispatch) => {
    dispatch('stomp/taskAbort', task, { root: true });
    addLogToStore(dispatch, Constants.TYPE_ERROR, `Aborted task with id ${task.id}`);
  },
  [IN.TYPE_TASKFINISHED]: (task, dispatch) => {
    dispatch('stomp/taskEnd', task, { root: true });
    addLogToStore(dispatch, Constants.TYPE_DEBUG, `Ended task with id ${task.id}`);
  },
  [IN.TYPE_DATAFLOWCOMPILED]: (payload, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_DEBUG, `Dataflow compiled in task ${payload.taskId}`);
  },
  [IN.TYPE_NEWOBSERVATION]: (observation, dispatch) => {
    addLogToStore(
      dispatch,
      Constants.TYPE_DEBUG,
      `New observation received with id ${observation.id}`,
      JSON.stringify(observation, null, 4),
    );
    console.log(`Observation:\n${JSON.stringify(observation, null, 4)}`);
    // TODO check the definitive condition
    if (observation.parentId === null || observation.parentId === observation.id) {
      // new context
      dispatch('data/setContext', observation, { root: true });
    } else {
      dispatch('data/addObservation', { observation }, { root: true });
    }
  },
  [IN.TYPE_INFO]: (info, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_INFO, JSON.stringify(info));
  },
  [IN.TYPE_DEBUG]: (message, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_DEBUG, JSON.stringify(message));
  },
  [IN.TYPE_ERROR]: (message, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_ERROR, JSON.stringify(message));
  },
  [IN.TYPE_QUERYRESULT]: (results, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_INFO, 'Received search results', JSON.stringify(results));
    dispatch('data/storeSearchResult', results, { root: true });
  },
  [IN.TYPE_RESETCONTEXT]: (message, dispatch) => {
    addLogToStore(dispatch, Constants.TYPE_INFO, 'Received context reset');
    dispatch('data/resetContext', null, { root: true });
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
