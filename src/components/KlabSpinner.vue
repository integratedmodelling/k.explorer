<template>
  <svg :width="size" :height="size" viewBox="-120 -120 250 250"
       version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">

    <image data-v-4a3160ec="" x="-100" y="-100" width="200" height="200"
           xlink:href="~assets/klab-spinner.svg">
    </image>
    <circle id="spinner" cx="0" cy="-90" r="15" :style="{fill: color}"></circle>
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 200,
    },
    color: {
      type: String,
    },
  },
  computed: {
    computedColor() {
      return this.color || this.$colors.primary;
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~variables'
#spinner {
  animation: spin 2s cubic-bezier(0.445, 0.050, 0.550, 0.950) infinite;
  animation-delay: 0.4s
  fill: $primary;
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
