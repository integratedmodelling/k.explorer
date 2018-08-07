<template>
  <div :style="{ cursor, userSelect, flexDirection }" class="vue-splitter" @mouseup.prevent="onUp" @mousemove.prevent="onMouseMove" @touchmove.prevent="onMove" @touchend.prevent="onUp">
    <div :style="leftPaneStyle" class="left-pane splitter-pane">
      <slot name="left-pane"></slot>
    </div>
    <template v-if="!hidden">
    <div class="splitter" :class="{active}" :style ="splitterStyle" @mousedown.prevent="onDown" @touchstart.prevent="onDown">
      <q-btn
        flat
        round
        size="md"
        class="no-padding splitter-actions"
        id="splitter-to-right"
        icon="ion-arrow-dropright-circle"
        @click.native="percent = 100"
      ></q-btn>
      <q-btn
        flat
        round
        size="md"
        class="no-padding splitter-actions"
        id="splitter-to-left"
        icon="ion-arrow-dropleft-circle"
        @click.native="percent = 50"
      ></q-btn>
      <q-btn
        flat
        round
        size="md"
        class="no-padding splitter-actions"
        id="splitter-close"
        icon="ion-close-circle"
        @click.native="$emit('close-metadata')"
      ></q-btn>
    </div>
    <div :style="rightPaneStyle" class="right-pane splitter-pane">
      <slot name="right-pane"></slot>
    </div>
    </template>
  </div>
</template>
<script>
/* eslint-disable no-nested-ternary */

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
    splitterSize: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      active: false,
      percent: this.hidden === 'left' ? 0 : this.hidden === 'right' ? 100 : 50,
      hasMoved: false,
    };
  },
  computed: {
    flexDirection() {
      return this.horizontal ? 'column' : 'row';
    },
    splitterStyle() {
      return this.horizontal ? { height: `${this.splitterSize}px`, cursor: 'ns-resize', 'background-color': this.splitterColor } :
        { width: `${this.splitterSize}px`, cursor: 'ew-resize', 'background-color': this.splitterColor };
    },
    leftPaneStyle() {
      return this.horizontal ? { height: `${this.percent}%` } : { width: `${this.percent}%` };
    },
    rightPaneStyle() {
      return this.horizontal ? { height: `${100 - this.percent}%` } : { width: `${100 - this.percent}%` };
    },
    userSelect() {
      return this.active ? 'none' : '';
    },
    cursor() {
      return this.active ? (this.horizontal ? 'ns-resize' : 'ew-resize') : '';
    },
  },
  methods: {
    onClick() {
      if (!this.hasMoved) {
        this.percent = 50;
        this.$emit('resize');
      }
    },
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
        this.$emit('resize');
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
      this.percent = this.hidden === 'left' ? 0 : this.hidden === 'right' ? 100 : 50;
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
      white-space: nowrap;
      padding: 10px 0;
    }
  }
  .splitter-actions {
    position: absolute;
    height: 1.2em;
    width: 1.2em;
    color: black;
    right: 10px;
  }
  #splitter-to-right {
    top: 1.2em;
  }
  #splitter-to-left {
    top: 2.5em;
  }
  #splitter-close {
    top: 3.8em;
  }
</style>
