<template>
  <q-page class="column bg-red-1">
    <div class="col row full-height bg-red-1" id="viewer-container">
      <viewer></viewer>
    </div>
    <div class="col-1 row bg-red-1">
      <klab-log v-if="logVisible"></klab-log>
    </div>
    <klab-main-control></klab-main-control>
    <q-modal
        id="modal-connection-status"
        minimized
        v-model="modalVisible"
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{width: '30vw', 'background-color': `rgba(${hexToRgb(modalColor)}, .5)`}"
        :content-classes="['text-center','round-modal','q-ma-sm']"
    >
      <div class="bg-white q-ma-md round-modal">
        <div v-if="connectionState === $constants.CONNECTION_DOWN">
          <div class="q-display-1 q-pa-md bg-opaque-white round-modal text-bol"
               :style="{color: modalColor}">
            {{ modalText }}
          </div>
          <q-btn
            color="secondary"
            @click="reconnect"
          >{{ $t('label.reconnect') }}
          </q-btn>
        </div>
        <div v-else>
          <div class="q-display-1 q-pa-md round-modal text-bold" :style="{color: modalColor}">
            {{ modalText  }}
          </div>
          <klab-spinner :color="modalColor" :size="200" wrapperId="modal-connection-status" />
        </div>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import KlabMainControl from 'components/KlabMainControl.vue';
import KlabLog from 'components/KlabLog.vue';
import Viewer from 'components/Viewer.vue';
import KlabSpinner from 'components/KlabSpinner.vue';

import { colors } from 'quasar';

export default {
  /* eslint-disable object-shorthand */
  name: 'IndexPage',
  computed: {
    ...mapGetters('stomp', [
      'connectionState',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'searchIsFocused',
    ]),
    logVisible() {
      return this.$logVisibility === this.$constants.PARAMS_LOG_VISIBLE;
    },
    modalVisible: {
      get() {
        return this.connectionState !== this.$constants.CONNECTION_UP;
      },
      set(visible) {
        console.warn(`try to set modalVisible as ${visible}`);
      },
    },
    modalText() {
      return {
        [this.$constants.CONNECTION_UNKNOWN]: this.$t('messages.connectionClosed'),
        [this.$constants.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [this.$constants.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [this.$constants.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
    modalColor() {
      return {
        [this.$constants.CONNECTION_UNKNOWN]: colors.getBrand('warning'),
        [this.$constants.CONNECTION_DOWN]: colors.getBrand('warning'),
        [this.$constants.CONNECTION_WORKING]: colors.getBrand('info'),
        [this.$constants.CONNECTION_ERROR]: colors.getBrand('negative'),
      }[this.connectionState];
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStart',
      'searchStop',
      'searchFocus',
    ]),
  },
  components: {
    KlabMainControl,
    KlabLog,
    Viewer,
    KlabSpinner,
  },
  watch: {
  },
  mounted() {
    // const self = this;
    window.addEventListener('keydown', (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        if (!this.searchIsActive) {
          this.searchStart(event.key);
          event.preventDefault();
        } else {
          if (event.keyCode === 27) {
            this.searchStop();
            event.preventDefault();
            return;
          }
          if (!this.searchIsFocused) {
            this.searchFocus({ char: event.key, focused: true });
            event.preventDefault();
          }
        }
      }
    });
  },
};
</script>
<style scoped>
  .row > div {
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2);
  }
  .bg-opaque-white {
    background: rgba(255, 255, 255, 0.5)
  }
</style>
<style lang="stylus">
  .round-modal
    border-radius 20px
</style>

