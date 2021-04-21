import VueStompClient from 'classes/vue-stomp-client/Main';
import { WEB_CONSTANTS } from 'shared/Constants';

export default ({ Vue, store }) => {
  // Starting VueStompClient connecting to WS_URL
  const stompDebugParam = new URLSearchParams(window.location.search).get(WEB_CONSTANTS.PARAMS_STOMP_DEBUG);
  let debug = false;
  if (stompDebugParam === 'true' || process.env.STOMP_CLIENT_DEBUG) {
    debug = true;
  }
  Vue.use(VueStompClient, process.env.WS_BASE_URL + process.env.WS_URL, {}, {
    stompOptions: {
      debug,
      protocol: 'v12.stomp',
      /*
      heartbeat: {
        outgoing: 1000,
        incoming: 1000,
      }, // client will send heartbeats every 20000ms
       */
    },
    store,
    storeNS: 'stomp',
    reconnection: true,
    reconnectionAttempts: 5,
    debug,
    defaultMessageDestination: process.env.WS_MESSAGE_DESTINATION,
    defaultSubscribeDestination: process.env.WS_SUBSCRIBE,
  });
};
