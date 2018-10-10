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
          <q-item-tile style="font-size: 18px" :icon="logColorAndIcon(log).icon" :color="logColorAndIcon(log).color"></q-item-tile>
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
import { IN } from 'shared/MessagesConstants';
import SimpleBar from 'simplebar';

const LOG_ICON_COLORS = {
  [IN.TYPE_DEBUG]: { icon: 'mdi-console-line', color: 'black' },
  [IN.TYPE_INFO]: { icon: 'mdi-information', color: 'info' },
  [IN.TYPE_WARNING]: { icon: 'mdi-alert', color: 'warning' },
  [IN.TYPE_ERROR]: { icon: 'mdi-close-circle', color: 'negative' },
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
    //  this.$nextTick(() =>
    //  this.scrollBar.recalculate();
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
  #klab-log-pane
    max-height: "calc(90vh - %s - 10px)" % ($main-control-header-height + $main-control-actions-height)
    .q-item.log-item
      font-size 10px
    .log-item .q-item-side
      min-width auto
    .q-list-dense > .q-item
      padding-left 10px
</style>
