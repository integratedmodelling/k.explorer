import constants from 'helpers/constants';

export default {
  stomp_onconnect: ({ commit }, frame) => {
    commit('STOMP_CONNECTION_STATE', constants.CONNECTION_UP);
    commit('STOMP_RECONNECTIONS_ATTEMPT_RESET'); // Reset reconnections
    commit('STOMP_MESSAGE', frame);
  },
  stomp_onclose: ({ commit }) => {
    commit('STOMP_CONNECTION_STATE', constants.CONNECTION_DOWN);
  },
  stomp_onerror: ({ commit }, error) => {
    commit('STOMP_CONNECTION_STATE', constants.CONNECTION_ERROR);
    commit('STOMP_ERROR', error);
  },
  stomp_onmessage: ({ commit, rootState }, message) => {
    commit('STOMP_MESSAGE', message);
    console.log(`ROOTSTATE: ${rootState}`);
    /* TODO Things with answer in Data Store */
  },
  stomp_onsubscribe: ({ commit }, subscriber) => {
    commit('STOMP_SUBSCRIBED', subscriber);
  },
  // mutations for reconnect methods
  stomp_reconnect: ({ commit }, count) => {
    commit('STOMP_RECONNECTIONS_ATTEMPT', count);
    commit('STOMP_CONNECTION_STATE', constants.CONNECTION_WORKING);
  },
  /* TODO CHECK IF NEED
  SOCKET_RECONNECT_ERROR(state) {
    state.reconnectError = true;
  },
  */
  stomp_onsend: ({ commit }, { message }) => {
    commit('STOMP_SEND_MESSAGE', message);
  },

  stomp_onerrorsend: ({ commit }, messageWithHeaders) => {
    commit('STOMP_QUEUE_MESSAGE', messageWithHeaders);
  },

  stomp_cleanqueue: ({ commit }) => {
    commit('STOMP_CLEAN_QUEUE');
  },
};

