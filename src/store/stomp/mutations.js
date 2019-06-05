import { pushElementInFixedQueue } from 'shared/Helpers';
import { MESSAGE_TYPES } from 'shared/Constants';
import moment from 'moment';

export default {

  STOMP_CONNECTION_STATE(state, connectionState) {
    state.connectionState = connectionState;
  },

  STOMP_ERROR(state, error) {
    // state.receivedMessages.push({
    pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: MESSAGE_TYPES.TYPE_ERROR,
      message: error,
    });
  },

  // default handler called for all methods
  STOMP_MESSAGE(state, message) {
    // console.log('STOMP MESSAGE');
    pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: MESSAGE_TYPES.TYPE_MESSAGE,
      message,
    });
  },

  STOMP_SEND_MESSAGE(state, message) {
    pushElementInFixedQueue(state.sentMessages, {
      date: moment().format('HH:mm:ss'),
      ...message,
    });
  },

  STOMP_SUBSCRIBED(state, subscriber) {
    state.subscriber = subscriber;
  },

  // mutations for reconnect methods
  STOMP_RECONNECTIONS_ATTEMPT(state, value) {
    state.reconnectionsAttempt = value;
  },

  STOMP_RECONNECTIONS_ATTEMPT_RESET(state) {
    state.reconnectionsAttempt = 0;
  },

  STOMP_QUEUE_MESSAGE(state, message) {
    state.queuedMessage = message;
  },

  STOMP_CLEAN_QUEUE(state) {
    state.queuedMessage = null;
  },

  TASK_START(state, { id, contextId, description }) {
    state.tasks.push({
      id,
      contextId,
      description,
      alive: true,
    });
  },

  TASK_END(state, { id }) {
    // we don't check if is yet not alive to stop strange cases
    const taskIdx = state.tasks.findIndex(element => (element.id === id));
    if (taskIdx !== -1) {
      const task = state.tasks[taskIdx];
      task.alive = false;
      state.tasks.splice(taskIdx, 1, task);
    } else {
      console.debug(`Task with id = ${id} not founded or is not alive`);
    }
  },
};
