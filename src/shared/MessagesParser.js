import { IN, SHARED } from './MessagesConstants';

function addLogToStore(dispatch, type, payload) {
  dispatch('view/pushLogAction', { type, payload }, { root: true });
}

const PARSERS = {
  [IN.TYPE_TASKSTARTED]: (task, dispatch) => {
    dispatch('stomp/startTask', task, { root: true });
    addLogToStore(dispatch, SHARED.TYPE_DEBUG, `Started task with id ${task.id}`);
  },
  [IN.TYPE_TASKABORTED]: (task, dispatch) => {
    addLogToStore(dispatch, SHARED.TYPE_ERROR, `Aborted task with id ${task.id}`);
  },
  [IN.TYPE_TASKFINISHED]: (task, dispatch) => {
    dispatch('stomp/endTask', task, { root: true });
    addLogToStore(dispatch, SHARED.TYPE_DEBUG, `Ended task with id ${task.id}`);
  },
  [IN.TYPE_DATAFLOWCOMPILED]: (payload, dispatch) => {
    addLogToStore(dispatch, SHARED.TYPE_DEBUG, `Dataflow compiled in task ${payload.taskId}`);
  },
  [IN.TYPE_NEWOBSERVATION]: (observation, dispatch) => {
    addLogToStore(
      dispatch,
      SHARED.TYPE_DEBUG,
      `New observation received: ${JSON.stringify(observation)}`,
    );
    // TODO check the definitive condition
    if (observation.parentId === null || observation.parentId === observation.id) {
      // new context
      dispatch('data/setContext', observation, { root: true });
    } else {
      // TODO: esto no es nada banal, con calma
      dispatch('data/addNode', observation, { root: true });
    }
  },
  [IN.TYPE_INFO]: (info, dispatch) => {
    addLogToStore(dispatch, SHARED.TYPE_INFO, `Received an info: ${JSON.stringify(info)}`);
  },
};

/**
 * Find and execute action(s) for a message
 * @param body
 * @param dispatch
 * @returns {*}
 */
export const parseAndExecute = ({ body }, dispatch) => {
  const parsedBody = JSON.parse(body);
  if (!Object.prototype.hasOwnProperty.call(PARSERS, parsedBody.type)) {
    console.warn(`Unknown task ${parsedBody.type}`);
    return false;
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
