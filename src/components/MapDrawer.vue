<template>
  <div class="md-draw-controls" v-draggable="dragDCConfig">
    <div class="md-title">Draw mode</div>
    <div class="md-controls">
      <q-icon class="md-control md-ok" name="mdi-check-circle-outline" @click.native="drawOk()"></q-icon>
      <q-icon class="md-control md-erase" :class="[ hasCustomContextFeatures ? '' : 'disabled']" name="mdi-delete-variant" @click.native="hasCustomContextFeatures ? drawErase() : false"></q-icon>
      <q-icon class="md-control md-cancel" name="mdi-close-circle-outline" @click.native="drawCancel()"></q-icon>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import { io as jstsIo } from 'jsts';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style.js';
import { Draw, Modify } from 'ol/interaction.js';
// eslint-disable-next-line object-curly-newline
import { Point, LineString, Polygon, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom.js';
import LinearRing from 'ol/geom/LinearRing.js';
/**
 * Used to draw path and modify existing path
 */
export default {
  name: 'MapDrawer',
  props: {
    map: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      drawerLayer: undefined,
      drawer: undefined,
      drawerModify: undefined,
      dragDCConfig: { resetInitialPos: true },
      jstsParser: undefined,
    };
  },
  computed: {
    hasCustomContextFeatures() {
      return this.drawerLayer && this.drawerLayer.getSource().getFeatures().length > 0;
    },
  },
  methods: {
    ...mapActions('view', [
      'setDrawMode',
    ]),
    drawOk() {
      // before all, we need to clear possible empty feature for invalid polygon
      const features = this.drawerLayer.getSource().getFeatures().filter(f => f.getGeometry() !== null);
      if (features.length !== 0) {
        const feature = features[0];
        const fl = features.length;
        if (fl > 1) {
          let jstsGeometry = null;
          for (let i = 0; i < fl; i++) {
            // need to check to filter empty geometry for invalid polygon
            const jstsGeomTemp = this.jstsParser.read(features[i].getGeometry());
            if (jstsGeometry === null) {
              jstsGeometry = jstsGeomTemp;
            } else {
              jstsGeometry = jstsGeometry.union(jstsGeomTemp);
            }
          }
          feature.setGeometry(this.jstsParser.write(jstsGeometry));
          // this.drawerLayer.getSource().addFeatures([feature]);
        }
        this.$emit('drawend', feature);
      }
      this.drawerLayer.getSource().clear();
      this.setDrawMode(false);
    },

    drawErase() {
      const features = this.drawerLayer.getSource().getFeatures().filter(f => f.getGeometry() !== null);
      if (features.length > 0) {
        features.pop();
      }
      this.drawerLayer.getSource().clear(true);
      this.drawerLayer.getSource().addFeatures(features);
    },

    drawCancel() {
      this.$emit('drawcancel');
      this.drawerLayer.getSource().clear();
      this.setDrawMode(false);
    },
  },
  directives: {
    Draggable,
  },
  mounted() {
    this.jstsParser = new jstsIo.OL3Parser();
    this.jstsParser.inject(Point, LineString, LinearRing, Polygon, MultiPoint, MultiLineString, MultiPolygon);
    // Configuring the drawer
    const source = new VectorSource();
    this.drawerModify = new Modify({ source });
    this.drawerLayer = new VectorLayer({
      id: 'DrawerLayer',
      source,
      visible: true,
      style: new Style({
        fill: new Fill({
          color: 'rgba(17, 170, 187, 0.3)',
        }),
        stroke: new Stroke({
          color: 'rgb(17, 170, 187)',
          width: 2,
        }),
      }),
    });
    this.drawer = new Draw({
      source,
      type: 'Polygon',
    });
    this.drawer.on('drawend', (event) => {
      const jstsGeomTemp = this.jstsParser.read(event.feature.getGeometry());
      if (!jstsGeomTemp.isValid()) {
        this.$q.notify({
          message: this.$t('messages.invalidGeometry'),
          type: 'negative',
          timeout: 1000,
        });
        event.feature.setGeometry(null);
      }
    });
    this.dragDCConfig.boundingElement = document.getElementById(this.map.get('target'));
    this.map.addLayer(this.drawerLayer);
    this.map.addInteraction(this.drawer);
    this.map.addInteraction(this.drawerModify);
  },
  beforeDestroy() {
    this.map.removeInteraction(this.drawer);
    this.map.removeInteraction(this.drawerModify);
    this.drawerLayer.getSource().clear(true);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .md-draw-controls
    position absolute
    top 30px
    left calc(100vh - 100px)
    background-color rgba(255, 255, 255, 0.8)
    border-radius 20px
    .md-title
      color white
      background-color $main-control-main-color
      width 100%
      padding 5px
      font-size 16px
      text-align center
      border-top-left-radius 20px
      border-top-right-radius 20px
    .md-controls
      .md-control
        font-size 30px
        font-width bold
        width calc(33% - 10px)
        padding 5px
        margin 10px 5px
        height 40px;
        border-radius 20px
        cursor pointer
      .md-ok
        color $positive
        &:hover
          background-color $positive
          color white
      .md-cancel
        color $negative
        &:hover
          background-color $negative
          color white
      .md-erase
        &.disabled
          cursor default
        &:not(.disabled)
          color $main-control-yellow
          &:hover
            background-color $main-control-yellow
            color white
</style>
