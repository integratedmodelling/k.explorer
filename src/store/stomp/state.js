import constants from 'helpers/constants';

/**
 * In this state everything about stomp comm is stored.
 * Data retrieved and sended are stored in data
 */
export default {
  // Connection state
  connectionState: constants.CONNECTION_DOWN,
  // Reconnection counter if we are trying to reconnect
  reconnectionsAttempt: 0,
  // errors received
  // errors: [],
  // when subscribed to a TOPIC, there is an ID and a function to unsuscribe
  // subscriber.unsuscribe()
  subscriber: null,
  // Sended message (we need to think in a MAX_LENGTH implementation)
  sendedMessages: [],
  // Received message (we need to think in a MAX_LENGTH implementation)
  receivedMessages: [],
  // Queue of wait for send messages
  queuedMessage: null,
};

