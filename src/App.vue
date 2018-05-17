<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import 'es6-promise/auto';
// import Vue from 'vue';
// import VueStompClient from 'plugins/vue-stomp-client/Main';

// Vue.use(VueStompClient, 'http://localhost:8283/modeler/message');

export default {
  name: 'App',
  sockets: {
    onerror: (error) => {
      console.log(`On error: ${JSON.stringify(error, null, 4)}`);
    },
    onconnect: (frame) => {
      this.stompConnected = true;
      console.log(`On connect app: ${JSON.stringify(frame, null, 4)}`);
    },
    onmessage: (frame) => {
      console.log(`On message: ${JSON.stringify(frame, null, 4)}`);
    },
    onsubscribe: (message) => {
      console.log(`Subscribe with subscribe id: ${JSON.stringify(message, null, 4)}`);
    },
    ondisconnect: () => {
      this.stompConnected = false;
      console.log('Disconnected');
    },
  },
};

</script>

<style>
</style>
