<template>
  <div
    class="ot-container"
    :class="{ 'ot-active-timeline': visibleEvents.length > 0 }"
  >
    <div class="ot-player" v-if="visibleEvents.length > 0">
      <q-icon
        :name="playTimer === null ? 'mdi-play' : 'mdi-pause'"
        :color="timestamp < scaleReference.end ? 'mc-main' : 'grey-7'"
        :class="{ 'cursor-pointer': timestamp < scaleReference.end }"
        @click.native="timestamp < scaleReference.end > 0 && run($event)"
      ></q-icon>
    </div>
    <div class="ot-time row" :class="{ 'ot-time-full': visibleEvents.length === 0 }">
      <div class="ot-date-container">
        <div
          class="ot-date ot-date-start col"
          :class="{ 'ot-date-loaded': loadedTime > 0 }"
          @click.self="onClick($event, () => { changeTimestamp(scaleReference.start); })"
          @dblclick="onDblClick($event, () => { changeTimestamp(-1); })"
        >
          <q-icon
            name="mdi-circle-medium"
            v-if="timestamp === -1"
            class="ot-time-origin"
            color="mc-main"
          ></q-icon>
          <q-tooltip
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
            :style="{ width: `calc(${calculatePosition(loadedTime)}px + 6px)` }"
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
          :class="{ 'ot-date-loaded': loadedTime === scaleReference.end }"
        ><q-tooltip
          :offset="[0, 8]"
          self="top middle"
          anchor="bottom middle"
          v-html="formatDate(scaleReference.end)"
        ></q-tooltip>
        </div>
        <div class="ot-date-text" v-show="visibleEvents.length === 0">{{ endDate }}</div>
      </div>
    </div>
    <div
      class="ot-now"
      :class="{ 'ot-hidden': visibleEvents.length === 0, 'ot-active': visibleEvents.length > 0, 'ot-running': playTimer !== null }"
      v-html="formatDate(timestamp, false, true)"
    ></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { debounce } from 'quasar';
import DoubleClickMixin from 'shared/DoubleClickMixin';
import { TIMES, CUSTOM_EVENTS } from 'shared/Constants';

export default {
  name: 'ObservationsTimeline',
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
      timelineWidth: undefined,
      timelineLeft: undefined,
      visibleTimestamp: -1,
      loadedTime: 0,
      playTimer: null,
      interval: undefined,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'modificationEvents',
      'timestamp',
      'visibleObservations',
      'modificationsTask',
      'hasContext',
    ]),
    ...mapGetters('stomp', [
      'tasks',
    ]),
    startDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.start, true) : '';
    },
    endDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.end, true) : '';
    },
    visibleEvents() {
      const ids = this.visibleObservations.map(o => o.id);
      return this.modificationEvents.filter(me => ids.includes(me.id));
    },
  },
  methods: {
    ...mapActions('data', [
      'setTimestamp',
      'setModificationsTask',
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
      const timeline = this.$refs['ot-timeline-container'];
      if (!timeline) {
        return 0;
      }
      const position = Math.floor((timestamp - this.scaleReference.start) * (timeline.clientWidth) / (this.scaleReference.end - this.scaleReference.start));
      return position;
    },
    moveOnTimeline(event) {
      this.moveOnTimelineFunction(event);
    },
    getDateFromPosition(event) {
      const timeline = this.$refs['ot-timeline-container'];
      if (!timeline) {
        return 0;
      }
      const timelineWidth = timeline.clientWidth;
      const x = event.clientX - timeline.getBoundingClientRect().left;
      let date = this.scaleReference.start + (x * (this.scaleReference.end - this.scaleReference.start) / timelineWidth);
      if (date > this.scaleReference.end) {
        date = this.scaleReference.end;
      } else if (date < this.scaleReference.start) {
        date = this.scaleReference.start;
      }
      return date;
    },
    changeTimestamp(date) {
      if (date > this.scaleReference.end) {
        this.visibleTimestamp = this.scaleReference.end;
        this.setTimestamp(this.scaleReference.end);
      } else {
        this.visibleTimestamp = date;
        this.setTimestamp(date);
      }
    },
    run() {
      if (this.playTimer !== null) {
        clearInterval(this.playTimer);
        this.playTimer = null;
      } else {
        if (this.timestamp === -1) {
          this.changeTimestamp(this.scaleReference.start);
        }
        let toLoad = { start: this.timestamp, stop: this.timestamp + this.interval.buffer };
        this.playTimer = setInterval(() => {
          // this.$nextTick(() => {
          this.changeTimestamp(Math.floor(this.timestamp + this.interval.step));
          this.$nextTick(() => {
            if (this.timestamp >= this.scaleReference.end) {
              clearInterval(this.playTimer);
              this.playTimer = null;
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
        this.interval = { step, steps, interval, buffer };
        console.info(`Step: ${this.interval.step}; Steps: ${this.interval.steps}; Interval: ${this.interval.interval}; Buffer: ${this.interval.buffer}`);
      }
    },
  },
  watch: {
    modificationEvents(newValue) {
      if (!this.interval) {
        this.calculateInterval();
      }
      if (newValue.length > 0) {
        this.loadedTime = newValue[newValue.length - 1].timestamp;
      }
    },
    tasks(newValue) {
      if (newValue.length > 0 && this.modificationsTask) {
        const task = newValue.find(t => t.id === this.modificationsTask.id);
        if (task && !task.alive) {
          this.loadedTime = this.scaleReference.end;
          this.setModificationsTask(null);
        }
      }
    },
    visibleEvents() {
      if (this.visibleEvents.length === 0 && this.playTimer !== null) {
        clearInterval(this.playTimer);
        this.playTimer = null;
      }
    },
  },
  mounted() {
    this.timelineDate = this.startTime;
    this.visibleTimestamp = this.timestamp;
    moment.locale(window.navigator.userLanguage || window.navigator.language);
    this.$eventBus.$on(CUSTOM_EVENTS.MAP_SIZE_CHANGED, this.calculateInterval);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.MAP_SIZE_CHANGED, this.calculateInterval);
  },
  destroyed() {
    clearInterval(this.playTimer);
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
  $timeline-loaded-color = #777
  $timeline-fill-color = #888
  $timeline-viewer-color = #666
  .ot-container
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
        cursor pointer
        position relative
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
          cursor pointer
          margin 0 -2px
          padding 0 2px
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
  .ot-now
    transition opacity .3s ease-in-out
    opacity 0.5
    font-size 12px
    line-height 24px
    vertical-align middle
    text-align center
    color rgba(50, 50, 50, 0.8)
    background-color rgba(255, 255, 255, .8)
    border-top 1px solid rgb(255, 255, 255)
    border-right 1px solid rgb(255, 255, 255)
    border-top-right-radius 4px
    width 160px
    height 24px
    position fixed
    bottom 0
    left 0 // calc(50% - 90px)
    &.ot-hidden
      opacity 0
    &.ot-active
      opacity 1
    &.ot-running
      background-color alpha($main-control-cyan, .7)
      border-top 1px solid $main-control-cyan
      border-right 1px solid $main-control-cyan
</style>
