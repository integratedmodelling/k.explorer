<template>
  <div class="fit no-padding map-viewer">
    <div :ref="`map${idx}`" :id="`map${idx}`" class="fit"></div>
    <q-icon name="mdi-crosshairs" class="map-selection-marker" :id="`msm-${idx}`" />
    <q-resize-observable @resize="handleResize" />
    <map-drawer v-if="isDrawMode" :map="map" @drawend="sendSpatialLocation"></map-drawer>
    <q-modal
      v-model="geolocationWaiting"
      no-esc-dismiss
      no-backdrop-dismiss
      :content-classes="['gl-msg-content']"
    >
      <div class="bg-opaque-white">
        <div class="q-pa-xs">
          <h5>{{ $t('messages.geolocationWaitingTitle') }}</h5>
          <p v-html="$t('messages.geolocationWaitingText')"></p>
          <p v-show="geolocationIncidence !== null" class="gl-incidence">{{ geolocationIncidence }}</p>
          <div class="gl-btn-container">
          <q-btn
            v-show="geolocationIncidence !== null"
            :label="$t('label.appRetry')"
            @click="retryGeolocation"
            color="primary"
          ></q-btn>
          <q-btn
            :label="$t('label.appCancel')"
            @click="stopGeolocation(true)"
            color="mc-main"
          ></q-btn>
          </div>
        </div>
      </div>
    </q-modal>
  </div>
</template>


<script>
/* eslint-disable object-shorthand,space-before-function-paren,no-unused-vars */

import { mapGetters, mapActions, mapState } from 'vuex';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { DEFAULT_OPTIONS, MAP_CONSTANTS, BASE_LAYERS } from 'shared/MapConstants';
import { Helpers, Constants } from 'shared/Helpers';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { Cookies } from 'quasar';
import Map from 'ol/Map';
import View from 'ol/View';
import Collection from 'ol/Collection';
import Group from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import Overlay from 'ol/Overlay';
import { transform, transformExtent } from 'ol/proj';
import LayerSwitcher from 'ol-layerswitcher';
import MapDrawer from 'components/MapDrawer';
import WKT from 'ol/format/WKT';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

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
      center: this.$mapDefaults.center,
      zoom: this.$mapDefaults.zoom,
      map: null,
      view: null,
      layers: new Collection(),
      zIndexCounter: 0,
      baseLayers: null,
      visibleBaseLayer: null,
      mapSelectionMarker: undefined,
      wktInstance: new WKT(),
      geolocationWaiting: true,
      geolocationId: null,
      geolocationIncidence: null,
    };
  },
  computed: {
    observations() {
      return this.$store.getters['data/observationsOfViewer'](this.idx);
    },
    ...mapGetters('data', [
      'hasContext',
      'session',
    ]),
    ...mapGetters('view', [
      'contextGeometry',
      'observationInfo',
      'exploreMode',
      'mapSelection',
      'isDrawMode',
    ]),
    ...mapState('view', [
      'saveLocation',
    ]),
    hasCustomContextFeatures() {
      return this.drawerLayer && this.drawerLayer.getSource().getFeatures().length > 0;
    },
  },
  methods: {
    ...mapActions('view', [
      'addToKexplorerLog',
      'setSpinner',
      'setMapSelection',
      'setDrawMode',
    ]),
    handleResize() {
      if (this.map !== null) {
        console.debug('HandleResize called!!!');
        this.map.updateSize();
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED);
      }
    },
    onMoveEnd() {
      if (this.hasContext || this.isDrawMode) {
        return;
      }
      // const { map } = event;
      this.sendRegionOfInterest();
    },
    sendRegionOfInterest(geometry = null) {
      if (this.geolocationWaiting) {
        return;
      }
      let message = null;
      const view = this.map.getView();
      try {
        const extent = view.calculateExtent(this.map.getSize());
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(transformExtent(extent, 'EPSG:3857', 'EPSG:4326'), this.session);
      } catch (error) {
        console.error(error);
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
        if (this.saveLocation) {
          Cookies.set(Constants.COOKIE_MAPDEFAULT, { center: view.getCenter(), zoom: view.getZoom() }, {
            expires: 30,
            path: '/',
          });
        }
      }
    },

    findExistingLayerById(observation) {
      if (this.layers && this.layers !== null) {
        const layerArray = this.layers.getArray();
        return layerArray.find(layer => layer.get('id') === observation.id);
      }
      return null;
    },

    async findLayerById(observation) {
      const found = this.findExistingLayerById(observation);
      if (typeof found !== 'undefined' && found !== null) {
        return found;
      }
      // need to create new layer
      try {
        console.debug(`Creating layer: ${observation.label}`);
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
        console.debug('No context, send region of interest');
        this.sendRegionOfInterest();
        return;
      }
      this.baseLayers.setMask(this.contextGeometry);
      this.view.fit(this.contextGeometry, { padding: [10, 10, 10, 10], constrainResolution: false });
    },

    drawObservations() {
      if (this.observations && this.observations.length > 0) {
        this.observations.forEach((observation) => {
          this.findLayerById(observation).then((layer) => {
            if (layer !== null) {
              layer.setVisible(observation.visible);
              layer.setOpacity(observation.layerOpacity);
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
    sendSpatialLocation(features) {
      if (features) {
        const wktShape = this.wktInstance.writeFeaturesText(features, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
        this.sendStompMessage(MESSAGES_BUILDERS.SPATIAL_LOCATION({ wktShape }, this.session).body);
        /*
        this.$q.notify({
          message: this.$t('messages.spatialLocationSent'),
          type: 'info',
          timeout: 500,
        });
        */
      }
    },
    doGeolocation() {
      if (this.geolocationId !== null) {
        navigator.geolocation.clearWatch(this.geolocationId);
      }
      this.geolocationId = navigator.geolocation.watchPosition((position) => {
        this.center = transform([position.coords.longitude, position.coords.latitude], MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857);
        this.stopGeolocation();
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.geolocationIncidence = this.$t('messages.geolocationErrorPermissionDenied');
            break;
          case error.POSITION_UNAVAILABLE:
            this.geolocationIncidence = this.$t('messages.geolocationErrorPermissionDenied');
            break;
          case error.TIMEOUT:
            this.geolocationIncidence = this.$t('messages.geolocationErrorPermissionDenied');
            break;
          default:
            this.geolocationIncidence = this.$t('messages.geolocationErrorPermissionDenied');
            break;
        }
      }, {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 60000,
      });
    },
    retryGeolocation() {
      this.geolocationIncidence = null;
      this.doGeolocation();
    },
    stopGeolocation(force = false) {
      navigator.geolocation.clearWatch(this.geolocationId);
      this.$nextTick(() => {
        this.geolocationWaiting = false;
        if (force) {
          this.sendRegionOfInterest();
        }
      });
    },
  },
  watch: {
    contextGeometry(newContextGeometry, oldContextGeometry) {
      this.drawContext(newContextGeometry, oldContextGeometry);
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
    mapSelection(newValue) {
      if (typeof newValue !== 'undefined' && newValue !== null && newValue.pixelSelected !== null) {
        this.mapSelectionMarker.setPosition(newValue.pixelSelected);
      } else {
        this.mapSelectionMarker.setPosition(undefined);
      }
    },
    hasContext(newValue) {
      if (newValue) {
        this.setDrawMode(false);
      }
    },
  },
  created() {
    this.geolocationWaiting = 'geolocation' in navigator && !Cookies.has(Constants.COOKIE_MAPDEFAULT);
  },
  mounted() {
    // Set base layer
    // this.center = this.$mapDefaults.center;
    // this.zoom = this.$mapDefaults.zoom;

    this.baseLayers = BASE_LAYERS;
    this.baseLayers.layers.forEach((l) => {
      if (l.get('name') === this.$baseLayer) {
        l.setVisible(true);
        this.visibleBaseLayer = l;
      }
      const layer = l;
      layer.on('propertychange', (event) => {
        this.visibleBaseLayer = layer;
        if (event.type === 'propertychange' && event.key === 'visible' && event.target.get(event.key)) {
          Cookies.set(Constants.COOKIE_BASELAYER, layer.get('name'), {
            expires: 30,
            path: '/',
          });
        }
      });
    });
    // Set main map
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
    // Main map listeners...
    this.map.on('moveend', this.onMoveEnd);
    this.map.on('pointermove', (event) => {
      if (this.exploreMode && !event.dragging && this.contextGeometry.intersectsCoordinate(event.coordinate)) {
        this.map.getTargetElement().style.cursor = 'crosshair';
      } else {
        this.map.getTargetElement().style.cursor = '';
      }
    });
    this.map.on('click', (event) => {
      if (this.exploreMode && this.contextGeometry.intersectsCoordinate(event.coordinate)) {
        const layerSelected = this.findExistingLayerById(this.observationInfo);
        const clonedLayer = new ImageLayer({
          id: `cl_${this.observationInfo.id}`,
          source: layerSelected.getSource(),
        });
        this.setMapSelection({
          pixelSelected: event.coordinate,
          // transform(event.coordinate, 'EPSG:3857', 'EPSG:4326');
          layerSelected: clonedLayer,
        });
      }
    });
    // ...and set some attribute for rapid access
    this.view = this.map.getView();
    this.proj = this.view.getProjection();
    // Add components to main map
    this.map.addLayer(new Group({ layers: this.layers }));
    const layerSwitcher = new LayerSwitcher();
    this.map.addControl(layerSwitcher);
    this.mapSelectionMarker = new Overlay({
      element: document.getElementById(`msm-${this.idx}`),
      positioning: 'center-center',
    });
    this.map.addOverlay(this.mapSelectionMarker);
    this.drawContext();
    this.drawObservations();
    if (this.geolocationWaiting) {
      this.doGeolocation();
    }
  },
  components: {
    MapDrawer,
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .layer-switcher
    top 5em
    button
      background-image url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnIGlkPSJzdmcyIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIxOS45OTYiIHdpZHRoPSIyMCIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHZpZXdCb3g9IjAgMCAxOS45OTk5OTggMTkuOTk2MDk0Ij4KIDxtZXRhZGF0YSBpZD0ibWV0YWRhdGE3Ij4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNzIuODYgLTQzMy43OSkiPgogIDxnIGlkPSJnNDE0OCIgdHJhbnNmb3JtPSJtYXRyaXgoLjA1MjA3MCAwIDAgLjA1MjA3MCAzNjkuNTMgNDMwLjQ2KSIgZmlsbD0iI2ZmZiI+CiAgIDxwYXRoIGlkPSJwYXRoNDEzOCIgZD0ibTQzNC44IDEzNy42LTE0OS40LTY4LjFjLTE2LjItNy40LTQyLjctNy40LTU4LjkgMGwtMTQ5LjMgNjguMWMtMTcuNiA4LTE3LjYgMjEuMSAwIDI5LjFsMTQ4IDY3LjVjMTYuOSA3LjcgNDQuNyA3LjcgNjEuNiAwbDE0OC02Ny41YzE3LjYtOCAxNy42LTIxLjEgMC0yOS4xem0tMjA5LjYgMjM3LjYtOTkuOC00NS41Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC0zNC45IDE1LjljLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy42LTggMTcuNi0yMS4xIDAtMjkuMWwtMzQuOS0xNS45Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC05OS44IDQ1LjVjLTE2LjkgNy43LTQ0LjcgNy43LTYxLjYgMHoiLz4KICAgPHBhdGggaWQ9InBhdGg0MTQwIiBkPSJtNDM0LjggMjQxLjYtMzEuNy0xNC40Yy00LjItMS45LTktMS45LTEzLjIgMGwtMTA4IDQ4LjljLTE1LjMgNS4yLTM2LjYgNS4yLTUxLjkgMGwtMTA4LTQ4LjljLTQuMi0xLjktOS0xLjktMTMuMiAwbC0zMS43IDE0LjRjLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy43LTggMTcuNy0yMS4xIDAuMS0yOS4xeiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==')
    .panel
      padding 0 1em 0 0
      margin 0
      border 1px solid #999
      border-radius 4px
      background-color rgba(119,119,119,0.5)
      color white
  .map-selection-marker
    font-size 28px
    color white
    mix-blend-mode exclusion
  .gl-msg-content
    border-radius 20px
    padding 20px
    background-color rgba(255, 255, 255, .7)
    .gl-btn-container
      text-align right
      padding .2em
      .q-btn
        margin-left .5em
    h5
      margin 0.2em 0 0.5em 0
      font-weight bold
    em
      color $main-control-main-color
      font-style normal
      font-weight bold

</style>
