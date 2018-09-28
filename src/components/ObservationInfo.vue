<template>
  <div id="oi-container" class="relative-position">
    <!-- slider FIXED WIDTH -->
    <div id="oi-slider" v-show="observationInfo.visible">
      <q-slider
        v-model="observationInfo.layerOpacity"
        :min="0"
        :max="1"
        :step="0.1"
        :decimals="1"
        color="mc-yellow"
        :label="false"
      ></q-slider>
    </div>
    <!-- metadata and info map % WIDTH -->
    <div id="oi-metadata-map-wrapper" :class="getContainerClasses()">
      <!-- metadata will be 50% -->
      <div id="oi-scroll-container" :class="[ this.exploreMode ? 'with-mapinfo' : '']">
        <div id="oi-scroll-metadata-container">
          <div id="oi-metadata" v-for="(value, name) in observationInfo.metadata" :key="name">
            <div class="oi-metadata-name">{{ name }}</div>
            <div class="oi-metadata-value" @dblclick="copyToClipboard(value)">{{ value }}</div>
          </div>
        </div>
      </div>
      <!-- info map will be 50% -->
      <div id="oi-mapinfo-container"
        v-show="hasMapInfo"
        @mouseenter="infoShowed = { index: 0, categories: [], values: [mapSelection.value] }"
        @mouseleave="resetInfoShowed"
      >
        <div id="oi-mapinfo-map"></div>
        <div id="oi-pixel-h" class="oi-pixel-indicator"></div>
        <div id="oi-pixel-v" class="oi-pixel-indicator"></div>
      </div>
    </div>
    <!-- histogram and colormap container FIXED WIDTH -->
    <div id="oi-histogram-container" v-if="observationInfo.dataSummary !== null" :style="{ 'min-width': `${observationInfo.dataSummary.histogram.length * 4}px` }"  @mouseleave="resetInfoShowed()">
      <!-- histogram  % to fill container -->
      <div id="oi-histogram" v-if="hasHistogram" :class="[this.observationInfo.colormap !== null ? 'with-colormap' : '']">
        <div
          class="oi-histogram-col"
          v-for="(data, index) in observationInfo.dataSummary.histogram"
          :key="index"
          :style="{ width:`${histogramWidth}%` }"
          @mouseover="infoShowed = { index, categories: observationInfo.dataSummary.categories, values: observationInfo.dataSummary.histogram }"
        >
          <div class="oi-histogram-val" :style="{ height: `${getHistogramDataHeight(data)}%` }">
          </div>
        </div>
      </div>
      <div id="oi-histogram-nodata" v-else>{{ $t('label.noHistogramData') }}</div>
      <!-- colormap FIXED sixe -->
      <div id="oi-colormap" v-if="observationInfo.colormap !== null" :style="{ 'min-width': `${Math.min(observationInfo.colormap.colors.length, 256)}px`}">
        <div
          class="oi-colormap-col"
          v-for="(data, index) in observationInfo.colormap.colors"
          :key="index"
          :style="{ width:`${ colormapWidth }%`, 'background-color': data  }"
          @mouseover="infoShowed = { index, categories: [], values: observationInfo.colormap.labels }"
        >
        </div>
      </div>
      <!-- info about everything FIXED sixe -->
      <div id="oi-data-details">
        <div id="oi-histogram-min" class="oi-data-details" @mouseover="tooltipIt($event, 'q-hmin')">{{ histogramMin }}<q-tooltip v-show="ellipsed.includes('q-hmin')" class="oi-tooltip">{{ histogramMin }}</q-tooltip></div>
        <template v-if="infoShowed.index === -1"><div id="oi-data-nodetail" class="oi-data-details">{{ $t('label.noInfoValues') }}</div></template>
        <template v-else>
          <div id="oi-data-detail" class="oi-data-details" @mouseover="tooltipIt($event, 'q-hdata')">
            {{ infoShowed.categories.length > 0 ? `${infoShowed.categories[infoShowed.index]}: ` : '' }}<em>{{ infoShowed.values[infoShowed.index] }}</em>
            <q-tooltip class="oi-tooltip" v-show="ellipsed.includes('q-hdata')">
              {{ infoShowed.categories.length > 0 ? `${infoShowed.categories[infoShowed.index]}: ` : '' }}<em>{{ infoShowed.values[infoShowed.index] }}</em>
            </q-tooltip>
          </div>
        </template>
        <div id="oi-histogram-max" class="oi-data-details" @mouseover="tooltipIt($event, 'q-hmax')">{{ histogramMax }}<q-tooltip v-show="ellipsed.includes('q-hmax')" class="oi-tooltip">{{ histogramMax }}</q-tooltip></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import Utils from 'shared/Utils';
import Map from 'ol/Map';
import View from 'ol/View';
import { Layers } from 'shared/MapConstants';
// import Group from 'ol/layer/Group';

export default {
  name: 'ObservationInfo',
  data() {
    return {
      scrollBar: undefined,
      infoShowed: {
        index: -1,
        categories: [],
        values: [],
      },
      ellipsed: [],
      infoMap: null,
    };
  },
  computed: {
    ...mapGetters('view', [
      'observationInfo',
      'mapSelection',
      'exploreMode',
    ]),
    hasHistogram() {
      return this.observationInfo.dataSummary.histogram.length > 0;
    },
    maxHistogramValue() {
      return Math.max.apply(null, this.observationInfo.dataSummary.histogram);
    },
    histogramWidth() {
      return 100 / this.observationInfo.dataSummary.histogram.length;
    },
    histogramMin() {
      if (this.observationInfo.dataSummary.minValue === 'NaN') {
        return '';
      }
      return Math.round(this.observationInfo.dataSummary.minValue * 100) / 100;
    },
    histogramMax() {
      if (this.observationInfo.dataSummary.maxValue === 'NaN') {
        return '';
      }
      return Math.round(this.observationInfo.dataSummary.maxValue * 100) / 100;
    },
    colormapWidth() {
      return 100 / this.observationInfo.colormap.colors.length;
    },
    hasMapInfo() {
      return this.exploreMode
        && this.mapSelection.pixelSelected !== null
        && `cl_${this.observationInfo.id}` === this.mapSelection.layerSelected.get('id');
    },
  },
  methods: {
    getHistogramDataHeight(value) {
      return value * 100 / this.maxHistogramValue;
    },
    copyToClipboard(value) {
      Utils.copyToClipboard(value);
      this.$q.notify({
        message: this.$t('messages.copiedToClipboard'),
        type: 'info',
        timeout: 500,
      });
    },
    tooltipIt(event, ref) {
      if (event.target.offsetWidth < event.target.scrollWidth) {
        this.ellipsed.push(ref);
      } else {
        this.ellipsed.splice(this.ellipsed.indexOf(ref), 1);
      }
    },
    getContainerClasses() {
      const finalClasses = [];
      if (this.observationInfo.visible) {
        finalClasses.push('with-slider');
      }
      if (this.observationInfo.dataSummary !== null) {
        finalClasses.push('with-histogram');
      }
      return finalClasses;
    },
    resetInfoShowed() {
      this.infoShowed = {
        index: -1,
        categories: [],
        values: [],
      };
    },
  },
  watch: {
    mapSelection() {
      const layers = this.infoMap.getLayers().getArray();
      if (this.mapSelection.pixelSelected !== null) {
        if (layers.length > 1) {
          this.infoMap.removeLayer(layers[1]);
        }
        this.infoMap.addLayer(this.mapSelection.layerSelected);

        this.infoMap.getView().setCenter(this.mapSelection.pixelSelected);
        this.infoMap.getView().setZoom(14);
        this.$nextTick(() => {
          this.infoMap.updateSize();
        });
        this.infoShowed = {
          index: 0,
          categories: [],
          values: [this.mapSelection.value],
        };
      } else if (layers.length > 1) {
        this.infoMap.removeLayer(layers[1]);
      }
    },
  },
  mounted() {
    this.scrollBar = new SimpleBar(document.getElementById('oi-scroll-container'));
    this.infoMap = new Map({
      view: new View({
        center: [0, 0],
        zoom: 12,
      }),
      target: 'oi-mapinfo-map',
      layers: [Layers.EMPTY_LAYER],
      controls: [],
      interactions: [],
    });
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $oi-slider-height = 30px
  $oi-metadata-map-wrapper = 100% // only for reference
  $oi-metadata-min-height = 50% // metadata
  $oi-mapinfo-min-height = 50% // map with selected point and value
  $oi-histogram-height = 160px // histogram
  $oi-colormap-height = 30px // colormap
  $oi-data-details-height = 30px // info
  $oi-histogram-minmax-width = 50px // min and max

  #oi-container
    height $main-control-max-height - $main-control-spc-height - $main-control-scrollbar
    padding 10px 0 0 0

  #oi-metadata-map-wrapper
    height 100%
    &.with-slider
      height "calc(100% - %s)" % $oi-slider-height
      &.with-histogram
        height "calc(100% - %s)" % ($oi-slider-height + $oi-histogram-height)
    &.with-histogram
      height "calc(100% - %s)" % $oi-histogram-height

  .oi-metadata-name
    color $main-control-yellow
    text-shadow 0 0 1px #666
    padding 0 0 2px 5px

  .oi-metadata-value
    color white
    margin 0 5px 5px 5px
    background-color #666
    box-shadow inset 0px 0px 0px 1px #666
    padding 2px 0 2px 5px

  #oi-scroll-container
    height 100%
    &.with-mapinfo
      height "calc(100% - %s)" % $oi-mapinfo-min-height

  #oi-slider
    height $oi-slider-height

  #oi-slider .q-slider
    padding 0 10px 0 5px

  #oi-mapinfo-container
    height $oi-mapinfo-min-height
    width 100%
    padding 5px
    position relative

  #oi-mapinfo-map
    height 100%
    width 100%

  .oi-pixel-indicator
    position absolute
    background-color white
    mix-blend-mode difference

  #oi-pixel-h
    left calc(50%)
    top 5px
    height calc(100% - 10px)
    width 1px

  #oi-pixel-v
    top calc(50%)
    left 5px
    height 1px
    width calc(100% - 10px)

  #oi-histogram-container
    height $oi-histogram-height
    width 100%

  #oi-histogram
  #oi-histogram-nodata
    height "calc(100% - %s)" % $oi-data-details-height
    position relative
    &.with-colormap
      height "calc(100% - %s)" % ($oi-data-details-height + $oi-colormap-height)

  #oi-histogram-nodata
    color #fff
    text-align center
    background-color rgba(119,119,119,.65)
    padding-top 20%

  .oi-histogram
    position relative
    bottom 0
    border-bottom 1px solid #777

  .oi-histogram-col
    float left
    height 100%
    position relative
    &:hover
      background rgba(119,119,119,.65);

  .oi-histogram-val
    background #000
    width 100%
    position: absolute
    bottom 0

    border-right 1px solid rgba(119, 119, 119, 0.85)
    border-left 1px solid rgba(119, 119, 119, 0.85)
    &:hover
      background rgba(0, 0, 0, 0.7)

  #oi-colormap
    height $oi-colormap-height
    position: relative

  .oi-colormap-col
    float left
    height 100%
    background-color #fff
    min-width 1px

  .oi-data-details
    color #fff
    text-align center
    font-size small
    padding 2px 0
    display inline-block
    overflow hidden
    white-space nowrap
    vertical-align: middle;
    height: $oi-data-details-height
    line-height: $oi-data-details-height
    text-overflow: ellipsis;

  #oi-histogram-min
  #oi-histogram-max
    width $oi-histogram-minmax-width

  #oi-data-detail, #oi-data-nodetail
    width "calc(100% - %s)" % ($oi-histogram-minmax-width * 2)
    border-left 1px solid #696969
    border-right 1px solid #696969

  #oi-data-detail em, .oi-tooltip em
    color $main-control-yellow
    transition none
    font-style normal

  .oi-tooltip
    background-color #444

</style>
