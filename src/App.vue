<template>
  <div id="q-app" v-cloak>
    <router-view />
  </div>
</template>

<script>
// This is for IE11 Promise polyfill
// import 'es6-promise/auto';
import { mapGetters, mapActions } from 'vuex';
import defaultTestTree from 'shared/test_tree';
import { Helpers, Constants } from 'shared/Helpers';
import { IN } from 'shared/MessagesConstants';

export default {
  name: 'App',
  data() {
    return {
      subscriptions: [],
    };
  },
  computed: {
    ...mapGetters('data', [
      'session',
    ]),
    ...mapGetters('stomp', [
      'queuedMessage',
    ]),
    ...mapGetters('view', [
      'lastKexplorerLog',
      'kexplorerLog',
    ]),
  },
  sockets: {
    onconnect(frame) {
      console.log(`Connect to websocket: ${JSON.stringify(frame, null, 4)}`);
      const sessionSubscriptionObject = this.subscriptions.find(ts => ts.id === this.session);
      if (typeof sessionSubscriptionObject !== 'undefined') {
        console.warn(`Invalidate session ${this.session} this.session`); // very strange behaviour
        sessionSubscriptionObject.subscription.unsubscribe();
      }
      const subscription = this.subscribe(this.session);
      this.subscriptions.push({ id: this.session, subscription });
      console.log(`Session ${this.session} subscribed with subscriptionid ${subscription.id}`);
      this.sendQueue();
    },
    onsubscribe(subscription) {
      // const subscriptionObject = this.subscriptions.find(s => s.subscription.id === subscription.id);
      // if (typeof subscriptionObject !== 'undefined') {
      console.log(`Someone subscribe with id: ${subscription.id}`);
      // }
    },
    onmessage({ body }) {
      const { type, payload } = JSON.parse(body);
      if (type === IN.TYPE_TASKSTARTED) {
        const subscription = this.subscribe(payload.id);
        this.subscriptions.push({ id: payload.id, subscription });
        console.log(`Task ${payload.id} subscribed with subscriptionid ${subscription.id}`);
      } else if (type === IN.TYPE_TASKABORTED || type === IN.TYPE_TASKFINISHED) {
        const subscriptionObject = this.subscriptions.find(ts => ts.id === payload.id);
        if (typeof subscriptionObject !== 'undefined') {
          subscriptionObject.subscription.unsubscribe();
        }
      }
    },
    /*
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
      *
      console.log(`Received frame:\n${JSON.stringify(frame, null, 4)}`);
      //  ${body !== '' ? `\nBody:\n${JSON.stringify(body, null, 4)}` : ''}`); // (`On message: ${JSON.stringify(frame, null, 4)}`);
    },
    onclose: () => {
      console.log('Disconnected');
    },
    */
    onsend({ headers, message }) {
      if (this.queuedMessage && message === this.queuedMessage.message) {
        this.stompCleanQueue();
        console.log(`Send a queued message: ${JSON.stringify(message)} with this headers: ${JSON.stringify(headers)}`);
      }
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
    kexplorerLog() {
      const lastKexplorerLog = this.lastKexplorerLog();
      if (lastKexplorerLog !== null && (lastKexplorerLog.type === Constants.TYPE_ERROR ||
          lastKexplorerLog.type === Constants.TYPE_WARNING)) {
        this.$q.notify({
          message: lastKexplorerLog.payload.message,
          type: lastKexplorerLog.type === Constants.TYPE_ERROR ? 'negative' : 'warning',
          timeout: 1000,
        });
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
  beforeDestroy() {
    const sessionSubscription = this.subscriptions.find(ts => ts.id === this.session);
    if (typeof sessionSubscription !== 'undefined') {
      sessionSubscription.unsubscribe();
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
