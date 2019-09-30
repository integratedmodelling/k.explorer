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
        :id="`ks-image-${ownerIndex}-${layerIndex}`"
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
    <div class="ks-navigation" :class="{ 'ks-navigation-transparent': animation !== null }">
      <q-btn
        id="ks-prev"
        @click="previous"
        :disable="!hasPrevious"
        color="mc-main"
        text-color="white"
        size="sm"
        icon="mdi-chevron-left"
        round flat dense
        :title="$t('label.appPrevious')"
      ></q-btn>
      <q-btn
        id="ks-next"
        @click="next"
        :disable="!hasNext"
        color="mc-main"
        text-color="white"
        icon="mdi-chevron-right"
        size="sm"
        round flat dense
        :title="$t('label.appNext')"
      ></q-btn>
      <q-btn
        id="ks-play-stop"
        @click="animation === null ? playStack() : stopStack()"
        color="mc-main"
        text-color="white"
        size="sm"
        :icon="animation === null ? 'mdi-play' : 'mdi-pause'"
        round flat dense
        :title="animation === null ? $t('label.appPlay') : $t('label.appPause')"
      ></q-btn>
      <span class="ks-navigation-page">{{ selectedLayer + 1 }}/{{ layers.length }}</span>
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
        this.playStack();
      }
    },
    stopStack() {
      if (this.animation !== null) {
        clearTimeout(this.animation);
        this.animation = null;
      }
    },
    playStack() {
      this.setAnimation(this.layers[this.selectedLayer].duration || this.duration);
    },
    goTo(index, animate = false) {
      this.stopStack();
      this.selectedLayer = index;
      if (animate) {
        this.playStack();
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
      document.getElementById(`ks-image-${this.ownerIndex}-${this.selectedLayer}`).src = `${this.layers[this.selectedLayer].image}?a=${Date.now()}`;
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
          this.playStack();
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
        bottom 44px
        left 0
      &.ks-text-top
        top 0
        left 0
      &.ks-text-left
        top 0
        left 0
        height calc(100% - 44px)
      &.ks-text-right
        top 0
        right 0
        height calc(100% - 44px)
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
      height calc(100% - 44px)
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
      bottom 44px
      right 0
      z-index 10000
      vertical-align middle
      transition opacity .5s
      border-radius 5px
      padding 2px
      &.ks-navigation-transparent
        opacity 0.2
      .ks-navigation-page
        text-align center
        display inline-block
        color white
        font-size .8em
        padding 0 5px
      &:hover
        opacity 1;
        background-color background-color alpha($main-control-main-color, 85%)
</style>
