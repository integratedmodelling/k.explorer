<template>
  <div class="fit no-padding map-viewer">
    <div :ref="'map'+idx" :id="'map'+idx" class="fit"></div>
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
// import * as extent from 'ol/extent';
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
      zIndexCounter: 0,
      // contextViewport: Constants.PARAM_VIEWPORT_SIZE,
    };
  },
  computed: {
    observations() {
      return this.$store.getters['data/observations'](this.idx);
    },
    ...mapGetters('data', [
      'hasContext',
      'session',
    ]),
    ...mapGetters('view', [
      'contextLayer',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'pushLogAction',
      'setSpinner',
    ]),
    handleResize() {
      if (this.map !== null) {
        console.log('handleResize called!!!');
        this.map.updateSize();
        this.$eventBus.$emit('map-size-changed');
      }
    },
    onMoveEnd() {
      if (this.hasContext) {
        return;
      }
      // const { map } = event;
      this.sendRegionOfInterest();
    },
    sendRegionOfInterest() {
      let message = null;
      try {
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(proj.transformExtent(this.map.getView()
          .calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326'), this.session);
      } catch (error) {
        this.pushLogAction({
          type: this.$constants.TYPE_ERROR,
          payload: {
            message: error.message,
            attach: error,
          },
        });
      }
      if (message && message.body) {
        this.sendStompMessage(message.body);
        this.pushLogAction({
          type: message.validated ? this.$constants.TYPE_INFO : this.$constants.TYPE_WARN,
          payload: {
            message: `Message ${message.validated ? '' : 'not '} validated`,
            attach: message,
          },
        });
      }
    },

    async findLayerById(observation) {
      if (this.layers && this.layers !== null) {
        const layerArray = this.layers.getArray();
        const found = layerArray.find(layer => layer.get('id') === observation.id);
        if (typeof found !== 'undefined') {
          return found;
        }
      }
      // need to create new layer
      console.log(`Creating layer: ${observation.label}`);
      const layer = await Helpers.getLayerObject(observation, { projection: this.proj /* , viewport: this.contextViewport */});
      this.zIndexCounter += 1;
      observation.zIndex = this.zIndexCounter + observation.zIndexOffset;
      layer.setZIndex(observation.zIndex);
      this.layers.push(layer);
      return layer;
    },

    drawContextLayer(newContextLayer, oldContextLayer = null) {
      if (oldContextLayer !== null) {
        // if context is changed, everything disappear
        this.layers.clear();
      }
      if (this.contextLayer === null) {
        this.sendRegionOfInterest();
        return;
      }
      const polygon = this.contextLayer.getSource().getFeatures()[0].getGeometry();
      // this.map.addLayer(this.contextLayer);
      this.layers.push(this.contextLayer);
      this.view.fit(polygon, { padding: [30, 30, 30, 30], constrainResolution: false });
      // calculate viewport
      /*
      const contextExtent = this.contextLayer.getSource().getExtent();
      const topLeft = this.map.getPixelFromCoordinate(extent.getTopLeft(contextExtent));
      const bottomLeft = this.map.getPixelFromCoordinate(extent.getBottomLeft(contextExtent));
      const topRight = this.map.getPixelFromCoordinate(extent.getTopRight(contextExtent));

      const width = topRight[0] - topLeft[0];
      const height = bottomLeft[1] - topLeft[1];
      this.contextViewport = Math.round(Math.max(width, height)) * Constants.PARAM_VIEWPORT_MULTIPLIER;
      */
    },

    drawObservations() {
      if (this.observations && this.observations.length > 0) {
        this.observations.forEach((observation) => {
          this.findLayerById(observation).then((layer) => {
            layer.setVisible(observation.visible);
            if (observation.top) {
              layer.setZIndex(observation.zIndexOffset + 100);
            } else {
              layer.setZIndex(observation.zIndex);
            }
          });
        });
      }
      // this.centerLayers();
    },
    /*
    centerLayers() {
      let totalExtent = null;
      this.layers.forEach((layer) => {
        if (layer.getVisible()) {
          const layerExtent = layer.getSource().getExtent();
          totalExtent = totalExtent !== null ? extent.extend(totalExtent, layerExtent) : layerExtent;
        }
      });
      if (totalExtent !== null) {
        this.view.fit(totalExtent);
      }
    },
    */
  },
  watch: {
    contextLayer(newContextLayer, oldContextLayer) {
      this.drawContextLayer(newContextLayer, oldContextLayer);
    },
    observations: {
      handler() {
        this.drawObservations(false);
        // TODO if true, it try to resize extent but not work. Check before delete it
      },
      deep: true,
    },
    center() {
      this.view.setCenter(this.center);
    },
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
    this.proj = this.view.getProjection();
    this.map.addLayer(new Group({
      layers: this.layers,
    }));
    this.drawContextLayer();
    this.drawObservations();
  },
};
</script>

<style>


</style>
