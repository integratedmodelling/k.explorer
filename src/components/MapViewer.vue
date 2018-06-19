<template>
  <div class="fit no-padding map-viewer">
    <div ref="map" id="map" class="fit"></div>
    <!-- <resize-observer @notify="handleResize"></resize-observer> -->
    <q-resize-observable @resize="handleResize" />
  </div>
</template>


<script>
/* eslint-disable object-shorthand */

import { mapGetters, mapActions } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { DEFAULT_OPTIONS } from 'shared/MapOptions';
import { Helpers } from 'shared/Helpers';
import Map from 'ol/map';
import View from 'ol/view';
import Group from 'ol/layer/group';
import Collection from 'ol/collection';
import proj from 'ol/proj';
import 'ol/ol.css';

// import 'vue-resize/dist/vue-resize.css';

export default {
  name: 'MapViewer',
  props: {
    content: {
      type: Object,
    },
  },
  data() {
    return {
      center: DEFAULT_OPTIONS.center,
      zoom: DEFAULT_OPTIONS.zoom,
      observations: this.content.observations,
      map: null,
      view: null,
      layers: new Collection(),
    };
  },
  computed: {
    /*
    position() {
      return [this.leaf.lng, this.leaf.lat];
    },
    zoom() {
      return this.leaf.zoom;
    },
    */
    ...mapGetters('data', [
      'hasContext',
      'session',
    ]),
    ...mapGetters('view', [
      'contextLayer',
    ]),
  },
  methods: {
    ...mapActions('view', ['pushLogAction']),
    handleResize() {
      // if (this.map !== null) {
      console.log('handleResize called!!!');
      this.map.updateSize();
      // }
    },
    onMoveEnd(event) {
      if (this.hasContext) {
        return;
      }
      const { map } = event;
      let message = null;
      try {
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(proj.transformExtent(map.getView()
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
    drawContextLayer(oldContextLayer = null) {
      if (this.contextLayer === null) {
        return;
      }
      if (oldContextLayer !== null) {
        this.map.removeLayer(oldContextLayer);
        this.layers = new Collection();
      }
      const polygon = this.contextLayer.getSource().getFeatures()[0].getGeometry();
      // this.map.addLayer(this.contextLayer);
      this.layers.push(this.contextLayer);
      this.view.fit(polygon, { padding: [30, 30, 30, 30], constrainResolution: false });
    },
    drawObservations(center = false) {
      if (this.observations && this.observations.length > 0) {
        let extent;
        this.observations.forEach((observation) => {
          const observationLayer = Helpers.getLayerShapeObject(observation);
          // this.group.layers = this.group.getLayers().push(observationLayer);
          // this.map.addLayer(observationLayer);
          // const shape = this.contextLayer.getSource().getFeatures()[0].getGeometry();
          this.layers.push(observationLayer);
          extent = extent || observationLayer.getSource().getExtent();
        });
        if (center) {
          // const transfExtent = ol.proj.transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
          this.view.fit(extent);
        }
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
    contextLayer() {
      this.drawContextLayer();
    },
    observations() {
      this.drawObservations();
    },
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
  mounted() {
    this.map = new Map({
      view: new View({
        center: this.center,
        zoom: this.zoom,
      }),
      layers: DEFAULT_OPTIONS.layers,
      target: 'map',
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });
    this.map.on('moveend', this.onMoveEnd);
    this.view = this.map.getView();
    this.map.addLayer(new Group({
      layers: this.layers,
    }));
    this.drawContextLayer();
    this.drawObservations(true);
  },
};
</script>

<style>


</style>
