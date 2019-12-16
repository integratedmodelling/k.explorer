<template>
  <div
    class="ot-container row"
    :class="{ 'ot-active-timeline': visibleEvents.length > 0 }"
  >
    <div class="ot-date-container">
      <div
        class="ot-date ot-date-start col"
        :class="{ 'ot-date-loaded': loadedTime > 0 }"
        @click.self="changeTimestamp(scaleReference.start)"
      >
        <q-icon
          name="mdi-circle-medium"
          v-if="timestamp === -1 && visibleEvents.length === 0"
          class="ot-time-origin"
          color="mc-main"
          @click.prevent
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
    >
      <div
        class="ot-timeline"
        ref="ot-timeline"
        @mousemove="moveOnTimeline"
        @mouseenter="timelineActivated = true"
        @mouseleave="timelineActivated = false"
        @click="changeTimestamp(getDateFromPosition($event))"
      >
        <div
          v-for="(modification) in visibleEvents"
          :key="`${modification.id}-${modification.timestamp}`"
          class="ot-modification-container"
          :style="{ left: `calc(${calculatePosition(modification.timestamp)}px - 10px)` }"
        >
          <div class="ot-modification"></div>
        </div>
        <div
          class="ot-loaded-time"
          :style="{ width: `calc(${calculatePosition(loadedTime)}px + 4px)` }"
        ></div>
        <div
          class="ot-actual-time"
          v-if="timestamp !== -1"
          :style="{ left: `calc(${calculatePosition(visibleTimestamp)}px - ${timestamp === scaleReference.end ? '2' : '0'}px)` }">
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
      <!-- <q-progress :percentage="timelineProgress" height="2px" color="mc-main" /> -->
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
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import { debounce } from 'quasar';

export default {
  name: 'ObservationsTimeline',
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
      const position = (timestamp - this.scaleReference.start) * timeline.clientWidth / (this.scaleReference.end - this.scaleReference.start);
      // console.log(`Return position ${position} from date ${timestamp} (${moment(timestamp).format('L')} ${moment(timestamp).format('HH:mm:ss:SSS')}) with total ${this.timelineWidth}`);
      return position;
    },
    moveOnTimeline(event) {
      this.moveOnTimelineFunction(event);
    },
    getDateFromPosition(event) {
      const timeline = this.$refs['ot-timeline'];
      if (!timeline) {
        return 0;
      }
      const timelineWidth = timeline.clientWidth;
      const x = event.clientX - timeline.getBoundingClientRect().left;
      const date = this.scaleReference.start + (x * (this.scaleReference.end - this.scaleReference.start) / timelineWidth);
      // console.log(`Return date ${date} (${moment(date).format('L')} ${moment(date).format('HH:mm:ss:SSS')}) from position ${x} with total ${this.timelineWidth}`);
      return date;
      // this.timelinePosition = (timestamp - this.scaleReference.start) * 100 / (this.scaleReference.end - this.scaleReference.start);
    },
    changeTimestamp(date) {
      this.visibleTimestamp = date;
      this.setTimestamp(date);
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
  $timeline-empty-color = #444
  $timeline-loaded-color = #666
  $timeline-fill-color = #888
  .ot-container
    width 100%
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
      z-index 100
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
      color #fff
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
        .ot-modification-container
          z-index 10000
          width $timeline-balls-size * 2
          height ($timeline-balls-size / 2)
          position absolute
          top ($timeline-balls-size / 2)
          .ot-modification
            height 100%
            width 1px
            margin-left 1px
            border-left 1px solid #444
            border-right 1px solid #888
        .ot-actual-time
          width 2px
          height $timeline-small-size
          background-color $main-control-main-color
          position absolute
          margin-right 4px
          top 0
        .ot-loaded-time
          height $timeline-small-size
          left -2px
          background-color $timeline-loaded-color
          position relative
          top 0
    &.ot-active-timeline
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
        .ot-loaded-time
          height $timeline-balls-size
        .ot-actual-time
          height $timeline-balls-size
  .ot-date-tooltip
    width 100px
    .ot-date-tooltip-content
      text-align center
</style>
