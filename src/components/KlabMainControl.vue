<template>
  <div ref="main-control-container" class="print-hide">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <div
        id="spinner-lonely-div"
        class="spinner-div"
        :style="{ left: `${defaultLeft}px`, top: `${defaultTop}px`, border: `2px solid ${hasTasks ? spinnerColor.color : 'white'}` }"
        v-show="isHidden"
      >
      <klab-spinner
        id="spinner-lonely"
        :store-controlled="true"
        :size="35"
        :ball="22"
        wrapperId="spinner-lonely-div"
        @dblclick.native="show"
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
      v-draggable="draggableConfMain"
      v-show="!isHidden"
      @mousedown.native="preventDrag"
    >
      <q-card-title
        id="mc-q-card-title"
        class="q-pa-xs"
        ref="mc-draggable"

        :style="{
          'background-color': `rgba(${spinnerColor.rgb.r},${spinnerColor.rgb.g},${spinnerColor.rgb.b},${hasContext ? '1.0' : searchIsFocused ? '.6' : '.2'})`,
        }"
      >
        <div
          id="spinner-main"
          class="spinner-div"
        >
          <klab-spinner
            :store-controlled="true"
            :color="spinnerColor.hex"
            :size="35"
            :ball="22"
            wrapperId="spinner-main"
            @dblclick.native="hide"
          ></klab-spinner>
        </div>

        <klab-search v-if="searchIsActive"></klab-search>
        <div id="mc-text-div" class="text-white" v-else>
          {{ contextLabel === null ? $t('label.noContext') : contextLabel }}
        </div>
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
          <div class="mc-button mc-tab"
            :class="['tab-button', { active: selectedTab === 'klab-log-pane' }]"
            @click="selectedTab = 'klab-log-pane'"
          ><q-icon name="mdi-console">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.logPane') }}</q-tooltip>
          </q-icon></div>
          <div class="mc-button mc-tab"
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

        <div id="mc-actions">
          <div class="separator" style="left: -5px"></div>
          <!-- MAP BUTTON -->
          <div class="mc-button mc-action"
               @click="mainViewer !== VIEWERS.DATA_VIEWER ? setMainViewer(VIEWERS.DATA_VIEWER) : false"
               :class="[{ active: mainViewer === VIEWERS.DATA_VIEWER }]"
          ><q-icon name="mdi-eye-outline">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.dataViewer') }}</q-tooltip>
          </q-icon></div>
          <!-- REPORT BUTTON -->
          <div class="mc-button mc-action"
               @click="mainViewer !== VIEWERS.REPORT_VIEWER && reportTooltip === null ? setMainViewer(VIEWERS.REPORT_VIEWER) : false"
               :class="[{ active: mainViewer === VIEWERS.REPORT_VIEWER, disabled: mainViewer !== VIEWERS.REPORT_VIEWER && reportTooltip !== null }]"
          ><q-icon name="mdi-file-document-box-outline">
            <span class="mc-button-notification" v-if="mainViewer !== VIEWERS.REPORT_VIEWER && reloadReport"></span>
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ reportTooltip !== null ? reportTooltip : $t('tooltips.reportViewer') }}</q-tooltip>
          </q-icon></div>
          <!-- DATAFLOW (disabled) -->
          <div class="mc-button mc-action disabled"
          ><q-icon name="mdi-sitemap">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.dataflowViewer') }}</q-tooltip>
          </q-icon></div>
          <!-- PROVENANCE (disabled) -->
          <!-- in the future
          <div class="mc-button mc-action disabled"
          ><q-icon name="mdi-brain">
            <q-tooltip
              :offset="[0, 8]"
              self="top middle"
              anchor="bottom middle"
            >{{ $t('tooltips.dataflowViewer') }}</q-tooltip>
          </q-icon></div>
          -->
          <div class="separator" style="right: -10px"></div>
        </div>
        <!-- RESET CONTEXT or INTERRUPT TASK-->
        <div class="mc-button"
             id="mc-reset-context"
             @click="resetContext"
             v-if="!hasTasks"
        ><q-icon name="mdi-close-circle-outline">
          <q-tooltip
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.resetContext') }}</q-tooltip>
        </q-icon></div>
        <div class="mc-button"
             id="mc-interrupt-task"
             @click="interruptTask"
             v-if="hasTasks"
        ><q-icon name="mdi-stop-circle-outline">
          <q-tooltip
            :offset="[0, 8]"
            self="top middle"
            anchor="bottom middle"
          >{{ $t('tooltips.interruptTask',{ taskDescription: lastActiveTask === null ? '' : lastActiveTask.task.description }) }}</q-tooltip>
        </q-icon></div>
      </q-card-actions
        >
    </q-card>
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import { Helpers } from 'shared/Helpers';
import { VIEWERS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabTreePane from 'components/KlabTreePane.vue';
import KlabLogPane from 'components/KlabLogPane.vue';
import KlabSearch from 'components/KlabSearch.vue';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { dom } from 'quasar';

const { width, height } = dom;

export default {
  name: 'klabMainControl',
  data() {
    return {
      isHidden: false,
      draggableConfMain: {
        handle: undefined,
        resetInitialPos: false,
      },
      boundingElement: undefined,
      selectedTab: 'klab-tree-pane',
      draggableElement: undefined,
      centeredLeft: this.defaultLeft,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'hasObservations',
      'contextLabel',
      'lasts',
      'tree',
    ]),
    ...mapGetters('view', [
      'spinner',
      'searchIsActive',
      'searchIsFocused',
      'mainViewer',
      'reloadReport',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
      'lastActiveTask',
    ]),
    spinnerColor() {
      return Helpers.getColorObject(this.spinner.color);
    },
    reportTooltip() {
      /*
      if (this.hasTasks) {
        return this.$t('tooltips.noReportTask');
      }
      */
      if (!this.hasObservations) {
        return this.$t('tooltips.noReportNoObservation');
      }
      return null;
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStop',
      'setMainViewer',
    ]),
    resetContext() {
      this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
    },
    interruptTask() {
      const task = this.lastActiveTask;
      if (task !== null) {
        this.sendStompMessage(MESSAGES_BUILDERS.TASK_INTERRUPTED({
          session: this.$store.state.data.session,
          taskId: task.id,
        }).body);
      }
    },
    hide() {
      this.draggableConfMain.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.draggableConfMain.resetInitialPos = false;
      this.isHidden = false;
    },
    getCenteredLeft() {
      if (typeof this.draggableElement !== 'undefined' && !this.hasContext) {
        const elWidth = width(this.draggableElement);
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
      const draggableState = JSON.parse(this.draggableConfMain.handle.getAttribute('draggable-state'));
      draggableState.startDragPosition = position;
      draggableState.currentDragPosition = position;
      document.getElementById('mc-q-card-title').setAttribute('draggable-state', JSON.stringify(draggableState));
    },
    /**
     * prevent native drag in chrome
     * @param event
     */
    preventDrag(event) {
      event.preventDefault();
    },
  },
  watch: {
    hasContext() {
      this.changeDraggablePosition({
        top: this.defaultTop,
        left: this.hasContext ? this.defaultLeft : this.getCenteredLeft(),
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
    this.draggableConfMain.handle = document.getElementById('mc-q-card-title'); // this.$refs['mc-draggable'];
    // this.draggableConfMain.boundingElement = document.getElementById('viewer-container'); // .getBoundingClientRect();
    this.boundingElement = document.getElementById('viewer-container');
    this.centeredLeft = this.getCenteredLeft();
    this.draggableConfMain.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
    this.$eventBus.$on('map-size-changed', () => {
      this.draggableConfMain.initialPosition = { left: this.centeredLeft, top: this.defaultTop };
      // check if main control windows is gone out of screen
      if (this.draggableElement.offsetLeft >= width(this.boundingElement)
          || this.draggableElement.offsetTop >= height(this.boundingElement)) {
        const left = this.getCenteredLeft();
        this.changeDraggablePosition({ top: this.defaultTop, left });
      }
    });
  },
  directives: {
    Draggable,
  },
  components: {
    KlabTreePane,
    KlabLogPane,
    KlabSpinner,
    KlabSearch,
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .spinner-div {
    background-color: white;
    -webkit-border-radius: 40px;
    -moz-border-radius: 40px;
    border-radius: 40px;
    padding: 3px;
    margin: 0;
  }
  #spinner-main {
    float: left;
    border: none;
    width: 40px;
    height: 40px;
  }
  #spinner-lonely-div {
    position:absolute;
    width: 44px;
    height: 44px;
  }
  .q-card {
    width: $main-control-width;
    overflow: auto;
  }
  .q-card.without-context {
    /*
    left: 50%;
    margin-left: -($main-control-width / 2);
    // transform: translateX(-50%); */

  }
  #mc-q-card-title {
    border-radius: 30px;
    cursor: move;
    width: $main-control-width;
    transition: background-color 0.8s;
  }
  .q-card-title {
    line-height: inherit;
  }
  #mc-search-div {
    width: 85%;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    position: absolute;
    left: 50px;
    margin-top: 8px;
  }
  #mc-text-div {
    text-shadow: 0 0 1px #555;
  }
  .q-card.with-context
    background-color rgba(35, 35, 35 ,.8);
    border-radius: 5px;
    #mc-q-card-title
      margin 15px;
      width: $main-control-width - 30;
    #mc-text-div
      padding-left 5px
      float: left
      margin-top 8px
    #mc-search-div
      left 62px
      top 18px
  .q-card-main {
    overflow: auto;
    line-height: inherit;
    max-height: $main-control-max-height;
    background-color: alpha($faded, 85%);
    padding: 0; /* 0 0 10px 0;*/
  }

  #context-actions {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0
    margin: 0
  }
  #mc-actions {
    position absolute
    right 55px
  }
  #mc-actions .separator {
    width 2px
    height 60%
    background-color #fff
    position absolute
    top 20%
    border-left 1px solid #333
    border-right 1px solid #666
  }
  #mc-reset-context, #mc-interrupt-task {
    position absolute
    right 2px
    color $main-control-red
  }
  .mc-button {
    padding: 6px 10px;
    cursor: pointer;
    display: inline-block;
    font-size: 22px;
    color: rgb(119,119,119);
    text-shadow: 0 1px 0 #333;
  }
  .mc-button:hover {
    color: white; /* background: #e0e0e0; */
  }
  .mc-button.active {
    color: white;
    cursor: auto;
  }
  .mc-action {
    padding: 6px;
    position: relative;
  }
  .mc-tab.active {
    background-color: alpha($faded, 85%);
  }
  .mc-action:not(.disabled):hover {
    color: $main-control-main-color;
  }
  .mc-action.active {
    color: $main-control-main-color;
  }
  .mc-button-notification {
    display: block;
    position: absolute;
    top: 6px;
    right: 4px;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: $main-control-main-color;
  }
  #btn-reset-context {
    width: 15px;
    height: 15px;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  .lot-of-flow {
    transition: top 0.05s ease 0s, left 0.05s ease 0s;
  }
</style>
