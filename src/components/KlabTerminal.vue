<template>
  <div class="kterm-container">
    <div v-show="terminal.active" :id="`kterm-${terminal.id}`"></div>
    <q-btn icon="mdi-close-circle-outline" @click.native="removeTerminal(terminal.id)" color="app-main-color" dense round class="kterm-close"></q-btn>
  </div>
</template>

<script>
import { Terminal } from 'xterm';
import { mapActions } from 'vuex';
import 'xterm/css/xterm.css';

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
      default: 'rgb(57, 57, 57)',
    },
  },
  data() {
    return {
      instance: undefined,
    };
  },
  methods: {
    ...mapActions('data', [
      'removeTerminal',
    ]),
  },
  mounted() {
    this.instance = new Terminal({
      cols: this.cols,
      rows: this.rows,
      theme: {
        background: this.background,
      },
      cursorBlink: true,
    });
    this.instance.prompt = () => {
      this.instance.write('\r\n$ ');
    };
    this.instance.open(document.getElementById(`kterm-${this.terminal.id}`));
    this.instance.writeln(this.$t('messages.terminalHello', { type: this.terminal.type }));
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
    this.instance.focus();
  },
  beforeDestroy() {
    this.removeTerminal(this.terminal.id);
  },
};
</script>

<style lang="stylus">
.kterm-container
  position absolute
  bottom 16px
  left 16px
.kterm-close
  position absolute
  top -15px
  right -15px
</style>
