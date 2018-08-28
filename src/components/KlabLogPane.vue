<template>
  <div id="simplebar-log-div">
    <q-list
      v-for="(action, index) in reverseLogActions"
      :key="index"
      striped
      dense
      separator
      dark
      id="log-container"
      class="no-padding no-margins"
      >
      <q-item class="log-item">
        <q-item-side>
          <q-item-tile icon="ion-ios-information-circle" :color="action.type === $constants.TYPE_ERROR ?
            'negative' : action.type === $constants.TYPE_WARN ? 'warning' : 'positive'" />
        </q-item-side>
        <q-item-main>
          <q-item-tile>{{ logActionText(action) }}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

export default {
  name: 'KLabLogPane',
  data() {
    return {
      CONN_INDICATOR: {
        [this.$constants.CONNECTION_UP]: { icon: 'signal_wifi_4_bar', color: 'positive' },
        [this.$constants.CONNECTION_DOWN]: { icon: 'signal_wifi_off', color: 'positive' },
        [this.$constants.CONNECTION_WORKING]: { icon: 'sync', color: 'warning' },
        [this.$constants.CONNECTION_UNKNOWN]: { icon: 'signal_wifi_4_bar', color: 'positive' },
        [this.$constants.CONNECTION_ERROR]: { icon: 'signal_wifi_off', color: 'negative' },
      },
      scrollElement: null,
    };
  },
  computed: {
    ...mapState('stomp', [
      'connectionState',
    ]),
    ...mapGetters('view', [
      'reverseLogActions',
    ]),
  },
  methods: {
    logActionText(action) {
      if (action && action.payload) {
        return `${action.time ? action.time.format('HH:mm:ss') : 'no time'}: ${action.payload.message || action.payload}`;
      }
      return this.$t('label.klabNoMessage');
    },
  },
  mounted() {
    this.scrollElement = (new SimpleBar(document.getElementById('simplebar-log-div'))).getScrollElement();
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .q-item.log-item {
    font-size: 10px;
    overflow-x: hidden;
  }
</style>
