<template>
  <div
    class="kterm-container"
    :id="`kterm-container-${terminal.id}`"
    v-draggable="draggableConfig"
    :class="{'kterm-minimized': !terminal.active, 'kterm-focused': hasFocus}"
  >
    <div class="kterm-header" :style="{ 'background-color': background }" :id="`kterm-handle-${terminal.id}`" @mousedown="instance.focus()">
      <q-btn icon="mdi-delete-clock-outline" :disable="terminalCommands.length === 0" flat color="white" dense class="kterm-button kterm-delete-history" @click="deleteHistory">
        <q-tooltip class="kterm-tooltip" anchor="top middle" self="bottom middle" :offset="[0, 8]" :delay="1000">{{ $t('label.terminalDeleteHistory') }}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-resize" flat color="white" dense class="kterm-button kterm-drag" @click="selectSize = true">
        <q-tooltip class="kterm-tooltip" anchor="top middle" self="bottom middle" :offset="[0, 8]" :delay="1000">{{ $t('label.terminalResizeWindow') }}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-window-minimize" v-if="terminal.active" flat color="white" dense class="kterm-button kterm-minimize" @click="minimize">
        <q-tooltip class="kterm-tooltip" anchor="top middle" self="bottom middle" :offset="[0, 8]" :delay="1000">{{ $t('label.terminalMinimize') }}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-window-maximize" v-else flat color="white" dense class="kterm-button kterm-minimize" @click="maximize">
        <q-tooltip class="kterm-tooltip" anchor="top middle" self="bottom middle" :offset="[0, 8]" :delay="1000">{{ $t('label.terminalMaxmize') }}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-close-circle" flat @click="closeTerminal" color="white" dense class="kterm-button kterm-close">
        <q-tooltip class="kterm-tooltip" anchor="top middle" self="bottom middle" :offset="[0, 8]" :delay="1000">{{ $t('label.terminalClose') }}</q-tooltip>
      </q-btn>
    </div>
    <div v-show="terminal.active" :id="`kterm-${terminal.id}`" class="kterm-terminal"></div>
    <q-dialog
      v-model="selectSize"
      @ok="onOk"
      color="mc-main"
    >
      <span slot="title">{{ $t('label.titleSelectTerminalSize') }}</span>
      <div slot="body">
        <q-option-group
          type="radio"
          color="mc-main"
          v-model="selectedSize"
          :options="TERMINAL_SIZE_OPTIONS.map(tso => ({
            label: tso.label,
            value: tso.value,
          }))"
        />
      </div>
      <template slot="buttons" slot-scope="props">
        <q-btn color="mc-main" outline :label="$t('label.appCancel')" @click="props.cancel"></q-btn>
        <q-btn color="mc-main" :label="$t('label.appOK')" @click="sizeSelected(props.ok, false)"></q-btn>
        <q-btn color="mc-main" outline :label="$t('label.appSetDefault')" @click="sizeSelected(props.ok, true)"></q-btn>
      </template>
    </q-dialog>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import { Terminal } from 'xterm';
// import { FitAddon } from 'xterm-addon-fit';
import { mapActions, mapGetters } from 'vuex';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { Cookies, dom } from 'quasar';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { CUSTOM_EVENTS, WEB_CONSTANTS, TERMINAL_TYPES, TERMINAL_SIZE_OPTIONS } from 'shared/Constants';
import 'xterm/css/xterm.css';

const { height } = dom;

export default {
  name: 'KlabTerminal',
  props: {
    terminal: {
      type: Object,
      required: true,
    },
    size: {
      type: String,
      validator: value => TERMINAL_SIZE_OPTIONS.findIndex(tso => tso.value === value) !== -1,
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
        onDragEnd: () => {
          this.instance.focus();
        },
      },
      draggableElement: undefined,
      commandCounter: 0,
      command: [],
      hasFocus: false,
      selectedSize: null,
      selectSize: false,
      commandsIndex: -1,
      TERMINAL_SIZE_OPTIONS,
    };
  },
  computed: {
    background() {
      return this.bgcolor !== '' ? this.bgcolor : this.terminal.type === TERMINAL_TYPES.DEBUGGER ? '#002f74' : '#2e0047';
    },
    ...mapGetters('data', [
      'terminalCommands',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'removeTerminal',
      'addTerminalCommand',
      'clearTerminalCommands',
    ]),
    minimize() {
      this.terminal.active = false;
      this.changeDraggablePosition({ top: window.innerHeight - 55, left: 25 });
    },
    maximize() {
      this.changeDraggablePosition(this.draggableConfig.initialPosition);
      this.terminal.active = true;
      this.$nextTick(() => {
        this.instance.focus();
      });
    },
    closeTerminal() {
      this.sendStompMessage(MESSAGES_BUILDERS.CONSOLE_CLOSED({ consoleId: this.terminal.id, consoleType: this.terminal.type }, this.$store.state.data.session).body);
      this.instance = null;
      this.removeTerminal(this.terminal.id);
    },
    changeDraggablePosition(position) {
      this.draggableElement.style.left = `${position.left}px`;
      this.draggableElement.style.top = `${position.top}px`;
      const draggableState = JSON.parse(this.draggableConfig.handle.getAttribute('draggable-state'));
      draggableState.startDragPosition = position;
      draggableState.currentDragPosition = position;
      this.draggableConfig.handle.setAttribute('draggable-state', JSON.stringify(draggableState));
    },
    commandResponseListener(command) {
      if (command && command.payload && command.consoleId === this.terminal.id) {
        this.instance.write(`\b \b\b \b${command.payload}`);
        this.instance.prompt();
      }
    },
    onFocusListener(terminalId) {
      this.hasFocus = this.terminal.id === terminalId;
    },
    async sizeSelected(okFunction, setDefault) {
      await okFunction();
      const sizeItem = TERMINAL_SIZE_OPTIONS.find(s => s.value === this.selectedSize);
      this.instance.resize(sizeItem.cols, sizeItem.rows);
      if (setDefault) {
        Cookies.set(WEB_CONSTANTS.COOKIE_TERMINAL_SIZE, this.selectedSize, {
          expires: 30,
          path: '/',
        });
      }
    },
    onOk() {
      // nothing to do
    },
    deleteHistory() {
      this.clearTerminalCommands();
    },
  },
  created() {
    this.sendStompMessage(MESSAGES_BUILDERS.CONSOLE_CREATED({ consoleId: this.terminal.id, consoleType: this.terminal.type }, this.$store.state.data.session).body);
  },
  mounted() {
    let initialSize;
    if (this.size) {
      initialSize = this.size;
    } else if (Cookies.has(WEB_CONSTANTS.COOKIE_TERMINAL_SIZE)) {
      initialSize = Cookies.get(WEB_CONSTANTS.COOKIE_TERMINAL_SIZE);
    } else {
      initialSize = TERMINAL_SIZE_OPTIONS[0].value;
    }
    const sizeItem = TERMINAL_SIZE_OPTIONS.find(s => s.value === initialSize);
    this.selectedSize = sizeItem.value;
    this.instance = new Terminal({
      cols: sizeItem.cols,
      rows: sizeItem.rows,
      cursorBlink: true,
      bellStyle: 'both',
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
    this.instance.writeln(`${this.$t('messages.terminalHello', { type: this.terminal.type })} / ${this.terminal.id}`);
    this.instance.prompt();

    this.instance.onData((e) => {
      const eraseAndWrite = (text = '') => {
        for (let i = 0; i < this.command.length; i++) {
          this.instance.write('\b \b');
        }
        this.instance.write(text);
        this.command.splice(0, this.command.length);
        this.command.push(...text);
      };
      const xPos = this.instance._core.buffer.x;
      switch (e) {
        case '\r': { // Enter
          if (this.command.length > 0) {
            const c = this.command.join('');
            this.sendStompMessage(MESSAGES_BUILDERS.COMMAND_REQUEST({
              consoleId: this.terminal.id,
              consoleType: this.terminal.type,
              commandId: `${this.terminal.id}-${++this.commandCounter}`,
              payload: c,
            }, this.$store.state.data.session).body);
            this.addTerminalCommand(c);
          }
          this.command.splice(0, this.command.length);
          this.commandsIndex = -1;
          this.instance.prompt();
          break;
        }
        case '\u007F': // Backspace (DEL)
          // Do not delete the prompt
          if (xPos > 2) {
            this.instance.write('\b \b');
          }
          if (this.command.length > 0) {
            this.command.pop();
          }
          break;

        case '\x1b[A':
          if (this.terminalCommands.length > 0 && this.commandsIndex < this.terminalCommands.length - 1) {
            eraseAndWrite(this.terminalCommands[++this.commandsIndex]);
          }
          break;
        case '\x1b[B':
          if (this.terminalCommands.length > 0 && this.commandsIndex > 0) {
            eraseAndWrite(this.terminalCommands[--this.commandsIndex]);
          } else {
            eraseAndWrite();
            this.commandsIndex = -1;
          }
          break;
        case '\x1b[C':
          if (xPos < this.command.length + 2) {
            this.instance.write(e);
          }
          break;
        case '\x1b[D':
          if (xPos > 2) {
            this.instance.write(e);
          }
          break;

        default: // Print all other characters for demo
          this.command.push(e);
          this.instance.write(e);
      }
    });
    this.instance.textarea.addEventListener('focus', () => {
      this.$eventBus.$emit(CUSTOM_EVENTS.TERMINAL_FOCUSED, this.terminal.id);
    });
    this.draggableConfig.handle = document.getElementById(`kterm-handle-${this.terminal.id}`);
    this.draggableElement = document.getElementById(`kterm-container-${this.terminal.id}`);
    this.draggableConfig.initialPosition = { top: window.innerHeight - height(this.draggableElement) - 25, left: 25 };
    this.instance.focus();
    this.$eventBus.$on(CUSTOM_EVENTS.TERMINAL_FOCUSED, this.onFocusListener);
    this.$eventBus.$on(CUSTOM_EVENTS.COMMAND_RESPONSE, this.commandResponseListener);
  },
  beforeDestroy() {
    if (this.instance !== null) {
      this.closeTerminal();
    }
    this.$eventBus.$off(CUSTOM_EVENTS.TERMINAL_FOCUSED, this.onFocusListener);
    this.$eventBus.$off(CUSTOM_EVENTS.COMMAND_RESPONSE, this.commandResponseListener);
  },
};
</script>

<style lang="stylus">
$kterm-$border-color = rgba(255, 255, 255, .5)
.kterm-container
  z-index 4999
  .kterm-header
    border-top-right-radius 8px;
    border-top-left-radius 8px;
    height 30px
    border-top 1px solid $kterm-$border-color
    border-left 1px solid $kterm-$border-color
    border-right 1px solid $kterm-$border-color
    cursor move
    opacity 0.9
    z-index 5001
    .kterm-button
      position absolute
    .kterm-close
      top 0px
      right 0px
    .kterm-minimize
      top 0px
      right 30px
    .kterm-drag
      top 0
      right 60px
    .kterm-delete-history
      top 0
      right 90px
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
  &.kterm-focused
    z-index 5000
  .kterm-terminal
    border 1px solid $kterm-$border-color
.kterm-tooltip
    background-color var(--app-main-color) !important
</style>
