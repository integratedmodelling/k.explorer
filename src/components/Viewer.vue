<template>
  <div class="no-padding relative-position full-width">
    <div v-for="(viewer) in viewers"
       :class="['no-padding',
           viewer.main ? 'absolute-top full-height full-width' : 'absolute thumb-view']"
       :key="viewer.idx"
       :style="viewerStyle(viewer)"
    >
      <div class="thumb-viewer-title absolute-top" v-if="!viewer.main">
        <div class="relative-position">
        <div class="thumb-viewer-label float-left q-ma-sm">
          <!--  viewer.observations[0].label || $t('label.unknownLabel')  -->
          {{ viewer.idx }}
        </div>
        <div class="float-right q-ma-sm">
          <q-btn
            class="shadow-1"
            round
            color="red-6"
            size="xs"
            @click="setMainViewer(viewer.idx)"
            icon="ion-ios-arrow-up"
          ></q-btn>
        </div>
        </div>
      </div>
      <component :is="viewer.type" :idx="viewer.idx"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import MapViewer from 'components/MapViewer.vue';

let thumbnails = [];

export default {
  computed: {
    ...mapGetters('view', [
      'viewers',
      'mainViewer',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
    viewerStyle(viewer) {
      if (viewer.main) {
        return '';
      }
      thumbnails.push(viewer);
      if (thumbnails.length === 0) {
        return 'left: 0';
      }
      return `left: ${((thumbnails.length - 1) * 200) + ((thumbnails.length - 1) * 10)}px`;
    },
  },
  watch: {
    mainViewer() {
      thumbnails = [];
    },
  },
  components: {
    MapViewer,
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

  .thumb-view:hover > .thumb-viewer-title
    opacity 1

  .thumb-viewer-title
    opacity 0
    background-color alpha($primary, 75%)
    color $grey-4
    font-weight bold
    text-shadow $shadow-2
    padding 2px 5px
    transition opacity 1s
    z-index 9999
</style>
