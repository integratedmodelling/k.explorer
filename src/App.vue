<template>
  <div id="q-app" v-cloak>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { IN } from 'shared/MessagesConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import Vue from 'vue';
import { MESSAGE_TYPES, OBSERVATION_DEFAULT, ENGINE_EVENTS, CONNECTION_CONSTANTS } from 'shared/Constants';
import '@mdi/font/css/materialdesignicons.css';

export default {
  name: 'App',
  computed: {
    ...mapState('stomp', [
      'subscriptions',
    ]),
    ...mapGetters('data', [
      'session',
      'isLocal',
    ]),
    ...mapGetters('stomp', [
      'queuedMessage',
    ]),
    ...mapGetters('view', [
      'lastKexplorerLog',
      'kexplorerLog',
      'isApp',
    ]),
  },
  methods: {
    sendQueue() {
      if (this.queuedMessage) {
        const { message, headers } = this.queuedMessage;
        this.sendStompMessage(message, headers);
      }
    },
    ...mapActions('data', [
      'loadSessionReference',
      'getSessionContexts',
    ]),
    ...mapActions('stomp', {
      stompCleanQueue: 'stomp_cleanqueue',
      setConnectionState: 'setConnectionState',
    }),
  },
  sockets: {
    onconnect(frame) {
      console.info('Connected to websocket');
      console.debug(`Connect frame:\n${JSON.stringify(frame, null, 4)}`);
      const sessionSubscriptionObject = this.subscriptions.find(ts => ts.id === this.session);
      if (typeof sessionSubscriptionObject !== 'undefined') {
        console.warn(`Invalidate session ${this.session}`); // very strange behaviour
        sessionSubscriptionObject.subscription.unsubscribe();
      }
      // watch engine event
      this.sendStompMessage(MESSAGES_BUILDERS.WATCH_ENGINE_EVENT({
        active: true,
        eventType: ENGINE_EVENTS.RESOURCE_VALIDATION,
      }, this.session).body);
      // before subscribe, we load contexts linked to this session
      this.getSessionContexts()
        .then((restored) => {
          console.info(`Retrieved ${restored} previous contexts`);
          const subscription = this.subscribe(this.session);
          this.subscriptions.push({ id: this.session, subscription });
          console.info(`Session ${this.session} subscribed with subscriptionid ${subscription.id}`);
          this.sendQueue();
        })
        .catch((error) => {
          console.warn(`Problems with session restoration: ${error}`);
          this.disconnect();
        });
    },
    // onsubscribe(subscription) {
    // const subscriptionObject = this.subscriptions.find(s => s.subscription.id === subscription.id);
    // if (typeof subscriptionObject !== 'undefined') {
    // console.log(`Someone subscribe with id: ${subscription.id}`);
    // }
    // },
    onmessage({ body }) {
      const { type, payload } = JSON.parse(body);
      if (type === IN.TYPE_TASKSTARTED) {
        const subscription = this.subscribe(payload.id);
        this.subscriptions.push({ id: payload.id, subscription });
        console.debug(`Task ${payload.id} subscribed with subscriptionid ${subscription.id}`);
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
    onerrorsend: (error) => {
      console.log(`Error sending: ${JSON.stringify(error)}`);
    },
    */
    onsend({ message }) {
      if (this.queuedMessage && message === this.queuedMessage.message) {
        this.stompCleanQueue();
        // console.debug(`Send a queued message: ${JSON.stringify(message)} with this headers: ${JSON.stringify(headers)}`);
      }
    },
  },
  watch: {
    kexplorerLog() {
      const lastKexplorerLog = this.lastKexplorerLog();
      if (lastKexplorerLog !== null && (lastKexplorerLog.type === MESSAGE_TYPES.TYPE_ERROR
          || lastKexplorerLog.type === MESSAGE_TYPES.TYPE_WARNING || lastKexplorerLog.important)) {
        this.$q.notify({
          message: lastKexplorerLog.payload.message,
          type: lastKexplorerLog.type === MESSAGE_TYPES.TYPE_ERROR ? 'negative' : (lastKexplorerLog.type === MESSAGE_TYPES.TYPE_WARNING ? 'warning' : 'info'),
          icon: lastKexplorerLog.type === MESSAGE_TYPES.TYPE_ERROR ? 'mdi-alert-circle' : (lastKexplorerLog.type === MESSAGE_TYPES.TYPE_WARNING ? 'mdi-alert' : 'mdi-information'),
          timeout: 1500,
        });
        let message = `${lastKexplorerLog.payload.message}`;
        const { attach } = lastKexplorerLog.payload;
        if (attach) {
          if (typeof attach === 'object') {
            message += `:\n${JSON.stringify(attach, null, 4)}`;
          } else {
            message += `: ${attach}`;
          }
        }
        switch (lastKexplorerLog.type) {
          case MESSAGE_TYPES.TYPE_DEBUG:
            if (process.env.KEXPLORER_DEBUG) {
              console.debug();
            }
            break;
          case MESSAGE_TYPES.TYPE_INFO:
            console.info(message);
            break;
          case MESSAGE_TYPES.TYPE_WARNING:
            console.warn(message);
            break;
          case MESSAGE_TYPES.TYPE_ERROR:
            console.error(message);
            break;
          default:
            console.warn(`Unknown type: ${lastKexplorerLog.type}`, message);
        }
      }
    },
  },
  beforeMount() {
    this.$store.dispatch('data/addObservation', {
      observation: OBSERVATION_DEFAULT,
      main: true,
    }, { root: true });
    const self = this;
    this.loadSessionReference()
      .then(() => {
        console.info('Session reference loaded');
      })
      .catch((error) => {
        if (error.message === 'Invalid session') {
          if (!self.isLocal) {
            window.location = `${process.env.WS_BASE_URL}${process.env.ENGINE_LOGIN}`;
          } else {
            this.setConnectionState({ state: CONNECTION_CONSTANTS.CONNECTION_ERROR, error });
            console.error(error);
          }
        } else {
          this.setConnectionState({ state: CONNECTION_CONSTANTS.CONNECTION_ERROR, error });
          console.error(error);
        }
      });
  },
  mounted() {
    // Only in dev (see https://vuejs.org/v2/api/#warnHandler): stop the annoying warning of letter
    this.$store.$app = this;
    Vue.config.warnHandler = (msg, vm, trace) => {
      if (msg.indexOf('"letter"') === -1) {
        console.warn(`[Intercepted Vue warn]: ${msg}${trace}`);
      }
    };
  },
  beforeDestroy() {
    const sessionSubscription = this.subscriptions.find(ts => ts.id === this.session);
    if (typeof sessionSubscription !== 'undefined' && typeof sessionSubscription.unsubscribe === 'function') {
      sessionSubscription.unsubscribe();
    }
    this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
  },
};

</script>

<style>
  [v-cloak] > * { display:none; }
  [v-cloak]::before {
    content: " ";
    display: block;
    width: 128px;
    height: 128px;
    background-image: url('statics/klab-logo.png');
  }
  .q-notify {
    padding: 5px;
  }
</style>
