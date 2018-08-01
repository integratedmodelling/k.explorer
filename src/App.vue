<template>
  <div id="q-app" v-cloak>
    <router-view />
  </div>
</template>

<script>
// This is for IE11 Promise polyfill
// import 'es6-promise/auto';
import { mapGetters, mapActions } from 'vuex';
// import Vue from 'vue';
import defaultTestTree from 'shared/test_tree';
import { Helpers, Constants } from 'shared/Helpers';

export default {
  name: 'App',
  computed: {
    ...mapGetters('stomp', [
      'queuedMessage',
    ]),
    ...mapGetters('view', [
      'lastLogAction',
      'logActions',
    ]),
  },
  sockets: {
    onconnect(frame) {
      console.log(`On connect app: ${JSON.stringify(frame, null, 4)}`);
      this.sendQueue();
    },
    onerror: (error) => {
      console.log(`Error: ${JSON.stringify(error)}`);
    },
    onerrorsend: (error) => {
      console.log(`Error on send: ${JSON.stringify(error)}`);
    },
    onmessage: (frame) => {
      /*
      let body = '';
      if (frame.body) {
        body = JSON.parse(frame.body);
      }
      */
      console.log(`Received frame:\n${JSON.stringify(frame, null, 4)}`);
      //  ${body !== '' ? `\nBody:\n${JSON.stringify(body, null, 4)}` : ''}`); // (`On message: ${JSON.stringify(frame, null, 4)}`);
    },
    onsubscribe(message) {
      console.log(`Subscribe with subscribe id: ${JSON.stringify(message, null, 4)}`);
    },
    onclose: () => {
      console.log('Disconnected');
    },
    onsend({ headers, message }) {
      if (this.queuedMessage && message === this.queuedMessage.message) {
        this.stompCleanQueue();
      }
      console.log(`Send a message: ${JSON.stringify(message)} with this headers: ${JSON.stringify(headers)}`);
    },
  },
  methods: {
    sendQueue() {
      if (this.queuedMessage) {
        const { message, headers } = this.queuedMessage;
        this.sendStompMessage(message, headers);
      }
    },
    ...mapActions('stomp', {
      stompCleanQueue: 'stomp_cleanqueue',
    }),
  },
  watch: {
    logActions() {
      const lastLogActionObject = this.lastLogAction();
      if (lastLogActionObject !== null && lastLogActionObject.type === Constants.TYPE_ERROR) {
        // Vue.nextTick(() => {
        this.$q.notify({
          message: lastLogActionObject.payload,
          type: 'negative',
          timeout: 1000,
        });
        // });
      }
    },
  },
  beforeMount() {
    // TODO only for test proposal
    const testTree = this.$urlParams.get('test_tree') || false;
    if (testTree) {
      this.loadTree(defaultTestTree);
    } else {
      this.$store.dispatch('data/addObservation', {
        observation: Helpers.OBSERVATION_DEFAULT,
        main: true,
      }, { root: true });
    }
  },
};

</script>

<style>
  [v-cloak] > * { display:none; }
  [v-cloak]::before {
    content: " ";
    display: block;
    width: 170px;
    height: 181px;
    background-image: url('statics/klab-spinner-opt.gif');
  }
  .q-notify {
    padding: 5px;
  }
</style>
