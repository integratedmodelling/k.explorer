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
      :style="{ 'z-index': selectedLayer === layerIndex ? 9999 : layers.length - layerIndex }"
      :class="{ 'ks-top-layer': selectedLayer === layerIndex, 'ks-hide-layer': selectedLayer !== layerIndex }"
    >
      <div
        v-if="layer.image"
        class="ks-layer-image"
        :class="elementClasses(layer.image)"
        :style="elementStyle(layer.image)"
      ><img
        :src="getImage(layer)"
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
        <div class="ks-caption-title" v-if="layer.title" v-html="rewriteImageUrl(layer.title)"></div>
        <div class="ks-caption-text" v-if="layer.text"  :style="{ 'text-align': layer.textAlign || 'left' }" v-html="rewriteImageUrl(layer.text)"></div>
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
        id="ks-replay"
        @click="refreshLayer(layers[selectedLayer])"
        :disable="!isGif"
        text-color="grey-8"
        icon="mdi-reload"
        round flat dense
        :title="$t('label.appReplay')"
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
    presentation: {
      type: Object,
      required: true,
    },
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
    onTop: {
      type: Boolean,
      default: false,
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
      imgMaxSize: { width: 'auto', height: 'auto' },
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
    isGif() {
      const layer = this.layers[this.selectedLayer];
      return (!!layer && layer.image && layer.image.url.endsWith('.gif'));
    },
    helpBaseUrl() {
      return this.$store.state.view.helpBaseUrl;
    },
    baseUrl() {
      return `${this.helpBaseUrl}/${this.presentation.baseFolder}`;
    },
  },
  methods: {
    initStack() {
      this.selectedLayer = 0;
      this.stopStack();
      this.animated = typeof this.stack.animated !== 'undefined' ? this.stack.animated : false;
      if (this.animated && this.onTop) {
        this.playStack();
      }
    },
    playStack() {
      const layer = this.layers[this.selectedLayer];
      this.animated = true;
      if (layer.image && layer.image.url.indexOf('.gif') !== -1) {
        // reset gif
        this.reloadGif(layer);
      }
      this.setAnimation(layer.duration || this.duration);
    },
    stopStack() {
      if (this.animation !== null) {
        clearTimeout(this.animation);
        this.animation = null;
        this.animated = false;
      }
    },
    refreshLayer(layer) {
      if (this.animated) {
        this.stopStack();
        this.playStack();
      } else {
        this.reloadGif(layer);
      }
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
        this.$emit('stackend', { index: this.ownerIndex, direction: 1 });
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
    reloadGif(layer) {
      const img = document.getElementById(`ks-image-${this.ownerIndex}-${this.selectedLayer}`);
      if (img) {
        img.src = this.getImage(layer);
      }
    },
    setAnimation(duration) {
      if (!this.hasNext) {
        return; // no amimation for one frame
      }
      const self = this;
      if (this.animation !== null) {
        clearTimeout(this.animation);
        this.animation = null;
      }
      this.animation = setTimeout(() => {
        self.next();
        // console.log(`${self.ownerIndex}: ${self.selectedLayer} of ${self.layers.length}`);
      }, duration);
    },
    getImage(layer) {
      return layer.image ? `${this.baseUrl}/${layer.image.url}?t=${Math.random()}` : ''; // TODO remove random when help will be stable
    },
    rewriteImageUrl(html) {
      if (html && html.length > 0 && html.indexOf('<img') !== -1) {
        return html.replace(/src="/g, `src="${this.baseUrl}/`);
      }
      return html;
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
    presentation() {
      // totally new stack
      this.layers = this.stack.layers;
      this.animated = typeof this.stack.animated !== 'undefined' ? this.stack.animated : false;
      this.autostart = typeof this.stack.autostart !== 'undefined' ? this.stack.autostart : this.ownerIndex === 0;
      this.duration = this.stack.duration || 5000;
      this.infinite = typeof this.stack.infinite !== 'undefined' ? this.stack.infinite : false;
      this.initStack();
    },
    modalSize() {
      this.$nextTick(() => {
        setTimeout(() => {
          const layer = this.$refs['ks-layer'][0];
          const width = `${layer.clientWidth}px`;
          const height = `${layer.clientHeight}px`;
          this.imgMaxSize = { width, height };
        }, 200); // wait for animation
      });
    },
    onTop(newValue) {
      if (newValue) {
        this.initStack();
      }
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
    height calc(100% - 30px)
    margin 30px 20px 0
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
    li
      padding-bottom 10px
    .ks-layer-caption
      position absolute
      padding 12px
      width auto
      height auto
      color $grey-8
      max-height 100%
      overflow auto
      .ks-caption-title
        font-size 24px
        letter-spacing normal
        margin 0 0
        text-align center
      .ks-caption-text
        font-size 16px
    .ks-layer-image
      position absolute
      overflow hidden
      img
        width auto
        height auto
    .ks-middle
      top 50%
      transform translateY(-50%)
      &.ks-center
        transform translate(-50%, -50%)
    .ks-center
      left 50%
      transform translateX(-50%)
      &:not(.ks-layer-image)
        width 100%
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
      transition opacity .3s
      height 40px
      border-bottom 1px solid $grey-3;
      &.ks-navigation-transparent
        opacity 0.6
      &:hover
        opacity 1;

    @media (min-width: 1600px)
      .ks-caption-title
        font-size 32px !important
        margin 0 0 1em !important
      .ks-caption-text
        font-size 18px !important

</style>
