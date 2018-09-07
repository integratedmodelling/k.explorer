<template>
  <svg class="klab-spinner" :width="size" :height="size" viewBox="-120 -120 250 250"
       version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlns:xlink="http://www.w3.org/1999/xlink">
    <image x="-100" y="-100" width="200" height="200"
           xlink:href="~assets/klab-spinner.svg">
    </image>
    <circle
      id="spinner-circle"
      cx="0"
      cy="-90"
      :r="ball"
      :style="{fill: ballColor}"
      :class="{moving}"
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
      default: 'primary',
    },
    stroke: {
      type: String,
      default: 'none',
    },
    animated: {
      type: Boolean,
      default: true,
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
      return this.storeControlled ? this.spinner.animated : this.animated;
    },
    realColor() {
      return this.storeControlled ? this.spinner.colorValue : this.color;
    },
    errorMessage() {
      return this.spinner.errorMessage;
    },
    isVisible() {
      let hiddenNode;
      if (this.wrapperId !== null) {
        hiddenNode = document.getElementById(this.wrapperId);
        if (hiddenNode && hiddenNode != null && hiddenNode.style) {
          return !(hiddenNode.style.display === 'none');
        }
        return false;
      }
      return false;
    },
  },
  watch: {
    /*
    spinner() {
      const spinnerClass = document.getElementById('spinner-circle').classList;
      console.log(`I'm into ${this.wrapperId} and I'm ${this.isVisible ? 'Visible' : 'Hidden'} and with class ${spinnerClass} and moving: ${this.moving}`);
    },
    */
    errorMessage(newValue) {
      if (this.isVisible && newValue !== null) {
        let errorMessage;
        if (newValue instanceof Error) {
          errorMessage = newValue.message;
        } else {
          errorMessage = newValue;
        }
        console.error(errorMessage);
        this.$q.notify({
          message: errorMessage,
          type: 'error',
          timeout: 1000,
        });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
@import '~variables'
#spinner-circle {
  fill: $primary;
}
#spinner-circle.moving {
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
