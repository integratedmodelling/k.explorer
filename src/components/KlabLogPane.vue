<template>
  <div id="klab-log-pane">
    <q-list
      striped
      dense
      dark
      id="log-container"
      class="no-padding no-margin no-border"
    >
      <q-item
        v-for="log in klabLogReversedAndFiltered()"
        :key="log.id"
        class="log-item q-pa-xs"
      >
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
import { mapGetters } from 'vuex';
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
      scrollBar: null,
      log: null,
    };
  },
  computed: {
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
  watch: {
    klabLog() {
    //  this.$nextTick(() => {
      this.scrollBar.recalculate();
    //  });
    },
  },
  mounted() {
    this.scrollBar = new SimpleBar(document.getElementById('klab-log-pane'));
  },

};
</script>

<style lang="stylus">
  @import '~variables'
  .q-item.log-item {
    font-size: 10px;
  }
  .log-item .q-item-side {
    min-width auto;
  }
</style>
