<template>
  <div class="fit no-padding klab-viewer">
    <vl-map
      ref="map"
      :load-tiles-while-animating="true"
      :load-tiles-while-interacting="true"
      data-projection="EPSG:4326"
      @created="onMapCreated"
      v-on="hasContext ? { moveend: onMoveEnd } : {}"
    >
      <vl-view :zoom="zoom"
               :center="position"
               center.sync="center"
               :rotation.sync="rotation"
      ></vl-view>
      <vl-geoloc> <!-- @update:position="geolocPosition = $event"> -->
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
import ol from 'openlayers';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
// import 'vue-resize/dist/vue-resize.css';

Vue.use(VueLayers);

export default {
  name: 'MapViewer',
  props: ['observation'],
  data() {
    return {
      center: [0, 0],
      rotation: 0,
      // geolocPosition: undefined,
      map: null,
      leaf: this.observation,
    };
  },
  computed: {
    position() {
      /*
      return this.leafSelected ?
        [this.leafSelected.lng, this.leafSelected.lat] :
        this.geolocPosition;
      */
      return [this.leaf.lng, this.leaf.lat];
    },
    zoom() {
      return this.leaf.zoom;
    },
    ...mapGetters('data', [
      'hasContext',
      'session',
    ]),
  },
  methods: {
    ...mapActions('view', ['pushLogAction']),
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
      let message = null;
      try {
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(ol.proj.transformExtent(map.getView()
          .calculateExtent(map.getSize()), 'EPSG:3857', 'EPSG:4326'), this.session);
      } catch (error) {
        this.pushLogAction({
          type: this.$constants.TYPE_ERROR,
          payload: error,
        });
      }
      if (message && message.body) {
        this.sendStompMessage(message.body);
        this.pushLogAction({
          type: message.validated ? this.$constants.TYPE_INFO : this.$constants.TYPE_WARN,
          payload: {
            message: `Message ${message.validated ? '' : 'not'} validated`,
            other: message,
          },
        });
      }
    },
  },
  /*
  sockets: {
    onmessage: () => {
      console.log('Received frame in mapviewer.vue');
      // (`On message: ${JSON.stringify(frame, null, 4)}`);
    },
  },
  */
  watch: {
    /*
    geolocPosition() {
      this.center = this.geolocPosition;
      console.log(`Encontrada posicion: ${this.geolocPosition}`);
    },
    */
    /*
    position() {
      this.center = this.position;
    },
    */
  },
  beforeDestroy() {
    console.log('ME DESTRUYEN');
  },
  mounted() {
    console.log(`Observation: ${this.leaf.lat},${this.leaf.lng},z ${this.leaf.zoom} - ${this.leaf.label}`);
  },
};
</script>

<style>


</style>
