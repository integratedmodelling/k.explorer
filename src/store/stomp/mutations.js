import { helpers, constants } from 'helpers/helpers';
import moment from 'moment';

export default {

  STOMP_CONNECTION_STATE(state, connectionState) {
    if (connectionState !== constants.CONNECTION_UP &&
      connectionState !== constants.CONNECTION_DOWN &&
      connectionState !== constants.CONNECTION_WORKING &&
      connectionState !== constants.CONNECTION_ERROR) {
      throw new Error(`Connection value is incorrect: ${connectionState}`);
    }
    state.connectionState = connectionState;
  },

  STOMP_ERROR(state, error) {
    // state.receivedMessages.push({
    helpers.pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: constants.TYPE_ERROR,
      message: error,
    });
  },

  // default handler called for all methods
  STOMP_MESSAGE(state, message) {
    // console.log('STOMP MESSAGE');
    helpers.pushElementInFixedQueue(state.receivedMessages, {
      date: moment().format('HH:mm:ss'),
      type: constants.TYPE_MESSAGE,
      message,
    });
  },

  STOMP_SEND_MESSAGE(state, message) {
    helpers.pushElementInFixedQueue(state.sendedMessages, {
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
};

