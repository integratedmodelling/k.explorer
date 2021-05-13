<template>
  <div
    id="dmc-container"
    class="full-height"
    :class="{'dmc-dragging': dragging, 'dmc-large-mode': searchIsFocused && largeMode > 0 }"
  >
    <klab-breadcrumbs></klab-breadcrumbs>
    <klab-search-bar
      ref="klab-search-bar-docked"
      v-draggable="dragMCConfig"
    ></klab-search-bar>
    <div
      v-if="isTreeVisible"
      id="dmc-tree"
      class="q-card-main full-height"
      :class="{'dmc-dragging': dragging, 'dmc-loading': taskOfContextIsAlive}"
    >
      <klab-tree-pane></klab-tree-pane>
    </div>
    <observations-timeline class="dmc-timeline" v-if="contextHasTime"></observations-timeline>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { debounce, dom } from 'quasar';
import KlabSearchBar from 'components/KlabSearchBar';
import KlabBreadcrumbs from 'components/KlabBreadcrumbs';
import KlabTreePane from 'components/KlabTreePane.vue';
import ObservationsTimeline from 'components/ObservationsTimeline.vue';
import { Draggable } from 'shared/VueDraggableTouchDirective';
import { VIEWERS, CUSTOM_EVENTS } from 'shared/Constants';

const { width } = dom;

export default {
  name: 'KlabDockedMainControl',
  components: {
    KlabSearchBar,
    KlabBreadcrumbs,
    ObservationsTimeline,
    KlabTreePane,
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
    ...mapGetters('data', [
      'contextHasTime',
    ]),
    ...mapGetters('view', [
      'largeMode',
      'isTreeVisible',
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
      if (this.dragging) {
        if (absolutePosition && absolutePosition.left > this.undockLimit) {
          this.askForUndocking = true;
        } else {
          this.askForUndocking = false;
        }
        this.$eventBus.$emit(CUSTOM_EVENTS.ASK_FOR_UNDOCK, this.askForUndocking);
      }
    },
    checkUndock() {
      this.$nextTick(() => {
        if (this.askForUndocking) {
          this.askForUndocking = false;
          this.setMainViewer(VIEWERS.DATA_VIEWER);
        }
        this.$eventBus.$emit(CUSTOM_EVENTS.ASK_FOR_UNDOCK, false);
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
    &.full-height
      height "calc(100% -  %s)" % ($docked-search-height + $docked-timeline-height) !important
    #kt-out-container
      height 100%
      position relative
    #dmc-tree
      // not selectable
      user-select none
      -khtml-user-select none
      -o-user-select none
      -moz-user-select -moz-none
      -webkit-user-select none
      background-color $main-control-grey-alpha
      overflow hidden
      #klab-tree-pane
        height 100%

      #oi-container
        height "calc(100% -  %s)" % ($docked-padding)
        max-height "calc(100% - %s)" % ($docked-padding)
        #oi-metadata-map-wrapper
          height "calc(100% - %s)" % ($docked-padding)
          &.with-histogram
            height "calc(100% - %s)" % ($oi-controls-height + $oi-histogram-height)

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
    details
      background-color #777
      border-top 1px solid #333
      #ktp-main-tree-arrow
        background-color #333
      &[open]
        border-bottom 1px solid #333

    .dmc-timeline .ot-container
      padding 9px 0
</style>
