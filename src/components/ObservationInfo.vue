<template>
  <div id="oi-container" class="relative-position">
    <div id="oi-slider" v-show="observationInfo.visible">
      <q-slider
        v-model="observationInfo.layerOpacity"
        :min="0"
        :max="1"
        :step="0.1"
        :decimals="1"
        color="mc-yellow"
        label
        :label-value="`${observationInfo.layerOpacity*100}%`"
      ></q-slider>
    </div>
    <div id="oi-scroll-container" :class="getContainerClasses()">
      <div id="oi-scroll-metadata-container">
        <div id="oi-metadata" v-for="(value, name) in observationInfo.metadata" :key="name">
          <div class="oi-metadata-name">{{ name }}</div>
          <div class="oi-metadata-value" @dblclick="copyToClipboard(value)">{{ value }}</div>
        </div>
      </div>
    </div>
    <div id="oi-pixelinfo-container" v-show="exploreMode">
      <div id="oi-pixelinfo-map"></div>
      <div id="oi-pixel-h" class="oi-pixel-indicator" v-show="isShowMapInfo()"></div>
      <div id="oi-pixel-v" class="oi-pixel-indicator" v-show="isShowMapInfo()"></div>
      <div id="oi-pixelinfo-value" v-show="isShowMapInfo()">{{ mapSelection.value }}</div>
    </div>
    <div id="oi-histogram-container" v-if="observationInfo.dataSummary !== null" :style="{ 'min-width': `${observationInfo.dataSummary.histogram.length * 4}px` }"  @mouseleave="histogramIndex = -1">
      <div id="oi-histogram" v-if="observationInfo.dataSummary.histogram.length > 0">
        <div
          class="oi-histogram-col"
          v-for="(data, index) in observationInfo.dataSummary.histogram"
          :key="index"
          :style="{ width:`${histogramWidth}%`, left: `${histogramWidth * index}%` }"
          @mouseover="histogramIndex = index"
        >
          <div class="oi-histogram-val" :style="{ height: `${getHeight(data)}%` }">
          </div>
        </div>
      </div>
      <div id="oi-histogram-nodata" v-else>{{ $t('label.noHistogramData') }}</div>
      <div id="oi-colormap" v-if="observationInfo.colormap !== null">
        <div
          class="oi-colormap-col"
          v-for="(data, index) in observationInfo.colormap.colors"
          :key="index"
          :style="{ width:`${ colormapWidth }%`, left: `${colormapWidth * index}%`, 'background-color': data  }"
          @mouseover="colormapIndex = index"
        ><q-tooltip>{{ observationInfo.colormap.labels[index] }}</q-tooltip>
        </div>
      </div>
      <div id="oi-histogram-info">
        <div id="oi-histogram-min" class="oi-histogram-info" @mouseover="tooltipIt($event, 'q-hmin')">{{ histogramMin }}<q-tooltip v-show="ellipsed.includes('q-hmin')" class="oi-tooltip">{{ histogramMin }}</q-tooltip></div>
        <template v-if="!hasHistogram"><div class="oi-histogram-data oi-histogram-info">{{ $t('label.noHistogramValues') }}</div></template>
        <template v-else-if="histogramIndex === -1"><div class="oi-histogram-data oi-histogram-info">{{ $t('label.noHistogramValueSelected') }}</div></template>
        <template v-else>
          <div id="oi-histogram-data" class="oi-histogram-info oi-histogram-data" @mouseover="tooltipIt($event, 'q-hdata')">
            {{ histogramDesc.category }}: <em>{{ histogramDesc.value }}</em>
            <q-tooltip class="oi-tooltip" v-show="ellipsed.includes('q-hdata')">{{ histogramDesc.category }}: <em>{{ histogramDesc.value }}</em></q-tooltip>
          </div>
        </template>
        <div id="oi-histogram-max" class="oi-histogram-info" @mouseover="tooltipIt($event, 'q-hmax')">{{ histogramMax }}<q-tooltip v-show="ellipsed.includes('q-hmax')" class="oi-tooltip">{{ histogramMax }}</q-tooltip></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import { Helpers } from 'shared/Helpers';
import Map from 'ol/Map';
import View from 'ol/View';
import { Layers } from 'shared/MapConstants';
// import Group from 'ol/layer/Group';

export default {
  name: 'ObservationInfo',
  data() {
    return {
      scrollBar: undefined,
      histogramIndex: -1,
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
      return this.observationInfo.dataSummary.histogram.length !== 0;
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
    histogramDesc() {
      return {
        category: this.observationInfo.dataSummary.categories[this.histogramIndex],
        value: this.observationInfo.dataSummary.histogram[this.histogramIndex],
      };
    },
    colormapWidth() {
      return 100 / this.observationInfo.colormap.colors.length;
    },
  },
  methods: {
    isShowMapInfo() {
      return this.exploreMode
        && this.mapSelection.layerSelected !== null
        && `cl_${this.observationInfo.id}` === this.mapSelection.layerSelected.get('id');
    },
    getHeight(value) {
      return value * 100 / this.maxHistogramValue;
    },
    copyToClipboard(value) {
      Helpers.copyToClipboard(value);
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
      if (this.observationInfo.dataSummary) {
        finalClasses.push('with-histogram');
      }
      if (this.exploreMode) {
        finalClasses.push('with-pixelinfo');
      }
      if (this.observationInfo.colormap !== null) {
        finalClasses.push('with-colormap');
      }
      return finalClasses;
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
      target: 'oi-pixelinfo-map',
      layers: [Layers.EMPTY_LAYER],
      controls: [],
      interactions: [],
    });
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $oi-max-height = 100%
  $oi-slider-height = 30px
  $oi-pixelinfo-height = 20%
  $oi-pixelvalue-height = 20px
  $oi-histogram-height = 20%
  $oi-histogram-info-height = 30px
  $oi-histogram-minmax-width = 50px
  $oi-colormap-height = 30px
  #oi-container {
    height $main-control-max-height - $main-control-spc-height - $main-control-scrollbar
    padding 10px 0 0 0;
  }
  #oi-scroll-container {
    height $oi-max-height
  }
  #oi-scroll-container.with-slider {
    height "calc(%s - 30px)" % $oi-max-height
  }
  #oi-scroll-container.with-histogram {
    height $oi-max-height - $oi-histogram-height
  }
  #oi-scroll-container.with-slider.with-histogram {
    height "calc(%s - 30px)" % ($oi-max-height - $oi-histogram-height)
  }
  #oi-scroll-container.with-slider.with-pixelinfo {
    height "calc(%s - 30px)" % ($oi-max-height - $oi-pixelinfo-height)
  }
  #oi-scroll-container.with-slider.with-colormap {
    height "calc(%s - 60px)" % ($oi-max-height)
  }
  #oi-scroll-container.with-slider.with-pixelinfo.with-colormap {
    height "calc(%s - 60px)" % ($oi-max-height - $oi-pixelinfo-height)
  }
  #oi-scroll-container.with-slider.with-histogram.with-pixelinfo {
    height "calc(%s - 30px)" % ($oi-max-height - $oi-histogram-height - $oi-pixelinfo-height)
  }
  #oi-scroll-container.with-slider.with-histogram.with-colormap {
    height "calc(%s - 60px)" % ($oi-max-height - $oi-histogram-height)
  }
  #oi-scroll-container.with-slider.with-histogram.with-pixelinfo.with-colormap {
    height "calc(%s - 60px)" % ($oi-max-height - $oi-histogram-height - $oi-pixelinfo-height )
  }
  #oi-slider {
    height $oi-slider-height
  }
  .oi-metadata-name {
    color $main-control-yellow
    text-shadow 0 0 1px #666
    padding 0 0 2px 5px
  }
  .oi-metadata-value {
    color white
    margin 0 5px 5px 5px
    background-color #666
    box-shadow inset 0px 0px 0px 1px #666
    padding 2px 0 2px 5px
  }
  #oi-slider .q-slider {
    padding 0 10px 0 5px
  }
  #oi-pixelinfo-container {
    height $oi-pixelinfo-height
    width 100%
    padding 5px
    position relative
    /*
    line-height 100%
    color white
    vertical-align middle
    */
  }
  #oi-pixelinfo-map {
    height 100%
    width 100%
    border 1px solid #7a7a7a
  }
  .oi-pixel-indicator {
    position absolute
    background-color $main-control-red
    mix-blend-mode difference
  }
  #oi-pixel-h {
    left calc(50% - 1px)
    top 5px
    height calc(100% - 10px)
    width 3px
  }
  #oi-pixel-v {
    top calc(50% - 1px)
    left 5px
    height 3px
    width calc(100% - 10px)
  }
  #oi-pixelinfo-value {
    position absolute
    bottom 5px
    height $oi-pixelvalue-height
    line-height $oi-pixelvalue-height
    padding 0 5px;
    width calc(100% - 10px)
    color white
    background-color rgba(0, 0, 0, 0.8)
  }
  #oi-histogram-container {
    width 100%
    height $oi-histogram-height
  }
  #oi-histogram, #oi-histogram-nodata {
    height "calc(100% - %s)" % $oi-histogram-info-height
    position relative;
  }
  #oi-histogram-nodata {
    color #fff
    text-align center
    background-color rgba(119,119,119,.65)
    padding-top 20%
  }
  .oi-histogram {
    position absolute
    bottom 0
    border-bottom 1px solid #777
  }
  .oi-histogram-col {
    position absolute
    height 100%
  }
  .oi-histogram-col:hover {
    background rgba(119,119,119,.65);
  }
  .oi-histogram-val {
    background #000
    width 100%
    position absolute
    bottom 0
    box-shadow inset 0px 0px 0px 1px rgba(119,119,119,0.5)
  }
  .oi-histogram-val:hover {
    background rgba(0, 0, 0, 0.7)
  }
  #oi-colormap {
    height $oi-colormap-height
    position: relative
  }
  .oi-colormap-col {
    position absolute
    height 100%
    background-color #fff
    box-shadow inset 0px 0px 0px 1px rgba(119,119,119,0.5)
  }
  .oi-histogram-info {
    color #fff
    text-align center
    font-size small
    padding 2px 0
    display inline-block
    overflow hidden
    white-space nowrap
    vertical-align: middle;
    height: $oi-histogram-info-height
    line-height: $oi-histogram-info-height
    text-overflow: ellipsis;
  }
  #oi-histogram-min, #oi-histogram-max {
    width $oi-histogram-minmax-width
  }
  .oi-histogram-data {
    width "calc(100% - %s)" % ($oi-histogram-minmax-width * 2)
    border-left 1px solid #696969
    border-right 1px solid #696969
  }
  #oi-histogram-data em, .oi-tooltip em {
    color $main-control-yellow
    transition none
    font-style normal
  }
  .oi-tooltip {
    background-color #444
  }
</style>
