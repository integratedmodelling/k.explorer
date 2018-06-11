import VueStompClient from 'plugins/vue-stomp-client/Main';

export default ({ Vue, store }) => {
  // Starting VueStompClient connecting to WS_URL

  const subscribeUrl = `${process.env.WS_SUBSCRIBE}/${store.getters['data/session']}`;
  console.log(`SubscribeURL: ${subscribeUrl}`);
  Vue.use(VueStompClient, process.env.WS_BASE_URL + process.env.WS_URL, {
    stompOptions: {
      subscribeUrl,
      debug: false,
      reconnection: true,
    },
    defaultMessageDestination: process.env.WS_MESSAGE_DESTINATION,
    store,
    storeNS: 'stomp',
    reconnection: true,
  });
};
