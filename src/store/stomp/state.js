import { CONNECTION_CONSTANTS } from 'shared/Constants';

/**
 * In this state everything about stomp comm is stored.
 * Data retrieved and sent are stored in data
 */
export default {

  stompClient: null,
  /**
   * Connection state
   */
  connectionState: CONNECTION_CONSTANTS.CONNECTION_UNKNOWN,
  /**
   * Reconnection counter if we are trying to reconnect
   */
  reconnectionsAttempt: 0,

  /**
   * when subscribed to a TOPIC, there is an ID and a function to unsuscribe
   * f.e. subscriber.unsuscribe()
   */
  subscriber: null,

  /**
   * Sent message implemented MAX_LENGTH
   */
  sentMessages: [],

  /**
   * Received message implemented MAX_LENGTH
   */
  receivedMessages: [],

  /**
   * Message queued
   * Only one because if cannot send a message we must stop working
   * A sent message need answer to continue
   */
  queuedMessage: null,

  /**
   * From websocket we received complex tasks.
   * Tasks in this array are alive and will be deleted on finish
   * {
   *  taskId: taskId
   *  task: task as received from STOMP message or null if come from reload
   * }
   */
  tasks: [],

  subscriptions: [],
};
