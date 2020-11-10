<template>
  <div class="no-padding relative-position full-width">
    <div v-for="(viewer) in dataViewers"
       :class="['no-padding',
           viewer.main ? 'absolute-top full-height full-width' : 'absolute thumb-view']"
       :key="viewer.idx"
       :style="viewerStyle(viewer)"
       :id="`dv-viewer-${viewer.idx}`"
    >
      <div class="thumb-viewer-title absolute-top" v-if="!viewer.main">
        <div class="relative-position">
          <div class="thumb-viewer-label float-left q-ma-sm" :class="[viewer.type.hideable ? 'thumb-closable' : '']">
            {{ capitalize(viewer.label) }}
          </div>
          <div class="float-right q-ma-xs thumb-viewer-button">
            <q-btn
              class="shadow-1"
              round
              color="mc-main"
              size="xs"
              @click="setMain(viewer.idx)"
              icon="mdi-chevron-up"
            ></q-btn>
            <q-btn
              v-if="viewer.type.hideable"
              class="shadow-1 thumb-close"
              round
              color="black"
              size="xs"
              @click="closeViewer(viewer)"
              icon="mdi-close"
            ></q-btn>
          </div>
        </div>
      </div>
      <component :is="viewer.type.component" :idx="viewer.idx"></component>
      <!-- //TODO check if viewer attr is needed <component :is="viewer.type.component" :idx="viewer.idx" :viewer="viewer"></component> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MapViewer from 'components/MapViewer.vue';
import GraphViewer from 'components/GraphViewer.vue';
import UnknownViewer from 'components/UnknownViewer.vue';
import { capitalizeFirstLetter } from 'shared/Utils';
import { CUSTOM_EVENTS } from 'shared/Constants';

let thumbnails = [];

export default {
  components: {
    MapViewer,
    GraphViewer,
    UnknownViewer,
  },
  computed: {
    ...mapGetters('view', [
      'dataViewers',
      'mainDataViewerIdx',
      'dataViewers',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainDataViewer',
    ]),
    setMain(idx) {
      this.setMainDataViewer({ viewerIdx: idx });
      this.$eventBus.$emit(CUSTOM_EVENTS.VIEWER_SELECTED, { idx });
    },
    closeViewer(viewer) {
      this.setMainDataViewer({ viewerIdx: viewer.idx, viewerType: viewer.type, visible: false });
      this.$eventBus.$emit(CUSTOM_EVENTS.VIEWER_CLOSED, { idx: viewer.idx });
    },
    viewerStyle(viewer) {
      if (viewer.main) {
        return '';
      }
      if (viewer.type.hideable && !viewer.visible) {
        return 'display: none';
      }
      thumbnails.push(viewer);
      if (thumbnails.length === 0) {
        return 'left: 0';
      }
      return `left: ${((thumbnails.length - 1) * 200) + ((thumbnails.length - 1) * 10)}px`;
    },
    capitalize(text) {
      return capitalizeFirstLetter(text);
    },
  },
  watch: {
    mainDataViewerIdx() {
      thumbnails = [];
    },
    dataViewers: {
      handler(newValue) {
        const newMain = newValue.length > 0 ? newValue.find(v => v.main) : null;
        this.$nextTick(() => {
          this.$eventBus.$emit(CUSTOM_EVENTS.NEED_FIT_MAP, { ...(newMain !== null && { idx: newMain.idx }) });
        });
      },
      deep: true,
    },
  },
  beforeUpdate() {
    thumbnails = [];
  },
  mounted() {
    thumbnails = [];
  },
};
</script>

<style scoped lang="stylus">
  @import '~variables'

  .thumb-view
    width 200px
    height 200px
    margin 5px
    border 1px solid #333
    box-shadow #5c6bc0
    bottom 0
    z-index 9998
    overflow hidden

  .thumb-view:hover > .thumb-viewer-title
    opacity 1

  .thumb-viewer-title
    opacity 0
    background-color alpha($main-control-main-color, 85%)
    color $grey-4
    text-shadow $shadow-2
    font-size 0.9em
    padding 0
    transition opacity 1s
    z-index 9999

  .thumb-viewer-label
    width 140px
    display inline-block
    overflow hidden
    white-space nowrap
    vertical-align: middle;
    text-overflow: ellipsis;
    &.thumb-closable
      width 100px

  .thumb-viewer-button
    margin-top 5px
    margin-left 0
    margin-right 4px
    > button
      font-size 6px

  .thumb-close
    margin-left 5px

</style>
