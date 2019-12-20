<template>
  <div
    class="ot-container"
    :class="{ 'ot-active-timeline': visibleEvents.length > 0 }"
  >
    <div class="ot-player">
      <q-icon
        :name="playTimer === null ? 'mdi-play' : 'mdi-pause'"
        :color="visibleEvents.length !== 0 ? 'mc-main' : 'grey-7'"
        :class="{ 'cursor-pointer': visibleEvents.length !== 0 }"
        @click.native="visibleEvents.length > 0 && run($event)"
      ></q-icon>
    </div>
    <div class="ot-time row">
      <div class="ot-date-container">
        <div
          class="ot-date ot-date-start col"
          :class="{ 'ot-date-loaded': loadedTime > 0 }"
          @click.self="onClick($event, () => { changeTimestamp(scaleReference.start); })"
          @dblclick="onDblClick($event, () => { changeTimestamp(timestamp === -1 ? scaleReference.start : -1); })"
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
            :style="{ left: `calc(${calculatePosition(modification.timestamp)}px)` }"
          >
            <div class="ot-modification"></div>
          </div>
          <div
            class="ot-loaded-time"
            :style="{ width: `calc(${calculatePosition(loadedTime)}px + 4px)` }"
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
          <!-- <q-progress :percentage="timelineProgress" height="2px" color="mc-main" /> -->
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { debounce } from 'quasar';
import DoubleClickMixin from 'shared/DoubleClickMixin';

export default {
  name: 'ObservationsTimeline',
  mixins: [DoubleClickMixin],
  data() {
    return {
      timelineActivated: false,
      timelinePosition: 0,
      timelineProgress: 0,
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
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'modificationEvents',
      'timestamp',
      'visibleObservations',
      'modificationsTask',
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
    formatDate(date, isStartOrEnd = false) {
      if (date === null) {
        return '';
      }
      const momentDate = moment(date);
      if (isStartOrEnd) {
        return momentDate.format('DD MMM YYYY');
      }
      return `<div class="ot-date-tooltip-content">${momentDate.format('L')}<br />${momentDate.format('HH:mm:ss:SSS')}</div>`;
    },
    calculatePosition(timestamp) {
      const timeline = this.$refs['ot-timeline-container'];
      if (!timeline) {
        return 0;
      }
      const position = (timestamp - this.scaleReference.start) * (timeline.clientWidth) / (this.scaleReference.end - this.scaleReference.start);
      // console.log(`Return position ${position} from date ${timestamp} (${moment(timestamp).format('L')} ${moment(timestamp).format('HH:mm:ss:SSS')}) with total ${this.timelineWidth}`);
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
      // console.log(`Return date ${date} (${moment(date).format('L')} ${moment(date).format('HH:mm:ss:SSS')}) from position ${x} with total ${this.timelineWidth}`);
      return date;
      // this.timelinePosition = (timestamp - this.scaleReference.start) * 100 / (this.scaleReference.end - this.scaleReference.start);
    },
    changeTimestamp(date) {
      this.visibleTimestamp = date;
      this.setTimestamp(date);
    },
    run() {
      if (this.playTimer !== null) {
        clearInterval(this.playTimer);
        this.playTimer = null;
      } else {
        if (this.timestamp === -1) {
          this.changeTimestamp(this.scaleReference.start);
        }
        const day = 24 * 60 * 60 * 1000;
        this.playTimer = setInterval(() => {
          this.$nextTick(() => {
            this.changeTimestamp(this.timestamp + (day));
            if (this.timestamp > this.scaleReference.end) {
              clearInterval(this.playTimer);
              this.playTimer = null;
            }
          });
        }, 100);
      }
    },
  },
  watch: {
    modificationEvents(newValue) {
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
  },
  mounted() {
    this.timelineDate = this.startTime;
    this.visibleTimestamp = this.timestamp;
    moment.locale(window.navigator.userLanguage || window.navigator.language);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $timeline-balls-size = 16px
  $timeline-small-size = 6px
  $timeline-modification-size = 6px
  $timeline-viewer-size = 10px
  $timeline-empty-color = #555
  $timeline-loaded-color = #777
  $timeline-fill-color = #888
  $timeline-viewer-color = #666
  .ot-container
    .ot-player
      width $timeline-balls-size
      height $timeline-balls-size
      line-height $timeline-balls-size
      float left
      .q-icon
        vertical-align baseline !important
    .ot-time
      width calc(100% - $timeline-balls-size)
      position relative
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
          .ot-timeline-viewer
            height $timeline-viewer-size
            background-color $timeline-viewer-color
            border-radius 2px
            width 100%
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
</style>
