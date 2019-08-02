<template>
  <div
    id="dmc-container"
    class="full-height"
    :class="{'dmc-dragging': dragging, 'dmc-large-mode': searchIsFocused && largeMode }"
    v-draggable="dragMCConfig"
  >
    <klab-breadcrumbs></klab-breadcrumbs>
    <klab-search-bar
      ref="klab-search-bar-docked"
    ></klab-search-bar>
    <div
      id="dmc-tree"
      class="q-card-main full-height"
      :class="{'dmc-dragging': dragging, 'dmc-loading': taskOfContextIsAlive}"
    >
      <klab-tree-pane></klab-tree-pane>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce, dom } from 'quasar';
import KlabSearchBar from 'components/KlabSearchBar';
import KlabBreadcrumbs from 'components/KlabBreadcrumbs';
import KlabTreePane from 'components/KlabTreePane.vue';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { VIEWERS, CUSTOM_EVENTS } from 'shared/Constants';

const { width } = dom;

export default {
  name: 'KlabDockedMainControl',
  components: {
    KlabSearchBar,
    KlabTreePane,
    KlabBreadcrumbs,
  },
  directives: {
    Draggable,
  },
  data() {
    return {
      dragMCConfig: {
        onPositionChange: debounce((positionDiff, absolutePosition) => {
          this.onDebouncedPositionChanged(absolutePosition);
        }, 100),
        onDragStart: () => { this.dragging = true; },
        onDragEnd: this.checkUndock,
        fingers: 2,
        noMove: true,
      },
      askForUndocking: false,
      draggableElementWidth: 0,
      dragging: false,
    };
  },
  computed: {
    ...mapGetters('view', [
      'largeMode',
    ]),
    ...mapGetters('stomp', [
      'taskOfContextIsAlive',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'searchIsFocused',
      'setMainViewer',
    ]),
    onDebouncedPositionChanged(absolutePosition) {
      if (absolutePosition && absolutePosition.left > this.undockLimit) {
        this.askForUndocking = true;
      } else {
        this.askForUndocking = false;
      }
      this.$eventBus.$emit(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndocking);
    },
    checkUndock() {
      this.$nextTick(() => {
        if (this.askForUndocking) {
          this.askForUndocking = false;
          this.$eventBus.$emit(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndocking);
          this.setMainViewer(VIEWERS.DATA_VIEWER);
        }
        this.dragging = false;
      });
    },
  },
  mounted() {
    this.undockLimit = width(document.getElementById('dmc-container')) / 3;
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #dmc-container
    #kt-out-container
      height 100%
      position relative
      max-height "calc(100% - %s)" % $docked-padding
    &.dmc-large-mode.full-height
      height "calc(100% -  %s)" % ($docked-search-height) !important
    #dmc-tree
      background-color: rgba(119,119,119,0.65);
      overflow hidden
      #klab-tree-pane
        height 100%

      #oi-container
        height "calc(100% -  %s)" % ($main-control-scrollbar + $docked-padding)
        max-height "calc(100% - %s)" % ($main-control-scrollbar + $docked-padding)
        #oi-metadata-map-wrapper
          height "calc(100% - %s)" % ($docked-padding + $docked-correction)
          &.with-histogram
            height "calc(100% - %s)" % ($oi-controls-height + $oi-histogram-height + $docked-correction)

    &.dmc-dragging
      cursor move !important
    .kbc-container
      margin 2px
      padding 0
      height 10px
    .q-card-main.dmc-loading
      background linear-gradient(90deg, #333, #999)
      background-size 200% 100%
      animation loading-gradient 4s linear infinite
      .ktp-loading
        background transparent
        animation none
</style>
