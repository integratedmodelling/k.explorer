<template>
  <div
    id="ksb-container"
    :class="[hasContext ? 'with-context' : 'without-context', isDocked ? 'ksb-docked' : '']"
    :style="{ 'background-color': !isDocked ? 'rgba(0,0,0,0)' : getBGColor(hasContext ? '1.0' : searchIsFocused ? '.6' : '.2') }">
    <div
      id="ksb-spinner"
      class="spinner-div"
      v-if="!isDocked"
    >
      <klab-spinner
        :store-controlled="true"
        :color="spinnerColor.hex"
        :size="35"
        :ball="22"
        wrapperId="ksb-spinner"
        @dblclick.native="emitSpinnerDoubleclick"
      ></klab-spinner>
    </div>
    <klab-search v-if="searchIsActive"></klab-search>
    <div class="ksb-context-text text-white" v-else>
      <scrolling-text :with-edge="false" ref="st-context-text" :hoverActive="true" :initialText="contextLabel === null ? $t('label.noContext') : contextLabel"></scrolling-text>
    </div>
    <div class="ksb-status-texts" ref="ksb-status-texts">
      <scrolling-text :with-edge="false" ref="st-status-text" :hoverActive="false" :accentuate="true"></scrolling-text>
    </div>
    <main-control-menu></main-control-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { FAKE_TEXTS, CUSTOM_EVENTS } from 'shared/Constants';
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
    getBGColor(alpha) {
      return `rgba(${this.spinnerColor.rgb.r},${this.spinnerColor.rgb.g},${this.spinnerColor.rgb.b}, ${alpha})`;
    },
    emitSpinnerDoubleclick() {
      this.$eventBus.$emit(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK);
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
};
</script>

<style lang="stylus">
  #ksb-container
    width 100%
    transition background-color 0.8s
    line-height inherit
    &.ksb-docked
      position relative
      padding 10px 5px
      height 40px
      .ksb-context-text
        width 90%
      .ksb-status-texts
        width 90%
        position relative
        bottom 6px
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
    .spinner-div
      background-color white
      -webkit-border-radius 40px
      -moz-border-radius 40px
      border-radius 40px
      padding 3px
      margin 0

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
