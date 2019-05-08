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
        <div class="thumb-viewer-label float-left q-ma-sm">
          <!--  viewer.observations[0].label || $t('label.unknownLabel')  -->
          {{ capitalize(viewer.label) }}
        </div>
        <div class="float-right q-ma-sm">
          <q-btn
            class="shadow-1"
            round
            color="mc-main"
            size="xs"
            @click="setMain(viewer.idx)"
            icon="mdi-chevron-up"
          ></q-btn>
        </div>
        </div>
      </div>
      <component :is="viewer.type" :idx="viewer.idx" :viewer="viewer"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MapViewer from 'components/MapViewer.vue';
import GraphViewer from 'components/GraphViewer.vue';
import { capitalizeFirstLetter } from 'shared/Utils';
import { CUSTOM_EVENTS } from 'shared/Constants';

let thumbnails = [];

export default {
  components: {
    MapViewer,
    GraphViewer,
  },
  computed: {
    ...mapGetters('view', [
      'dataViewers',
      'mainDataViewer',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainDataViewer',
    ]),
    setMain(idx) {
      this.setMainDataViewer(idx);
      this.$eventBus.$emit(CUSTOM_EVENTS.VIEWER_SELECTED, { idx });
    },
    viewerStyle(viewer) {
      if (viewer.main) {
        return '';
      }
      if (viewer.hiddenable && !viewer.visible) {
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
    mainDataViewer() {
      thumbnails = [];
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
    margin 10px
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
    font-weight bold
    text-shadow $shadow-2
    padding 2px 5px
    transition opacity 1s
    z-index 9999
</style>
