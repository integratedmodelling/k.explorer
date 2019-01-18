import Constants from 'shared/Constants';
import { parseAndExecute } from 'shared/MessagesParser';

/**
 * Names of actions are linked to Stomp client event name
 */
export default {

  stomp_onconnect: ({ commit }, frame) => {
    commit('STOMP_CONNECTION_STATE', Constants.CONNECTION_UP);
    commit('STOMP_RECONNECTIONS_ATTEMPT_RESET'); // Reset reconnections
    commit('STOMP_MESSAGE', frame);
  },
  stomp_onclose: ({ commit }) => {
    commit('STOMP_CONNECTION_STATE', Constants.CONNECTION_DOWN);
  },
  stomp_onerror: ({ commit }, error) => {
    commit('STOMP_CONNECTION_STATE', Constants.CONNECTION_ERROR);
    commit('STOMP_ERROR', error);
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
    commit('STOMP_CONNECTION_STATE', Constants.CONNECTION_WORKING);
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
    dispatch('view/setSpinner', { ...Constants.SPINNER_LOADING, owner: task.id }, { root: true });
    commit('TASK_START', task);
    // commit('data/ADD_TASKID', task.id, { root: true }); this is managed by data/addObservation
  },

  taskAbort: ({ commit, dispatch }, task) => {
    commit('TASK_END', task);
    dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: task.id }, { root: true });
  },

  taskEnd: ({ commit, dispatch }, task) => {
    commit('TASK_END', task);
    dispatch('view/setSpinner', { ...Constants.SPINNER_STOPPED, owner: task.id }, { root: true });
  },

  clearTasks: ({ commit }) => {
    commit('TASK_RESET_ALL');
  },
};
