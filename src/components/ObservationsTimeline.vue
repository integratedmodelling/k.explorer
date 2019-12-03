<template>
  <div class="ot-container row">
    <div
      class="ot-date ot-date-start col"
      @click="setTimestamp(scaleReference.start)"
    >S
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
        v-html="startDate"
      ></q-tooltip>
    </div>
    <div class="ot-timeline-container col">
      <div
        class="ot-timeline"
        ref="ot-timeline"
        @mousemove="moveOnTimeline"
        @mouseenter="timelineActivated = true"
        @mouseleave="timelineActivated = false"
        @click="askForPosition"
      >
        <div
          v-for="(modification) in visibleEvents"
          :key="`${modification.id}-${modification.timestamp}`"
          class="ot-modification"
          :style="{ left: `calc(${calculatePosition(modification.timestamp)}px - 10px)` }"
        >
          <q-icon name="mdi-power-on" class="ot-position" color="grey-7"></q-icon>
        </div>
        <div
          class="ot-actual-time"
          v-if="timestamp !== -1"
          :style="{ left: `${calculatePosition(visibleTimestamp)}px` }">
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
      <q-progress :percentage="timelineProgress" height="2px" color="mc-main" />
    </div>
    <div
      class="ot-date ot-date-end col"
      @click="setTimestamp(scaleReference.end)"
    >E
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
        v-html="endDate"
      ></q-tooltip>
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
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'modificationEvents',
      'timestamp',
      'visibleObservations',
    ]),
    startDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.start) : '';
    },
    endDate() {
      return this.scaleReference !== null ? this.formatDate(this.scaleReference.end) : '';
    },
    visibleEvents() {
      const ids = this.visibleObservations.map(o => o.id);
      return this.modificationEvents.filter(me => ids.includes(me.id));
    },
  },
  methods: {
    ...mapActions('data', [
      'setTimestamp',
    ]),
    formatDate(date) {
      if (date === null) {
        return '';
      }
      const momentDate = moment(date);
      return `<div class="ot-date-tooltip-content">${momentDate.format('L')}<br />${momentDate.format('HH:mm:ss:SSS')}</div>`;
    },
    activateTimeline() {
      this.timelineActivated = true;
    },
    deactivateTimeline() {
      this.timelineActivated = false;
    },
    calculatePosition(timestamp) {
      const timelineWidth = this.$refs['ot-timeline'].clientWidth;
      const position = (timestamp - this.scaleReference.start) * timelineWidth / (this.scaleReference.end - this.scaleReference.start);
      // console.log(`Return position ${position} from date ${timestamp} (${moment(timestamp).format('L')} ${moment(timestamp).format('HH:mm:ss:SSS')}) with total ${this.timelineWidth}`);
      return position;
    },
    moveOnTimeline(event) {
      this.moveOnTimelineFunction(event);
    },
    getDateFromPosition(event) {
      const timeline = this.$refs['ot-timeline'];
      const timelineWidth = timeline.clientWidth;
      const x = event.clientX - timeline.getBoundingClientRect().left;
      const date = this.scaleReference.start + (x * (this.scaleReference.end - this.scaleReference.start) / timelineWidth);
      // console.log(`Return date ${date} (${moment(date).format('L')} ${moment(date).format('HH:mm:ss:SSS')}) from position ${x} with total ${this.timelineWidth}`);
      return date;
      // this.timelinePosition = (timestamp - this.scaleReference.start) * 100 / (this.scaleReference.end - this.scaleReference.start);
    },
    askForPosition(event) {
      const date = this.getDateFromPosition(event);
      const reduce = this.modificationEvents.reduce((result, me) => {
        const diff = date - me.timestamp;
        if (diff <= 0) {
          return result;
        }
        if (result === -1 || diff < result) {
          return me.timestamp;
        }
        return result;
      }, -1);
      this.setTimestamp(reduce);
    },
  },
  watch: {
    timestamp() {
      this.visibleTimestamp = this.timestamp;
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
  .ot-container
    width 100%
    .ot-date
      min-width 16px
      max-width 16px
      height 16px
      line-height 16px
      vertical-align middle
      background-color #777
      color $grey-2
      text-align center
      margin 0
      font-weight 200
      font-size 12px
      padding-top 0
      &.ot-date-start
        border-top-left-radius 2px
        border-bottom-left-radius 2px
        cursor pointer
      &.ot-date-end
        border-top-right-radius 2px
        border-bottom-right-radius 2px
        cursor pointer
    .ot-timeline-container
      border-top 1px solid #777
      border-bottom 1px solid #777
      .ot-actual-time
        width 2px
        height 14px
        background-color $main-control-yellow
        position absolute
      .ot-timeline
        height 12px
        position relative
        cursor pointer
        .ot-modification
          width 16px
          height 10px
          position absolute
          text-align center
          .ot-position
            font-size 10px
  .ot-date-tooltip
    width 100px
    .ot-date-tooltip-content
      text-align center
</style>
