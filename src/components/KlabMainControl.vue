<template>
  <div ref="main-control-container" id="mc-container" class="print-hide small" v-show="!isDrawMode">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div
        id="spinner-lonely-div"
        class="klab-spinner-div"
        :style="{ left: `${defaultLeft}px`, top: `${defaultTop}px`, 'border-color': hasTasks() ? spinnerColor.color : 'rgba(0,0,0,0)' }"
        v-show="isHidden"
      >
        <klab-spinner
          id="spinner-lonely"
          :store-controlled="true"
          :size="40"
          :ball="22"
          wrapperId="spinner-lonely-div"
          @dblclick.native="show"
          @touchstart.native="handleTouch($event, null, show)"
        ></klab-spinner>
      </div>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
    <q-card
      draggable="false"
      id="mc-q-card"
      class="no-box-shadow absolute lot-of-flow"
      :class="[hasContext ? 'with-context' : 'bg-transparent without-context', `mc-large-mode-${largeMode}`]"
      :style="{ top: `${defaultTop}px`, left: `${centeredLeft}px` }"
      :flat="true"
      v-draggable="dragMCConfig"
      v-show="!isHidden"
      @contextmenu.native.prevent
    >
      <q-card-title
        id="mc-q-card-title"
        class="q-pa-xs"
        ref="mc-draggable"
        :class="[ fuzzyMode ? 'klab-fuzzy' : '', searchIsFocused ? 'klab-search-focused' : '']"
        :style="{
          'background-color': getBGColor(hasContext ? '1.0' : searchIsFocused ? '.8' : '.2'),
        }"
      >
        <klab-search-bar ref="klab-search-bar"></klab-search-bar>
        <klab-breadcrumbs slot="subtitle"></klab-breadcrumbs>
      </q-card-title>
      <q-card-actions
        v-show="hasContext && !isHidden"
        class="no-margin"
        id="context-actions"
      >
        <!-- TABS -->
        <div id="mc-tabs">
          <div class="klab-button mc-tab"
               :class="['tab-button', { active: selectedTab === 'klab-log-pane' }]"
               @click="selectedTab = 'klab-log-pane'"
          ><q-icon name="mdi-console">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.showLogPane') }}</q-tooltip>
          </q-icon></div>
          <div class="klab-button mc-tab"
               :class="['tab-button', { active: selectedTab === 'klab-tree-pane' }]"
               @click="selectedTab = 'klab-tree-pane'"
          ><q-icon name="mdi-eye-outline">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.treePane') }}</q-tooltip>
          </q-icon></div>
        </div>
        <main-actions-buttons orientation="horizontal" separator-class="mc-separator"></main-actions-buttons>
        <!-- scales -->
        <scale-buttons :docked="false"></scale-buttons>
        <div class="mc-separator" style="right:35px"></div>
        <stop-actions-buttons></stop-actions-buttons>
      </q-card-actions>
      <q-card-main
        draggable="false"
        v-show="hasContext && !isHidden"
        class="no-margin relative-position"
      >
        <keep-alive>
          <transition name="component-fade" mode="out-in">
            <component :is="selectedTab"></component>
          </transition>
        </keep-alive>
      </q-card-main>
      <q-card-actions
        id="kmc-bottom-actions"
        v-show="hasContext && !isHidden"
      >
        <div class="klab-button klab-action">
          <q-icon name="mdi-terrain"></q-icon>
          <q-tooltip
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.scenarios') }}</q-tooltip>
        </div>
        <div class="klab-button klab-action">
          <q-icon name="mdi-human-male-female"></q-icon>
          <q-tooltip
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.observers') }}</q-tooltip>
        </div>
        <observations-timeline class="mc-timeline" v-if="contextHasTime"></observations-timeline>
        <div class="klab-bottom-right-actions">
          <div class="klab-button klab-action">
            <div class="klab-font klab-im-logo float-left" @click.prevent="paletteOpen = !paletteOpen"></div>
            <q-icon name="mdi-chevron-down" class="float-left klab-item" style="padding: 3px 0 0 8px"></q-icon>
          </div>
          <q-tooltip
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.palette') }}</q-tooltip>
          <!--
          <q-btn-dropdown
            color="grey-6"
            dense
            size="sm"
            v-model="paletteOpen"
            flat
          >
            <q-list>
              <q-item>
                <q-item-main>
                  <q-item-tile label>{{ $t('messages.availableInFuture') }}</q-item-tile>
                </q-item-main>
              </q-item>
            </q-list>

          </q-btn-dropdown>


          <div class="klab-button klab-action">
            <div class="klab-item klab-font klab-aries-logo klab-icon"></div>
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.unknown') }}</q-tooltip>
          </div>
          -->
        </div>
      </q-card-actions>
    </q-card>
    </transition>
    <transition appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut">
      <div class="mc-docking full-height" v-if="askForDocking" :style="{ width: leftMenuMaximized }"></div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { VIEWERS, CUSTOM_EVENTS, LEFTMENU_CONSTANTS, CONSTANTS } from 'shared/Constants';
import { dom, debounce } from 'quasar';
import MainActionsButtons from 'components/MainActionsButtons';
import StopActionsButtons from 'components/StopActionsButtons';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabSearchBar from 'components/KlabSearchBar.vue';
import KlabBreadcrumbs from 'components/KlabBreadcrumbs';
import KlabTreePane from 'components/KlabTreePane.vue';
import ObservationsTimeline from 'components/ObservationsTimeline.vue';
import KlabLogPane from 'components/KlabLogPane.vue';
import ScrollingText from 'components/ScrollingText.vue';
import ScaleButtons from 'components/ScaleButtons.vue';
import HandleTouch from 'shared/HandleTouchMixin';

const { width, height } = dom;

export default {
  name: 'klabMainControl',
  components: {
    KlabSpinner,
    KlabSearchBar,
    KlabBreadcrumbs,
    KlabTreePane,
    KlabLogPane,
    ScrollingText,
    ScaleButtons,
    MainActionsButtons,
    StopActionsButtons,
    ObservationsTimeline,
  },
  directives: {
    Draggable,
  },
  mixins: [HandleTouch],
  data() {
    return {
      isHidden: false,
      dragMCConfig: {
        handle: undefined,
        resetInitialPos: false,
        onPositionChange: debounce((positionDiff, absolutePosition, event) => {
          this.onDebouncedPositionChanged(event);
        }, 100),
        onDragStart: () => { this.dragging = true; },
        onDragEnd: this.checkWhereWasDragged,
        fingers: 2,
      },
      dragging: false,
      askForDocking: false,
      leftMenuMaximized: `${LEFTMENU_CONSTANTS.LEFTMENU_MAXSIZE}px`,
      boundingElement: undefined,
      selectedTab: 'klab-tree-pane',
      draggableElement: undefined,
      draggableElementWidth: 0,
      centeredLeft: this.defaultLeft,
      paletteOpen: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextHasTime',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'searchIsFocused',
      'isDrawMode',
      'fuzzyMode',
      'largeMode',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
      'setLargeMode',
    ]),
    callStartType(event) {
      if (!this.searchIsFocused) {
        this.$refs['klab-search-bar'].startType(event);
      } else {
        event.evt.stopPropagation();
      }
    },
    onDebouncedPositionChanged(event) {
      // this.askForDocking = !!(this.hasContext && this.dragging && absolutePosition && absolutePosition.left < -(this.draggableElementWidth / 3));
      this.askForDocking = !!(this.hasContext && this.dragging && event && event.x <= 30);
    },
    hide() {
      this.dragMCConfig.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.dragMCConfig.resetInitialPos = false;
      this.isHidden = false;
    },
    getCenteredLeft() {
      if (typeof this.draggableElement !== 'undefined' && !this.hasContext) {
        const elWidth = this.draggableElementWidth;
        const contWidth = width(this.boundingElement);
        return (contWidth - elWidth) / 2;
      }
      return this.defaultLeft;
    },
    /**
     * Change draggable position
     * @param position top, left object
     */
    changeDraggablePosition(position) {
      this.draggableElement.style.left = `${position.left}px`;
      this.draggableElement.style.top = `${position.top}px`;
      const draggableState = JSON.parse(this.dragMCConfig.handle.getAttribute('draggable-state'));
      draggableState.startDragPosition = position;
      draggableState.currentDragPosition = position;
      document.getElementById('mc-q-card-title').setAttribute('draggable-state', JSON.stringify(draggableState));
    },
    checkWhereWasDragged() {
      this.dragging = false;
      if (this.askForDocking) {
        this.askForDocking = false;
        this.setMainViewer(VIEWERS.DOCKED_DATA_VIEWER);
        return;
      }
      if (this.draggableElement.offsetTop < 0) { // upper than window
        this.changeDraggablePosition({ top: 0, left: Math.max(this.draggableElement.offsetLeft, 0) });
      }
      if (this.draggableElement.offsetLeft + this.draggableElement.offsetWidth <= 0) { // left out of window
        this.changeDraggablePosition({ top: Math.max(this.draggableElement.offsetTop, 0), left: 0 });
      }
      if (this.draggableElement.offsetLeft >= width(this.boundingElement)) {
        this.changeDraggablePosition({
          top: Math.max(this.draggableElement.offsetTop, 0),
          left: Math.max(width(this.boundingElement) - this.draggableElement.offsetWidth, 0),
        });
      }
      if (this.draggableElement.offsetTop >= height(this.boundingElement)) {
        this.changeDraggablePosition({
          top: Math.max(height(this.boundingElement) - this.draggableElement.offsetHeight, 0),
          left: Math.max(this.draggableElement.offsetLeft, 0),
        });
      }
    },
    getBGColor(alpha) {
      return `rgba(${this.spinnerColor.rgb.r},${this.spinnerColor.rgb.g},${this.spinnerColor.rgb.b}, ${alpha})`;
    },
    mapSizeChangedListener() {
      // eslint-disable-next-line no-underscore-dangle
      this.dragMCConfig.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
      // check if main control windows is gone out of screen
      this.checkWhereWasDragged();
    },
    spinnerDoubleClickListener() {
      this.hide();
    },
  },
  watch: {
    paletteOpen() {
      console.log(`Palette open: ${this.paletteOpen}`);
    },
    hasContext() {
      this.setLargeMode(0); // reset large mode
      this.$nextTick(() => {
        this.changeDraggablePosition({
          top: this.defaultTop,
          left: this.hasContext ? this.defaultLeft : this.getCenteredLeft(),
        });
      });
      // this.draggableElement.classList.remove('vuela');
    },
    largeMode() {
      if (this.hasContext) {
        return;
      }
      this.$nextTick(() => {
        const offset = CONSTANTS.SEARCHBAR_INCREMENT * this.largeMode / 2;
        if (offset >= 0) {
          const actualLeft = parseFloat(this.draggableElement.style.left);
          const difference = actualLeft - this.getCenteredLeft();
          if (difference % (CONSTANTS.SEARCHBAR_INCREMENT / 2) === 0) {
            this.changeDraggablePosition({
              top: parseFloat(this.draggableElement.style.top),
              left: this.getCenteredLeft() - offset,
            });
          }
        }
      });
    },
  },
  created() {
    this.defaultTop = 25;
    this.defaultLeft = 15;
    this.VIEWERS = VIEWERS;
  },
  mounted() {
    this.draggableElement = document.getElementById('mc-q-card');
    this.draggableElementWidth = width(this.draggableElement);
    this.dragMCConfig.handle = document.getElementById('mc-q-card-title'); // this.$refs['mc-draggable'];
    // this.dragMCConfig.boundingElement = document.getElementById('viewer-container'); // .getBoundingClientRect();
    this.boundingElement = document.getElementById('viewer-container');
    this.centeredLeft = this.getCenteredLeft();
    this.dragMCConfig.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
    this.$eventBus.$on(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK, this.spinnerDoubleClickListener);
    this.$eventBus.$on(CUSTOM_EVENTS.MAP_SIZE_CHANGED, this.mapSizeChangedListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK, this.spinnerDoubleClickListener);
    this.$eventBus.$off(CUSTOM_EVENTS.MAP_SIZE_CHANGED, this.mapSizeChangedListener);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #mc-container
    #mc-q-card-title
      border-radius 30px
      cursor move
      transition background-color 0.8s
    .q-card // no selection permitted
      overflow auto
      width $main-control-width
      transition width .5s
      &.with-context
        width $main-control-width - 30px
        background-color rgba(35, 35, 35 ,.8)
        border-radius 5px
        #mc-q-card-title
          overflow hidden
          margin 15px
      for $value in (1..6)
        {"&.mc-large-mode-" + $value}
          width $main-control-width + $main-control-inc-width * $value

    .q-card-title
      position relative

    #spinner-lonely-div
      position absolute
      width 44px
      height 44px
      border 2px solid
      border-radius 40px

    .q-card-title
      line-height inherit

    #mc-text-div
      text-shadow 0 0 1px #555

    .q-card-main
      overflow auto
      line-height inherit
      background-color alpha($faded, 85%)
      padding 0 /* 0 0 10px 0*/

    #kmc-bottom-actions.q-card-actions
      padding 0 4px 4px 6px
      .klab-button
        font-size 18px
        padding 4px
        &:hover
          color $main-control-main-color !important

    .klab-main-actions
      position relative
    .klab-button-notification
      top 4px
      right 4px
      width 10px
      height 10px

    #context-actions
      padding 0
      margin 0
      position relative

    .mc-separator
      width 2px
      height 60%
      position absolute
      top 20%
      border-left 1px solid #444
      border-right 1px solid #666
      &.mab-separator
        right 45px


    .mc-tab.active
      background-color alpha($faded, 85%)

    .component-fade-enter-active
    .component-fade-leave-active
      transition opacity .3s ease

    .component-fade-enter
    .component-fade-leave-to
      opacity 0

    /*
    .lot-of-flow
      transition top 0.05s ease 0s, left 0.05s ease 0s
    */

    .mc-docking
      position fixed
      left 0
      top 0
      background-color rgba(35, 35, 35, .1)
      border 1px solid rgba(135, 135, 135, .5)
      animation-duration .2s

    .kbc-container
      position absolute;
      top 63px
      left 0
      width 100%
      text-align center

    // tree
    #kt-out-container
      height 100%
      overflow hidden
      max-height "calc((var(--main-control-max-height) - %s))" % ($main-control-scrollbar + $main-control-header-height + $main-control-actions-height)
      &.kpt-loading
        max-height "calc((var(--main-control-max-height) - %s))" % ($main-control-header-height + $main-control-actions-height)
      &.with-splitter
        max-height "calc((var(--main-control-max-height) - %s))" % ($main-control-spc-height + $main-control-scrollbar + $main-control-header-height + $main-control-actions-height)

    .klab-button
      font-size 22px
      margin 0
      padding 2px 7px 5px 7px
      border-top-left-radius 4px
      border-top-right-radius 4px

    .klab-destructive-actions .klab-button
      position absolute
      right 6px
      padding-right 0

    .sb-scales
      position absolute
      right 42px
      .klab-button
        padding-right 2px

    #context-actions
      .sr-scaletype
      .sr-locked
        font-size 9px
        &.sr-icon
          font-size 14px
      .sr-description
        font-size 9px
      .sr-spacescale
        font-size 9px
        height 16px
        width 16px
        border-radius 8px
        padding 3px 0 0 0
        margin 0 2px

    .mc-timeline
      width calc(100% - 200px)
      position absolute
      left 100px
      bottom 8px

    .klab-bottom-right-actions
      position absolute
      right 6px
      .klab-button.klab-action
        border-radius 4px
        margin 3px 0 0 0
        padding 2px 5px 3px !important
        &:hover
          background-color rgba(135, 135, 135, .2)
</style>
