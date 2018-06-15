import { Helpers, Constants } from 'shared/Helpers';
import moment from 'moment';

export default {

  STOMP_CONNECTION_STATE(state, connectionState) {
    /* TODO: is needed this check?
    if (connectionState !== Constants.CONNECTION_UP &&
      connectionState !== Constants.CONNECTION_DOWN &&
      connectionState !== Constants.CONNECTION_WORKING &&
      connectionState !== Constants.CONNECTION_ERROR
      connectionState !== Constants.CONNECTION_UNKNOWN) {
      throw new Error(`Connection value is incorrect: ${connectionState}`);
    }
    */
    // console.log(`Change connection state from ${state.connectionState} to ${connectionState}`);
    // try {
    state.connectionState = connectionState;
    // } catch (e) {
    //   console.log(`Error change connection: ${JSON.stringify(e)}`);
    // }
  },

  STOMP_ERROR(state, error) {
    // state.receivedMessages.push({
    Helpers.pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: Constants.TYPE_ERROR,
      message: error,
    });
  },

  // default handler called for all methods
  STOMP_MESSAGE(state, message) {
    // console.log('STOMP MESSAGE');
    Helpers.pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: Constants.TYPE_MESSAGE,
      message,
    });
  },

  STOMP_SEND_MESSAGE(state, message) {
    Helpers.pushElementInFixedQueue(state.sendedMessages, {
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

  TASK_START(state, task) {
    state.tasks.push({ id: task.id, task });
  },

  TASK_END(state, { id }) {
    const idx = state.tasks.findIndex(element => element.id === id);
    if (typeof idx !== 'undefined') {
      state.tasks.splice(idx, 1);
    } else {
      console.debug(`Task with id = ${id} not founded`);
    }
  },
};

