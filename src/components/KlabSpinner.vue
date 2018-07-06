<template>
  <svg :width="size" :height="size" viewBox="-120 -120 250 250"
       version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <image data-v-4a3160ec="" x="-100" y="-100" width="200" height="200"
           xlink:href="~assets/klab-spinner.svg">
    </image>
    <circle
      id="spinner"
      cx="0"
      cy="-90"
      r="15"
      :style="{fill: realColor}"
      :class="{moving: this.moving}"
    ></circle>
  </svg>
</template>

<script>
import { colors } from 'quasar';
import { mapGetters } from 'vuex';

export default {
  props: {
    size: {
      type: Number,
      default: 200,
    },
    color: {
      type: String,
      default: colors.getBrand('primary'),
    },
    animated: {
      type: Boolean,
      default: true,
    },
    storeControlled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters('view', [
      'spinner',
    ]),
    moving() {
      return this.storeControlled ? this.spinner.animated : this.animated;
    },
    realColor() {
      return this.storeControlled ? this.spinner.colorValue : this.color;
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~variables'
#spinner {
  fill: $primary;
}
#spinner.moving {
  animation: spin 2s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite;
  animation-delay: 0.4s
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
