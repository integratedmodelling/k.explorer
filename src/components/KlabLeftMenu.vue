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
            :size="50"
            :ball="22"
            wrapperId="spinner-leftmenu-div"
          ></klab-spinner>
        </div>
      </div>
      <div class="lm-separator"></div>
      <main-actions-buttons orientation="vertical" separator-class="lm-separator"></main-actions-buttons>
      <div class="lm-separator"></div>
      <div id="lm-bottom-menu" :style="{ width: `${LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE}px` }">
        <div class="klab-button klab-action"
             :class="[{ active: logShowed }]"
             @click="logAction"
        ><q-icon name="mdi-console">
          <q-tooltip
            :offset="[0, 8]"
            self="top left"
            anchor="bottom left"
          >{{ $t('tooltips.logPane') }}</q-tooltip>
        </q-icon></div>
      </div>
    </div>
    <div
      id="lm-content"
      v-if="maximized"
      :style="{ width: `${LEFTMENU_VISIBILITY.LEFTMENU_MAXSIZE - LEFTMENU_VISIBILITY.LEFTMENU_MINSIZE}px` }"
      class="full-height klab-lm-panel"
    >
      <div id="lm-content-container">
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
import { LEFTMENU_VISIBILITY, LEFTMENU_COMPONENTS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner.vue';
import MainActionsButtons from 'components/MainActionsButtons';
import KlabLogPane from 'components/KlabLogPane.vue';

export default {
  name: 'KlabLeftMenu',
  data() {
    return {};
  },
  components: {
    KlabSpinner,
    MainActionsButtons,
    KlabLogPane,
  },
  computed: {
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
      return this.leftMenuContent === LEFTMENU_COMPONENTS.LOG_COMPONENT;
    },
    maximized() {
      return this.leftMenuState === LEFTMENU_VISIBILITY.LEFTMENU_MAXIMIZED && this.leftMenuContent;
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
        this.setLeftMenuContent(LEFTMENU_COMPONENTS.LOG_COMPONENT);
        this.setLeftMenuState(LEFTMENU_VISIBILITY.LEFTMENU_MAXIMIZED);
      }
    },
  },
  created() {
    this.LEFTMENU_VISIBILITY = LEFTMENU_VISIBILITY;
  },
};
</script>

<style  lang="stylus">
  @import '~variables'
  #lm-container
    width 100%
    // background: linear-gradient(to right, rgba(35, 35, 35, .5) 0, rgba(35, 35, 35, .5) 95%, rgba(35, 35, 35, 0) 100%)
    // box-shadow 1px 0 3px 0 rgba(150,150,150,0.5)

    #spinner-leftmenu-container
      padding-top 10px
      padding-bottom 20px
    #spinner-leftmenu-div
      width 52px
      height 52px
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
      border-top 1px solid #333
      border-bottom 1px solid #444
      margin 0 auto
    .klab-button
      display block
      font-size 40px
      width 52px
      height 52px
      padding 0 5px
      margin 15px auto
    .klab-main-actions .klab-button
      &:hover
        color $main-control-main-color !important
      &:active
        color white
    .klab-button-notification
      width 13px
      height 13px
      top 5px
      right 8px
    #lm-bottom-menu
      width 100%
      position fixed
      bottom 0
      left 0
      .klab-button
        border none
        &.active
          cursor pointer
          color $main-control-main-color !important

</style>
