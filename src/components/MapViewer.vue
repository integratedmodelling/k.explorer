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
import { DEFAULT_OPTIONS, MAP_CONSTANTS, BASE_LAYERS } from 'shared/MapConstants';
import { Helpers, Constants } from 'shared/Helpers';
import { Cookies } from 'quasar';
import Map from 'ol/Map';
import View from 'ol/View';
import Collection from 'ol/Collection';
import Group from 'ol/layer/Group';
import { transformExtent } from 'ol/proj';
import LayerSwitcher from 'ol-layerswitcher';
import 'ol-layerswitcher/src/ol-layerswitcher.css';
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
      baseLayers: null,
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
      'contextGeometry',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'addToKexplorerLog',
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
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(transformExtent(this.map.getView()
          .calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326'), this.session);
      } catch (error) {
        this.addToKexplorerLog({
          type: this.$constants.TYPE_ERROR,
          payload: {
            message: error.message,
            attach: error,
          },
        });
      }
      if (message && message.body) {
        this.sendStompMessage(message.body);
        this.addToKexplorerLog({
          type: message.validated ? this.$constants.TYPE_INFO : this.$constants.TYPE_WARNING,
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
      try {
        console.log(`Creating layer: ${observation.label}`);
        const layer = await Helpers.getLayerObject(observation, { projection: this.proj /* , viewport: this.contextViewport */});
        this.zIndexCounter += 1;
        observation.zIndex = this.zIndexCounter + observation.zIndexOffset;
        layer.setZIndex(observation.zIndex);
        this.layers.push(layer);
        return layer;
      } catch (error) {
        console.error(error.message);
        this.$q.notify({
          message: error.message,
          type: 'negative',
          timeout: 3000,
        });
        return null;
      }
    },

    drawContext(newContext, oldContext = null) {
      if (oldContext !== null) {
        // if context is changed, everything disappear
        this.layers.clear();
        this.baseLayers.removeMask();
      }
      if (this.contextGeometry === null) {
        console.log('No context, send region of interest');
        this.sendRegionOfInterest();
        return;
      }
      this.baseLayers.setMask(this.contextGeometry);
      this.view.fit(this.contextGeometry, { padding: [30, 30, 30, 30], constrainResolution: false });
    },

    drawObservations() {
      if (this.observations && this.observations.length > 0) {
        this.observations.forEach((observation) => {
          this.findLayerById(observation).then((layer) => {
            if (layer !== null) {
              layer.setVisible(observation.visible);
              if (observation.top) {
                layer.setZIndex(observation.zIndexOffset + (MAP_CONSTANTS.ZINDEX_OFFSET - 1));
              } else {
                layer.setZIndex(observation.zIndex);
              }
            }
          });
        });
      }
    },
  },
  watch: {
    contextGeometry(newContextGeometry, oldContextGeometry) {
      this.drawContext(newContextGeometry, oldContextGeometry);
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
    this.baseLayers = BASE_LAYERS;
    this.baseLayers.layers.forEach((l) => {
      if (l.get('name') === this.$baseLayer) {
        l.setVisible(true);
      }
      const layer = l;
      layer.on('propertychange', (event) => {
        if (event.type === 'propertychange' && event.key === 'visible' && event.target.get(event.key)) {
          Cookies.set(Constants.COOKIE_BASELAYER, layer.get('name'), {
            expires: 30,
            path: '/',
          });
        }
      });
    });
    this.map = new Map({
      view: new View({
        center: this.center,
        zoom: this.zoom,
      }),
      layers: this.baseLayers.layers,
      target: `map${this.idx}`,
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });
    this.map.on('moveend', this.onMoveEnd);
    this.view = this.map.getView();
    this.proj = this.view.getProjection();
    this.map.addLayer(new Group({ layers: this.layers }));
    const layerSwitcher = new LayerSwitcher();
    this.map.addControl(layerSwitcher);
    this.drawContext();
    this.drawObservations();
  },
};
</script>

<style>
  .layer-switcher {
    top:5em;
  }
  .layer-switcher button {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnIGlkPSJzdmcyIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIxOS45OTYiIHdpZHRoPSIyMCIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHZpZXdCb3g9IjAgMCAxOS45OTk5OTggMTkuOTk2MDk0Ij4KIDxtZXRhZGF0YSBpZD0ibWV0YWRhdGE3Ij4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNzIuODYgLTQzMy43OSkiPgogIDxnIGlkPSJnNDE0OCIgdHJhbnNmb3JtPSJtYXRyaXgoLjA1MjA3MCAwIDAgLjA1MjA3MCAzNjkuNTMgNDMwLjQ2KSIgZmlsbD0iI2ZmZiI+CiAgIDxwYXRoIGlkPSJwYXRoNDEzOCIgZD0ibTQzNC44IDEzNy42LTE0OS40LTY4LjFjLTE2LjItNy40LTQyLjctNy40LTU4LjkgMGwtMTQ5LjMgNjguMWMtMTcuNiA4LTE3LjYgMjEuMSAwIDI5LjFsMTQ4IDY3LjVjMTYuOSA3LjcgNDQuNyA3LjcgNjEuNiAwbDE0OC02Ny41YzE3LjYtOCAxNy42LTIxLjEgMC0yOS4xem0tMjA5LjYgMjM3LjYtOTkuOC00NS41Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC0zNC45IDE1LjljLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy42LTggMTcuNi0yMS4xIDAtMjkuMWwtMzQuOS0xNS45Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC05OS44IDQ1LjVjLTE2LjkgNy43LTQ0LjcgNy43LTYxLjYgMHoiLz4KICAgPHBhdGggaWQ9InBhdGg0MTQwIiBkPSJtNDM0LjggMjQxLjYtMzEuNy0xNC40Yy00LjItMS45LTktMS45LTEzLjIgMGwtMTA4IDQ4LjljLTE1LjMgNS4yLTM2LjYgNS4yLTUxLjkgMGwtMTA4LTQ4LjljLTQuMi0xLjktOS0xLjktMTMuMiAwbC0zMS43IDE0LjRjLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy43LTggMTcuNy0yMS4xIDAuMS0yOS4xeiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==');
  }

  .layer-switcher .panel {
    padding: 0 1em 0 0;
    margin: 0;
    border: 1px solid #999;
    border-radius: 4px;
    background-color: rgba(119,119,119,0.5);
    color: white;
  }
</style>
