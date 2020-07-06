<template>
  <div id="klab-log-pane" class="klab-menu-component kp-container">
    <div class="klp-level-selector">
      <ul>
        <li v-for="(level, key, index) in LOG_ICONS" :key="index" :class="{ 'klp-selected': hasLevel(key) }">
          <q-btn
            dense
            size="sm"
            class="klp-chip"
            :icon="level.icon"
            :color="level.color"
            @click="toggleLevel(key)"
          >
            <q-tooltip
              :delay="600"
              :offset="[0, 5]"
            >{{ $t(level.i18nlabel) }}</q-tooltip>
          </q-btn>
        </li>
      </ul>
    </div>
    <q-list
      dense
      dark
      id="log-container"
      class="no-padding no-border"
    >
      <template v-if="logs.length !== 0">
        <q-item
          v-for="(log, index) in logs"
          :key="index"
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
          class="log-item log-no-items q-pa-xs"
        >
          <q-item-side>
            <q-item-tile style="font-size: 18px" :icon="levels.length === 0 ? 'mdi-alert-outline' : 'mdi-information-outline'"></q-item-tile>
          </q-item-side>
          <q-item-main>
            <q-item-tile>{{ levels.length === 0 ? $t('messages.noLevelSelected') : $t('messages.noLogItems') }}</q-item-tile>
          </q-item-main>
        </q-item>
      </template>
    </q-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { IN } from 'shared/MessagesConstants';
import SimpleBar from 'simplebar';
import moment from 'moment';

const LOG_ICONS = {
  [IN.TYPE_ERROR]: { i18nlabel: 'label.levelError', icon: 'mdi-close-circle', color: 'negative' },
  [IN.TYPE_WARNING]: { i18nlabel: 'label.levelWarning', icon: 'mdi-alert', color: 'warning' },
  [IN.TYPE_INFO]: { i18nlabel: 'label.levelInfo', icon: 'mdi-information', color: 'info' },
  [IN.TYPE_DEBUG]: { i18nlabel: 'label.levelDebug', icon: 'mdi-console-line', color: 'grey-6' },
  [IN.TYPE_ENGINEEVENT]: { i18nlabel: 'label.levelEngineEvent', icon: 'mdi-settings-outline', color: 'secondary' },
};

export default {
  name: 'KLabLogPane',
  data() {
    return {
      scrollBar: null,
      log: null,
      LOG_ICONS,
    };
  },
  computed: {
    ...mapGetters('view', [
      'klabLogReversedAndFiltered',
      'levels',
    ]),
    logs() {
      return this.levels.length === 0 ? [] : this.klabLogReversedAndFiltered(this.levels.length === 5 ? [] : this.levels);
    },
  },
  methods: {
    ...mapActions('view', [
      'setLevels',
      'toggleLevel',
    ]),
    logText(log) {
      if (log && log.payload) {
        if (log.type === IN.TYPE_ENGINEEVENT) {
          let { time } = log;
          if (log.payload.timestamp) {
            time = moment(log.payload.timestamp);
          }
          return `${time.format('HH:mm:ss')}: ${this.$t(`engineEventLabels.evt${log.payload.type}`)} ${log.payload.started ? 'started' : 'stopped'}`;
        }
        return `${log.time ? log.time.format('HH:mm:ss') : this.$t('messages.noTime')}: ${log.payload}`;
      }
      return this.$t('label.klabNoMessage');
    },
    logColorAndIcon(log) {
      const ret = LOG_ICONS[log.type];
      if (!ret) {
        console.warn(`Log type: ${log.type}`, log);
        return LOG_ICONS.Error;
      }
      return LOG_ICONS[log.type];
    },
    isSeparator(log) {
      return log && log.payload && log.payload.separator;
    },
    hasLevel(level) {
      return this.levels.indexOf(level) !== -1;
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
    max-height "calc(var(--main-control-max-height) - %s - 10px)" % ($main-control-header-height + $main-control-actions-height)
    .simplebar-scroll-content
      padding-right 15px !important
    &.lm-component
      max-height 100%
    #log-container
      margin 10px 0
    .q-item
      &.log-item
        font-size 10px
      &.log-no-items
        font-size 12px
        color #ccc
        text-shadow 1px 0 0 #777

  .log-item .q-item-side
      min-width auto
    .q-list-dense > .q-item
      padding-left 10px
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
    .klp-level-selector
      border-bottom 1px dotted #ccc
      ul
        margin 10px 0
        padding-left 10px
        list-style none
        li
          display inline-block
          padding-right 10px
          opacity .5
          &.klp-selected
            opacity 1
          .klp-chip
            padding 2px 8px
            cursor pointer

</style>
