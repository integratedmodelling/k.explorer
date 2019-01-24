<template>
  <div id="lm-container" class="full-height">
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
    <main-actions-buttons orientation="vertical"></main-actions-buttons>
    <div class="lm-separator"></div>
    <div id="lm-bottom-menu">
      <div class="klab-button"
           :class="[{ active: showLog }]"
           @click="showLog = !showLog"
      ><q-icon name="mdi-console">
        <q-tooltip
          :offset="[0, 8]"
          self="top left"
          anchor="bottom left"
        >{{ $t('tooltips.logPane') }}</q-tooltip>
      </q-icon></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import KlabSpinner from 'components/KlabSpinner.vue';
import MainActionsButtons from 'components/MainActionsButtons';

export default {
  name: 'KlabLeftMenu',
  data() {
    return {
      showLog: false,
    };
  },
  components: {
    KlabSpinner,
    MainActionsButtons,
  },
  computed: {
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
    ]),
  },
};
</script>

<style  lang="stylus">
  @import '~variables'
  #lm-container
    width 100%
    background-color rgba(35, 35, 35, .5)
    border-right 1px solid rgba(135, 135, 135, .2)
    // background: linear-gradient(to right, rgba(35, 35, 35, .5) 0, rgba(35, 35, 35, .5) 95%, rgba(35, 35, 35, 0) 100%)
    // box-shadow 1px 0 3px 0 rgba(150,150,150,0.5)
    #spinner-leftmenu-container
      padding-top 10px
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
    .lm-separator
      width 90%
      left 5%
      height 2px
      border-top 1px solid #333
      border-bottom 1px solid #444
      margin 20px auto
    .klab-button
      display block
      font-size 40px
      width 52px
      height 52px
      padding 0 5px
      margin 15px auto
      border 1px solid #333
      &:hover
        border 1px solid alpha($main-control-main-color, 50%)
    .klab-button-notification
      width 16px
      height 16px
      border-radius 8px
      top -10px
      right -10px

</style>
