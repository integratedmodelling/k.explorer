<template>
  <div class="ot-container row">
    <div
      class="ot-date ot-date-start col"
      :class="{ 'ot-date-loaded': loadedTime > 0 }"
      @click.self="changeTimestamp(scaleReference.start)"
    ><q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
        v-html="formatDate(scaleReference.start)"
      ></q-tooltip>
      <div class="ot-date-text" v-show="visibleEvents.length === 0">{{ startDate }}</div>
    </div>
    <div class="ot-timeline-container col">
      <div
        class="ot-timeline"
        :class="{ 'ot-active-timeline': visibleEvents.length > 0 }"
        ref="ot-timeline"
        @mousemove="moveOnTimeline"
        @mouseenter="timelineActivated = true"
        @mouseleave="timelineActivated = false"
        @click="changeTimestamp(getDateFromPosition($event))"
      >
        <div
          v-for="(modification) in visibleEvents"
          :key="`${modification.id}-${modification.timestamp}`"
          class="ot-modification"
          :style="{ left: `calc(${calculatePosition(modification.timestamp)}px - 10px)` }"
        >
          <q-icon name="mdi-power-on" class="ot-position" color="grey-4"></q-icon>
        </div>
        <div class="ot-loaded-time" :style="{ width: `calc(${calculatePosition(loadedTime)}px - 2px)` }"></div>
        <div
          class="ot-actual-time"
          v-if="timestamp !== -1"
          :style="{ left: `calc(${calculatePosition(visibleTimestamp)}px - 4px)` }">
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
      const timeline = this.$refs['ot-timeline'];
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
  $timeline-balls-size = 14px
  .ot-container
    width 100%
    .ot-date
      min-width $timeline-balls-size
      max-width $timeline-balls-size
      height $timeline-balls-size
      line-height $timeline-balls-size
      vertical-align middle
      background-color #666
      color $grey-2
      text-align center
      margin 0
      font-weight 200
      font-size 12px
      padding-top 0
      border-radius ($timeline-balls-size / 2)
      cursor pointer
      z-index 100
      &.ot-date-loaded
        background-color #777
      &.ot-date-fill
        background-color $grey-5
      &.ot-date-start
        &.ot-date-selected
          border-top-left-radius 2px
          border-bottom-left-radius 2px
          cursor pointer
        .ot-date-text
          left $timeline-balls-size
      &.ot-date-end
        &.ot-date-selected
          border-top-right-radius 2px
          border-bottom-right-radius 2px
          cursor pointer
        .ot-date-text
          right $timeline-balls-size
      .ot-date-text
        font-size 8px
        position absolute
        top -7px
        color #fff
        font-weight 400
        letter-spacing 1px
        cursor default
    .ot-timeline-container
      .ot-loaded-time
        height 5px
        margin-left 2px
        background-color #777
        position absolute
      .ot-actual-time
        width 2px
        height 5px
        margin-left 4px
        background-color $main-control-yellow
        position absolute
        z-index 2000
      .ot-timeline
        height 5px
        margin 0 -2px
        background-color #666
        position relative
        top ($timeline-balls-size / 2) - 2
        cursor pointer
        &.ot-active-timeline
          height $timeline-balls-size
          top ($timeline-balls-size / 2)
          margin 0 -($timeline-balls-size / 2)
          background-color #666
          .ot-loaded-time
          .ot-actual-time
            height $timeline-balls-size
        .ot-modification
          z-index 100
          width 16px
          height 8px
          position absolute
          top -4px
          text-align center
          .ot-position
            font-size 8px


  .ot-date-tooltip
    width 100px
    .ot-date-tooltip-content
      text-align center
</style>
