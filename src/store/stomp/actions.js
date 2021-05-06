import { CONNECTION_CONSTANTS, SPINNER_CONSTANTS } from 'shared/Constants';
import { parseAndExecute } from 'shared/MessagesParser';

/**
 * Names of actions are linked to Stomp client event name
 */
export default {

  stomp_onconnect: ({ commit }, frame) => {
    commit('STOMP_CONNECTION_STATE', CONNECTION_CONSTANTS.CONNECTION_UP);
    commit('STOMP_RECONNECTIONS_ATTEMPT_RESET'); // Reset reconnections
    commit('STOMP_MESSAGE', frame);
  },
  stomp_onclose: ({ commit }) => {
    commit('STOMP_CONNECTION_STATE', CONNECTION_CONSTANTS.CONNECTION_DOWN);
  },
  stomp_onerror: ({ dispatch }, error) => {
    dispatch('setConnectionState', { state: CONNECTION_CONSTANTS.CONNECTION_ERROR, message: error });
  },
  setConnectionState: ({ commit }, { state, message }) => {
    commit('STOMP_CONNECTION_STATE', state);
    commit('STOMP_ERROR', message);
  },
  stomp_onmessage: (context, message) => {
    // save it
    const { commit } = context;
    commit('STOMP_MESSAGE', message);
    parseAndExecute(message, context);
    // processing
  },
  stomp_onsubscribe: ({ commit }, subscription) => {
    commit('STOMP_SUBSCRIBED', subscription);
  },
  // mutations for reconnect methods
  stomp_reconnect: ({ commit }, count) => {
    commit('STOMP_RECONNECTIONS_ATTEMPT', count);
    commit('STOMP_CONNECTION_STATE', CONNECTION_CONSTANTS.CONNECTION_WORKING);
  },

  stomp_onsend: ({ commit }, { message }) => {
    commit('STOMP_SEND_MESSAGE', message);
  },

  stomp_onerrorsend: ({ commit }, messageWithHeaders) => {
    commit('STOMP_QUEUE_MESSAGE', messageWithHeaders);
  },

  stomp_cleanqueue: ({ commit }) => {
    commit('STOMP_CLEAN_QUEUE');
  },

  // TASKS LIFE
  taskStart: ({ commit, dispatch }, task) => {
    dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_LOADING, owner: task.id }, { root: true });
    commit('TASK_START', task);
    // commit('data/ADD_TASKID', task.id, { root: true }); this is managed by data/addObservation
  },

  taskAbort: ({ commit, dispatch }, task) => {
    commit('TASK_END', task);
    dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: task.id }, { root: true });
  },

  taskEnd: ({ commit, dispatch }, task) => {
    commit('TASK_END', task);
    dispatch('view/setSpinner', { ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: task.id }, { root: true });
  },
};
