<template>
  <div ref="main-control-container" class="mc-container print-hide small" v-show="!isDrawMode">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div
        class="spinner-lonely-div klab-spinner-div"
        :style="{ left: `${defaultLeft}px`, top: `${defaultTop}px`, 'border-color': hasTasks() ? spinnerColor.color : 'rgba(0,0,0,0)' }"
        v-show="isHidden"
      >
        <klab-spinner
          class="spinner-lonely"
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
      class="mc-q-card no-box-shadow absolute lot-of-flow"
      :class="[hasContext ? 'with-context' : 'bg-transparent without-context', `mc-large-mode-${largeMode}`]"
      :style="qCardStyle"
      :flat="true"
      v-draggable="dragMCConfig"
      v-show="!isHidden"
      @contextmenu.native.prevent
    >
      <q-card-title
        class="mc-q-card-title q-pa-xs"
        ref="mc-draggable"
        :class="[ fuzzyMode ? 'klab-fuzzy' : '', searchIsFocused ? 'klab-search-focused' : '']"
        :style="{
          'background-color': getBGColor(hasContext ? '1.0' : searchIsFocused ? '.8' : '.2'),
        }"
        ondragstart="return false;"
        @mousedown.native="moved = false"
        @mousemove.native="moved = true"
        @mouseup.native="focusSearch"
      >
        <klab-search-bar ref="klab-search-bar"></klab-search-bar>
        <klab-breadcrumbs slot="subtitle"></klab-breadcrumbs>
      </q-card-title>
      <q-card-actions
        v-show="hasContext && !isHidden && !hasHeader && layout === null"
        class="context-actions no-margin"
      >
        <!-- TABS -->
        <div class="mc-tabs">
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
          ><q-icon name="mdi-folder-image">
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
        class="kmc-bottom-actions"
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
        <!--
        <div class="klab-bottom-right-actions">
          <knowledge-views-selector :docked="false"></knowledge-views-selector>
        </div>
        -->
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
import { VIEWERS, CUSTOM_EVENTS, LEFTMENU_CONSTANTS, CONSTANTS, KNOWLEDGE_VIEWS } from 'shared/Constants';
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
import KnowledgeViewsSelector from 'components/KnowledgeViewsSelector.vue';
import HandleTouch from 'shared/HandleTouchMixin';

const { width, height } = dom;
const DEFAULT_POSITION = { top: 25, left: 15 };

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
    KnowledgeViewsSelector,
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
        onDragStart: () => {
          this.dragging = true;
        },
        onDragEnd: this.checkWhereWasDragged,
        fingers: 2,
      },
      correctedPosition: { top: 0, left: 0 },
      defaultLeft: DEFAULT_POSITION.left,
      defaultTop: DEFAULT_POSITION.top,
      centeredLeft: DEFAULT_POSITION.left,
      dragging: false,
      wasMoved: false,
      askForDocking: false,
      leftMenuMaximized: `${LEFTMENU_CONSTANTS.LEFTMENU_MAXSIZE}px`,
      boundingElement: undefined,
      selectedTab: 'klab-tree-pane',
      draggableElement: undefined,
      draggableElementWidth: 0,
      kvListOpen: false,
      KNOWLEDGE_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextHasTime',
      'knowledgeViews',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'searchIsFocused',
      'searchIsActive',
      'isDrawMode',
      'fuzzyMode',
      'largeMode',
      'windowSide',
      'layout',
      'hasHeader',
    ]),
    qCardStyle() {
      return {
        top: `${this.defaultTop + this.correctedPosition.top}px`,
        left: `${this.centeredLeft + this.correctedPosition.left}px`,
        'margin-top': `-${this.correctedPosition.top}px`,
        'margin-left': `-${this.correctedPosition.left}px`,
      };
    },
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
      'setLargeMode',
      'searchStart',
      'searchFocus',
      'setWindowSide',
      'setObservationInfo',
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
      this.askForDocking = !!(this.hasContext && this.dragging && this.layout === null && event && event.x <= 30 + this.correctedPosition.left);
    },
    hide() {
      this.dragMCConfig.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.dragMCConfig.resetInitialPos = false;
      this.isHidden = false;
    },
    getRightLeft() {
      const boundingWidth = width(this.boundingElement);
      return boundingWidth - this.draggableElement.offsetWidth - DEFAULT_POSITION.left + this.correctedPosition.left;
    },
    getCenteredLeft() {
      let centeredLeft;
      if (typeof this.draggableElement !== 'undefined' && !this.hasContext) {
        const elWidth = this.draggableElementWidth;
        const contWidth = width(this.boundingElement);
        centeredLeft = (contWidth - elWidth) / 2;
      } else {
        centeredLeft = this.defaultLeft;
      }
      return centeredLeft + this.correctedPosition.left;
    },
    /**
     * Change draggable position
     * @param position top, left object
     */
    changeDraggablePosition(position, correct = true) {
      if (correct) {
        position.top += this.correctedPosition.top;
        position.left += this.correctedPosition.left;
      }
      this.draggableElement.style.left = `${position.left}px`;
      this.draggableElement.style.top = `${position.top}px`;
      const draggableState = JSON.parse(this.dragMCConfig.handle.getAttribute('draggable-state'));
      draggableState.startDragPosition = position;
      draggableState.currentDragPosition = position;
      const el = document.querySelector('.mc-q-card-title');
      if (el) {
        el.setAttribute('draggable-state', JSON.stringify(draggableState));
      } else {
        this.dragMCConfig.handle.setAttribute('draggable-state', JSON.stringify(draggableState));
      }
    },
    checkWhereWasDragged() {
      this.dragging = false;
      if (this.askForDocking) {
        this.askForDocking = false;
        this.setMainViewer(VIEWERS.DOCKED_DATA_VIEWER);
        this.setObservationInfo(null);
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
    mapSizeChangedListener(event) {
      if (event && event.type === 'changelayout') {
        if (event.align) {
          this.setWindowSide(event.align);
        }
        this.updateCorrectedPosition();
        this.$nextTick(() => {
          this.changeDraggablePosition({ left: this.hasContext ? (this.windowSide === 'left' ? this.defaultLeft : this.getRightLeft()) : this.getCenteredLeft(), top: this.defaultTop }, false);
        });
        return;
      }
      this.dragMCConfig.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
      // check if main control windows is gone out of screen
      this.checkWhereWasDragged();
    },
    spinnerDoubleClickListener() {
      this.hide();
    },
    updateCorrectedPosition() {
      const header = document.querySelector('.kapp-header-container');
      const leftPanels = document.querySelector('.kapp-left-container aside');
      const top = header ? height(header) : 0;
      const left = leftPanels ? width(leftPanels) : 0;
      this.correctedPosition = { top, left };
      this.defaultTop = DEFAULT_POSITION.top + top;
      this.defaultLeft = DEFAULT_POSITION.left + left;
      this.centeredLeft = this.getCenteredLeft();
    },
    updateDraggable() {
      this.updateCorrectedPosition();
      this.draggableElement = document.querySelector('.kexplorer-main-container .mc-q-card');
      this.draggableElementWidth = width(this.draggableElement);
      this.dragMCConfig.handle = document.querySelector('.kexplorer-main-container .mc-q-card-title'); // this.$refs['mc-draggable'];
      // this.dragMCConfig.boundingElement = document.getElementById('viewer-container'); // .getBoundingClientRect();
      this.boundingElement = document.querySelector('.kexplorer-container');
      this.centeredLeft = this.getCenteredLeft();
      this.dragMCConfig.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
    },
    focusSearch(event) {
      if (this.moved) {
        return;
      }
      if (event && event.target.classList
        && (event.target.classList.contains('mcm-button')
        || event.target.classList.contains('q-icon')
        || event.target.classList.contains('q-btn-inner'))) {
        return;
      }
      if (!this.searchIsActive) {
        this.searchStart('');
      } else if (!this.searchIsFocused) {
        this.searchFocus({ focused: true });
      }
    },
  },
  watch: {
    /*
    paletteOpen() {
      console.log(`Palette open: ${this.paletteOpen}`);
    },
    */
    hasContext() {
      this.setLargeMode(0); // reset large mode
      this.$nextTick(() => {
        this.changeDraggablePosition({
          top: this.defaultTop,
          left: this.hasContext ? (this.windowSide === 'left' ? this.defaultLeft : this.getRightLeft()) : this.getCenteredLeft(),
        }, false);
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
            }, false);
          }
        }
      });
    },
  },
  created() {
    this.defaultTop = DEFAULT_POSITION.top;
    this.defaultLeft = DEFAULT_POSITION.left;
    this.VIEWERS = VIEWERS;
  },
  mounted() {
    this.updateDraggable();
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
  .mc-container
    .q-card > .mc-q-card-title
      border-radius 30px
      cursor move
      transition background-color 0.8s
    .q-card // no selection permitted
      // overflow auto
      width $main-control-width
      transition width .5s
      &.with-context
        width $main-control-width - 30px
        background-color rgba(35, 35, 35 ,.8)
        border-radius 5px
        .mc-q-card-title
          overflow hidden
          margin 15px
      for $value in (1..6)
        {"&.mc-large-mode-" + $value}
          width $main-control-width + $main-control-inc-width * $value

    .q-card-title
      position relative

    .spinner-lonely-div
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

    .kmc-bottom-actions.q-card-actions
      padding 0 4px 4px 6px
      .klab-button
        font-size 18px
        padding 4px

    .klab-main-actions
      position relative
    .klab-button-notification
      top 4px
      right 4px
      width 10px
      height 10px

    .context-actions
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

    .context-actions
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
        &:hover:not(.disabled)
          background-color rgba(135, 135, 135, .2)
  .mc-kv-popover
    border-radius 6px
    border none
    .mc-kv-container
      background-color $grey-8
      border-radius 2px !important

</style>
