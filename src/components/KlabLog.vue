<template>
  <div class="row full-width bg-red-1">
    <div class="col-1 no-padding stomp-status bg-red-1">
      <q-icon :name="iconName" :color="iconColor"></q-icon>
    </div>
    <div class="col-6 message-log q-pt-xs stomp-message bg-red-1">
      <q-icon name="call_received" :color="hasError ? 'negative' : 'positive'"></q-icon>
      <span :class="`text-${hasError ? 'negative' : 'positive'}`">{{ receivedMessage }}</span>
    </div>
    <div class="col-5 message-log q-pt-xs stomp-message bg-red-1">
      <q-icon name="call_made"></q-icon>
      <span>{{ sendedMessage }}</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'KLabLog',
  computed: {
    ...mapState('stomp', [
      'connectionState',
    ]),
    ...mapGetters('stomp', [
      'lastSendedMessage',
      'lastReceivedMessage',
      'queuedMessage',
    ]),
    iconName() {
      if (this.connectionState === this.$constants.CONNECTION_WORKING) {
        return 'sync';
      } else if (this.connectionState === this.$constants.CONNECTION_DOWN) {
        return 'signal_wifi_off';
      }
      return 'signal_wifi_4_bar';
    },
    iconColor() {
      if (this.connectionState === this.$constants.CONNECTION_WORKING) {
        return 'warning';
      } else if (this.connectionState === this.$constants.CONNECTION_DOWN) {
        return 'negative';
      }
      return 'positive';
    },
    hasError() {
      return this.lastReceivedMessage &&
        this.lastReceivedMessage.type === this.$constants.TYPE_ERROR;
    },
    receivedMessage() {
      if (this.lastReceivedMessage) {
        if (this.lastReceivedMessage.type === this.$constants.TYPE_ERROR) {
          return this.lastReceivedMessage.message.reason === '' ?
            this.$t('label.klabUnknownError') : this.lastReceivedMessage.message.reason;
        }
        return `${this.lastReceivedMessage.message.command} - ${this.lastReceivedMessage.date}`;
      }
      return this.$t('label.klabNoMessage');
    },
    sendedMessage() {
      if (this.queuedMessage) {
        return this.$t('label.klabMessagesToSend');
      }
      return this.lastSendedMessage ?
        `${this.lastSendedMessage.date} [${this.$helpers.formatExtent(this.lastSendedMessage.payload)}]`
        // JSON.stringify(this.lastSendedMessage)
        || this.$t('label.klabNoDate')
        : this.$t('label.klabNoMessage');
    },
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
