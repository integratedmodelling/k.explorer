<template>
  <div class="fit no-padding map-viewer">
    <div :ref="'map'+idx" :id="'map'+idx" class="fit"></div>
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
import Map from 'ol/Map';
import View from 'ol/View';
import Group from 'ol/layer/Group';
import Collection from 'ol/Collection';
import * as extent from 'ol/extent';
import * as proj from 'ol/proj';
import 'ol/ol.css';

export default {
  name: 'MapViewer',
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      center: DEFAULT_OPTIONS.center,
      zoom: DEFAULT_OPTIONS.zoom,
      map: null,
      view: null,
      layers: new Collection(),
    };
  },
  computed: {
    observations() {
      return this.$store.getters['data/observations'](this.idx);
    },
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
      if (this.map !== null) {
        console.log('handleResize called!!!');
        this.map.updateSize();
      }
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
            message: `Message ${message.validated ? '' : 'not '} validated`,
            other: message,
          },
        });
      }
    },

    findLayerById(id) {
      if (this.layers && this.layers !== null) {
        const layerArray = this.layers.getArray();
        const found = layerArray.find(layer => layer.get('id') === id);
        if (typeof found !== 'undefined') {
          return found;
        }
        return null;
      }
      return null;
    },

    drawContextLayer() {
      if (this.contextLayer === null) {
        return;
      }
      const polygon = this.contextLayer.getSource().getFeatures()[0].getGeometry();
      // this.map.addLayer(this.contextLayer);
      this.layers.push(this.contextLayer);
      this.view.fit(polygon, { padding: [30, 30, 30, 30], constrainResolution: false });
    },

    drawObservations(center = false) {
      if (this.observations && this.observations.length > 0) {
        let totalExtent = null;
        let centerCoord = null;
        this.observations.forEach((observation) => {
          let layer = this.findLayerById(observation.id);
          if (layer === null) {
            console.log(`Creating layer: ${observation.label}`);
            layer = Helpers.getLayerObject(observation, false);
            this.layers.push(layer);
          }
          layer.setVisible(observation.visible);
          if (observation.visible) {
            if (center) {
              const layerExtent = layer.getSource().getExtent();
              if (observation.shapeType === this.$constants.SHAPE_POINT) {
                centerCoord = [totalExtent[0], totalExtent[1]];
              } else {
                totalExtent = totalExtent !== null ? extent.extend(totalExtent, layerExtent) : layerExtent;
              }
            }
          }
        });
        if (center) {
          if (centerCoord !== null) {
            this.center = centerCoord;
          } else if (totalExtent !== null) {
            this.view.fit(totalExtent);
          }
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
    contextLayer(newContextLayer, oldContextLayer) {
      this.drawContextLayer(newContextLayer, oldContextLayer);
    },
    observations: {
      handler() {
        this.drawObservations(false);
      },
      deep: true,
    },
    center() {
      this.view.setCenter(this.center);
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
      target: `map${this.idx}`,
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
