<template>
  <transition name="fade" v-if="timeEvents.length > 0" >
    <div
      class="otv-now"
      :class="{ 'otv-novisible': timestamp === -1, 'otv-docked': isMainControlDocked, 'otv-running': isTimeRunning }"
      v-html="formattedTimestamp">
    </div>
  </transition>
</template>

<script>
import moment from 'moment';
import { mapGetters } from 'vuex';

export default {
  name: 'ObservationTime',
  data() {
    return {
      formattedTimestamp: undefined,
    };
  },
  computed: {
    ...mapGetters('data', [
      'timestamp',
      'timeEvents',
    ]),
    ...mapGetters('view', [
      'isMainControlDocked',
      'isTimeRunning',
    ]),
  },
  methods: {
    formatTimestamp() {
      if (this.timestamp === -1) {
        this.formattedTimestamp = this.$t('label.noTimeSet');
      } else {
        const momentDate = moment(this.timestamp);
        this.formattedTimestamp = `${momentDate.format('L')} ${momentDate.format('HH:mm:ss:SSS')}`;
      }
    },
  },
  watch: {
    timestamp() {
      this.formatTimestamp();
    },
  },
  created() {
    this.formatTimestamp();
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .otv-now
    font-size 11px
    line-height 24px
    vertical-align middle
    text-align center
    color rgb(255, 255, 255)
    width $timestampViewerWidth
    height 24px
    &.otv-docked
      float left
      color #fff
      line-height $docked-timeline-height
    &:not(.otv-docked)
      position absolute
      bottom 0
      left 0
      background-color $main-control-grey-alpha
      border-top 1px solid rgb(0, 0, 0)
      border-right 1px solid rgb(0, 0, 0)
      border-top-right-radius 4px

    &.otv-running
      color $main-control-yellow

    &.otv-novisible
      opacity 0
    .fade-enter-active, .fade-leave-active
      transition opacity 1s

    .fade-enter, .fade-leave-to
      opacity: 0

</style>
