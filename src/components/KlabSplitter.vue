<template>
  <div id="splitter-container" class="full-height">
    <div class="splitter-controllers" v-if="!hidden && controllers">
      <template v-if="!onlyOpenClose">
        <q-btn
          flat
          round
          size="sm"
          class="no-padding splitter-actions"
          id="splitter-to-left"
          icon="mdi-arrow-left"
          :style="{ color: controlsColor}"
          @click.native="percent = 0"
        ></q-btn>
        <q-btn
          flat
          round
          size="sm"
          class="no-padding splitter-actions rotate-90"
          id="splitter-to-middle"
          icon="mdi-format-align-middle"
          :style="{ color: controlsColor}"
          @click.native="percent = 50"
        ></q-btn>
        <q-btn
          flat
          round
          size="sm"
          class="no-padding splitter-actions"
          id="splitter-to-right"
          icon="mdi-arrow-right"
          :style="{ color: controlsColor}"
          @click.native="percent = 100"
        ></q-btn>
      </template>
      <q-btn
        flat
        round
        size="sm"
        class="no-padding splitter-actions"
        id="splitter-close"
        icon="mdi-close"
        :style="{ color: controlsColor}"
        @click.native="$emit('close-info')"
      ></q-btn>
    </div>
    <div :style="{ cursor, flexDirection }" class="vue-splitter" v-on="!onlyOpenClose ? { mouseup: onUp, mousemove: onMouseMove, touchmove: onMove, touchend: onUp } : {}">
      <div :style="leftPaneStyle" class="left-pane splitter-pane">
        <slot name="left-pane"></slot>
      </div>
      <template v-if="!hidden">
        <div v-if="!onlyOpenClose" class="splitter" :class="{active}" :style ="splitterStyle" v-on="!onlyOpenClose ? { mousedown: onDown, touchstart: onDown } : {}"></div>
        <div :style="rightPaneStyle" class="right-pane splitter-pane">
          <slot name="right-pane"></slot>
        </div>
      </template>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    margin: {
      type: Number,
      default: 10,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    hidden: {
      type: String,
      default: '',
    },
    splitterColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.2)',
    },
    controlsColor: {
      type: String,
      default: 'rgba(192, 192, 192)',
    },
    splitterSize: {
      type: Number,
      default: 3,
    },
    controllers: {
      type: Boolean,
      default: true,
    },
    onlyOpenClose: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      active: false,
      percent: (this.hidden === 'left' ? 0 : this.hidden === 'right' ? 100 : (this.onlyOpenClose ? 0 : 50)),
      hasMoved: false,
    };
  },
  computed: {
    flexDirection() {
      return this.horizontal ? 'column' : 'row';
    },
    splitterStyle() {
      return this.horizontal ? { height: `${this.splitterSize}px`, cursor: 'ns-resize', 'background-color': this.splitterColor }
        : { width: `${this.splitterSize}px`, cursor: 'ew-resize', 'background-color': this.splitterColor };
    },
    leftPaneStyle() {
      return this.horizontal ? { height: `${this.percent}%` } : { width: `${this.percent}%` };
    },
    rightPaneStyle() {
      return this.horizontal ? { height: `${100 - this.percent}%` } : { width: `${100 - this.percent}%` };
    },
    cursor() {
      return this.active ? (this.horizontal ? 'ns-resize' : 'ew-resize') : '';
    },
  },
  methods: {
    /*
    onClick() {
      if (!this.hasMoved) {
        this.percent = 50;
        this.$emit('splitterresize');
      }
    },
    */
    onDown() {
      this.active = true;
      this.hasMoved = false;
    },
    onUp() {
      this.active = false;
    },
    onMove(e) {
      let offset = 0;
      let target = e.currentTarget;
      let percent = 0;
      if (this.active) {
        if (this.horizontal) {
          while (target) {
            offset += target.offsetTop;
            target = target.offsetParent;
          }
          percent = Math.floor(((e.pageY - offset) / e.currentTarget.offsetHeight) * 10000) / 100;
        } else {
          while (target) {
            offset += target.offsetLeft;
            target = target.offsetParent;
          }
          percent = Math.floor(((e.pageX - offset) / e.currentTarget.offsetWidth) * 10000) / 100;
        }
        if (percent > this.margin && percent < 100 - this.margin) {
          this.percent = percent;
        }
        this.$emit('splitterresize');
        this.hasMoved = true;
      }
    },
    onMouseMove(e) {
      if (e.buttons === 0 || e.which === 0) {
        this.active = false;
      }
      this.onMove(e);
    },
  },
  watch: {
    hidden() {
      this.percent = (this.hidden === 'left' ? 0 : this.hidden === 'right' ? 100 : (this.onlyOpenClose ? 0 : 50));
    },
  },
};
</script>
<style lang="stylus">

  .vue-splitter {
    height: inherit;
    display: flex;
    overflow: hidden;
    .splitter-pane {
      height: inherit;
      overflow: hidden;
      padding: 0;
    }
    .left-pane {
      white-space: nowrap;
    }
    .right-pane {
      word-wrap: break-word;
    }
  }
  .splitter-actions {
    width: 2em;
    height: 2em;
  }
  #splitter-close {
    position: absolute;
    right: 0;
  }
  .splitter-controllers {
    background-color: #000;
    text-align: center;
    height $main-control-spc-height;
  }
</style>
