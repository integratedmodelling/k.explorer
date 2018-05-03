<template>
  <div class="fit no-padding klab-viewer">
    <vl-map ref="map" :load-tiles-while-animating="true" :load-tiles-while-interacting="true"
            data-projection="EPSG:4326" @created="onMapCreated">
      <vl-view :zoom.sync="zoom" :center.sync="center" :rotation.sync="rotation"></vl-view>
      <vl-geoloc @update:position="geolocPosition = $event">
        <template slot-scope="geoloc">
          <vl-feature v-if="geoloc.position" id="position-feature">
            <vl-geom-point :coordinates="geoloc.position"></vl-geom-point>
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
import Vue from 'vue';
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css'; // needs css-loader
// import 'vue-resize/dist/vue-resize.css';

Vue.use(VueLayers);


export default {
  name: 'MapViewer',
  data() { /* eslint-disable object-shorthand */
    return {
      zoom: 7,
      center: [0, 0],
      rotation: 0,
      geolocPosition: undefined,
      map: null,
    };
  },
  computed: {
    mierda() {
      return JSON.stringify(this.$store.state.data.tree);
    },
  },
  methods: {
    onMapCreated: function () {
      console.log(`Created map!: ${this.$refs.map.$map}`);
      this.map = this.$refs.map.$map;
    },
    handleResize: function () {
      console.log('handleResize called!!!');
      this.$refs.map.$map.updateSize();
    },
  },
  watch: {
    geolocPosition: function () {
      this.center = this.geolocPosition;
      console.log(`Encontrada posicion: ${this.geolocPosition}`);
    },
  },
  /*
  needMapReload: function (newVal) {
    if (newVal) {
      this.$refs.map.$map.updateSize();
      this.setNeedReload(false);
      console.log(`Update map, now setNeedReload is ${this.needMapReload}`);
    } else {
      console.log(`No Update map, now setNeedReload is ${this.needMapReload}`);
    }
  },
  },
  components: {
    ResizeObserver,
  }, */
};
</script>

<style scoped lang="stylus">
.map
  height: 100%
  width: 100%
.klab-viewer
  position: relative
</style>
