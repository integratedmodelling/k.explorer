<template>
  <div
    id="ksb-container"
    :class="[hasContext ? 'with-context' : 'without-context', isDocked ? 'ksb-docked' : '']"
    :style="{ width: isDocked && searchIsFocused && largeMode ? getLargeModeWidth() : '100%' }"
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
        id="spinner-searchbar"
        :style="{ 'box-shadow': searchIsFocused ? `0px 0px 3gitpx ${getBGColor('.4')}` : 'none' }"
        @dblclick.native="emitSpinnerDoubleclick"
        @touchstart.native.stop="handleTouch($event, showSuggestions, emitSpinnerDoubleclick)"
      ></klab-spinner>
    </div>
    <div
      id="ksb-search-container"
      :class="[ fuzzyMode ? 'klab-fuzzy' : '', searchIsFocused ? 'klab-search-focused' : '']"
      :style="{
          'background-color': !isDocked ? 'rgba(0,0,0,0)' : getBGColor(hasContext ? '1.0' : searchIsFocused ? '.8' : isDocked ? '1.0' : '.2'),
          // 'border-right': '2px solid '+ spinnerColor.color
        }">
      <klab-search class="klab-search" ref="klab-search" v-if="searchIsActive"></klab-search>
      <div class="ksb-context-text text-white" v-else>
        <scrolling-text
          :with-edge="true"
          ref="st-context-text"
          :hover-active="true"
          :initial-text="mainContextLabel === null ? $t('label.noContextPlaceholder') : mainContextLabel"
          :placeholder-style="!hasContext"
        >
        </scrolling-text>
      </div>
      <div class="ksb-status-texts" ref="ksb-status-texts">
        <scrolling-text :with-edge="true" :edgeOpacity="hasContext ? 1 : searchIsFocused ? .8 : .2" ref="st-status-text" :hoverActive="false" :initialText="statusTextsString" :accentuate="true"></scrolling-text>
      </div>
      <q-icon v-if="isScaleLocked['space'] && !hasContext" name="mdi-lock-outline">
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          :offset="[10, 5]"
          :delay="500"
        >{{ $t('label.scaleLocked', { type:  $t('label.spaceScale') })}}</q-tooltip>
      </q-icon>
      <main-control-menu></main-control-menu>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { FAKE_TEXTS, CUSTOM_EVENTS, VIEWERS, LEFTMENU_CONSTANTS, SPINNER_CONSTANTS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabSearch from 'components/KlabSearch.vue';
import ScrollingText from 'components/ScrollingText.vue';
import MainControlMenu from 'components/MainControlMenu.vue';
import HandleTouch from 'shared/HandleTouchMixin';

export default {
  name: 'KlabSearchBar',
  components: {
    KlabSpinner,
    KlabSearch,
    ScrollingText,
    MainControlMenu,
  },
  mixins: [HandleTouch],
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextLabel',
      'contextCustomLabel',
      'isScaleLocked',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'searchIsActive',
      'searchIsFocused',
      'hasMainControl',
      'statusTextsString',
      'statusTextsLength',
      'fuzzyMode',
      'largeMode',
      'isDocked',
    ]),
    isDocked() {
      return !this.hasMainControl;
    },
    mainContextLabel() {
      return this.contextLabel ? this.contextLabel : this.contextCustomLabel;
    },
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
      'searchStart',
      'searchFocus',
      'searchStop',
      'setSpinner',
    ]),
    getLargeModeWidth() {
      return `${(window.innerWidth || document.body.clientWidth) - LEFTMENU_CONSTANTS.LEFTMENU_MINSIZE}px`;
    },
    getBGColor(alpha) {
      return `rgba(${this.spinnerColor.rgb.r},${this.spinnerColor.rgb.g},${this.spinnerColor.rgb.b}, ${alpha})`;
    },
    showSuggestions(event) {
      if (event.targetTouches.length === 1) {
        event.preventDefault();
        if (!this.searchIsActive) {
          this.searchStart(' ');
        } else if (!this.searchIsFocused) {
          this.searchFocus({ char: ' ', focused: true });
        } else {
          this.$refs['klab-search'].searchEnd({ noDelete: false });
        }
      }
    },
    emitSpinnerDoubleclick() {
      this.$eventBus.$emit(CUSTOM_EVENTS.SPINNER_DOUBLE_CLICK);
    },
    undock(event) {
      console.dir(event);
      this.setMainViewer(VIEWERS.DATA_VIEWER);
    },
    askForSuggestionsListener(event) {
      this.showSuggestions(event);
    },
  },
  watch: {
    statusTextsString(newValue) {
      if (newValue.includes(FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION)) {
        const re = new RegExp(FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION, 'g');
        newValue = newValue.replace(re, this.$t('messages.unknownSearchObservation'));
      }
      this.$refs['st-status-text'].changeText(newValue, this.statusTextsLength * 5);
    },
    mainContextLabel(newValue) {
      if (this.$refs['st-context-text']) {
        this.$refs['st-context-text'].changeText(newValue);
      }
    },
    hasContext(newValue) {
      if (newValue) {
        // stop the spinner if we have context from fuzzy search
        this.setSpinner({ ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: 'KlabSearch' });
      }
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.ASK_FOR_SUGGESTIONS, this.askForSuggestionsListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.ASK_FOR_SUGGESTIONS, this.askForSuggestionsListener);
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
      transition width .5s
      #ksb-search-container
        position relative
        padding 16px 10px
        height $docked-search-height
        transition background-color 0.8s
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
      height $docked-undock-height
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
    .mdi-lock-outline
      position absolute
      right 35px
      top 12px
</style>
