<template>
  <div
    class="kterm-container"
    :id="`kterm-container-${terminal.id}`"
    v-draggable="draggableConfig"
    :class="{'kterm-minimized': !terminal.active}"
    :style="{'z-index': zIndex}"
  >
    <div class="kterm-header" :style="{ 'background-color': background }" :id="`kterm-handle-${terminal.id}`">
      <q-btn icon="mdi-window-minimize" v-if="terminal.active" flat color="white" dense class="kterm-button kterm-minimize" @click="minimize"></q-btn>
      <q-btn icon="mdi-window-maximize" v-else flat color="white" dense class="kterm-button kterm-minimize" @click="maximize"></q-btn>
      <!-- <q-btn icon="mdi-resize" flat color="white" dense class="kterm-button kterm-drag"></q-btn> -->
      <q-btn icon="mdi-close-circle" flat @click.native="removeTerminal(terminal.id)" color="white" dense class="kterm-button kterm-close"></q-btn>
    </div>
    <div v-show="terminal.active" :id="`kterm-${terminal.id}`" class="kterm-terminal"></div>
  </div>
</template>

<script>
import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
import { mapActions } from 'vuex';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { dom } from 'quasar';
import 'xterm/css/xterm.css';

const { height } = dom;

export default {
  name: 'KlabTerminal',
  props: {
    terminal: {
      type: Object,
      required: true,
    },
    cols: {
      type: Number,
      default: 80,
    },
    rows: {
      type: Number,
      default: 24,
    },
    bgcolor: {
      type: String,
      default: '',
    },
  },
  directives: {
    Draggable,
  },
  data() {
    return {
      instance: undefined,
      // fitAddon: undefined,
      zIndex: 1000,
      draggableConfig: {
        handle: undefined,
        resetInitialPos: true,
      },
      draggableElement: undefined,
      initialPosition: undefined,
    };
  },
  computed: {
    background() {
      return this.bgcolor !== '' ? this.bgcolor : this.terminal.type === 'debugger' ? '#0747a6' : '#410066';
    },
  },
  methods: {
    ...mapActions('data', [
      'removeTerminal',
    ]),
    minimize() {
      this.terminal.active = false;
      this.$nextTick(() => {
        this.changeDraggablePosition({ top: window.innerHeight - 55, left: 25 });
      });
    },
    maximize() {
      this.terminal.active = true;
      this.$nextTick(() => {
        this.changeDraggablePosition(this.initialPosition);
        this.$forceUpdate();
        this.instance.focus();
      });
    },
    changeDraggablePosition(position) {
      const draggableState = JSON.parse(this.draggableConfig.handle.getAttribute('draggable-state'));
      if (!this.initialPosition) {
        this.initialPosition = position;
      }
      draggableState.initialPosition = position;
      draggableState.startDragPosition = position;
      draggableState.currentDragPosition = position;
      this.draggableConfig.handle.setAttribute('draggable-state', JSON.stringify(draggableState));
      this.$forceUpdate();
      this.draggableConfig.handle.style.left = `${position.left}px`;
      this.draggableConfig.handle.top = `${position.top}px`;
    },
  },
  created() {
  },
  mounted() {
    this.instance = new Terminal({
      cols: this.cols,
      rows: this.rows,
      cursorBlink: true,
      theme: {
        background: this.background,
      },
    });
    // this.fitAddon = new FitAddon();
    // this.instance.loadAddon(this.fitAddon);
    this.instance.prompt = () => {
      this.instance.write('\r\n$ ');
    };
    this.instance.open(document.getElementById(`kterm-${this.terminal.id}`));
    this.instance.writeln(`\n${this.$t('messages.terminalHello', { type: this.terminal.type })}`);
    this.instance.prompt();

    this.instance.onData((e) => {
      switch (e) {
        case '\r': // Enter
        // case '\u0003': // Ctrl+C
          console.warn('ENTER');
          this.instance.prompt();
          break;
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          // eslint-disable-next-line no-underscore-dangle
          if (this.instance._core.buffer.x > 2) {
            this.instance.write('\b \b');
          }
          break;
        default: // Print all other characters for demo
          this.instance.write(e);
      }
    });
    this.draggableConfig.handle = document.getElementById(`kterm-handle-${this.terminal.id}`);
    this.instance.focus();
    this.$nextTick(() => {
      const h = height(document.getElementById(`kterm-container-${this.terminal.id}`));
      this.changeDraggablePosition({ top: window.innerHeight - h - 25, left: 25 });
    });
  },
};
</script>

<style lang="stylus">
  .kterm-header
    border-top-right-radius 10px;
    border-top-left-radius 10px;
    height 30px
    border-bottom 1px solid white
    cursor move
    opacity 0.9
    z-index 9999
    .kterm-button
      position absolute
    .kterm-close
      top 0px
      right 0px
    .kterm-minimize
      top 0px
      right 30px
    .kterm-drag
      top 0px
      right 60px
  &.kterm-minimized
    width 90px
    position absolute
    bottom 25px
    left 25px
    top unset
    .kterm-header
      border-bottom-left-radius 10px;
      border-bottom-right-radius 10px;
      border none
</style>
