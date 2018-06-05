<template>
  <div class="col column no-padding relative-position">
    <div ref="viewer-container" class="col no-padding full-height full-width">
      <component :is="type" :data="data"></component>
    </div>
    <!--
    <div class="absolute-bottom-left" style="width: 10vw">
      <component :is="type" :data="data"></component>
    </div>
    <div class="absolute-bottom-right" style="width: 10vw">
      <component :is="type" :data="data"></component>
    </div>
    -->
      <!--
      <grid-layout
        :layout="viewerLayout"
        :col-num="12"
        :is-draggable="false"
        :is-resizable="false"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[0, 0]"
        :rowHeight="1"
        :use-css-transforms="true"
        @layout-updated="layoutUpdated"
      >
        <grid-item v-for="item in viewerLayout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.index"
          :key="item.index">
          <component :is="item.type" :data="item.data"></component>
        </grid-item>
      </grid-layout>
    </div>
    -->
    <!--
  <div class="col-2 row" v-show="saved.length>0">
    <div :class="['col-'+saved.length * 2]" style="border:2px solid #000">
      Saved {{ saved.length * 2 }}</div>
    <div :class="['col-' + 12 - (saved.length * 2)]" style="border:2px solid #0f0">
      Empties {{ 12 - (saved.length * 2) }}</div>
  </div>
  -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MapViewer from 'components/MapViewer.vue';
// import * as VueGridLayout from 'vue-grid-layout';
// import { dom } from 'quasar';

// const { height } = dom;
// const { GridLayout, GridItem } = VueGridLayout;

export default {
  data() {
    return {
      fullHeight: 1000,
      type: 'MapViewer',
      data: '',
    };
  },
  computed: {
    ...mapGetters('data', [
      'viewerLayout',
      'mainViewerId',
    ]),
    savedColClass() {
      let cols = 0;
      const test = 1;
      if (test > 0) {
        cols = (Math.floor(12 / test) + 1) * 2;
      }
      return {
        saved: `col-${cols}`,
        empties: `col-${12 - cols}`,
      };
    },
  },
  methods: {
    layoutUpdated(newLayout) {
      console.log(`Layout updated: ${JSON.stringify(newLayout)}`);
    },
  },
  watch: {
    mainViewerId() {
      console.log('He cambiado');
    },
  },
  components: {
    MapViewer,
    // GridLayout,
    // GridItem,
  },
  mounted() {
    // const mainElement = this.viewerLayout.filter(viewer =>
    // viewer.index === this.mainViewerId)[0];
    // mainElement.h = height(this.$refs['viewer-container']);
  },
};
</script>

<style>
</style>
