<template>
  <div id="lm-container" class="full-height">
    <div id="lm-actions" class="full-height klab-lm-panel" :style="{ width: `${LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE}px` }">
      <div id="spinner-leftmenu-container">
        <div
          id="spinner-leftmenu-div"
          :style="{ 'border-color': hasTasks() ? spinnerColor.color : 'white' }"
        >
          <klab-spinner
            id="spinner-leftmenu"
            :store-controlled="true"
            :size="40"
            :ball="22"
            wrapperId="spinner-leftmenu-div"
            @touchstart.native="handleTouch($event, askForSuggestion)"
          ></klab-spinner>
        </div>
      </div>
      <template v-if="hasContext">
        <div class="lm-separator"></div>
        <main-actions-buttons orientation="vertical" separator-class="lm-separator"></main-actions-buttons>
        <div class="lm-separator"></div>
        <!-- <knowledge-views-selector :docked="true"></knowledge-views-selector>
        <div class="lm-separator"></div> -->
      </template>
      <div class="klab-button klab-action"
           :class="[{ active: logShowed }]"
           @click="logAction"
      >
        <q-icon name="mdi-console">
          <q-tooltip
            :delay="600"
            :offset="[0, 8]"
            self="top left"
            anchor="bottom left"
          >{{ logShowed ? $t('tooltips.hideLogPane') : $t('tooltips.showLogPane') }}</q-tooltip>
        </q-icon>
      </div>
      <div class="lm-separator"></div>
      <div id="lm-bottom-menu" :style="{ width: `${LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE}px` }">
        <div class="lm-separator"></div>
        <scale-buttons :docked="true"></scale-buttons>
        <div class="lm-separator"></div>
        <div class="lm-bottom-buttons">
          <stop-actions-buttons></stop-actions-buttons>
        </div>
      </div>
    </div>
    <div
      id="lm-content"
      v-if="maximized"
      :style="{ width: `${LEFTMENU_VISIBILITY.LEFTMENU_MAXSIZE - LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE}px` }"
      class="full-height klab-lm-panel"
    >
      <div id="lm-content-container" class="full-height">
        <keep-alive>
          <transition name="component-fade" mode="out-in">
            <component class="lm-component" :is="leftMenuContent"></component>
          </transition>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { LEFTMENU_CONSTANTS, CUSTOM_EVENTS } from 'shared/Constants';
import HandleTouch from 'shared/HandleTouchMixin';
import MainActionsButtons from 'components/MainActionsButtons';
import StopActionsButtons from 'components/StopActionsButtons';
import KlabSpinner from 'components/KlabSpinner.vue';
import DockedMainControl from 'components/KlabDockedMainControl.vue';
import DocumentationTree from 'components/DocumentationTree.vue';
import KlabLogPane from 'components/KlabLogPane.vue';
import ScaleButtons from 'components/ScaleButtons.vue';
import KnowledgeViewsSelector from 'components/KnowledgeViewsSelector.vue';

export default {
  name: 'KlabLeftMenu',
  components: {
    KlabSpinner,
    MainActionsButtons,
    StopActionsButtons,
    DockedMainControl,
    DocumentationTree,
    KlabLogPane,
    ScaleButtons,
    KnowledgeViewsSelector,
  },
  mixins: [HandleTouch],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'mainViewer',
      'leftMenuContent',
      'leftMenuState',
    ]),
    logShowed() {
      return this.leftMenuContent === LEFTMENU_CONSTANTS.LOG_COMPONENT;
    },
    maximized() {
      return this.leftMenuState === LEFTMENU_CONSTANTS.LEFTMENU_MAXIMIZED && this.leftMenuContent;
    },
  },
  methods: {
    ...mapActions('view', [
      'setLeftMenuState',
      'setLeftMenuContent',
    ]),
    logAction() {
      if (this.logShowed) {
        this.setLeftMenuContent(this.mainViewer.leftMenuContent);
        this.setLeftMenuState(this.mainViewer.leftMenuState);
      } else {
        this.setLeftMenuContent(LEFTMENU_CONSTANTS.LOG_COMPONENT);
        this.setLeftMenuState(LEFTMENU_CONSTANTS.LEFTMENU_MAXIMIZED);
      }
    },
    askForSuggestion(event) {
      this.$eventBus.$emit(CUSTOM_EVENTS.ASK_FOR_SUGGESTIONS, event);
    },
  },
  created() {
    this.LEFTMENU_VISIBILITY = LEFTMENU_CONSTANTS;
  },
};
</script>

<style  lang="stylus">
  @import '~variables'
  #lm-container
    width 100%
    overflow hidden
    // background: linear-gradient(to right, rgba(35, 35, 35, .5) 0, rgba(35, 35, 35, .5) 95%, rgba(35, 35, 35, 0) 100%)
    // box-shadow 1px 0 3px 0 rgba(150,150,150,0.5)
    #spinner-leftmenu-container
      padding-top 10px
      padding-bottom 20px
    #spinner-leftmenu-div
      width 44px
      height 44px
      margin-top 10px
      margin-left auto
      margin-right auto
      background-color white
      -webkit-border-radius 40px
      -moz-border-radius 40px
      border-radius 40px
      border 2px solid
    #lm-actions
    #lm-content
      float left
      border-right 1px solid rgba(135, 135, 135, .2)
      &.klab-lm-panel
        background-color rgba(35, 35, 35, .5)
    .lm-separator
      width 90%
      left 5%
      height 2px
      border-top 1px solid rgba(24,24,24,0.5)
      border-bottom 1px solid #444
      margin 0 auto
    .klab-button
      display block
      font-size 30px
      width 42px
      height 42px
      line-height 42px
      vertical-align middle
      padding 0 5px
      margin 15px auto
    .klab-main-actions .klab-button
      &:hover
        color $main-control-main-color !important
      &:active
        color white
    .klab-button-notification
      width 10px
      height 10px
      top 5px
      right 5px
    .sb-scales
      margin 0
      .lm-separator
        width 60%
        border-top-style dashed
        border-bottom-style dashed

    #lm-bottom-menu
      width 100%
      position fixed
      bottom 0
      left 0

</style>
