import Constants from 'shared/Constants';

/**
 * In this state everything about stomp comm is stored.
 * Data retrieved and sended are stored in data
 */
export default {

  /**
   * Connection state
   */
  connectionState: Constants.CONNECTION_UNKNOWN,
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
   * Sended message implemented MAX_LENGTH
   */
  sendedMessages: [],

  /**
   * Received message implemented MAX_LENGTH
   */
  receivedMessages: [],

  /**
   * Message queued
   * Only one because if cannot send a message we must stop working
   * A sended message need answer to continue
   */
  queuedMessage: null,

  /**
   * From websocket we received complex tasks.
   * Tasks in this array are alive and will be deleted on finish
   */
  tasks: new Map(),
};

