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
    state.sentMessages.length > 0
      ? state.sentMessages.slice(-1)[0] : null),

  subscriberId: state => (state.subscriber !== null ? state.subscriber.id : null),

  queuedMessage: state => (state.queuedMessage),

  connectionState: state => (state.connectionState),

  /**
   * Return if a task is alive
   */
  tasks: state => state.tasks,
  taskIsAlive: state => id => typeof state.tasks.find(task => task.id === id) !== 'undefined',

  hasTasks: state => state.tasks.length !== 0,

  lastActiveTask: state => (state.tasks.length > 0 ? state.tasks.slice(-1)[0] : null),

};
