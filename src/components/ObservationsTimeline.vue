<template>
  <div class="ot-container row">
    <div class="ot-date ot-date-start col">S
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
        @mouseenter="activateTimeline"
        @mousemove="moveOnTimeline"
        @click="askForPosition"
        @mouseleave="deactivateTimeline"
        :class="{ 'ot-clickable': visibleObservations.length > 0}"
      >
        <div
          v-for="(modification) in visibleEvents"
          :key="`${modification.id}-${modification.timestamp}`"
          class="ot-modification"
          :style="calculatePosition(modification.timestamp)"
        >
          <q-icon name="mdi-power-on" class="ot-position" color="grey-7"></q-icon>
        </div>
      </div>
      <q-progress :percentage="timelinePosition" height="2px" color="mc-main" />
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
        :delay="0"
        v-html="timelineDate"
      ></q-tooltip>
    </div>
    <div class="ot-date ot-date-end col">E
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
import { mapGetters } from 'vuex';
import moment from 'moment';
import { debounce } from 'quasar';
import { axiosInstance } from 'plugins/axios';

export default {
  name: 'ObservationsTimeline',
  data() {
    return {
      timelineActivated: false,
      timelinePosition: 0,
      moveOnTimelineFunction: debounce((event) => {
        if (this.timelineActivated) {
          this.timelineDate = this.formatDate(this.getDateFromPosition(event));
        }
      }, 200),
      timelineDate: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'scaleReference',
      'modificationEvents',
      'visibleObservations',
    ]),
    startDate() {
      return this.scaleReference !== null ? this.formatDate(this.momentStart) : '';
    },
    endDate() {
      return this.scaleReference !== null ? this.formatDate(this.momentEnd) : '';
    },
    visibleEvents() {
      const ids = this.visibleObservations.map(o => o.id);
      return this.modificationEvents.filter(me => ids.includes(me.id));
    },
  },
  methods: {
    formatDate(date) {
      if (date === null) {
        return '';
      }
      const momentDate = moment(date);
      return `<div class="ot-tooltip-date">${momentDate.format('L')}<br />${momentDate.format('HH:mm:ss:SSS')}</div>`;
    },
    activateTimeline() {
      this.timelineActivated = true;
    },
    deactivateTimeline() {
      this.timelineActivated = false;
      this.timelineDate = null;
    },
    calculatePosition(timestamp) {
      const position = (timestamp - this.scaleReference.start) * 100 / (this.scaleReference.end - this.scaleReference.start);
      return { left: `calc(${position}% - 10px)` };
    },
    moveOnTimeline(event) {
      this.moveOnTimelineFunction(event);
    },
    getDateFromPosition(event) {
      const rect = event.srcElement.getBoundingClientRect();
      const x = event.clientX - rect.left;
      return Math.round(this.scaleReference.start + (x * (this.scaleReference.end - this.scaleReference.start) / rect.width));
      // this.timelinePosition = (timestamp - this.scaleReference.start) * 100 / (this.scaleReference.end - this.scaleReference.start);
    },
    askForPosition(event) {
      if (this.visibleObservations.length > 0) {
        const date = this.getDateFromPosition(event);
        this.visibleObservations.forEach((observation) => {
          axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}describe/${observation.id}`, {
            params: {
              childLevel: 0,
            },
          }).then(({ data }) => {
            console.log(date);
            console.dir(data);
          });
        });
      } else {
        this.$q.notify({
          message: 'No observations selected',
          type: 'warning',
          icon: 'mdi-information',
          timeout: 1000,
        });
      }
    },
  },
  watch: {
    visibleObservations() {
      console.warn(this.visibleObservations.length);
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .ot-container
    width 80%
    .ot-date
      min-width 15px
      max-width 15px
      height 15px
      line-height 15px
      vertical-align middle
      background-color #777
      color #fff
      text-align center
      padding 0
      margin 0
      font-weight 200
      font-size .8em
      &.ot-date-start
        border-top-left-radius 2px
        border-bottom-left-radius 2px
      &.ot-date-end
        border-top-right-radius 2px
        border-bottom-right-radius 2px
    .ot-timeline-container
      border-top 1px solid #777
      border-bottom 1px solid #777
      .ot-timeline
        height 10px
        position relative
        &.ot-clickable
          cursor pointer
        .ot-modification
          width 15px
          height 10px
          position absolute
          text-align center
          .ot-position
            font-size 10px
  .ot-tooltip-date
    text-align center
</style>
