<template>
  <div
    class="ks-stack full-height"
    ref="ks-stack"
    v-if="layers.length > 0"
  >
    <div
      class="ks-layer fit"
      v-for="(layer, layerIndex) in layers"
      :key="`ks-layer-${layerIndex}`"
      :style="`z-index: 10${layers.length - layerIndex}`"
      :class="{ 'ks-top-layer': selectedLayer === layerIndex, 'ks-hide-layer': selectedLayer !== layerIndex }"
      @click="next"
    >
      <div
        class="ks-layer-content"
        :class="[ `ks-image-${layer.imageAlign || 'center'}` ]"
        :style="{ 'background-image': `url(statics/help/${layer.image})` }"
      >
      </div>
      <div
        class="ks-layer-caption"
        :class="[ `ks-text-${layer.textPosition || 'bottom'}` ]"
        :style="{ width: layer.textPosition === 'left' || layer.textPosition === 'right' ? layer.textWidth || '40%' : '100%'}"
      >
        <div class="ks-caption-title" v-if="layer.title" v-html="layer.title"></div>
        <div class="ks-caption-text" v-if="layer.text"  :style="{ 'text-align': layer.textAlign || 'left' }" v-html="layer.text"></div>
      </div>
    </div>
    <div class="ks-navigation">
      <q-btn
        id="ks-prev"
        @click="previous"
        :disable="!hasPrevious"
        color="mc-main"
        text-color="white"
        icon="keyboard_arrow_left"
        round flat dense
      ></q-btn>
      <span class="ks-navigation-page">{{ selectedLayer + 1 }}/{{ layers.length }}</span>
      <q-btn
        id="ks-next"
        @click="next"
        :disable="!hasNext"
        color="mc-main"
        text-color="white"
        icon="keyboard_arrow_right"
        round flat dense
      ></q-btn>
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
      autostart: this.stack.autostart || this.ownerIndex === 0,
      duration: this.stack.duration || 5000,
      infinite: this.stack.infinite || true,
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
    hasNext() {
      return this.selectedLayer < this.layers.length - 1 || this.infinite;
    },
    next() {
      if (this.selectedLayer < this.layers.length - 1) {
        this.goTo(this.selectedLayer + 1);
      } else if (this.infinite) {
        this.goTo(0);
      }
    },
    hasPrevious() {
      return this.selectedLayer > 0 || this.infinite;
    },
    previous() {
      if (this.selectedLayer > 0) {
        this.goTo(this.selectedLayer - 1);
      } else if (this.infinite) {
        this.goTo(this.layers.length - 1);
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
  .ks-stack
    position relative
    .ks-layer-caption
      position absolute
      padding 12px
      color $grey-4
      // text-align center
      background-color alpha($main-control-main-color, 85%)
      &.ks-text-bottom
        bottom 45px
        left 0
      &.ks-text-top
        top 0
        left 0
      &.ks-text-left
        top 0
        left 0
        // height calc(100% - 45px)
      &.ks-text-right
        top 0
        right 0
        // height calc(100% - 45px)
      .ks-caption-title
        font-size 34px
        color white
        line-height 40px
        letter-spacing normal
        margin 0 0 10px 0
        text-align center
      .ks-caption-text
        font-size 1em
        color white
    .ks-layer-content
      background-repeat no-repeat
      background-size contain
      height calc(100% - 45px)
      &.ks-image-center
        background-position center
      &.ks-image-left
        background-position left
      &.ks-image-right
        background-position right
    .ks-layer
      position absolute
      padding 0
      top 0
      left 0
      &.ks-top-layer
        z-index 999 !important
      &.ks-hide-layer
        visibility hidden

    .ks-navigation
      width auto
      position absolute
      bottom 45px
      margin 0px 0
      right 0
      z-index 10000
      line-height 39px
      vertical-align middle
      opacity 0.2
      transition opacity .5s
      padding 0 5px
      border-radius 5px
      background-color $main-control-main-color
      .ks-navigation-page
        padding-top 5px
        text-align center
        display inline-block
        color white
        padding 0 10px
      &:hover
        opacity 1;
</style>
