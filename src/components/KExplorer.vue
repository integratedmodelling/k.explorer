<template>
  <q-layout view="hHh lpr fFf" :style="mainPanelStyle" class="kexplorer-main-container print-hide" container>
    <q-layout-drawer
      side="left"
      :overlay="false"
      v-model="leftMenuVisible"
      :breakpoint="0"
      :width="leftMenuState === LEFTMENU_CONSTANTS.LEFTMENU_MAXIMIZED ? LEFTMENU_CONSTANTS.LEFTMENU_MAXSIZE : LEFTMENU_CONSTANTS.LEFTMENU_MINSIZE"
      :content-class="['klab-left', 'no-scroll', largeMode ? 'klab-large-mode' : '' ]"
    >
      <klab-left-menu></klab-left-menu>
    </q-layout-drawer>

    <q-page-container>
      <q-page class="column">
        <div class="col row full-height kexplorer-container">
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
          <klab-main-control v-if="mainViewer.mainControl" v-show="isTreeVisible"></klab-main-control>
        </transition>
        <transition appear
                    enter-active-class="animated zoomIn"
                    leave-active-class="animated zoomOut">
          <div class="kexplorer-undocking full-height full-width" v-if="askForUndocking && !mainViewer.mainControl"></div>
        </transition>
        <observation-time v-if="!isMainControlDocked"></observation-time>
        <input-request-modal></input-request-modal>
        <scale-change-dialog></scale-change-dialog>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { VIEWERS, CUSTOM_EVENTS, SETTING_NAMES, WEB_CONSTANTS, LEFTMENU_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import KlabMainControl from 'components/KlabMainControl.vue';
import DataViewer from 'components/DataViewer.vue';
import ReportViewer from 'components/ReportViewer.vue';
import DataflowViewer from 'components/DataflowViewer.vue';
import InputRequestModal from 'components/InputRequestModal.vue';
import ScaleChangeDialog from 'components/ScaleChangeDialog.vue';
import ObservationTime from 'components/ObservationTime.vue';
import KlabLeftMenu from 'components/KlabLeftMenu.vue';
import 'ol/ol.css';

export default {
  /* eslint-disable object-shorthand */
  name: 'KExplorer',
  components: {
    KlabMainControl,
    DataViewer,
    ReportViewer,
    DataflowViewer,
    InputRequestModal,
    ScaleChangeDialog,
    ObservationTime,
    KlabLeftMenu,
  },
  props: {
    mainPanelStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      askForUndocking: false,
      LEFTMENU_CONSTANTS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'session',
    ]),
    ...mapGetters('stomp', [
      'connectionDown',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'searchIsFocused',
      'searchInApp',
      'mainViewerName',
      'mainViewer',
      'isTreeVisible',
      'isInModalMode',
      'spinnerErrorMessage',
      'isMainControlDocked',
      'admitSearch',
      'isHelpShown',
      'mainViewer',
      'leftMenuState',
      'largeMode',
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
    leftMenuVisible: {
      get() {
        return this.leftMenuState !== LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN;
      },
      set(visibility) {
        this.setLeftMenuState(visibility);
      },
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStart',
      'searchStop',
      'searchFocus',
      'setMainViewer',
      'setLeftMenuState',
    ]),
    setChildrenToAskFor() {
      // calculate and set min results for children
      // we suppose that maxHeight is vh and childMinHeight are pixels
      const mcMaxHeight = Math.floor(window.innerHeight * parseInt(getComputedStyle(document.documentElement).getPropertyValue('--main-control-max-height'), 10) / 100);
      const mcMinChildHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--q-tree-no-child-min-height'), 10);
      const minResults = Math.floor(mcMaxHeight / mcMinChildHeight);
      console.info(`Set max children to ${minResults}`);
      this.$store.state.data.childrenToAskFor = minResults;
    },
    askForUndockListener(ask) {
      this.askForUndocking = ask;
    },
    keydownListener(event) {
      if (this.connectionDown || this.isInModalMode || !this.admitSearch || this.isHelpShown || this.searchInApp) {
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
    leftMenuVisible() {
      this.$nextTick(() => {
        this.$eventBus.$emit(CUSTOM_EVENTS.NEED_FIT_MAP, {});
      });
    },
  },
  created() {
    if (typeof this.mainViewer === 'undefined') {
      this.setMainViewer(VIEWERS.DATA_VIEWER);
    }
  },
  mounted() {
    // const self = this;
    window.addEventListener('keydown', this.keydownListener);
    this.setChildrenToAskFor();
    this.$eventBus.$on(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndockListener);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.INTERACTIVE_MODE, value: false }, this.session).body);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.LOCK_SPACE, value: false }, this.session).body);
    this.sendStompMessage(MESSAGES_BUILDERS.SETTING_CHANGE_REQUEST({ setting: SETTING_NAMES.LOCK_TIME, value: false }, this.session).body);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydownListener);
    this.$eventBus.$off(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndockListener);
  },
};
</script>
<style lang="stylus">
  @import '~variables'
  .kexplorer-container
    background-color $blue-grey-10
    background-image url("../assets/dark-dot.png")

  .klab-spinner
    display inline
    vertical-align middle
    background-color white
    -webkit-border-radius 40px
    -moz-border-radius 40px
    border-radius 40px
    padding 3px
    margin 0
  .kexplorer-undocking
    position fixed
    left 0
    top 0
    background-color rgba(35, 35, 35, .3)
    border 4px solid rgba(135, 135, 135, .6)
    animation-duration .2s
    cursor move

  .klab-left
    position absolute
    background-color rgba(35, 35, 35, 0.8)
  .klab-large-mode.no-scroll
    overflow visible !important
</style>
