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
      id="mc-q-card"
      class="no-box-shadow absolute lot-of-flow"
      :class="[hasContext ? '' : 'bg-transparent', hasContext ? 'with-context' : 'without-context']"
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
        :style="{
          'background-color': getBGColor(hasContext ? '1.0' : searchIsFocused ? '.6' : '.2'),
        }"
      >
        <klab-search-bar ref="klab-search-bar"></klab-search-bar>
      </q-card-title>

      <q-card-main
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
            >{{ $t('tooltips.logPane') }}</q-tooltip>
          </q-icon></div>
          <div class="klab-button mc-tab"
            :class="['tab-button', { active: selectedTab === 'klab-tree-pane' }]"
            @click="selectedTab = 'klab-tree-pane'"
          ><q-icon name="mdi-file-tree">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.treePane') }}</q-tooltip>
          </q-icon></div>
        </div>
        <!-- scale -->
        <!-- SPACE -->
        <div id="mc-spacereference" class="mc-scalereference">
          <scale-reference width="110px" scale-type="space" :editable="false"></scale-reference>
        </div>
        <div class="mc-separator" style="right: 290px"></div>
        <!-- TIME -->
        <div id="mc-timereference" class="mc-scalereference">
          <scale-reference width="110px" scale-type="time" :editable="false"></scale-reference>
        </div>
        <div class="mc-separator" style="right: 160px"></div>
        <main-actions-buttons orientation="horizontal" separator-class="mc-separator"></main-actions-buttons>
      </q-card-actions>
    </q-card>
    </transition>
    <scale-change-dialog></scale-change-dialog>
    <transition appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut">
      <div class="mc-docking full-height" v-if="askForDocking" :style="{ width: leftMenuMaximized }"></div>
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
// import { Draggable } from 'draggable-vue-directive';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { VIEWERS, CUSTOM_EVENTS, LEFTMENU_VISIBILITY } from 'shared/Constants';
import { dom, debounce } from 'quasar';
import MainActionsButtons from 'components/MainActionsButtons';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabSearchBar from 'components/KlabSearchBar.vue';
import KlabTreePane from 'components/KlabTreePane.vue';
import KlabLogPane from 'components/KlabLogPane.vue';
import ScrollingText from 'components/ScrollingText.vue';
import ScaleReference from 'components/ScaleReference.vue';
import ScaleChangeDialog from 'components/ScaleChangeDialog.vue';
import HandleTouch from 'shared/HandleTouchMixin';

const { width, height } = dom;

export default {
  name: 'klabMainControl',
  components: {
    KlabSpinner,
    KlabSearchBar,
    KlabTreePane,
    KlabLogPane,
    ScrollingText,
    ScaleReference,
    ScaleChangeDialog,
    MainActionsButtons,
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
        onPositionChange: debounce((positionDiff, absolutePosition) => {
          this.onDebouncedPositionChanged(absolutePosition);
        }, 100),
        onDragStart: () => { this.dragging = true; },
        onDragEnd: this.checkWhereWasDragged,
        fingers: 2,
      },
      dragging: false,
      askForDocking: false,
      leftMenuMaximized: `${LEFTMENU_VISIBILITY.LEFTMENU_MAXSIZE}px`,
      boundingElement: undefined,
      selectedTab: 'klab-tree-pane',
      draggableElement: undefined,
      draggableElementWidth: 0,
      centeredLeft: this.defaultLeft,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'searchIsFocused',
      'isDrawMode',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
    callStartType(event) {
      if (!this.searchIsFocused) {
        this.$refs['klab-search-bar'].startType(event);
      } else {
        event.evt.stopPropagation();
      }
    },
    onDebouncedPositionChanged(absolutePosition) {
      if (this.hasContext && this.dragging && absolutePosition && absolutePosition.left < -(this.draggableElementWidth / 3)) {
        this.askForDocking = true;
      } else {
        this.askForDocking = false;
      }
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
  },
  watch: {
    hasContext() {
      this.$nextTick(() => {
        this.changeDraggablePosition({
          top: this.defaultTop,
          left: this.hasContext ? this.defaultLeft : this.getCenteredLeft(),
        });
      });
      // this.draggableElement.classList.remove('vuela');
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
    this.$eventBus.$on(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK, () => {
      this.hide();
    });
    this.$eventBus.$on(CUSTOM_EVENTS.MAP_SIZE_CHANGED, () => {
    // eslint-disable-next-line no-underscore-dangle
      this.dragMCConfig.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
      // check if main control windows is gone out of screen
      this.checkWhereWasDragged();
    });
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.MAP_SIZE_CHANGED);
  },
};
</script>

<style lang="stylus">
  @import '~variables'

  #mc-container
    #mc-q-card-title
    .q-card
      width $main-control-width
      &.with-context
        #mc-q-card-title
          width $main-control-width - 30px

    #mc-q-card-title
      border-radius 30px
      cursor move
      transition background-color 0.8s
    .q-card
      overflow auto
      &.with-context
        background-color rgba(35, 35, 35 ,.8)
        border-radius 5px
        #mc-q-card-title
          overflow hidden
          margin 15px

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

    .klab-main-actions
      position absolute
      right 55px
    .klab-button-notification
      top 6px
      right 4px
      width 10px
      height 10px
    .klab-destructive-actions .klab-button
      position absolute
      right 2px

    #context-actions
      border-bottom-left-radius 5px
      border-bottom-right-radius 5px
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
    .mc-scalereference
      position absolute
      height 37px

    #mc-spacereference
      right 305px

    #mc-timereference
      right 175px

    .mc-tab.active
      background-color alpha($faded, 85%)

    .component-fade-enter-active
    .component-fade-leave-active
      transition opacity .3s ease

    .component-fade-enter
    .component-fade-leave-to
      opacity 0

    .lot-of-flow
      transition top 0.05s ease 0s, left 0.05s ease 0s

    .mc-docking
      position fixed
      left 0
      top 0
      background-color rgba(35, 35, 35, .1)
      border 1px solid rgba(135, 135, 135, .5)
      animation-duration .2s

</style>
