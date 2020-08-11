<template>
  <div class="md-draw-controls" v-draggable="dragDCConfig">
    <div class="md-title">Draw mode</div>
    <div class="md-controls">
      <q-icon class="md-control md-ok" name="mdi-check-circle-outline" @click.native="drawOk()"></q-icon>
      <q-icon class="md-control md-erase" :class="[ hasCustomContextFeatures ? '' : 'disabled']" name="mdi-delete-variant" @click.native="hasCustomContextFeatures ? drawErase() : false"></q-icon>
      <q-icon class="md-control md-cancel" name="mdi-close-circle-outline" @click.native="drawCancel()"></q-icon>
    </div>
    <div class="md-selector" v-show="selectors">
      <q-btn-toggle
        v-model="drawType"
        toggle-color="mc-main"
        size="md"
        :options="[
          { tabindex: 1, icon: 'mdi-vector-point',/* label: $t('label.drawPoint'),*/ value: 'Point', disable: true},
          { tabindex: 2, icon: 'mdi-vector-line',/* label: $t('label.drawLineString'), */ value: 'LineString', disable: true },
          { tabindex: 3, icon: 'mdi-vector-polygon',/* label: $t('label.drawPolygon'), */ value: 'Polygon' },
          { tabindex: 4, icon: 'mdi-vector-circle-variant',/* label: $t('label.drawCircle'),*/ value: 'Circle' }
        ]"
      ></q-btn-toggle>
    </div>
  </div>
</template>

<script>
/* eslint-disable object-curly-newline */
import { mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style, Circle as CircleStyle } from 'ol/style.js';
import { Draw, Modify } from 'ol/interaction.js';
import Feature from 'ol/Feature';
import { createIDLPolygon, jstsParser, jstsParseGeometry } from 'shared/Utils';
import { Polygon, Circle } from 'ol/geom';
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
    selectors: {
      type: Boolean,
      required: false,
      default: true,
    },
    fillColor: {
      type: String,
      required: false,
      default: 'rgba(17, 170, 187, 0.3)',
    },
    strokeColor: {
      type: String,
      required: false,
      default: 'rgb(17, 170, 187)',
    },
    strokeWidth: {
      type: Number,
      required: false,
      default: 2,
    },
    pointRadius: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  data() {
    return {
      drawerLayer: undefined,
      drawer: undefined,
      drawerModify: undefined,
      dragDCConfig: { resetInitialPos: true },
      drawType: 'Polygon',
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
      const fl = features.length;
      const finalFeatures = [];
      if (fl !== 0) {
        // merge polygons
        // TODO when merged, we need to know if line and point are contained ?
        let jstsMultiPolygon = null;
        for (let i = 0; i < fl; i += 1) {
          const geometry = features[i].getGeometry();
          if (geometry instanceof Circle || geometry instanceof Polygon) {
            const jstsGeomTemp = createIDLPolygon(jstsParseGeometry(geometry));
            if (jstsMultiPolygon === null) {
              jstsMultiPolygon = jstsGeomTemp;
            } else {
              jstsMultiPolygon = jstsMultiPolygon.union(jstsGeomTemp);
            }
          } else {
            finalFeatures.push(features[i]);
          }
        }
        if (jstsMultiPolygon !== null) {
          finalFeatures.push(new Feature({ geometry: jstsParser.write(jstsMultiPolygon) }));
        }

        this.$emit('drawend', finalFeatures);
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

    setDrawer() {
      this.drawer = new Draw({
        source: this.drawerLayer.getSource(),
        type: this.drawType,
      });
      this.drawer.on('drawend', (event) => {
        const jstsGeomTemp = jstsParseGeometry(event.feature.getGeometry());
        if (!jstsGeomTemp.isValid()) {
          this.$q.notify({
            message: this.$t('messages.invalidGeometry'),
            type: 'negative',
            icon: 'mdi-alert-circle',
            timeout: 1000,
          });
          event.feature.setGeometry(null);
        }
      });
      this.map.addInteraction(this.drawer);
    },
  },
  watch: {
    drawType() {
      this.map.removeInteraction(this.drawer);
      this.setDrawer();
    },
  },
  directives: {
    Draggable,
  },
  mounted() {
    // Configuring the drawer
    const source = new VectorSource();
    this.drawerModify = new Modify({ source });
    this.drawerLayer = new VectorLayer({
      id: 'DrawerLayer',
      source,
      visible: true,
      style: new Style({
        fill: new Fill({
          color: this.fillColor,
        }),
        stroke: new Stroke({
          color: this.strokeColor,
          width: this.strokeWidth,
        }),
        image: new CircleStyle({
          radius: this.pointRadius,
          fill: new Fill({
            color: this.strokeColor,
          }),
        }),
      }),
    });

    this.dragDCConfig.boundingElement = document.getElementById(this.map.get('target'));
    this.map.addLayer(this.drawerLayer);
    this.map.addInteraction(this.drawerModify);
    this.setDrawer();
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
    left calc(50vw - 100px)
    background-color rgba(255, 255, 255, 0.8)
    border-radius 10px
    .md-title
      color white
      background-color $main-control-main-color
      width 100%
      padding 5px
      font-size 16px
      text-align center
      border-top-left-radius 10px
      border-top-right-radius 10px
    .md-controls
      .md-control
        font-size 30px
        font-weight bold
        width calc(33% - 24px)
        padding 5px
        margin 10px 12px
        height 40px;
        border-radius 10px
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
    .md-selector
      .q-btn-group
        border-bottom-left-radius 10px;
        border-bottom-right-radius 10px;
      button
        width 50px
        &:nth-child(1)
          border-bottom-left-radius 10px;
        &:nth-child(4)
          border-bottom-right-radius 10px;
</style>
