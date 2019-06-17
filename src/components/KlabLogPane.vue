<template>
  <div id="klab-log-pane" class="klab-menu-component kp-container">
    <q-list
      dense
      dark
      id="log-container"
      class="no-padding no-margin no-border"
    >
      <template v-if="klabLogReversedAndFiltered().length !== 0">
        <q-item
          v-for="log in klabLogReversedAndFiltered()"
          :key="log.id"
          class="log-item q-pa-xs"
        >
          <template v-if="isSeparator(log)">
            <q-item-main class="klp-separator"><span>{{ $t('label.contextReset') }}</span></q-item-main>
          </template>
          <template v-else>
            <q-item-side>
              <q-item-tile style="font-size: 18px" :icon="logColorAndIcon(log).icon" :color="logColorAndIcon(log).color"></q-item-tile>
            </q-item-side>
            <q-item-main>
              <q-item-tile>{{ logText(log) }}</q-item-tile>
            </q-item-main>
          </template>
        </q-item>
      </template>
      <template v-else>
        <q-item
          class="log-no-items q-pa-xs"
        >
          <q-item-main>
            <q-item-tile>{{ $t('messages.noLogItems') }}</q-item-tile>
          </q-item-main>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { IN } from 'shared/MessagesConstants';
import SimpleBar from 'simplebar';

const LOG_ICON_COLORS = {
  [IN.TYPE_DEBUG]: { icon: 'mdi-console-line', color: 'grey-6' },
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
    isSeparator(log) {
      return log && log.payload && log.payload.separator;
    },
  },
  mounted() {
    this.scrollBar = new SimpleBar(document.getElementById('klab-log-pane'));
  },

};
</script>

<style lang="stylus">
  @import '~variables'
  .kp-container
    max-height: "calc(var(--main-control-max-height) - %s - 10px)" % ($main-control-header-height + $main-control-actions-height)
    .q-item.log-item
      font-size 10px
    .log-item .q-item-side
      min-width auto
    .q-list-dense > .q-item
      padding-left 10px
    .log-no-items
      font-size 1em
      margin 10px 0
      color #ccc
      text-shadow 1px 0 0 #777
    .klp-separator
      width 100%
      text-align center
      border-top 1px solid #555
      border-bottom 1px solid #777
      line-height 0
      margin 10px 0
      &>span
        padding 0 10px
        background-color rgb(113,112,112)
</style>
