import Constants from 'shared/Constants';

export default {
  lastError: (state) => {
    const filtered = state.receivedMessages
      .filter(item => item.type === Constants.TYPE_ERROR).slice(-1);
    return filtered.length === 1 ? filtered[0] : null;
  },

  lastMessage: (state) => {
    const filtered = state.receivedMessages
      .filter(item => item.type === Constants.TYPE_MESSAGE).slice(-1);
    return filtered.length === 1 ? filtered[0] : null;
  },

  lastReceivedMessage: state => (
    state.receivedMessages.length > 0
      ? state.receivedMessages.slice(-1)[0] : null),

  lastSendedMessage: state => (
    state.sendedMessages.length > 0
      ? state.sendedMessages.slice(-1)[0] : null),

  subscriberId: state => (state.subscriber !== null ? state.subscriber.id : null),

  queuedMessage: state => (state.queuedMessage),

  connectionState: state => (state.connectionState),

  /**
   * Return if a task is alive
   */
  taskIsAlive: state => (id) => { state.tasks.has(id); },

  hasTasks: state => state.tasks.size !== 0,

};

