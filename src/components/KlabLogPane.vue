<template>
  <div id="simplebar-log-div">
    <q-list
      v-for="log in klabLogReversedAndFiltered()"
      :key="log.id"
      striped
      dense
      separator
      dark
      id="log-container"
      class="no-padding no-margins"
      >
      <q-item class="log-item">
        <q-item-side>
          <q-item-tile :icon="logColorAndIcon(log).icon" :color="logColorAndIcon(log).color"></q-item-tile>
        </q-item-side>
        <q-item-main>
          <q-item-tile>{{ logText(log) }}</q-item-tile>
        </q-item-main>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { IN } from '../shared/MessagesConstants';
import SimpleBar from 'simplebar';
import 'simplebar/dist/simplebar.css';

const LOG_ICON_COLORS = {
  [IN.TYPE_DEBUG]: { icon: 'ion-ios-bug', color: 'black' },
  [IN.TYPE_INFO]: { icon: 'ion-md-information-circle', color: 'info' },
  [IN.TYPE_WARNING]: { icon: 'ion-ios-warning', color: 'warning' },
  [IN.TYPE_ERROR]: { icon: 'ion-ios-close-circle', color: 'negative' },
};
export default {
  name: 'KLabLogPane',
  data() {
    return {
      scrollElement: null,
    };
  },
  computed: {
    ...mapState('stomp', [
      'connectionState',
    ]),
    ...mapGetters('view', [
      'klabLogReversedAndFiltered',
    ]),
  },
  methods: {
    logText(log) {
      if (log && log.payload) {
        return `${log.time ? log.time.format('HH:mm:ss') : this.$t('messages.noTime')}: ${log.payload}`;
      }
      return this.$t('label.klabNoMessage');
    },
    logColorAndIcon(log) {
      return LOG_ICON_COLORS[log.type];
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
