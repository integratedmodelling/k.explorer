<template>
  <div class="fit no-padding map-viewer" v-upload-files="uploadConfig">
    <div :ref="`map${idx}`" :id="`map${idx}`" class="fit" :class="{ 'mv-exploring' : exploreMode || topLayer !== null}"></div>
    <q-icon :name="mapSelection.locked ? 'mdi-image-filter-center-focus' : 'mdi-crop-free'" class="map-selection-marker" :id="`msm-${idx}`" />
    <q-resize-observable @resize="handleResize" />
    <map-drawer v-if="isDrawMode" :map="map" @drawend="sendSpatialLocation"></map-drawer>
    <q-modal
      v-model="waitingGeolocation"
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
    <q-modal
      v-model="progressBarVisible"
      :no-route-dismiss="true"
      :no-esc-dismiss="true"
      :no-backdrop-dismiss="true"
    >
      <q-progress
        :percentage="uploadProgress"
        color="mc-main"
        :stripe="true"
        :animate="true"
        height="1em"
      ></q-progress>
    </q-modal>
    <div id="mv-popup" ref="mv-popup" class="ol-popup">
      <q-btn
        icon="mdi-close"
        class="ol-popup-closer"
        @click="closePopup"
        color="grey-8"
        size="xs"
        flat
        round
      ></q-btn>
      <div id="mv-popup-content" class="ol-popup-content" v-html="popupContent"></div>
    </div>
    <observation-context-menu @hide="contextMenuObservationId = null" :observation-id="contextMenuObservationId"></observation-context-menu>
    <div id="mv-extent-map" class="mv-extent-map" :class="{ 'mv-extent-map-hide': !hasExtentMap }"></div>
    <q-btn
      class="mv-remove-proposed-context"
      :style="proposedContextCenter !== null ? proposedContextCenter : {}"
      icon="mdi-close"
      size="lg"
      round
      v-if="!hasContext && proposedContext !== null"
      @click.native="sendSpatialLocation(null)"
    >
      <!--
      <q-tooltip
        :offset="[0, 8]"
        self="bottom middle"
        anchor="top middle"
        :delay="1000"
      >{{ $t('label.removeProposedContext') }}</q-tooltip>
      -->
    </q-btn>
  </div>
</template>


<script>
/* eslint-disable no-underscore-dangle,object-shorthand,space-before-function-paren,no-unused-vars */

import { mapGetters, mapActions, mapState } from 'vuex';
import { MAP_CONSTANTS, BASE_LAYERS, MAP_STYLES, Layers } from 'shared/MapConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders.js';
import { getLayerObject, isRasterObservation } from 'shared/Helpers';
import { createMarker } from 'shared/Utils';
import { CONSTANTS, CUSTOM_EVENTS, VIEWERS, MESSAGE_TYPES, WEB_CONSTANTS, SPINNER_CONSTANTS } from 'shared/Constants';
import UploadFiles from 'shared/UploadFilesDirective';
import { Cookies } from 'quasar';
import { transform, transformExtent } from 'ol/proj';
import MapDrawer from 'components/MapDrawer';
import ObservationContextMenu from 'components/ObservationContextMenu';
import Map from 'ol/Map';
import View from 'ol/View';
import Collection from 'ol/Collection';
import Group from 'ol/layer/Group';
import ImageLayer from 'ol/layer/Image';
import Overlay from 'ol/Overlay';
import LayerSwitcher from 'ol-layerswitcher';
import WKT from 'ol/format/WKT';
import Feature from 'ol/Feature';
import SourceVector from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import { getArea, getCenter, intersects, containsCoordinate } from 'ol/extent';
import 'ol-layerswitcher/src/ol-layerswitcher.css';

export default {
  name: 'MapViewer',
  components: {
    MapDrawer,
    ObservationContextMenu,
  },
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  directives: {
    UploadFiles,
  },
  data() {
    return {
      center: this.$mapDefaults.center,
      zoom: this.$mapDefaults.zoom,
      map: null,
      extentMap: null,
      hasExtentMap: false,
      view: null,
      movedWithContext: false,
      noNewRegion: false,
      layers: new Collection(),
      zIndexCounter: 0,
      baseLayers: null,
      layerSwitcher: null,
      visibleBaseLayer: null,
      mapSelectionMarker: undefined,
      wktInstance: new WKT(),
      geolocationId: null,
      geolocationIncidence: null,
      popupContent: '',
      popupOverlay: undefined,
      contextLayer: null,
      proposedContextLayer: null,
      proposedContextCenter: null,
      uploadConfig: {
        refId: null,
        onUploadProgress: (uploadProgress) => {
          this.uploadProgress = uploadProgress;
        },
        onUploadEnd: (fileName) => {
          this.$q.notify({
            message: this.$t('messages.uploadComplete', { fileName }),
            type: 'info',
            icon: 'mdi-information',
            timeout: 1000,
          });
          this.uploadProgress = null;
        },
        onUploadError: (error, fileName) => {
          this.$q.notify({
            message: `${this.$t('errors.uploadError', { fileName })}\n${error.response.data.message}`,
            type: 'negative',
            icon: 'mdi-alert-circle',
            timeout: 1000,
          });
          this.uploadProgress = null;
        },
      },
      uploadProgress: null,
      storedZoom: null,
      clicksOnMap: 0,
      bufferingLayers: false,
      lastModificationLoaded: null,
      previousTopLayer: null,
      lockedObservations: [],
      contextMenuObservationId: null,
    };
  },
  computed: {
    observations() {
      return this.$store.getters['data/observationsOfViewer'](this.idx);
    },
    lockedObservationsIds() {
      return this.lockedObservations.map(lo => lo.id);
    },
    ...mapGetters('data', [
      'proposedContext',
      'hasContext',
      'contextId',
      'contextLabel',
      'session',
      'timestamp',
      'scaleReference',
      'timeEvents',
      'timeEventsOfObservation',
    ]),
    ...mapGetters('view', [
      'contextGeometry',
      'observationInfo',
      'exploreMode',
      'mapSelection',
      'isDrawMode',
      'topLayer',
      'mainViewer',
    ]),
    ...mapState('view', [
      'saveLocation',
    ]),
    hasCustomContextFeatures() {
      return this.drawerLayer && this.drawerLayer.getSource().getFeatures().length > 0;
    },
    progressBarVisible() {
      return this.uploadProgress !== null;
    },
    waitingGeolocation: {
      get() {
        return this.$store.state.view.waitingGeolocation;
      },
      set(waitingGeolocation) {
        this.$store.state.view.waitingGeolocation = waitingGeolocation;
      },
    },
  },
  methods: {
    ...mapActions('data', [
      'setCrossingIDL',
      'putObservationOnTop',
    ]),
    ...mapActions('view', [
      'addToKexplorerLog',
      'setSpinner',
      'setMapSelection',
      'setDrawMode',
      'setTopLayer',
      'setShowSettings',
    ]),
    handleResize() {
      if (this.map !== null) {
        // console.debug('HandleResize called!!!');
        this.map.updateSize();
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED);
      }
    },
    onMoveEnd() {
      if (this.hasContext) {
        this.movedWithContext = true;
        return;
      }
      if (this.isDrawMode || this.noNewRegion) {
        this.noNewRegion = false;
        return;
      }
      // const { map } = event;
      this.sendRegionOfInterest();
    },
    sendRegionOfInterest(geometry = null) {
      if (this.waitingGeolocation) {
        return;
      }
      let message = null;
      // try to "clean" center
      const center = transform(this.view.getCenter(), MAP_CONSTANTS.PROJ_EPSG_3857, MAP_CONSTANTS.PROJ_EPSG_4326);
      if (Math.abs(center[0]) > 180) {
        center[0] %= 180;
        this.view.animate({
          center: transform(center, MAP_CONSTANTS.PROJ_EPSG_4326, MAP_CONSTANTS.PROJ_EPSG_3857),
          duration: 500,
        });
      }
      try {
        const transformedExtent = transformExtent(this.map.getView().calculateExtent(this.map.getSize()), 'EPSG:3857', 'EPSG:4326');
        if (transformedExtent[0] < -180 // bottom left longitude
          || transformedExtent[1] < -90 // bottom left latitude
          || transformedExtent[2] > 180 // bottom right longitude
          || transformedExtent[3] > 90) { // bottom right latitude
          this.setCrossingIDL(true);
          return;
        }
        this.setCrossingIDL(false);
        message = MESSAGES_BUILDERS.REGION_OF_INTEREST(transformedExtent, this.session);
      } catch (error) {
        console.error(error);
        this.addToKexplorerLog({
          type: MESSAGE_TYPES.TYPE_ERROR,
          payload: {
            message: error.message,
            attach: error,
          },
        });
      }
      if (message && message.body) {
        this.sendStompMessage(message.body);
        if (this.saveLocation) {
          Cookies.set(WEB_CONSTANTS.COOKIE_MAPDEFAULT, { center: this.view.getCenter(), zoom: this.view.getZoom() }, {
            expires: 30,
            path: '/',
          });
        }
      }
    },

    findExistingLayerById(observationId) {
      if (this.layers && this.layers !== null) {
        const layerArray = this.layers.getArray();
        return layerArray.filter((layer) => {
          if (layer.get('id') === null) {
            return observationId === null;
          }
          return layer.get('id').startsWith(observationId);
        });
      }
      return [];
    },

    findModificationTimestamp(observationId, timestamp) {
      if (timestamp !== -1) {
        // find the fist step of this observation
        const modifications = observationId === null ? this.timeEvents : this.timeEventsOfObservation(observationId);
        if (modifications.length > 0) {
          return modifications.reduce((result, me) => {
            const diff = timestamp - me.timestamp;
            if (diff <= 0) {
              return result;
            }
            if (result === -1 || diff < timestamp - result) {
              return me.timestamp;
            }
            return result;
          }, this.scaleReference.start);
        }
        return -1;
      }
      return -1;
    },

    async findLayerById({ observation, timestamp = -1 }) {
      const founds = this.findExistingLayerById(observation.id);
      if (founds.length > 0) {
        const id = `${observation.id}T${timestamp}`;
        const layer = founds.find(l => l.get('id') === id);
        if (layer) {
          return { founds, layer };
        }
      }
      // need to create new layer
      try {
        console.log(`Creating layer: ${observation.label} with timestamp ${timestamp}`);
        const layer = await getLayerObject(observation, { projection: this.proj, timestamp /* , viewport: this.contextViewport */});
        if (founds && founds.length > 0) { // we have one observation with different timestamp, copy the zIndex
          layer.setZIndex(observation.zIndex);
        } else {
          this.zIndexCounter += 2;
          observation.zIndex = this.zIndexCounter + observation.zIndexOffset;
          layer.setZIndex(observation.zIndex);
        }
        this.layers.push(layer);
        founds.push(layer);
        return { founds, layer };
      } catch (error) {
        console.error(error.message);
        this.$q.notify({
          message: error.message,
          type: 'negative',
          icon: 'mdi-alert-circle',
          timeout: 3000,
        });
        return null;
      }
    },

    bufferLayerImages(buffer) {
      console.debug(`Ask preload from ${buffer.start} to ${buffer.stop}`);
      const modifications = this.timeEvents.filter(me => me.timestamp > buffer.start && me.timestamp <= buffer.stop);
      const mtll = modifications.length;
      if (mtll > 0) {
        const loadImage = (index) => {
          // if (modifications[index].timestamp <= buffer) {
          const observation = this.observations.find(obs => obs.id === modifications[index].id);
          if (observation) {
            this.findLayerById({ observation, timestamp: modifications[index].timestamp }).then(({ layer }) => {
              const image = layer.getSource().image_;
              if (image && image.state === 0) {
                image.load();
                layer.getSource().on('imageloadend', ({ image: loadedImage }) => {
                  if (++index < mtll) {
                    loadImage(index);
                  }
                });
              } else if (++index < mtll) {
                loadImage(index);
              }
            });
          }
          // }
        };
        loadImage(0);
      }
    },
    drawProposedContext() {
      this.hasExtentMap = false;
      if (this.proposedContextLayer !== null) {
        this.map.removeLayer(this.proposedContextLayer);
        this.extentMap.removeLayer(this.proposedContextLayer);
        this.proposedContextCenter = null;
      }
      if (this.proposedContext !== null && !this.hasContext) {
        if (!(this.proposedContext instanceof Point)) {
          // this.view.setCenter(this.proposedContext);
        // } else {
          this.proposedContextLayer = new VectorLayer({
            source: new SourceVector({
              features: [new Feature({
                geometry: this.proposedContext,
              })],
            }),
            style: MAP_STYLES.POLYGON_PROPOSED_CONTEXT,
          });
          this.map.addLayer(this.proposedContextLayer);
          // check where we are
          const getClosePosition = () => {
            const center = getCenter(this.proposedContext.getExtent());
            if (containsCoordinate(this.map.getView().calculateExtent(this.map.getSize()), center)) {
              const pixels = this.map.getPixelFromCoordinate(center);
              return { top: `${pixels[1]}px`, left: `${pixels[0]}px` };
            }
            return { bottom: '24px', left: '24px', opacity: 1 };
          };
          const mapExtent = this.map.getView().calculateExtent(this.map.getSize());
          if (!intersects(this.proposedContext.getExtent(), mapExtent)) {
            this.$nextTick(() => {
              this.noNewRegion = true;
              this.view.fit(this.proposedContext, {
                padding: [10, 10, 10, 10],
                constrainResolution: false,
                callback: () => {
                  this.proposedContextCenter = getClosePosition();
                },
              });
            });
          } else {
            this.proposedContextCenter = getClosePosition();
          }
          // than check how large we are
          if (getArea(this.proposedContext.getExtent()) * 100 / getArea(mapExtent) > 125) {
            // proposed context is more than 25% bigger than map, so show viewer
            this.hasExtentMap = true;
            this.$nextTick(() => {
              this.extentMap.addLayer(this.proposedContextLayer);
              this.extentMap.getView().fit(this.proposedContext, {
                padding: [10, 10, 10, 10],
                constrainResolution: false,
              });
            });
          }
        }
        // console.warn(pcExtent.containsExtent(mapExtent));
      }
    },
    drawContext(newContext, oldContext = null) {
      if (oldContext !== null) {
        // if context is changed, everything disappear
        this.layers.clear();
        this.lockedObservations = [];
        this.previousTopLayer = null;
        if (this.contextLayer !== null) {
          this.map.removeLayer(this.contextLayer);
          this.contextLayer = null;
        } else {
          this.baseLayers.removeMask();
        }
      }
      if (this.contextGeometry === null) {
        console.debug('No context, send region of interest');
        this.sendRegionOfInterest();
        return;
      }
      if (this.contextGeometry instanceof Array) {
        this.contextLayer = new VectorLayer({
          id: this.contextId,
          source: new SourceVector({
            features: [new Feature({
              geometry: new Point(this.contextGeometry),
              name: this.contextLabel,
              id: this.contextId,
            })],
          }),
          style: createMarker(MAP_STYLES.POINT_CONTEXT_SVG_PARAM, this.contextLabel),
        });
        this.map.addLayer(this.contextLayer);
        this.view.setCenter(this.contextGeometry);
      } else {
        this.baseLayers.setMask(this.contextGeometry);
        this.view.fit(this.contextGeometry, { padding: [10, 10, 10, 10], constrainResolution: false });
      }
    },

    async drawObservations() {
      if (this.observations && this.observations.length > 0) {
        // clean locked if someone now is hidden
        this.lockedObservations = this.lockedObservations.filter(o => o.visible);
        // search the observation on top and is a raster observation
        const topObservation = this.observations.find(o => o.top && isRasterObservation(o));
        if (topObservation) {
          if (!this.previousTopLayer || !this.previousTopLayer.visible) { // no previous
            this.previousTopLayer = topObservation;
          } else if (topObservation.id !== this.previousTopLayer.id) { // different id, we need to put in the stack
            // if (topObservation.parentId === this.previousTopLayer.parentId) {
            // different observation, same context. Remove the previousTopLayer from array
            //  const lockedIdx = this.lockedObservations.findIndex(ptl => ptl.id === this.previousTopLayer.id);
            //  if (lockedIdx !== -1) {
            //    this.lockedObservations.splice(-1, 1);
            //  }
            // } else {
            // different observation, different context. Add to array
            this.lockedObservations = this.lockedObservations.filter(o => o.id !== topObservation.id); // remove previous entry
            this.lockedObservations.push(this.previousTopLayer); // add on top
            // }
            this.previousTopLayer = topObservation;
          }
        }
        const waitForLayerLoading = typeof this.observations.find(o => o.visible && o.loading) !== 'undefined';
        this.observations.forEach((observation) => {
          if (!observation.isContainer) {
            const timestamp = this.findModificationTimestamp(observation.id, this.timestamp);
            this.findLayerById({ observation, timestamp }).then((layers) => {
              if (layers !== null) {
                const { founds, layer } = layers;
                layer.setOpacity(observation.layerOpacity);
                let { zIndex } = observation;
                if (observation.top) {
                  zIndex = observation.zIndexOffset + (MAP_CONSTANTS.ZINDEX_TOP);
                } else if (this.lockedObservationsIds.length > 0 && this.lockedObservationsIds.includes(observation.id)) {
                  zIndex = layer.get('zIndex') - 10; // - this.lockedObservationsIds.indexOf(observation.id);
                }
                if (!waitForLayerLoading) {
                  layer.setZIndex(zIndex);
                  if (
                    (observation.visible && observation.top)
                    && isRasterObservation(observation) // is RASTER...
                    && (this.topLayer === null || this.topLayer.id !== `${observation.id}T${timestamp}`)
                  ) {
                    this.setTopLayer({ id: `${observation.id}T${timestamp}`, desc: observation.label });
                  } else if ((!observation.visible || !observation.top)
                    && this.topLayer !== null && this.topLayer.id === `${observation.id}T${timestamp}`) {
                    this.setTopLayer(null);
                  }
                }
                if (founds.length > 0) {
                  if (!observation.visible) {
                    founds.forEach((f) => {
                      f.setVisible(false);
                    });
                  } else if (timestamp === -1 || observation.tsImages.indexOf(`T${timestamp}`) !== -1) {
                    const toHide = [];
                    founds.forEach((f, idx) => {
                      if (f.get('id') === `${observation.id}T${timestamp}`) {
                        f.setVisible(true);
                      } else if (f.getVisible()) {
                        toHide.push(idx);
                      }
                    });
                    if (toHide.length > 0) {
                      toHide.forEach((th) => {
                        this.$nextTick(() => { founds[th].setVisible(false); });
                      });
                    }
                  }
                } else {
                  console.debug(`No multiple layer for observation ${observation.id}, refreshing`);
                  layer.setVisible(observation.visible);
                }
              }
            });
          }
        });
        if (this.topLayer === null) {
          this.closePopup();
        }
      }
    },
    sendSpatialLocation(features) {
      if (features) {
        const wktShape = this.wktInstance.writeFeaturesText(features, { dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857' });
        this.sendStompMessage(MESSAGES_BUILDERS.SPATIAL_LOCATION({ wktShape }, this.session).body);
        this.setCrossingIDL(false);
        /*
        this.$q.notify({
          message: this.$t('messages.spatialLocationSent'),
          type: 'info',
          timeout: 500,
        });
        */
      } else {
        // TODO check better way
        this.sendStompMessage(MESSAGES_BUILDERS.SPATIAL_LOCATION({ wktShape: '' }, this.session).body);
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
        this.waitingGeolocation = false;
        if (force) {
          this.sendRegionOfInterest();
        }
      });
    },
    closePopup(force = false) {
      if (force || !this.mapSelection.locked) {
        this.setMapSelection(CONSTANTS.EMPTY_MAP_SELECTION);
        this.popupOverlay.setPosition(undefined);
      }
    },
    setMapInfoPoint({ event = null, locked = false, layer = null } = {}) {
      if ((this.exploreMode || this.topLayer !== null)) {
        // && (event === null || (!(this.contextGeometry instanceof Array) && this.contextGeometry.intersectsCoordinate(event.coordinate)))) {
        let coordinate;
        if (event !== null) {
          ({ coordinate } = event);
          if (locked) {
            event.preventDefault();
            event.stopPropagation();
          }
        } else {
          ({ locked } = this.mapSelection);
          coordinate = this.mapSelection.pixelSelected;
        }
        let topLayerId;
        if (layer === null) {
          if (this.exploreMode) {
            topLayerId = `${this.observationInfo.id}T${this.findModificationTimestamp(this.observationInfo.id, this.timestamp)}`;
          } else {
            topLayerId = this.topLayer.id;
          }
          [layer] = this.findExistingLayerById(topLayerId);
        } else {
          topLayerId = layer.get('id');
        }
        const clonedLayer = new ImageLayer({
          id: `cl_${topLayerId}`,
          source: layer.getSource(),
        });
        this.setMapSelection({
          pixelSelected: coordinate,
          timestamp: this.timestamp,
          layerSelected: clonedLayer,
          ...(!this.exploreMode && { observationId: this.getObservationIdFromLayerId(topLayerId) }),
          locked,
        });
      } else {
        this.$eventBus.$emit(CUSTOM_EVENTS.VIEWER_CLICK, event); // inform that we make a click
      }
    },
    needFitMapListener({ mainIdx = null, geometry = null, withPadding = true }) {
      if (geometry === null
        && this.mainViewer.name === VIEWERS.DATA_VIEWER.name
        && this.contextGeometry
        && this.contextGeometry !== null
      ) {
        geometry = this.contextGeometry;
      }
      if (geometry !== null) {
        // we must wait for the end of drawer animation
        if (mainIdx === null || this.idx !== mainIdx) {
          this.storedZoom = this.view.getZoom();
        }
        setTimeout(() => {
          if (geometry instanceof Array && geometry.length === 2) {
            this.view.setCenter(geometry);
          } else {
            this.view.fit(geometry, {
              padding: withPadding ? [10, 10, 10, 10] : [0, 0, 0, 0],
              constrainResolution: false,
              callback: () => { this.movedWithContext = false; },
            });
          }
        }, 200);
      } else if (this.storedZoom !== null) {
        this.view.setZoom(this.storedZoom);
        this.storedZoom = null;
      }
    },
    observationInfoClosedListener () {
      if (!this.mapSelection.locked) {
        this.closePopup();
      }
    },
    sendRegionOfInterestListener() {
      this.sendRegionOfInterest();
    },
    findTopLayerFromClick(event, noVector = true) {
      const selectedLayers = [];
      const maxZIndex = [];
      this.map.forEachLayerAtPixel(event.pixel, (layer) => {
        if (maxZIndex[layer.getType()] && maxZIndex[layer.getType()] > layer.get('zIndex')) {
          return;
        }
        maxZIndex[layer.getType()] = layer.get('zIndex');
        selectedLayers.push({
          layer,
          type: layer.getType(),
        });
      }, {
        layerFilter: (candidate) => {
          if (candidate.getType() === 'TILE') {
            return false;
          }
          if (noVector && candidate.getType() === 'VECTOR') {
            return false;
          }
          return true;
        },
      });
      return selectedLayers;
    },
    getObservationIdFromLayerId(layerId) {
      if (layerId && layerId !== '') {
        return layerId.substr(0, layerId.indexOf('T'));
      }
      return layerId;
    },
  },
  watch: {
    contextGeometry(newContextGeometry, oldContextGeometry) {
      this.drawContext(newContextGeometry, oldContextGeometry);
      if (newContextGeometry === null && !this.movedWithContext) {
        this.needFitMapListener({ geometry: oldContextGeometry, withPadding: false });
      }
      this.movedWithContext = false;
    },
    observations: {
      handler() {
        /*
        if (this.previousObservations !== null) {
          console.warn(`>>>${JSON.stringify(newValue)}\n>>>${JSON.stringify(this.previousObservations[0])}`);
        }

        let redraw = false;
        const prev = JSON.parse(this.previousObservations);
        if (newValue.length !== 0 && newValue.length === oldValue.length) {
          const check = function(objectA, objectB) {
            // Create arrays of property names
            const differences = [];
            const a = objectA;
            const b = objectB;
            const aProps = Object.getOwnPropertyNames(a);

            for (let i = 0; i < aProps.length; i++) {
              if (aProps[i] !== '__ob__') {
                const propName = aProps[i];

                // If values of same property are not equal,
                // objects are not equivalent
                if (a[propName]) {
                  if (typeof a[propName] === 'object') {
                    differences.push(...check(a[propName], b[propName]));
                  } else if (a[propName] !== b[propName]) {
                    differences.push(propName);
                  }
                }
              }
            }


            // If we made it this far, objects
            // are considered equivalent
            return differences;
          };
          const nvl = newValue.length;
          for (let i = 0; i < nvl; i++) {
            const diff = check(newValue[i], oldValue[i]);
            if (diff.length > 0) {
              console.warn('Observation changes: new/old');
              console.dir(diff);
              redraw = true;
            }
          }
        }
        if (redraw) {
          this.drawObservations();
        }
        */
        this.$nextTick(() => this.drawObservations());
      },
      deep: true,
    },
    timestamp(newValue) {
      const modificationTimestamp = this.findModificationTimestamp(null, newValue);
      if (modificationTimestamp !== this.lastModificationLoaded) {
        this.lastModificationLoaded = modificationTimestamp;
        this.drawObservations();
      }
    },
    center() {
      this.view.setCenter(this.center);
    },
    mapSelection(newValue) {
      if (typeof newValue !== 'undefined' && newValue !== null && newValue.pixelSelected !== null) {
        this.mapSelectionMarker.setPosition(newValue.pixelSelected);
        if (this.topLayer !== null) {
          const coordinates = transform(newValue.pixelSelected, 'EPSG:3857', 'EPSG:4326');
          this.popupContent = `<h3>${this.topLayer.desc}</h3>
          <div class="mv-popup-separator"></div>
          <p class="mv-popup-value">${newValue.value}</p>
          <div class="mv-popup-separator"></div>
          <p class="mv-popup-coord">${coordinates[1].toFixed(6)}, ${coordinates[0].toFixed(6)}</p>`;
          // if (!this.exploreMode) {
          this.popupOverlay.setPosition(newValue.pixelSelected);
          // }
        }
      } else {
        this.closePopup();
        this.mapSelectionMarker.setPosition(undefined);
      }
    },
    hasContext(newValue) {
      this.uploadConfig.refId = this.contextId;
      if (newValue) {
        this.setDrawMode(false);
      } else {
        // to manage if user move map while a context exists
        this.sendRegionOfInterest();
        this.popupOverlay.setPosition(undefined);
      }
    },
    proposedContext(newValue) {
      this.drawProposedContext();
      this.$nextTick(() => {
        this.setSpinner({ ...SPINNER_CONSTANTS.SPINNER_STOPPED, owner: 'KlabSearch' });
      });
    },
    topLayer(newValue) {
      if (newValue === null || !this.mapSelection.locked) {
        this.closePopup();
      } else {
        this.setMapInfoPoint();
      }
    },
    hasExtentMap() {
      this.setShowSettings(!this.hasExtentMap);
    },
  },
  created() {
    this.waitingGeolocation = 'geolocation' in navigator && !Cookies.has(WEB_CONSTANTS.COOKIE_MAPDEFAULT);
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
          Cookies.set(WEB_CONSTANTS.COOKIE_BASELAYER, layer.get('name'), {
            expires: 30,
            path: '/',
          });
        }
      });
    });
    const GOTLayer = Layers.MAPBOX_GOT;
    GOTLayer.setVisible(true);
    const baseLayersGroup = new Group({
      title: 'BaseLayers',
      layers: this.baseLayers.layers,
    });
    // Set main map
    this.map = new Map({
      view: new View({
        center: this.center,
        zoom: this.zoom,
      }),
      layers: baseLayersGroup,
      target: `map${this.idx}`,
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
    });
    // Main map listeners...
    this.map.on('moveend', this.onMoveEnd);

    this.map.on('click', (event) => {
      if (this.isDrawMode) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      /* EASTER EGG */
      if (window.event.ctrlKey && window.event.altKey && window.event.shiftKey) {
        const lastLayer = baseLayersGroup.getLayersArray().slice(-1)[0];
        if (lastLayer && lastLayer.get('name') === 'mapbox_got') {
          baseLayersGroup.getLayers().pop();
          this.baseLayers.layers.forEach((l) => {
            if (l.get('name') === this.$baseLayer) {
              l.setVisible(true);
              this.visibleBaseLayer = l;
            }
          });
        } else {
          baseLayersGroup.getLayers().push(GOTLayer);
          // this.layerSwitcher.renderPanel();
          this.$q.notify({
            message: this.$t('messages.youHaveGOT'),
            type: 'info',
            icon: 'mdi-information',
            timeout: 1500,
          });
        }
      }
      this.clicksOnMap += 1;
      setTimeout(async () => {
        if (this.clicksOnMap === 1) {
          // select the clicked layer (we don't know if the first is the top one)
          const selectedLayers = this.findTopLayerFromClick(event, false); // Vector layer are skipped
          if (selectedLayers.length > 0) {
            selectedLayers.forEach((sl) => {
              const layerId = sl.layer.get('id');
              if (sl.type === 'VECTOR') {
                this.putObservationOnTop(this.getObservationIdFromLayerId(layerId));
                if (selectedLayers.length === 1) {
                  this.closePopup();
                }
              } else if (!this.topLayer || layerId !== this.topLayer.id) {
                this.putObservationOnTop(this.getObservationIdFromLayerId(layerId));
                this.setMapInfoPoint({ event, layer: sl.layer });
              } else {
                this.setMapInfoPoint({ event });
              }
            });
          }
          this.clicksOnMap = 0;
        }
      }, 300);
    });
    this.map.on('dblclick', (event) => {
      if (this.isDrawMode) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const selectedLayers = this.findTopLayerFromClick(event);
      if (selectedLayers.length === 1) {
        // if (selectedLayer.type === 'VECTOR' || selectedLayer.get('id') !== this.topLayer.id) {
        const layerId = selectedLayers[0].layer.get('id');
        if (!this.topLayer || layerId !== this.topLayer.id) {
          this.putObservationOnTop(this.getObservationIdFromLayerId(layerId));
          /* / TODO: make sense fit the layer?
          const extent = transformExtent(selectedLayer.getSource().getImageExtent(), selectedLayer.getSource().getProjection(), MAP_CONSTANTS.PROJ_EPSG_3857);
          this.needFitMapListener({ geometry: extent });
          */
          this.setMapInfoPoint({ event, locked: true, layer: selectedLayers[0].layer });
          /*
          if (selectedLayer.type === 'IMAGE') {
            extent =
          } else {
            extent = selectedLayer.getSource().getExtent(); // Vector layer is ever in EPSG:4326
          }
          */
        } else {
          this.setMapInfoPoint({ event, locked: true });
        }
        this.clicksOnMap = 0;
      } else {
        console.warn('Multiple layer but must be one');
      }
    });
    this.map.on('contextmenu', (event) => {
      const selectedLayers = this.findTopLayerFromClick(event, false);
      if (selectedLayers.length > 0) {
        // if (selectedLayer.type === 'VECTOR' || selectedLayer.get('id') !== this.topLayer.id) {
        this.contextMenuObservationId = this.getObservationIdFromLayerId(selectedLayers[0].layer.get('id'));
        event.preventDefault();
      }
    });
    // ...and set some attribute for rapid access
    this.view = this.map.getView();
    this.proj = this.view.getProjection();
    // Add components to main map
    this.map.addLayer(new Group({ layers: this.layers }));
    this.layerSwitcher = new LayerSwitcher();
    this.map.addControl(this.layerSwitcher);
    this.mapSelectionMarker = new Overlay({
      element: document.getElementById(`msm-${this.idx}`),
      positioning: 'center-center',
    });
    this.map.addOverlay(this.mapSelectionMarker);
    // popup
    this.popupOverlay = new Overlay({
      element: document.getElementById('mv-popup'),
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
    });
    this.map.addOverlay(this.popupOverlay);
    // extent map to show bigger proposed context
    this.extentMap = new Map({
      view: new View({
        center: [0, 0],
        zoom: 12,
      }),
      target: 'mv-extent-map',
      layers: [Layers.OSM_LAYER],
      controls: [],

    });
    this.drawContext();
    this.drawObservations();
    this.drawProposedContext();
    if (this.waitingGeolocation) {
      this.doGeolocation();
    }
    this.setShowSettings(!this.hasExtentMap);
    this.$eventBus.$on(CUSTOM_EVENTS.NEED_FIT_MAP, this.needFitMapListener);
    this.$eventBus.$on(CUSTOM_EVENTS.OBSERVATION_INFO_CLOSED, this.observationInfoClosedListener);
    this.$eventBus.$on(CUSTOM_EVENTS.SEND_REGION_OF_INTEREST, this.sendRegionOfInterestListener);
    this.$eventBus.$on(CUSTOM_EVENTS.NEED_LAYER_BUFFER, this.bufferLayerImages);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.NEED_FIT_MAP, this.needFitMapListener);
    this.$eventBus.$off(CUSTOM_EVENTS.OBSERVATION_INFO_CLOSED, this.observationInfoClosedListener);
    this.$eventBus.$off(CUSTOM_EVENTS.SEND_REGION_OF_INTEREST, this.sendRegionOfInterestListener);
    this.$eventBus.$off(CUSTOM_EVENTS.NEED_LAYER_BUFFER, this.bufferLayerImages);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .layer-switcher
    top 5em
    button
      background-position 2px 3px
      background-image url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgo8c3ZnIGlkPSJzdmcyIiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgaGVpZ2h0PSIxOS45OTYiIHdpZHRoPSIyMCIgdmVyc2lvbj0iMS4xIiB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHZpZXdCb3g9IjAgMCAxOS45OTk5OTggMTkuOTk2MDk0Ij4KIDxtZXRhZGF0YSBpZD0ibWV0YWRhdGE3Ij4KICA8cmRmOlJERj4KICAgPGNjOldvcmsgcmRmOmFib3V0PSIiPgogICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICA8ZGM6dHlwZSByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIi8+CiAgICA8ZGM6dGl0bGUvPgogICA8L2NjOldvcms+CiAgPC9yZGY6UkRGPgogPC9tZXRhZGF0YT4KIDxnIGlkPSJsYXllcjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zNzIuODYgLTQzMy43OSkiPgogIDxnIGlkPSJnNDE0OCIgdHJhbnNmb3JtPSJtYXRyaXgoLjA1MjA3MCAwIDAgLjA1MjA3MCAzNjkuNTMgNDMwLjQ2KSIgZmlsbD0iI2ZmZiI+CiAgIDxwYXRoIGlkPSJwYXRoNDEzOCIgZD0ibTQzNC44IDEzNy42LTE0OS40LTY4LjFjLTE2LjItNy40LTQyLjctNy40LTU4LjkgMGwtMTQ5LjMgNjguMWMtMTcuNiA4LTE3LjYgMjEuMSAwIDI5LjFsMTQ4IDY3LjVjMTYuOSA3LjcgNDQuNyA3LjcgNjEuNiAwbDE0OC02Ny41YzE3LjYtOCAxNy42LTIxLjEgMC0yOS4xem0tMjA5LjYgMjM3LjYtOTkuOC00NS41Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC0zNC45IDE1LjljLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy42LTggMTcuNi0yMS4xIDAtMjkuMWwtMzQuOS0xNS45Yy00LjItMS45LTkuMS0xLjktMTMuMyAwbC05OS44IDQ1LjVjLTE2LjkgNy43LTQ0LjcgNy43LTYxLjYgMHoiLz4KICAgPHBhdGggaWQ9InBhdGg0MTQwIiBkPSJtNDM0LjggMjQxLjYtMzEuNy0xNC40Yy00LjItMS45LTktMS45LTEzLjIgMGwtMTA4IDQ4LjljLTE1LjMgNS4yLTM2LjYgNS4yLTUxLjkgMGwtMTA4LTQ4LjljLTQuMi0xLjktOS0xLjktMTMuMiAwbC0zMS43IDE0LjRjLTE3LjYgOC0xNy42IDIxLjEgMCAyOS4xbDE0OCA2Ny41YzE2LjkgNy43IDQ0LjcgNy43IDYxLjYgMGwxNDgtNjcuNWMxNy43LTggMTcuNy0yMS4xIDAuMS0yOS4xeiIvPgogIDwvZz4KIDwvZz4KPC9zdmc+Cg==')
    .panel
      padding 0 1em 0 0
      margin 0
      border 1px solid #999
      border-radius 4px
      background-color $main-control-grey-alpha
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
  .mv-exploring
    cursor crosshair !important
  .ol-popup
    position absolute
    background-color rgba(255, 255, 255, .9)
    padding 20px 15px
    border-radius 10px
    bottom 25px
    left -48px
    min-height: 80px

    &:after
    &:before
      top 100%
      border solid transparent
      content " "
      height 0
      width 0
      position absolute
      pointer-events none

    &:after
      border-top-color rgba(255, 255, 255, .9)
      border-width 10px
      left 48px
      margin-left -10px

    .ol-popup-closer
      position absolute
      top 2px
      right 8px

    .ol-popup-content
      h3
        margin 0 0 .2em 0
        line-height 1.1em
        font-size 1.1em
        color $main-control-main-color
        white-space nowrap
        font-weight 300
      p
        margin 0
        color rgba(50, 50, 50, .9)
        white-space nowrap
        font-weight 400
      .mv-popup-value
        font-size 1.6em
        padding 10px 0
      .mv-popup-coord
        font-size 0.8em
        padding-top 5px
        color rgb(124,124,124)
      .mv-popup-separator
        height 1px
        border-top 1px solid rgba(124,124,124,0.3)
        margin 0 auto
  #mv-extent-map
    width 200px
    height 200px
    position absolute
    bottom 0px
    right 0px
    border 1px solid var(--app-main-color)
    &.mv-extent-map-hide
      opacity 0
  .mv-remove-proposed-context
    position absolute
    bottom 10px
    left 10px
    opacity .3
    background-color #3187ca
    color white !important
    &:hover
      opacity 1

</style>
