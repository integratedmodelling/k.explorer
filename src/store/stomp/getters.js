import { MESSAGE_TYPES, CONNECTION_CONSTANTS } from 'shared/Constants';

export default {
  lastError: (state) => {
    const filtered = state.receivedMessages
      .filter(item => item.type === MESSAGE_TYPES.TYPE_ERROR).slice(-1);
    return filtered.length === 1 ? filtered[0] : null;
  },

  lastMessage: (state) => {
    const filtered = state.receivedMessages
      .filter(item => item.type === MESSAGE_TYPES.TYPE_MESSAGE).slice(-1);
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
  connectionUp: state => state.connectionState === CONNECTION_CONSTANTS.CONNECTION_UP,

  tasks: state => state.tasks,

  /**
   * Return if a task is alive
   */
  taskIsAlive: state => id => typeof state.tasks.find(task => (task.id === id && task.alive)) !== 'undefined',
  /**
   * Return if a task of context
   */
  taskOfContextIsAlive: (state, getters, rootState, rootGetters) => typeof state.tasks.find(t => (t.contextId === rootGetters['data/contextId'] && t.alive)) !== 'undefined',

  contextTaskIsAlive: state => contextId => typeof state.tasks.find(t => (t.contextId === contextId && t.alive)) !== 'undefined',

  hasTasks: state => (contextId = null) => (state.tasks.findIndex(task => (task.alive && (contextId === null || task.contextId === contextId))) !== -1),

  lastActiveTask: state => (contextId = null) => {
    const alives = state.tasks.filter(task => (task.alive && (contextId === null || task.contextId === contextId)));
    if (alives.length > 0) {
      return alives.pop();
    }
    return null;
  },

};
