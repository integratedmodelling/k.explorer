<template>
  <div class="no-padding relative-position full-width">
    <div v-for="(item) in viewerLayout"
       :class="['no-padding',
           item.main ? 'absolute-top full-height full-width' : 'absolute thumb-view']"
       :key="item.idx"
       :style="viewerStyle(item)"
    >
      <div class="thumb-viewer-title absolute-top" v-if="!item.main">Titolo</div>
      <component :is="item.type" :observation="item.data"></component>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MapViewer from 'components/MapViewer.vue';

let thumbnails = [];

export default {
  /*
  data() {
    return {
      thumbnails: [],
    };
  },
  */
  computed: {
    ...mapGetters('data', [
      'viewerLayout',
      'mainViewer',
    ]),
  },
  methods: {
    viewerStyle(viewer) {
      if (viewer.main) {
        return '';
      }
      thumbnails.push(viewer);
      return `left: ${(thumbnails.length - 1) * 200}px`;
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
  mounted() {
  },
};
</script>

<style scoped>
  .thumb-view {
    width: 200px;
    height: 200px;
    margin: 10px;
    border: 1px solid #333;
    box-shadow: #5c6bc0;
    bottom: 0;
    z-index: 9999;
  }
  .thumb-container {
  }
</style>
