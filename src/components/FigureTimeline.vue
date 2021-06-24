<template>
  <div class="ft-wrapper" :class="{ 'ft-no-timestamp': slices.length === 0 || timestamp === -1 }">
    <div class="ft-container">
      <div class="ft-time row">
        <div class="ft-time-origin-container" @click="onClick($event, () => { changeTimestamp(-1); })">
          <q-icon
            name="mdi-clock-start"
            :class="{ 'ft-time-origin-active': timestamp === -1 }"
            class="ft-time-origin"
          ></q-icon>
          <q-tooltip
            v-if="slices.length !== 0"
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
            v-html="slices.length > 0 ? slices[0][1] : $t('label.timeOrigin')"
          ></q-tooltip>
        </div>
        <div
          class="ft-timeline-container col"
          :ref="`ft-timeline-${observationId}`"
          :class="{ 'ot-timeline-with-time': timestamp !== -1 }"
        >
          <div
            class="ft-timeline"
            :class="{ 'ft-with-slices': slices.length !== 0 }"
            ref="ft-timeline"
            @mousemove="moveOnTimeline"
            @click="changeTimestamp(getDateFromPosition($event))"
          >
            <div class="ft-timeline-viewer" v-show="slices.length > 0"></div>
            <div
              class="ft-slice-container"
              :style="{ left: `${calculatePosition(start)}px` }"
              v-if="slices.length <= 1"
            >
              <div class="ft-slice"></div>
              <div class="ft-slice-caption">{{ getLabel(start) }}</div>
            </div>
            <div
              v-for="(slice, index) in slices"
              :key="index"
              class="ft-slice-container"
              :style="{ left: `${calculatePosition(slice[0])}px` }"
              v-if="slice[0] !== -1"
            >
              <div class="ft-slice"></div>
              <div class="ft-slice-caption">{{ getLabel(slice[0]) }}</div>
            </div>
            <div
              class="ft-slice-container"
              :style="{ left: `calc(${calculatePosition(end)}px - 2px` }"
            >
              <div class="ft-slice"></div>
              <div class="ft-slice-caption">{{ getLabel(end) }}</div>
            </div>
            <div
              class="ft-actual-time"
              v-if="timestamp !== -1"
              :style="{ left: `calc(${calculatePosition(timestamp)}px - 11px + ${timestamp === end ? '0' : '1'}px)` }">
              <q-icon
                name="mdi-menu-down-outline"
              >
              </q-icon>
            </div>

            <q-tooltip
              v-if="slices.length !== 0"
              :offset="[0, 15]"
              self="top middle"
              anchor="bottom middle"
              v-html="timelineDate"
              class="ft-date-tooltip"
              :delay="300"
            ></q-tooltip>
          </div>
        </div>
      </div>
    </div>
    <q-resize-observable @resize="updateWidth"></q-resize-observable>
  </div>
</template>

<script>
import moment from 'moment';
import DoubleClickMixin from 'shared/DoubleClickMixin';

export default {
  name: 'FigureTimeline',
  mixins: [DoubleClickMixin],
  props: {
    observationId: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    end: {
      type: Number,
      required: true,
    },
    rawSlices: {
      type: Array,
      default: () => ([]),
    },
    startingTime: {
      type: Number,
      default: -1,
    },
  },

  computed: {
    slices() {
      return this.rawSlices.map((s) => {
        const slice = s.split(',');
        return [+slice[0], slice[1]];
      });
    },
  },
  data() {
    return {
      timestamp: this.startingTime,
      timelineDate: null,
      timelineWidth: 0,
      timelineLeft: 0,
    };
  },
  methods: {
    formatDate(date, isString = false) {
      if (date === null) {
        return '';
      }
      if (!isString) {
        date = moment(date).format('L');
      }
      return `<div class="ft-date-tooltip-content">${date}</div>`;
    },
    updateWidth() {
      const timelineEl = this.$refs[`ft-timeline-${this.observationId}`];
      if (timelineEl) {
        this.timelineWidth = timelineEl.clientWidth;
        this.timelineLeft = timelineEl.getBoundingClientRect().left;
      } else {
        this.timelineWidth = 0;
        this.timelineLeft = 0;
      }
    },
    calculatePosition(timestamp) {
      if (this.timelineWidth === 0) {
        return 0;
      }
      if (timestamp === -1) {
        return 0;
      }
      const position = Math.floor((timestamp - this.start) * (this.timelineWidth) / (this.end - this.start));
      return position;
    },
    moveOnTimeline(event) {
      [, this.timelineDate] = this.getSlice(this.getDateFromPosition(event));
    },
    getDateFromPosition(event) {
      if (this.timelineWidth === 0) {
        return 0;
      }
      const x = event.clientX - this.timelineLeft;
      let date = Math.floor(this.start + (x * (this.end - this.start) / this.timelineWidth));
      if (date > this.end) {
        date = this.end;
      } else if (date < this.start) {
        date = this.start;
      }
      return date;
    },
    getSlice(date) {
      if (date > this.end) {
        return [this.end, this.formatDate(this.end)];
      }
      let slice = [this.start, this.formatDate(this.start)];
      if (this.slices.length > 0) {
        this.slices.forEach((s) => {
          if (s[0] <= date) {
            slice = s;
          }
        });
      }
      return slice;
    },
    changeTimestamp(date) {
      if (this.slices.length === 0) {
        return;
      }
      if (date > this.end) {
        this.timestamp = this.end;
      } else {
        this.timestamp = date;
      }
      const slice = this.getSlice(date);
      [, this.timelineDate] = slice;
      this.$emit('timestampchange', {
        time: slice[0],
        timeString: date === -1 ? slice[1] : moment(date).format('L'),
      });
    },
    getLabel(date) {
      return moment(date).format('L');
    },
  },
  mounted() {
    this.updateWidth();
  },
};
</script>

<style lang="stylus">
@import '~variables'
$timeline-marks-size = 14px
$timeline-viewer-size = 1px
.ft-wrapper
  margin-top 8px
  width 100%
  margin-bottom 40px
.ft-container
  position relative
  .ft-time
    width 100%
    position relative
    .ft-date-container
      width 4px
      height $timeline-marks-size
      line-height $timeline-marks-size
      background-color $main-control-main-color
      cursor default
  .ft-time-origin-container
    width $timeline-marks-size * 2
    height $timeline-marks-size
    line-height $timeline-marks-size
    color $main-control-main-color
    text-align center
    cursor pointer
    .ft-time-origin
      vertical-align baseline
      color $main-control-main-color
      &.ft-time-origin-active
        color $light-blue-9
  .ft-timeline-container
    .ft-timeline
      height $timeline-marks-size
      width 100%
      top 0
      margin 0
      position relative
      padding 0
      cursor pointer
      .ft-timeline-viewer
        height $timeline-viewer-size
        background-color $main-control-main-color
        width 100%
        position absolute
        top (($timeline-marks-size - $timeline-viewer-size) / 2)
        z-index 9000
      .ft-slice-container
        z-index 10000
        width 4px
        height $timeline-marks-size
        position absolute
        .ft-slice
          height 100%
          width 100%
          background-color $main-control-main-color
        .ft-slice-caption
          font-size .65em
          color $main-control-main-color
          transform rotate(45deg)
      .ft-actual-time
        height $timeline-marks-size
        font-size 22px
        color $main-control-main-color
        position absolute
        top -12px
        left -15px
        z-index 10001

.kd-is-app
  .ft-container
    .ft-time .ft-date-container
      background-color var(--app-main-color)
    .ft-time-origin-container
      color var(--app-main-color)
      .ft-time-origin
        color var(--app-main-color)
        &.ft-time-origin-active
          color var(--app-link-color)
    .ft-timeline-container
      .ft-timeline
        background-color var(--app-background-color)
        .ft-timeline-viewer
          background-color var(--app-main-color)
        .ft-slice-container
          .ft-slice
            background-color var(--app-main-color)
          .ft-slice-caption
            color var(--app-main-color)
        .ft-actual-time
          color var(--app-main-color)

.ft-date-tooltip
  width 150px
  .ft-date-tooltip-content
    text-align center

</style>
