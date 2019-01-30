<template>
  <div
    id="ksb-container"
    :class="[hasContext ? 'with-context' : 'without-context', isDocked ? 'ksb-docked' : '']"
    >
    <div
      id="ksb-spinner"
      class="klab-spinner-div"
      v-if="!isDocked"
    >
      <klab-spinner
        :store-controlled="true"
        :color="spinnerColor.hex"
        :size="40"
        :ball="22"
        wrapperId="ksb-spinner"
        @dblclick.native="emitSpinnerDoubleclick"
      ></klab-spinner>
    </div>
    <div
      id="ksb-undock"
      v-else
    >
      <div
        id="ksb-undock-icon"
        @click = "undock"
      >
        <q-icon
          name="mdi-pin"
          size="1.2em"
        ></q-icon>
        <q-tooltip
          :offset="[5,0]"
          self="top left"
          anchor="top right"
        >{{ $t('tooltips.undock') }}</q-tooltip>
      </div>
    </div>
    <div
      id="ksb-search-container"
      :style="{
          'background-color': !isDocked ? 'rgba(0,0,0,0)' : getBGColor(hasContext ? '1.0' : searchIsFocused ? '.6' : '.2'),
          'border-right': '2px solid '+ spinnerColor.color
        }">
      <klab-search v-if="searchIsActive"></klab-search>
      <div class="ksb-context-text text-white" v-else>
        <scrolling-text :with-edge="true" ref="st-context-text" :hoverActive="true" :initialText="contextLabel === null ? $t('label.noContext') : contextLabel"></scrolling-text>
      </div>
      <div class="ksb-status-texts" ref="ksb-status-texts">
        <scrolling-text :with-edge="true" :edgeOpacity="hasContext ? 1 : searchIsFocused ? .6 : .2" ref="st-status-text" :hoverActive="false" :initialText="statusTextsString" :accentuate="true"></scrolling-text>
      </div>
      <main-control-menu></main-control-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FAKE_TEXTS, CUSTOM_EVENTS, VIEWERS } from 'shared/Constants';
import KlabSearch from 'components/KlabSearch.vue';
import KlabSpinner from 'components/KlabSpinner.vue';
import ScrollingText from 'components/ScrollingText.vue';
import MainControlMenu from 'components/MainControlMenu.vue';

export default {
  name: 'KlabSearchBar',
  components: {
    KlabSpinner,
    KlabSearch,
    ScrollingText,
    MainControlMenu,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextLabel',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'searchIsActive',
      'searchIsFocused',
      'hasMainControl',
      'statusTextsString',
      'statusTextsLength',
    ]),
    isDocked() {
      return !this.hasMainControl;
    },
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
    getBGColor(alpha) {
      return `rgba(${this.spinnerColor.rgb.r},${this.spinnerColor.rgb.g},${this.spinnerColor.rgb.b}, ${alpha})`;
    },
    emitSpinnerDoubleclick() {
      this.$eventBus.$emit(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK);
    },
    undock() {
      this.setMainViewer(VIEWERS.DATA_VIEWER);
    },
  },
  watch: {
    statusTextsString(newValue) {
      if (newValue === FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION) {
        newValue = this.$t('messages.unknownSearchObservation');
      }
      this.$refs['st-status-text'].changeText(newValue, this.statusTextsLength * 5);
    },
    contextLabel(newValue) {
      this.$refs['st-context-text'].changeText(newValue);
    },
  },
  mounted() {
    console.dir(this.spinnerColor);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #ksb-container
    width 100%
    transition background-color 0.8s
    line-height inherit
    &.ksb-docked
      #ksb-search-container
        position relative
        padding 16px 10px
        height 52px
        .ksb-context-text
          width 90%
          position relative
        .ksb-status-texts
          width 90%
          position relative
          bottom 2px
        .mcm-menubutton
          top 11px

    &:not(.ksb-docked)
      border-radius 30px
      cursor move
      #ks-container
        width 85%
        position absolute
        left 45px
        margin-top 8px
      .ksb-context-text
        width 85%
        position absolute
        left 45px
        margin-top 8px
      .ksb-status-texts
        width 85%
        position absolute
        bottom -4px
        left 45px
        margin 0 auto

    #ksb-spinner
      float left
      border none
      width 40px
      height 40px

    #ksb-undock
      text-align right
      #ksb-undock-icon
        padding 6px 10px
        text-align center
        display inline-block
        cursor pointer
        transition .1s
        color #999
        &:hover
          color $main-control-main-color
          transform translate(5px) rotate(33deg)
    .ksb-context-text
      white-space nowrap
      overflow hidden
    .ksb-status-texts
      font-size 11px
      color rgba(0,0,0, 0.4)
      height 15px
      white-space nowrap
      overflow hidden

</style>
