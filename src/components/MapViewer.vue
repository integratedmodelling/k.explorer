<template>
  <div class="fit no-padding klab-viewer">
    <vl-map ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
            data-projection="EPSG:4326" @created="onMapCreated" @moveend="onMoveEnd($event)">
      <vl-view :zoom.sync="zoom"
               :center.sync="center" :rotation.sync="rotation"></vl-view>
      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="position" id="position-feature">
            <vl-geom-point :coordinates="position"></vl-geom-point>
            <vl-style-box>
              <vl-style-icon src="statics/maps/marker.png" :scale="0.4" :anchor="[0.5, 1]">
              </vl-style-icon>
            </vl-style-box>
          </vl-feature>
        </template>
      </vl-geoloc>
      <vl-layer-tile id="osm">
        <vl-source-sputnik></vl-source-sputnik>
      </vl-layer-tile>
    </vl-map>
    <!-- <resize-observer @notify="handleResize"></resize-observer> -->
    <q-resize-observable @resize="handleResize" />
  </div>
</template>

<script>
/* eslint-disable object-shorthand */

import Vue from 'vue';
import { mapGetters } from 'vuex';
import ol from 'openlayers';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import { MESSAGE_TYPES } from 'helpers/messagesConstants.js';
// import 'vue-resize/dist/vue-resize.css';

Vue.use(VueLayers);

export default {
  name: 'MapViewer',
  data() {
    return {
      zoom: 7,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      map: null,
    };
  },
  computed: {
    position() {
      return this.treeSelected ?
        [this.treeSelected.lng, this.treeSelected.lat] :
        this.geolocPosition;
    },
    ...mapGetters('data', [
      'treeSelected',
      'session',
    ]),
  },
  methods: {
    onMapCreated() {
      console.log(`Created map!: ${this.map}`);
      this.map = this.$refs.map.$map;
    },
    handleResize() {
      console.log('handleResize called!!!');
      this.map.updateSize();
    },
    onMoveEnd(event) {
      const { map } = event;
      const message = MESSAGE_TYPES.REGION_OF_INTEREST(ol.proj.transformExtent(map.getView()
        .calculateExtent(map.getSize()), 'EPSG:3857', 'EPSG:4326'), this.session);
      this.sendStompMessage(message);
    },
  },
  watch: {
    geolocPosition() {
      this.center = this.geolocPosition;
      console.log(`Encontrada posicion: ${this.geolocPosition}`);
    },
    position() {
      this.center = this.position;
    },
  },
};
</script>

<style scoped>

</style>
