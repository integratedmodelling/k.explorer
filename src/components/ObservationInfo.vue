<template>
  <div id="oi-container" class="relative-position klab-menu-component">
    <div id="oi-controls">
      <div id="oi-visualize" class="oi-control oi-text" >
        <q-checkbox
          v-model="layerShow"
          :keep-color="true"
          color="mc-yellow"
          @click.native="showNode"
          :disabled="observationInfo.valueCount === 1"
        ></q-checkbox>
      </div>
      <div id="oi-name" class="oi-control oi-text"><span>{{ observationInfo.label }}</span></div>
      <!-- slider FIXED WIDTH -->
      <div id="oi-slider" class="oi-control" v-if="observationInfo.visible">
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
    </div>
    <!-- metadata and info map % WIDTH -->
    <div id="oi-metadata-map-wrapper" :class="getContainerClasses()">
      <!-- metadata will be 50% -->
      <div id="oi-scroll-container" :class="[ this.exploreMode ? 'with-mapinfo' : '']">
        <div id="oi-scroll-metadata-container">
          <div id="oi-metadata" v-for="(value, name) in observationInfo.metadata" :key="name">
            <div class="oi-metadata-name oi-text">{{ name }}</div>
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
    <div id="oi-histogram-container" v-if="observationInfo.dataSummary !== null" :style="{ 'min-width': `${Math.max(observationInfo.dataSummary.histogram.length * 4, 256)}px` }"  @mouseleave="resetInfoShowed()">
      <!-- histogram  % to fill container -->
      <div id="oi-histogram" v-if="hasHistogram" :class="[this.observationInfo.colormap !== null ? 'with-colormap' : '']">
        <div
          class="oi-histogram-col"
          v-for="(data, index) in observationInfo.dataSummary.histogram"
          :key="index"
          :style="{ width:`${histogramWidth}%` }"
          @mouseover="infoShowed = { index, categories: observationInfo.dataSummary.categories, values: observationInfo.dataSummary.histogram }"
        >
          <q-tooltip :offset="[0,10]" :delay="500">{{ infoShowed.values[infoShowed.index] }}</q-tooltip>
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
        <div id="oi-histogram-min" class="oi-data-details" @mouseover="tooltipIt($event, `q-hmin-${infoShowed.index}`)">{{ histogramMin }}<q-tooltip v-show="needTooltip(`q-hmin-${infoShowed.index}`)" class="oi-tooltip">{{ histogramMin }}</q-tooltip></div>
        <template v-if="infoShowed.index === -1"><div id="oi-data-nodetail" class="oi-data-details">{{ $t('label.noInfoValues') }}</div></template>
        <template v-else>
          <div id="oi-data-detail" class="oi-data-details" @mouseover="tooltipIt($event, `q-hdata-${infoShowed.index}`)">
            {{ infoShowedText }}
            <q-tooltip class="oi-tooltip" v-show="needTooltip(`q-hdata-${infoShowed.index}`)" anchor="center right" self="center left" :offset="[10, 10]">
              {{ infoShowedText }}
            </q-tooltip>
          </div>
        </template>
        <div id="oi-histogram-max" class="oi-data-details" @mouseover="tooltipIt($event, `q-hmax-${infoShowed.index}`)">{{ histogramMax }}<q-tooltip v-show="needTooltip(`q-hmax-${infoShowed.index}`)" class="oi-tooltip">{{ histogramMax }}</q-tooltip></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import Utils from 'shared/Utils';
import TooltipIt from 'shared/TooltipItMixin';
import Map from 'ol/Map';
import View from 'ol/View';
import { Layers } from 'shared/MapConstants';
import { CUSTOM_EVENTS } from 'shared/Constants';
// import Group from 'ol/layer/Group';

export default {
  name: 'ObservationInfo',
  mixins: [TooltipIt],
  data() {
    return {
      scrollBar: undefined,
      layerShow: false,
      infoShowed: {
        index: -1,
        categories: [],
        values: [],
      },
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
    infoShowedText() {
      let text;
      if (this.infoShowed.categories.length > 0) {
        text = this.infoShowed.categories[this.infoShowed.index];
        if (typeof text !== 'undefined' && text !== null && text !== '') {
          return text;
        }
      }
      if (this.infoShowed.values.length > 0) {
        text = this.infoShowed.values[this.infoShowed.index];
        if (typeof text !== 'undefined' && text !== null && text !== '') {
          return text;
        }
      }
      return '';
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
    getContainerClasses() {
      const finalClasses = [];
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
    showNode() {
      this.$emit(CUSTOM_EVENTS.SHOW_NODE, { nodeId: this.observationInfo.id, state: this.layerShow });
    },
  },
  watch: {
    mapSelection() {
      if (this.mapSelection.layerSelected === null) {
        return; // is a selection on map
      }
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
    this.layerShow = this.observationInfo.visible;
  },
};
</script>

<style lang="stylus">
  @import '~variables'

  #oi-container
    height $main-control-height - $main-control-spc-height - $main-control-scrollbar
    max-height "calc(var(--main-control-max-height) - %s)" % ($main-control-spc-height + $main-control-scrollbar + $main-control-header-height + $main-control-actions-height)
    // min-height $oi-histogram-height + $main-control-spc-height
    // padding 10px 0 0 0

  #oi-metadata-map-wrapper
    height 100%
    padding-top 10px
    &.with-histogram
      height "calc(100% - %s)" % ($oi-controls-height + $oi-histogram-height)

  .oi-text
    color $main-control-yellow
    text-shadow 0 0 1px #666
    padding 0 0 0 5px

  .oi-metadata-name
    padding-bottom 2px
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

  #oi-controls
    height $oi-controls-height
    width 100%
    border-bottom 1px dotted #333;
    .oi-control
      float left
    #oi-name
      width 50%
      display table
      overflow hidden
      height $oi-controls-height
      span
        display table-cell
        vertical-align middle
        padding-top 2px
    #oi-visualize
      text-align center
      width 40px
      line-height $oi-controls-height
    #oi-slider
      width calc(50% - 40px)
      .q-slider
        padding 0 10px 0 5px
        height $oi-controls-height

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

  #oi-data-detail, .oi-tooltip
    color $main-control-yellow
    transition none
    font-style normal

  .oi-tooltip
    background-color #444

</style>
