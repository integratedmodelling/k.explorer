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
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import KlabSpinner from 'components/KlabSpinner.vue';
import MainActionsButtons from 'components/MainActionsButtons';

export default {
  name: 'KlabLeftMenu',
  data() {
    return {};
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
  #lm-container
    width 80px
    background-color rgba(35, 35, 35, .5)
    // box-shadow 1px 0 3px 0 rgba(150,150,150,0.5)
    #spinner-leftmenu-container
      padding-top 10px
    #spinner-leftmenu-div
      width 52px
      height 52px
      margin-top 10px
      margin-left 10px
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


</style>
