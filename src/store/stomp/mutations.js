export default {
  SOCKET_ONCONNECT(state, frame) {
    console.debug(`STORE ONCONNECT: ${JSON.stringify(frame)}`);
    state.connected = true;
  },
  SOCKET_ONCLOSE(state) {
    state.connected = false;
  },
  SOCKET_ONERROR(state, event) {
    console.error(`STORE ONERROR: ${state}`, event);
    state.connected = false;
  },
  // default handler called for all methods
  SOCKET_ONMESSAGE(state, message) {
    state.message = message;
    /* TODO Things with answer */
  },
  SOCKET_ONSUBSCRIBE(state, subscribeId) {
    state.subscribeId = subscribeId;
  },
  // mutations for reconnect methods
  SOCKET_RECONNECT(state, count) {
    console.info(`STORE RECONNECT: ${state}`, count);
  },
  SOCKET_RECONNECT_ERROR(state) {
    state.reconnectError = true;
  },
  SOCKET_ONSEND(state, { message }) {
    state.messageCounter += 1;
    state.sendedMessages.unshift(message);
    if (state.sendedMessages.length > process.env.SENDED_MSG_HIST_MAX_LENGTH) {
      state.sendedMessages.pop();
    }
  },
};

