<template>
  <div
    class="kl-stack full-height"
    ref="kl-stack"
    v-if="layers.length > 0"
  >
    <div
      class="kl-layer fit"
      v-for="(layer, layerIndex) in layers"
      :key="`kl-layer-${layerIndex}`"
      :style="`z-index: 10${layers.length - layerIndex}`"
      :class="{ 'kl-top-layer': selectedLayer === layerIndex }"
    >
      <div
        class="kl-secondary-content"
        :style="{ 'background-image': `url(statics/help/${layer.image})` }"
      >
      </div>
      <div class="absolute-bottom kl-secondary-caption">
        <div class="q-display-1" v-html="layer.text"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KlabStack',
  props: {
    ownerIndex: {
      type: Number,
      required: true,
    },
    layers: {
      type: Array,
      required: true,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    autostart: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 5000, // as QCarousel
    },
    infinite: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedLayer: 0,
      animation: null,
    };
  },
  methods: {
    initStack() {
      this.selectedLayer = 0;
      this.stopStack();
      if (this.animated) {
        const self = this;
        this.animation = setInterval(() => {
          if (self.selectedLayer < self.layers.length - 1) {
            self.selectedLayer += 1;
          } else if (self.infinite) {
            self.selectedLayer = 0;
          } else {
            clearInterval(self.animation);
          }
          // console.log(`${self.ownerIndex}: ${self.selectedLayer} of ${self.layers.length}`);
        }, this.duration);
      }
    },
    stopStack() {
      if (this.animation !== null) {
        clearInterval(this.animation);
        this.animation = null;
      }
    },
    goTo(index) {
      this.stopStack();
      this.selectedLayer = index;
    },
  },
  mounted() {
    if (this.autostart) {
      this.initStack();
    }
  },
};
</script>

<style lang="stylus">
  .kl-stack
    position relative
    .kl-layer
      position absolute
      top 0
      left 0
      padding 0
      &.kl-top-layer
        z-index 999 !important
</style>
