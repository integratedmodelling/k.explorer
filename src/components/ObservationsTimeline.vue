<template>
  <div class="ot-wrapper" :class="{ 'ot-no-timestamp': timeEvents.length === 0 || timestamp === -1 }">
    <div
      class="ot-container"
      :class="{ 'ot-active-timeline': visibleEvents.length > 0, 'ot-docked': isMainControlDocked,  }"
    >
      <div class="ot-player" v-if="visibleEvents.length > 0">
        <q-icon
          :name="playTimer === null ? 'mdi-play' : 'mdi-pause'"
          :color="timestamp < scaleReference.end ? 'mc-main' : 'grey-7'"
          :class="{ 'cursor-pointer': timestamp < scaleReference.end }"
          @mousedown.native="startPress"
          @mouseup.native="stopPress"
          @touchstart.native="startPress"
          @touchend.native="stopPress" @touchcancel.native="stopPress"
          flat
        >
        </q-icon>
        <q-tooltip
          class="ot-change-speed-tooltip"
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
          v-html="$t('messages.pressToChangeSpeed',{ multiplier: speedMultiplier })"
        ></q-tooltip>
        <div>
          <q-popover v-model="selectSpeed" class="ot-speed-container">
            <q-list class="ot-speed-selector">
              <q-item
                v-for="speed in [1, 2, 4, 8]" :key="speed"
                class="ot-speed"
                @click.native="changeSpeed(speed)"
                :disabled="speedMultiplier === speed"
                :class="{ 'ot-speed-disabled': speedMultiplier === speed }"
              >x{{ speed }}</q-item>
            </q-list>
          </q-popover>
        </div>
      </div>
      <div class="ot-time row" :class="{ 'ot-time-full': visibleEvents.length === 0 }">
        <div class="ot-date-container">
          <div
            class="ot-date ot-date-start col"
            :class="{ 'ot-with-modifications': timeEvents.length !== 0 ,'ot-date-loaded': engineTimestamp > 0 }"
            @click.self="onClick($event, () => { changeTimestamp(scaleReference.start); })"
            @dblclick="onDblClick($event, () => { changeTimestamp(-1); })"
          >
            <q-icon
              name="mdi-circle-medium"
              v-if="timestamp === -1"
              class="ot-time-origin"
              color="mc-main"
              :class="{ 'ot-time-origin-loaded': timeEvents.length }"
            ></q-icon>
            <q-tooltip
              v-if="timeEvents.length !== 0"
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
              v-html="formatDate(scaleReference.start)"
            ></q-tooltip>

          </div>
          <div class="ot-date-text" v-show="visibleEvents.length === 0">{{ startDate }}</div>
        </div>
        <div
          class="ot-timeline-container col"
          ref="ot-timeline-container"
          :class="{ 'ot-timeline-with-time': timestamp !== -1 }"
        >
          <div
            class="ot-timeline"
            :class="{ 'ot-with-modifications': timeEvents.length !== 0 }"
            ref="ot-timeline"
            @mousemove="moveOnTimeline"
            @mouseenter="timelineActivated = true"
            @mouseleave="timelineActivated = false"
            @click="changeTimestamp(getDateFromPosition($event))"
          >
            <div class="ot-timeline-viewer" v-show="visibleEvents.length > 0"></div>
            <div
              v-for="(modification) in visibleEvents"
              :key="`${modification.id}-${modification.timestamp}`"
              class="ot-modification-container"
              :style="{ left: `calc(${calculatePosition(modification.timestamp)}px - 1px)` }"
            >
              <div class="ot-modification"></div>
            </div>
            <div
              class="ot-loaded-time"
              :style="{ width: engineTimestamp > 0 ? `calc(${calculatePosition(engineTimestamp)}px + 4px)` : 0 }"
            ></div>
            <!--
            <div
              class="ot-player-time"
              v-if="playTimer !== null"
              :style="{ width: `calc(${calculatePosition(timestamp)}px + 4px)` }"
            ></div>
            -->
            <div
              class="ot-actual-time"
              v-if="timestamp !== -1"
              :style="{ left: `calc(${calculatePosition(visibleTimestamp)}px + ${timestamp === scaleReference.end ? '0' : '1'}px)` }">
            </div>

            <q-tooltip
              v-if="timeEvents.length !== 0"
              :offset="[0, 15]"
              self="top middle"
              anchor="bottom middle"
              v-html="timelineDate"
              class="ot-date-tooltip"
              :delay="300"
            ></q-tooltip>
          </div>
        </div>
        <div class="ot-date-container">
          <div
            class="ot-date ot-date-end col"
            @click.self="changeTimestamp(scaleReference.end)"
            :class="{ 'ot-with-modifications': timeEvents.length !== 0, 'ot-date-loaded': engineTimestamp === scaleReference.end }"
          ><q-tooltip
            v-if="timeEvents.length !== 0"
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
            v-html="formatDate(scaleReference.end)"
          ></q-tooltip>
          </div>
          <div class="ot-date-text" v-show="visibleEvents.length === 0">{{ endDate }}</div>
        </div>
      </div>
    </div>
    <observation-time v-if="isMainControlDocked"></observation-time>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { debounce } from 'quasar';
import DoubleClickMixin from 'shared/DoubleClickMixin';
import { TIMES, CUSTOM_EVENTS } from 'shared/Constants';
import ObservationTime from 'components/ObservationTime.vue';

export default {
  name: 'ObservationsTimeline',
  components: {
    ObservationTime,
  },
  mixins: [DoubleClickMixin],
  data() {
    return {
      timelineActivated: false,
      moveOnTimelineFunction: debounce((event) => {
        if (this.timelineActivated) {
          this.timelineDate = this.formatDate(this.getDateFromPosition(event));
        }
      }, 300),
      timelineDate: null,
      timelineContainer: undefined,
      timelineLeft: undefined,
      visibleTimestamp: -1,
      // loadedTime: 0,
      playTimer: null,
      interval: undefined,
      speedMultiplier: 1,
      selectSpeed: false,
      pressTimer: null,
      longPress: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'timeEvents',
      'timestamp',
      'modificationsTask',
      'hasContext',
      'visibleEvents',
      'engineTimestamp',
    ]),
    ...mapGetters('stomp', [
      'tasks',
    ]),
    ...mapGetters('view', [
      'isMainControlDocked',
    ]),
    startDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.start, true) : '';
    },
    endDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.end, true) : '';
    },
  },
  methods: {
    ...mapActions('data', [
      'setTimestamp',
      'setModificationsTask',
    ]),
    ...mapActions('view', [
      'setTimeRunning',
    ]),
    formatDate(date, isStartOrEnd = false, oneLine = false) {
      if (date === null) {
        return '';
      }
      const momentDate = moment(date);
      if (isStartOrEnd) {
        return momentDate.format('DD MMM YYYY');
      }
      return `<div class="ot-date-tooltip-content">${momentDate.format('L')}${oneLine ? ' - ' : '<br />'}${momentDate.format('HH:mm:ss:SSS')}</div>`;
    },
    calculatePosition(timestamp) {
      if (!this.timelineContainer) {
        this.timelineContainer = this.$refs['ot-timeline-container'];
      }
      if (!this.timelineContainer) {
        return 0;
      }
      const position = Math.floor((timestamp - this.scaleReference.start) * (this.timelineContainer.clientWidth) / (this.scaleReference.end - this.scaleReference.start));
      return position;
    },
    moveOnTimeline(event) {
      this.moveOnTimelineFunction(event);
    },
    getDateFromPosition(event) {
      if (!this.timelineContainer) {
        this.timelineContainer = this.$refs['ot-timeline-container'];
      }
      if (!this.timelineContainer) {
        return 0;
      }
      const timelineWidth = this.timelineContainer.clientWidth;
      const x = event.clientX - this.timelineContainer.getBoundingClientRect().left;
      let date = this.scaleReference.start + (x * (this.scaleReference.end - this.scaleReference.start) / timelineWidth);
      if (date > this.scaleReference.end) {
        date = this.scaleReference.end;
      } else if (date < this.scaleReference.start) {
        date = this.scaleReference.start;
      }
      return date;
    },
    changeTimestamp(date) {
      if (this.timeEvents.length === 0) {
        return;
      }
      if (date === -1) {
        this.stop();
      }
      if (date > this.scaleReference.end) {
        this.visibleTimestamp = this.scaleReference.end;
        this.setTimestamp(this.scaleReference.end);
      } else {
        this.visibleTimestamp = date;
        this.setTimestamp(date);
      }
    },
    stop() {
      clearInterval(this.playTimer);
      this.playTimer = null;
    },
    run() {
      if (this.playTimer !== null) {
        this.stop();
      } else {
        if (!this.interval) {
          this.calculateInterval();
        }
        if (this.timestamp === -1) {
          this.changeTimestamp(this.scaleReference.start);
        }
        let toLoad = { start: this.timestamp, stop: this.timestamp + this.interval.buffer };
        this.playTimer = setInterval(() => {
          // this.$nextTick(() => {
          this.changeTimestamp(Math.floor(this.timestamp + this.interval.step));
          this.$nextTick(() => {
            if (this.timestamp >= this.scaleReference.end) {
              this.stop();
              return;
            }
            // console.warn(`Timestamp:${this.timestamp};toLoad.start:${toLoad.start};toLoad.stop:${toLoad.stop};LIMIT:${toLoad.stop - this.scaleReference.schedulingResolution};this.scaleReference.schedulingResolution:${this.scaleReference.schedulingResolution};this.scaleReference.end:${this.scaleReference.end}`);
            if (this.timestamp > toLoad.stop - this.interval.step && this.timestamp <= this.scaleReference.end) {
              toLoad = { start: this.timestamp, stop: this.timestamp + this.interval.buffer };
              this.$eventBus.$emit(CUSTOM_EVENTS.NEED_LAYER_BUFFER, toLoad);
            }
          });
          // });
        }, this.interval.interval);
        this.$eventBus.$emit(CUSTOM_EVENTS.NEED_LAYER_BUFFER, toLoad);
      }
    },
    calculateInterval() {
      if (this.scaleReference && this.scaleReference.schedulingResolution) {
        let divider = 1;
        const position = this.calculatePosition(this.scaleReference.start + this.scaleReference.schedulingResolution);
        if (position > 1) {
          divider = position;
        }
        const step = (this.scaleReference.schedulingResolution || TIMES.DEFAULT_STEP) / divider;
        const steps = (this.scaleReference.end - this.scaleReference.start) / step;
        const timeToLoad = Math.max(document.body.clientHeight, document.body.clientWidth); // assume 1ms por px in Enrico computer
        const buffer = (this.scaleReference.end - this.scaleReference.start) / 4;
        let interval = timeToLoad / divider;
        if (interval * steps < TIMES.MIN_PLAY_TIME) {
          interval = TIMES.MIN_PLAY_TIME / steps;
        } else if (interval > TIMES.MAX_PLAY_TIME) {
          interval = TIMES.MAX_PLAY_TIME / steps;
        }
        interval /= this.speedMultiplier;
        this.interval = {
          step,
          steps,
          interval,
          buffer,
          multiplier: this.speedMultiplier,
        };
        console.info(`Step: ${this.interval.step}; Steps: ${this.interval.steps}; Interval: ${this.interval.interval}; Buffer: ${this.interval.buffer}`);
      }
    },
    startPress() {
      this.longPress = false;
      if (this.pressTimer) {
        clearInterval(this.pressTimer);
        this.pressTimer = null;
      } else {
        this.pressTimer = setTimeout(() => {
          this.selectSpeed = true;
          this.longPress = true;
        }, 600);
      }
    },
    stopPress() {
      clearInterval(this.pressTimer);
      this.pressTimer = null;
      if (!this.longPress && this.timestamp < this.scaleReference.end) {
        this.run();
      }
      this.longPress = false;
      // console.warn('Timer removed');
    },
    changeSpeed(speedMultiplier) {
      this.speedMultiplier = speedMultiplier;
      this.selectSpeed = false;
      if (this.interval) {
        this.$nextTick(() => {
          this.interval.interval = this.interval.interval * this.interval.multiplier / this.speedMultiplier;
          this.interval.multiplier = this.speedMultiplier;
          if (this.playTimer !== null) { // we need to restart
            this.stop();
            this.run();
          }
        });
      }
    },
  },
  watch: {
    timeEvents() {
      /*
      if (!this.interval) {
        this.calculateInterval();
      }
      /*
      if (newValue.length > 0) {
        this.loadedTime = newValue[newValue.length - 1].timestamp;
      }
      */
    },
    tasks(newValue) {
      if (newValue.length > 0 && this.modificationsTask) {
        const task = newValue.find(t => t.id === this.modificationsTask.id);
        if (task && !task.alive) {
          this.setModificationsTask(null);
        }
      }
    },
    visibleEvents() {
      if (this.visibleEvents.length === 0 && this.playTimer !== null) {
        this.stop();
      }
    },
    timestamp(newValue, oldValue) {
      if (this.isMainControlDocked && (newValue === -1 || oldValue === -1)) {
        this.timelineContainer = undefined;
      }
    },
    playTimer() {
      this.setTimeRunning(this.playTimer !== null);
    },
  },
  mounted() {
    this.timelineDate = this.startTime;
    this.visibleTimestamp = this.timestamp;
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    this.$eventBus.$on(CUSTOM_EVENTS.NEW_SCHEDULING, this.calculateInterval);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.NEW_SCHEDULING, this.calculateInterval);
  },
  destroyed() {
    this.stop();
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $timeline-balls-size = 16px
  $timeline-small-size = 6px
  $timeline-modification-size = 6px
  $timeline-viewer-size = 10px
  $timeline-player-width = 20px
  $timeline-empty-color = #555
  $timeline-empty-color-with-event = #888
  $timeline-loaded-color = $main-control-main-color
  $timeline-time-origin-color = $main-control-cyan
  $timeline-fill-color = #888
  $timeline-viewer-color = #666
  .ot-wrapper
    width 100%
    &.ot-no-timestamp .ot-container.ot-docked
      width calc(100% - 5px)
      // padding: 0 "calc(50% - %s / 2)" % ($leftmenu-content-width - $timestampViewerWidth);
    &:not(.ot-no-timestamp) .ot-container.ot-docked
      width $leftmenu-content-width - $timestampViewerWidth - 1px
      float left
  .ot-container
    position relative
    .ot-player
      width $timeline-player-width
      height $timeline-balls-size
      line-height $timeline-balls-size
      float left
      .q-icon
        vertical-align baseline !important
    .ot-time
      width "calc(100% - %s)" % $timeline-player-width
      position relative
      &.ot-time-full
        left ($timeline-player-width / 2)
      .ot-date
        min-width $timeline-balls-size
        max-width $timeline-balls-size
        height $timeline-balls-size
        line-height $timeline-balls-size
        font-size $timeline-balls-size
        text-align center
        vertical-align middle
        background-color $timeline-empty-color
        border-radius ($timeline-balls-size / 2)
        position relative
        cursor default
        transition background-color .5s ease
        &.ot-with-modifications
          cursor pointer
          background-color $timeline-empty-color-with-event
        &.ot-date-loaded
          background-color $timeline-loaded-color
        &.ot-date-fill
          background-color $timeline-loaded-color
        &.ot-date-start + .ot-date-text
            left $timeline-balls-size
        &.ot-date-end + .ot-date-text
            right $timeline-balls-size
        .ot-time-origin
          vertical-align baseline
          transition background-color .5s ease
          &.ot-time-origin-loaded
            color $timeline-time-origin-color
      .ot-date-text
        white-space nowrap
        font-size 8px
        position absolute
        top -4px
        color #888
        font-weight 400
        letter-spacing 1px
        padding 0
        user-select none
        -khtml-user-select none
        -o-user-select none
        -moz-user-select -moz-none
        -webkit-user-select none
      .ot-timeline-container
        .ot-timeline
          height $timeline-small-size
          width calc(100% + 4px)
          background-color $timeline-empty-color
          position relative
          top ($timeline-balls-size / 2) - ($timeline-small-size / 2)
          margin 0 -2px
          padding 0 2px
          transition background-color .5s ease
          &.ot-with-modifications
            cursor pointer
            background-color $timeline-empty-color-with-event
          .ot-modification-container
            z-index 10000
            width $timeline-balls-size * 2
            height $timeline-modification-size
            position absolute
            top $timeline-viewer-size - ($timeline-modification-size / 2)
            .ot-modification
              height 100%
              width 1px
              margin-left 1px
              border-left 1px solid #555
              border-right 1px solid #aaa
          .ot-actual-time
            width 2px
            height $timeline-small-size
            background-color $main-control-main-color
            position absolute
            margin-right 4px
            top 0
            z-index 10001
          .ot-loaded-time
            height $timeline-small-size
            left -2px
            background-color $timeline-loaded-color
            position relative
            top 0
    &.ot-active-timeline
      .ot-time
      // .ot-timeline-with-time .ot-modification
      //   border-right-color $main-control-main-color !important
        .ot-date-start
          border-top-right-radius 0
          border-bottom-right-radius 0
          cursor pointer
        .ot-date-end
          border-top-left-radius 0
          border-bottom-left-radius 0
          cursor pointer
        .ot-timeline
          height $timeline-balls-size
          width 100%
          top 0
          margin 0
          .ot-timeline-viewer
            height $timeline-viewer-size
            background-color $timeline-viewer-color
            border-radius 2px
            width calc(100% - 2px)
            position absolute
            top (($timeline-balls-size - $timeline-viewer-size) / 2)
            z-index 9000
          .ot-loaded-time
            height $timeline-balls-size
          .ot-actual-time
            height $timeline-viewer-size
            top (($timeline-balls-size - $timeline-viewer-size) / 2)
  .ot-date-tooltip
    width 100px
    .ot-date-tooltip-content
      text-align center

  .ot-speed-container
    border-radius 6px
    margin-left -6px
    .ot-speed-selector
      padding 5px 0
      background-color rgba(35,35,35,0.8)
      color #eee
      .ot-speed
        min-height 20px
        font-size small
        padding 5px
        &.ot-speed-disabled
          color $main-control-main-color
          font-weight 800
        &:hover
          background-color #333
          color $main-control-yellow
          cursor pointer
  .ot-change-speed-tooltip
    text-align center

</style>
