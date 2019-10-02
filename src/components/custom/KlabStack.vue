<template>
  <div
    class="ks-stack-container"
    ref="ks-stack-container"
    v-if="layers.length > 0"
  >
    <div
      class="ks-layer"
      v-for="(layer, layerIndex) in layers"
      ref="ks-layer"
      :key="`ks-layer-${layerIndex}`"
      :id="`ks-layer-${ownerIndex}-${layerIndex}`"
      :style="`z-index: 10${layers.length - layerIndex}`"
      :class="{ 'ks-top-layer': selectedLayer === layerIndex, 'ks-hide-layer': selectedLayer !== layerIndex }"
      @click="next"
    >
      <div
        v-if="layer.image"
        class="ks-layer-image"
        :class="elementClasses(layer.image)"
        :style="elementStyle(layer.image)"
      ><img
        :src="`statics/help/${layer.image.url}`"
        :alt="layer.image.alt || layer.title || layer.text"
        :title="layer.image.alt || layer.title || layer.text"
        :id="`ks-image-${ownerIndex}-${layerIndex}`"
        :style="{
          width: layer.image.width || 'auto',
          height: layer.image.height || 'auto',
          'max-width': imgMaxSize.width,
          'max-height': imgMaxSize.height,
        }"
      />
      </div>
      <div
        v-if="layer.title || layer.text"
        class="ks-layer-caption"
        :class="elementClasses(layer.textDiv)"
        :style="elementStyle(layer.textDiv)"
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
        text-color="grey-8"
        icon="mdi-chevron-left"
        round flat dense
        :title="$t('label.appPrevious')"
      ></q-btn>
      <q-btn
        id="ks-play-stop"
        @click="animation === null ? playStack() : stopStack()"
        :disable="!hasNext"
        text-color="grey-8"
        :icon="animation === null ? 'mdi-play' : 'mdi-pause'"
        round flat dense
        :title="animation === null ? $t('label.appPlay') : $t('label.appPause')"
      ></q-btn>
      <q-btn
        id="ks-next"
        @click="next"
        :disable="!hasNext"
        text-color="grey-8"
        icon="mdi-chevron-right"
        round flat dense
        :title="$t('label.appNext')"
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
    maxOwnerIndex: {
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
      animated: typeof this.stack.animated !== 'undefined' ? this.stack.animated : false,
      autostart: typeof this.stack.autostart !== 'undefined' ? this.stack.autostart : this.ownerIndex === 0,
      duration: this.stack.duration || 5000,
      infinite: typeof this.stack.infinite !== 'undefined' ? this.stack.infinite : false,
      initialSize: {},
      scale: 1,
      imgMaxSize: { width: '100%', height: '100%' },
    };
  },
  computed: {
    hasPrevious() {
      return this.selectedLayer > 0 || this.ownerIndex > 0 || this.infinite;
    },
    hasNext() {
      return this.selectedLayer < this.layers.length - 1 || this.ownerIndex < this.maxOwnerIndex - 1 || this.infinite;
    },
    modalSize() {
      return this.$store.state.view.modalSize;
    },
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
        this.animated = false;
      }
    },
    playStack() {
      const layer = this.layers[this.selectedLayer];
      if (layer.image && layer.image.url.indexOf('.gif') !== -1) {
        // reset gif
        document.getElementById(`ks-image-${this.ownerIndex}-${this.selectedLayer}`).src = this.getImage(this.layers[this.selectedLayer]);
      }
      this.animated = true;
      this.setAnimation(this.layers[this.selectedLayer].duration || this.duration);
    },
    goTo(index) {
      if (index === 'last') {
        index = this.layers.length - 1;
      }
      this.selectedLayer = index;
      if (this.animated) {
        this.playStack();
      }
    },
    next() {
      if (this.selectedLayer < this.layers.length - 1) {
        this.goTo(this.selectedLayer + 1);
      } else if (this.infinite) {
        this.goTo(0);
      } else {
        this.$emit('stackend', { index: this.ownerIndex, direction: 1 });
        return false;
      }
      return true;
    },
    previous() {
      if (this.selectedLayer > 0) {
        this.goTo(this.selectedLayer - 1);
      } else if (this.infinite) {
        this.goTo(this.layers.length - 1);
      } else {
        this.$emit('stackend', { index: this.ownerIndex, direction: -1 });
      }
    },
    setAnimation(duration) {
      if (this.stack.layers.length <= 1) {
        return; // no amimation for one frame
      }
      const self = this;
      if (this.animation !== null) {
        clearTimeout(this.animation);
      }
      this.animation = setTimeout(() => {
        self.next();
        // console.log(`${self.ownerIndex}: ${self.selectedLayer} of ${self.layers.length}`);
      }, duration);
    },
    getImage(layer) {
      return layer.image ? `statics/help/${layer.image.url}?a=${Date.now()}` : '';
    },
    elementStyle(element) {
      if (typeof element === 'undefined') {
        return {};
      }
      const style = {
        ...element.position,
        ...element.style,
        ...(element.width && { width: element.width }),
        ...(element.height && { height: element.height }),
      };
      return style;
    },
    elementClasses(element) {
      if (typeof element === 'undefined') {
        return [];
      }
      return !element.position ? [`ks-${element.hAlign || 'center'}`, `ks-${element.vAlign || 'middle'}`] : [];
    },
  },
  watch: {
    modalSize() {
      setTimeout(() => {
        const layer = this.$refs['ks-layer'][0];
        const width = `${layer.clientWidth}px`;
        const height = `${layer.clientHeight}px`;
        this.imgMaxSize = { width, height };
      }, 200); // wait for animation
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
  .ks-stack-container
    position relative
    height calc(100% - 20px)
    margin 20px 20px 0
    .ks-layer
      position absolute
      top 0
      left 0
      bottom 90px
      right 0
      opacity 0
      transition opacity .5s ease-in-out
      overflow hidden
      &.ks-top-layer
        z-index 999 !important
        opacity 1
    .ks-layer-caption
      position absolute
      padding 12px
      width auto
      height auto
      color $grey-8
      .ks-caption-title
        font-size 32px
        letter-spacing normal
        margin 0 0 10px 0
        text-align center
      .ks-caption-text
        font-size 18px

    .ks-layer-image
      position absolute
      max-width 100%
      max-height 100%
      overflow hidden
      img
        width auto
        height auto
        max-width 100%
        max-height 100%
    .ks-middle
      top 50%
      transform translateY(-50%)
      &.ks-center
        transform translate(-50%, -50%)
    .ks-center
      left 50%
      transform translateX(-50%)
    .ks-top
      top 0
    .ks-bottom
      bottom 0
    .ks-left
      left 0
    .ks-right
      right 0

    .ks-navigation
      width 100%
      text-align center
      position absolute
      bottom 50px
      right 0
      z-index 10000
      vertical-align middle
      transition opacity .5s
      border-radius 5px
      padding 2px
      height 40px
      &.ks-navigation-transparent
        opacity 0.6
      &:hover
        opacity 1;
        background-color background-color alpha($main-control-main-color, 85%)
</style>
