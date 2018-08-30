import VueStompClient from 'classes/vue-stomp-client/Main';

export default ({ Vue, store }) => {
  // Starting VueStompClient connecting to WS_URL
  Vue.use(VueStompClient, process.env.WS_BASE_URL + process.env.WS_URL, {}, {
    stompOptions: {
      debug: true,
      reconnection: true,
      protocol: 'v12.stomp',
    },
    store,
    storeNS: 'stomp',
    reconnection: true,
    debug: false,
    defaultMessageDestination: process.env.WS_MESSAGE_DESTINATION,
    defaultSubscribeDestination: process.env.WS_SUBSCRIBE,
  });
};
