import VueStompClient from 'classes/vue-stomp-client/Main';

export default ({ Vue, store }) => {
  // Starting VueStompClient connecting to WS_URL
  Vue.use(VueStompClient, process.env.WS_BASE_URL + process.env.WS_URL, {}, {
    stompOptions: {
      reconnection: true,
      debug: process.env.STOMP_CLIENT_DEBUG,
      protocol: 'v12.stomp',
    },
    store,
    storeNS: 'stomp',
    reconnection: true,
    debug: process.env.STOMP_CLIENT_DEBUG,
    defaultMessageDestination: process.env.WS_MESSAGE_DESTINATION,
    defaultSubscribeDestination: process.env.WS_SUBSCRIBE,
  });
};
