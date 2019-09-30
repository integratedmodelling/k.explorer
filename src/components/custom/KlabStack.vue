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
      @click="next"
    >
      <div
        class="kl-layer-content"
        :class="[ `kl-image-${layer.imageAlign || 'center'}` ]"
        :style="{ 'background-image': `url(statics/help/${layer.image})` }"
      >
      </div>
      <div
        class="kl-layer-caption"
        :class="[ `kl-text-${layer.textPosition || 'bottom'}` ]"
        :style="{ width: layer.textPosition === 'left' || layer.textPosition === 'right' ? layer.textWidth || '40%' : '100%'}"
      >
        <div class="kl-caption-title" v-if="layer.title" v-html="layer.title"></div>
        <div class="kl-caption-text" v-if="layer.text"  :style="{ 'text-align': layer.textAlign || 'left' }" v-html="layer.text"></div>
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
    stack: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      selectedLayer: 0,
      animation: null,
      layers: this.stack.layers,
      animated: this.stack.animated || true,
      autostart: this.stack.animated || this.ownerIndex === 0,
      duration: this.stack.animated || 5000,
      infinite: this.stack.animated || true,
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
    goTo(index, animate = false) {
      this.stopStack();
      this.selectedLayer = index;
      if (animate) {
        this.setAnimation(this.layers[this.selectedLayer].duration || this.duration);
      }
    },
    next() {
      if (this.selectedLayer < this.layers.length - 1) {
        this.goTo(this.selectedLayer + 1);
      } else if (this.infinite) {
        this.goTo(0);
      }
    },
    setAnimation(duration) {
      this.animation = setTimeout(() => {
        if (this.selectedLayer < this.layers.length - 1) {
          this.selectedLayer += 1;
        } else if (this.infinite) {
          this.selectedLayer = 0;
        } else {
          return; // we stop generating animation if is not infinite
        }
        if (this.animated) {
          // next animation
          this.setAnimation(this.layers[this.selectedLayer].duration || this.duration);
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
