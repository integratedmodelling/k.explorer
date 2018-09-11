<template>
  <div class="row full-width bg-gray-1">
    <div class="col-1 no-padding stomp-status bg-gray-1">
      <q-icon
        :name="CONN_INDICATOR[connectionState].icon"
        :color="CONN_INDICATOR[connectionState].color"></q-icon>
    </div>
    <div class="col-3 message-log q-pt-xs stomp-message bg-gray-1">
      <q-icon name="call_received" :color="hasError ? 'negative' : 'positive'"></q-icon>
      <span :class="`text-${hasError ? 'negative' : 'positive'}`">{{ receivedMessage }}</span>
    </div>
    <div class="ic"></div>
    <div class="col-4 message-log q-pt-xs stomp-message bg-gray-1">
      <q-icon name="call_made"></q-icon>
      <span>{{ sendedMessage }}</span>
    </div>
    <div class="col-4 message-log q-pt-xs stomp-message bg-gray-1">
      <q-icon name="ion-at" :color="lastLogActionMessage.color"></q-icon>
      <span :class="[ 'text-'+lastLogActionMessage.color ]">
        {{ lastLogActionMessage.text }} / {{ lastLogActionMessage.time }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
//  import { Helpers } from 'shared/Helpers';

export default {
  name: 'KLabLog',
  data() {
    return {
      CONN_INDICATOR: {
        [this.$constants.CONNECTION_UP]: { icon: 'signal_wifi_4_bar', color: 'positive' },
        [this.$constants.CONNECTION_DOWN]: { icon: 'signal_wifi_off', color: 'positive' },
        [this.$constants.CONNECTION_WORKING]: { icon: 'sync', color: 'warning' },
        [this.$constants.CONNECTION_UNKNOWN]: { icon: 'signal_wifi_4_bar', color: 'positive' },
        [this.$constants.CONNECTION_ERROR]: { icon: 'signal_wifi_off', color: 'negative' },
      },
    };
  },
  computed: {
    ...mapState('stomp', [
      'connectionState',
    ]),
    ...mapGetters('stomp', [
      'lastSendedMessage',
      'lastReceivedMessage',
      'queuedMessage',
    ]),
    ...mapGetters('view', [
      'lastKexplorerLog',
    ]),

    hasError() {
      return this.lastReceivedMessage
        && this.lastReceivedMessage.type === this.$constants.TYPE_ERROR;
    },
    receivedMessage() {
      if (this.lastReceivedMessage) {
        if (this.lastReceivedMessage.type === this.$constants.TYPE_ERROR) {
          // eslint-disable-next-line no-nested-ternary
          return this.lastReceivedMessage.message.reason === ''
            ? this.$t('label.klabUnknownError') : this.lastReceivedMessage.message.reason;
        }
        if (this.lastReceivedMessage.message.body !== '') {
          const body = JSON.parse(this.lastReceivedMessage.message.body);
          let toString;
          if (typeof body.payload === 'string') {
            toString = body.payload;
          } else {
            toString = body.type
              || this.lastReceivedMessage.message.body.command;
          }
          return `${toString} - ${this.lastReceivedMessage.date}`;
        }
        return `${this.lastReceivedMessage.message.command} - ${this.lastReceivedMessage.date}`;
      }
      return this.$t('label.klabNoMessage');
    },
    sendedMessage() {
      if (this.queuedMessage) {
        return this.$t('label.klabMessagesToSend');
      }
      return this.lastSendedMessage
        ? `${this.lastSendedMessage.date}` // [${Helpers.formatExtent(this.lastSendedMessage.payload)}]`
        // JSON.stringify(this.lastSendedMessage)
        || this.$t('label.klabNoDate')
        : this.$t('label.klabNoMessage');
    },
    lastLogActionMessage() {
      const kexplorerLog = this.lastKexplorerLog();
      if (typeof kexplorerLog !== 'undefined' && kexplorerLog.payload) {
        return {
          text: kexplorerLog.payload.message || kexplorerLog.payload,
          time: kexplorerLog.time ? kexplorerLog.time.format('HH:mm:ss') : 'no time',
          // eslint-disable-next-line no-nested-ternary
          color: kexplorerLog.type === this.$constants.TYPE_ERROR
            ? 'negative' : kexplorerLog.type === this.$constants.TYPE_WARNING ? 'warning' : 'positive',
        };
      }
      return this.$t('label.klabNoMessage');
    },
  },
  watch: {
  },
  mounted() {
  },
};
</script>

<style>
  .message-log {
    height: 2em;
    overflow: hidden;
  }
  .stomp-status{
    font-size: larger;
  }
  .stomp-message {
    font-size: small;
  }

</style>
