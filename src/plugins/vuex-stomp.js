/* eslint-disable object-shorthand,func-names */
/*
import SockJS from 'sockjs-client';
import webstomp from 'webstomp-client?es6';
*/
// const sock = SockJS('http://localhost:8283/modeler/message');
// const stomp = webstomp.over(sock);
import VueStompClient from 'plugins/vue-stomp-client/Main';

export default ({ Vue, store }) => {
  Vue.use(VueStompClient, process.env.WS_URL, {
    subscribeUrl: process.env.WS_SUBSCRIBE,
    store: store,
    storeNS: 'stomp',
  });
  console.log(JSON.stringify('http://localhost:8283/modeler/message'));
  /* this inject 55 callback, no way
  Vue.mixin({
    sockets: {
      onconnect: (frame) => {
        console.log(`On connect plugin: ${frame}`);
      },
      onerror: (frame) => {
        console.log(`On error plugin: ${frame}`);
      },
    },
  });
  */
  /*
  app.$options.sockets = [];
  app.$options.sockets.onconnect = (payload) => {
    console.log(`Socket connected with payload: ${payload} on mixin`);
  };
  app.$options.sockets.onerror = (error) => {
    console.log(`Error: ${error} on mixin`);
  };
  app.$options.sockets.ondisconnect = () => {
    console.log('Socket disconnected on mixin');
  };
  */

  /*
  Vue.prototype.$stomp = {
    client: null,
    ws: null,
    stomp: null,
    isConnected: function () {
      return this.client && this.client.connected;
    },
    isConnecting: function () {
      return this.client && this.client.ws.readyState === this.client.ws.CONNECTING;
    },
    init: function (url) {
      this.ws = SockJS(url);
      this.stomp = webstomp.over(this.ws);
      this.stomp.connect(
        {},
        (frame) => {
          console.log(`Connected: ${frame}`);
        },
        (error) => {
          console.log(`Error: ${error}`);
        },
      );
      this.client = this.stomp;
    },
    connect: function () {
      if (!this.isConnected() && !this.isConnecting()) {
        // const sock = SockJS(url);
        // const stomp = webstomp.over(this.ws);
      }
    },
    subscribe: (topic) => {
      console.log(`Subscribe: ${performance.now()}`);
      if (this.isConnected && this.isConnected()) {
        this.connect();
      }
      this.client.subscribe(topic, (answer) => {
        console.log(`Received: ${answer}`);
        return answer;
      });
    },
    send: (to, message, headers) => {
      console.log(`Send: ${performance.now()}`);
      if (!(this.isConnected && this.isConnected())) {
        console.log('WAIT!');
        return; // this.connect;
      }
      console.log(`Send to ${to}`);
      this.client.send(to, JSON.stringify(message), headers);
    },
  };
  */
};
