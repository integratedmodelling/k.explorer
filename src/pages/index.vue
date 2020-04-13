<template>
  <q-page class="column">
    <components-viewer></components-viewer>
    <div class="col row full-height" id="viewer-container">
      <keep-alive>
        <!-- <transition name="component-fade" mode="out-in"> -->
        <component :is="mainViewer.name"></component>
        <!-- </transition> -->
      </keep-alive>
      <q-resize-observable @resize="setChildrenToAskFor" />
    </div>
    <div class="col-1 row">
      <klab-log v-if="logVisible"></klab-log>
    </div>
    <transition name="component-fade" mode="out-in">
      <klab-main-control v-if="mainViewer.mainControl"></klab-main-control>
    </transition>
    <transition appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut">
      <div id="mc-undocking" class="full-height full-width" v-if="askForUndocking && !mainViewer.mainControl"></div>
    </transition>
    <observation-time v-if="!isMainControlDocked"></observation-time>
    <q-modal
        id="modal-connection-status"
        v-model="modalVisible"
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{'background-color': `rgba(${hexToRgbValues(modalColor)}, 0.5)`}"
        :content-classes="['modal-borders', 'no-padding', 'no-margin']"
    >
      <div class="bg-opaque-white modal-borders">
          <div class="q-pa-xs text-bold modal-klab-content" :style="{color: modalColor}">
            <klab-spinner
              :color="modalColor"
              :size="40"
              :ball="18"
              id="modal-spinner"
              :animated="modalAnimated"
              wrapperId="modal-connection-status"
            ></klab-spinner>
            <span class="text-white">{{ modalText }}</span>
          </div>
      </div>
    </q-modal>
    <klab-presentation></klab-presentation>
    <input-request-modal></input-request-modal>
    <scale-change-dialog></scale-change-dialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { VIEWERS, CUSTOM_EVENTS, SETTING_NAMES, CONNECTION_CONSTANTS, WEB_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import KlabMainControl from 'components/KlabMainControl.vue';
import DataViewer from 'components/DataViewer.vue';
import ReportViewer from 'components/ReportViewer.vue';
import DataflowViewer from 'components/DataflowViewer.vue';
import KlabSpinner from 'components/KlabSpinner.vue';
import InputRequestModal from 'components/InputRequestModal.vue';
import ScaleChangeDialog from 'components/ScaleChangeDialog.vue';
import ObservationTime from 'components/ObservationTime.vue';
import ComponentsViewer from 'components/KlabComponentsViewer.vue';
import { colors } from 'quasar';
import KlabPresentation from 'components/KlabPresentation';
import 'ol/ol.css';
import 'simplebar/dist/simplebar.css';

export default {
  /* eslint-disable object-shorthand */
  name: 'IndexPage',
  components: {
    KlabMainControl,
    DataViewer,
    ReportViewer,
    DataflowViewer,
    KlabSpinner,
    InputRequestModal,
    ScaleChangeDialog,
    KlabPresentation,
    ObservationTime,
    ComponentsViewer,
  },
  data() {
    return {
      askForUndocking: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'session',
    ]),
    ...mapGetters('stomp', [
      'connectionState',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'searchIsFocused',
      'mainViewerName',
      'mainViewer',
      'isInModalMode',
      'spinnerErrorMessage',
      'isMainControlDocked',
      'admitSearch',
      'isHelpShown',
    ]),
    waitingGeolocation: {
      get() {
        return this.$store.state.view.waitingGeolocation;
      },
      set(waitingGeolocation) {
        this.$store.state.view.waitingGeolocation = waitingGeolocation;
      },
    },
    logVisible() {
      return this.$logVisibility === WEB_CONSTANTS.PARAMS_LOG_VISIBLE;
    },
    modalVisible: {
      get() {
        return this.connectionState !== CONNECTION_CONSTANTS.CONNECTION_UP;
      },
      set(visible) {
        console.warn(`Try to set modalVisible as ${visible}`);
      },
    },
    modalText() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
    modalColor() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: colors.getBrand('info'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: colors.getBrand('negative'),
      }[this.connectionState];
    },
    modalAnimated() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: true,
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: false,
      }[this.connectionState];
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStart',
      'searchStop',
      'searchFocus',
      'setMainViewer',
    ]),
    setChildrenToAskFor() {
      // calculate and set min results for children
      // we suppose that maxHeight is vh and childMinHeight are pixels
      const mcMaxHeight = Math.floor(window.innerHeight * parseInt(getComputedStyle(document.documentElement).getPropertyValue('--main-control-max-height'), 10) / 100);
      const mcMinChildHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--q-tree-no-child-min-height'), 10);
      const minResults = Math.floor(mcMaxHeight / mcMinChildHeight);
      console.info(`Setted max children as ${minResults}`);
      this.$store.state.data.childrenToAskFor = minResults;
    },
    askForUndockListener(ask) {
      this.askForUndocking = ask;
    },
  },
  watch: {
    spinnerErrorMessage(newValue, oldValue) {
      if (newValue !== null && newValue !== oldValue) {
        console.error(this.spinnerErrorMessage);
        this.$q.notify({
          message: this.spinnerErrorMessage,
          type: 'negative',
          icon: 'mdi-alert-circle',
          timeout: 1000,
        });
      }
    },
  },
  created() {
    if (typeof this.mainViewer === 'undefined') {
      this.setMainViewer(VIEWERS.DATA_VIEWER);
    }
  },
  mounted() {
    // const self = this;
    window.addEventListener('keydown', (event) => {
      if (this.modalVisible || this.isInModalMode || !this.admitSearch || this.isHelpShown) {
        return;
      }
      if (event.keyCode === 27 && this.searchIsActive) {
        this.searchStop();
        event.preventDefault();
        return;
      }
      if (event.keyCode === 38 || event.keyCode === 40 || event.keyCode === 32 || this.isAcceptedKey(event.key)) {
        if (!this.searchIsActive) {
          this.searchStart(event.key);
          event.preventDefault();
        } else if (!this.searchIsFocused) {
          this.searchFocus({ char: event.key, focused: true });
          event.preventDefault();
        }
      }
    });
    this.setChildrenToAskFor();
    this.$eventBus.$on(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndockListener);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.INTERACTIVE_MODE, value: false }, this.session).body);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.LOCK_SPACE, value: false }, this.session).body);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.LOCK_TIME, value: false }, this.session).body);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndockListener);
  },
};
</script>
<style scoped>
  .row > div {
    /*
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2);
    */
  }
  .bg-opaque-white {
    background: rgba(255, 255, 255, 0.3)
  }
</style>
<style lang="stylus">
  .modal-borders
    border-radius 40px
  .klab-spinner
    display inline
    vertical-align middle
    background-color white
    -webkit-border-radius 40px
    -moz-border-radius 40px
    border-radius 40px
    padding 3px
    margin 0

  #modal-spinner
    margin-right 10px
    margin-left 1px
  .modal-klab-content > span
    display inline-block
    line-height 100%
    vertical-align middle
    margin-right 15px

  #modal-connection-status .modal-content
    min-width 200px

  #mc-undocking
    position fixed
    left 0
    top 0
    background-color rgba(35, 35, 35, .3)
    border 4px solid rgba(135, 135, 135, .6)
    animation-duration .2s
    cursor move

  #modal-connection-status.fullscreen
    z-index 10000
</style>
