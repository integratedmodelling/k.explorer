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
      :class="{ 'kl-top-layer': selectedLayer === layerIndex, 'kl-hide-layer': selectedLayer !== layerIndex }"
    >
      <div
        class="kl-layer-content"
        :class="[ `kl-image-${layer.imageAlign}` ]"
        :style="{ 'background-image': `url(statics/help/${layer.image})` }"
      >
      </div>
      <div
        class="kl-layer-caption"
        :class="[ `kl-text-${layer.textPosition}` ]"
        :style="{ width: layer.textPosition === 'left' || layer.textPosition === 'right' ? layer.textWidth || '40%' : '100%'}"
      >
        <div class="kl-caption-title" v-html="layer.title"></div>
        <div class="kl-caption-text" :style="{ 'text-align': layer.textAlign || 'left' }" v-html="layer.text"></div>
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
        this.setAnimation(this.layers[0].duration || this.duration);
      }
    },
    stopStack() {
      if (this.animation !== null) {
        clearTimeout(this.animation);
        this.animation = null;
      }
    },
    goTo(index) {
      this.stopStack();
      this.selectedLayer = index;
    },
    setAnimation(duration) {
      const self = this;
      this.animation = setTimeout(() => {
        if (self.selectedLayer < self.layers.length - 1) {
          self.selectedLayer += 1;
        } else if (self.infinite) {
          self.selectedLayer = 0;
        }
        if (this.animated) {
          // next animation
          self.setAnimation(self.layers[self.selectedLayer].duration || this.duration);
        }
        // console.log(`${self.ownerIndex}: ${self.selectedLayer} of ${self.layers.length}`);
      }, duration);
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
  @import '~variables'
  .kl-stack
    position relative
    .kl-layer-caption
      position absolute
      padding 12px
      color $grey-4
      // text-align center
      background-color alpha($main-control-main-color, 85%)
      &.kl-text-bottom
        bottom 38px
        left 0
      &.kl-text-top
        top 0
        left 0
      &.kl-text-left
        top 0
        left 0
        height calc(100% - 40px)
      &.kl-text-right
        top 0
        right 0
        height calc(100% - 40px)
      .kl-caption-title
        font-size 34px
        color white
        line-height 40px
        letter-spacing normal
        margin 0 0 10px 0
        text-align center
      .kl-caption-text
        font-size 1em
        color white
    .kl-layer-content
      background-repeat no-repeat
      background-size contain
      height calc(100% - 40px)
      &.kl-image-center
        background-position center
      &.kl-image-left
        background-position left
      &.kl-image-right
        background-position right
    .kl-layer
      position absolute
      padding 0
      top 0
      left 0
      &.kl-top-layer
        z-index 999 !important
      &.kl-hide-layer
        visibility hidden
</style>
