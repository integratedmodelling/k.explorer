/* eslint-disable wrap-iife */
/*
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client?es6';
*/

import VueStompClient from 'plugins/vue-stomp-client/Main';
import { Cookies } from 'quasar';

export default ({ Vue, store }) => {
  // Starting VueStompClient connecting to WS_URL
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('sessionId') || Cookies.get('sessionId');
  console.log(`SessionId: ${sessionId}`);
  store.state.stomp.sessionId = sessionId;
  const subscribeUrl = `${process.env.WS_SUBSCRIBE}/${sessionId}`;
  console.log(`SubscribeURL: ${subscribeUrl}`);
  Vue.use(VueStompClient, process.env.WS_URL, {
    stompOptions: {
      subscribeUrl,
    },
    defaultMessageDestination: process.env.WS_MESSAGE_DESTINATION,
    store,
    storeNS: 'stomp',
    reconnection: true,
  });
};
