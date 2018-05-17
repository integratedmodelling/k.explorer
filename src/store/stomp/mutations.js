export default {
  SOCKET_ONCONNECT(state, frame) {
    console.debug(JSON.stringify(frame));
    state.isConnected = true;
  },
  SOCKET_ONCLOSE(state) {
    state.isConnected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(state, event);
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.message = message;
  },
  SOCKET_ONSUBSCRIBE(state, subscribeId) {
    state.subscribeId = subscribeId;
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.info(state, count);
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.reconnectError = true;
  },
};

