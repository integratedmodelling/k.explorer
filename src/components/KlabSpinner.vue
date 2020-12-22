<template>
  <svg class="klab-spinner" :width="size" :height="size" viewBox="-120 -120 250 250"
       version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
      <path
        id="klab-elephant"
        d="m -16.409592,-90.96723 c -12.731141,3.59794 -48.295273,15.083119 -67.807071,61.025834 -14.253345,33.488415 -9.270515,65.732442 11.486766,85.52103 11.762457,11.070564 26.293601,22.141638 56.460848,18.543704 0,0 0.413685,11.899764 -28.646647,13.421956 -0.138604,0 -0.137607,-6.24e-4 -0.275681,0.13782 0.691951,0.415268 1.521665,0.830861 2.213562,1.24598 24.355214,8.579676 40.6831588,-6.365553 50.7850434,-21.44918 0,0 15.4987796,14.53115 2.7676326,32.935946 -0.1386,0.27668 0.0019,0.55137 0.278385,0.55137 4.289845,-0.1386 8.441295,-0.55133 12.454363,-1.24328 44.974093,-8.71801 79.015461,-48.29683 79.015461,-95.761805 -0.13859,-23.524924 -8.303479,-44.973534 -22.003241,-61.717741 -2.629265,3.459554 -14.666883,17.988557 -31.549442,15.497686 -50.9245092,-7.611015 -64.486968,15.914431 -64.763747,43.45242 -0.276678,22.971358 -12.178682,33.349477 -12.178682,33.349477 -15.775524,14.253336 -47.880078,1.384892 -41.514544,-45.94168 4.843361,-36.53279 27.953112,-63.239411 53.968907,-76.385668 l -1.659498,-1.108134 c 0,0 1.105979,-2.075735 0.967585,-2.075735 z M 9.7451084,5.900034 c 1.2454676,0 2.3541156,1.105994 2.3541156,2.351411 0,1.245462 -1.108648,2.354112 -2.3541156,2.354112 -1.2454064,0 -2.3514093,-1.10865 -2.3514093,-2.354112 0,-1.245417 1.1060029,-2.351411 2.3514093,-2.351411 z"
      >
      </path>
    </g>
    <circle
      class="spinner-circle"
      cx="0"
      cy="-90"
      :r="ball"
      :style="{ fill: ballColor }"
      :class="{ moving }"
    ></circle>
  </svg>
</template>

<script>
import * as colors from 'shared/colors';
import { mapGetters } from 'vuex';

export default {
  name: 'KlabSpinner',
  props: {
    size: {
      type: Number,
      default: 200,
    },
    ball: {
      type: Number,
      default: 12,
    },
    color: {
      type: String,
      default: colors.getBrand('primary'),
    },
    ballColor: {
      type: String,
      default: colors.getBrand('primary'),
    },
    stroke: {
      type: String,
      default: 'none',
    },
    animated: {
      type: Boolean,
      default: false,
    },
    forceColor: {
      type: Boolean,
      default: false,
    },
    storeControlled: {
      type: Boolean,
      default: false,
    },
    /**
     * Necesary to know if the spinner is visible. If yes, q.notify work
     */
    wrapperId: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapGetters('view', [
      'spinner',
    ]),
    moving() {
      return this.storeControlled ? this.spinner.animated || this.animated : this.animated;
    },
    realColor() {
      return this.storeControlled ? (this.forceColor ? this.getBrand(this.color) : this.spinner.color) : this.getBrand(this.color);
    },
  },
  methods: {
    getBrand(color) {
      return colors.getBrand(color);
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~variables'
.spinner-circle {
  fill $primary
  transform rotate(6deg)
}
.spinner-circle.moving {
  animation spin 2s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite
  animation-delay 0.4s
}
@keyframes spin {
  0% {
    transform rotate(6deg)
  }
  80% {
    transform rotate(366deg)
  }
  100% {
    transform rotate(366deg)
  }
}
</style>
