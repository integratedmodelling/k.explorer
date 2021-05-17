<template>
  <!-- histogram and colormap container FIXED WIDTH -->
  <div class="hv-histogram-container" v-if="dataSummary !== null" :style="{ 'min-width': `${Math.max(dataSummary.histogram.length * 4, 256)}px` }"  @mouseleave="setInfoShowed(null)">
    <!-- histogram  % to fill container -->
    <div class="hv-histogram" v-if="hasHistogram" :class="[colormap !== null ? 'k-with-colormap' : '']">
      <div
        class="hv-histogram-col"
        v-for="(data, index) in dataSummary.histogram"
        :key="index"
        :style="{ width:`${histogramWidth}%` }"
        @mouseover="infoShowed = { index, categories: dataSummary.categories, values: dataSummary.histogram }"
      >
        <q-tooltip :offset="[0,10]" :delay="500">{{ infoShowed.values[infoShowed.index] }}</q-tooltip>
        <div class="hv-histogram-val" :style="{ height: `${getHistogramDataHeight(data)}%` }">
        </div>
      </div>
    </div>
    <div class="hv-histogram-nodata" v-else>{{ $t('label.noHistogramData') }}</div>
    <!-- colormap FIXED sixe -->
    <div class="hv-colormap" v-if="colormap !== null" :style="{ 'min-width': `${Math.min(colormap.colors.length, 256)}px`}">
      <div
        class="hv-colormap-col"
        v-for="(data, index) in colormap.colors"
        :key="index"
        :style="{ width:`${ colormapWidth }%`, 'background-color': data  }"
        @mouseover="infoShowed = { index, categories: [], values: colormap.labels }"
      >
      </div>
    </div>
    <!-- info about everything FIXED sixe -->
    <div class="hv-data-details-container" :class="{ 'hv-details-nodata': !hasHistogram && colormap == null }">
      <div class="hv-histogram-min hv-data-details" @mouseover="tooltipIt($event, `q-hmin${id}-${infoShowed.index}`)">{{ histogramMin }}
        <q-tooltip v-show="needTooltip(`q-hmin${id}-${infoShowed.index}`)" class="hv-tooltip">{{ histogramMin }}</q-tooltip></div>
      <template v-if="infoShowed.index === -1"><div class="hv-data-nodetail hv-data-details">{{ $t('label.noInfoValues') }}</div></template>
      <template v-else>
        <div class="hv-data-value hv-data-details" @mouseover="tooltipIt($event, `q-hdata${id}-${infoShowed.index}`)">
          {{ infoShowedText }}
          <q-tooltip class="hv-tooltip" v-show="needTooltip(`q-hdata${id}-${infoShowed.index}`)" anchor="center right" self="center left" :offset="[10, 10]">
            {{ infoShowedText }}
          </q-tooltip>
        </div>
      </template>
      <div class="hv-histogram-max hv-data-details" @mouseover="tooltipIt($event, `q-hmax${id}-${infoShowed.index}`)">{{ histogramMax }}
        <q-tooltip v-show="needTooltip(`q-hmax${id}-${infoShowed.index}`)" class="hv-tooltip">{{ histogramMax }}</q-tooltip></div>
    </div>
  </div>
</template>

<script>
import TooltipIt from 'shared/TooltipItMixin';
import { CUSTOM_EVENTS } from 'shared/Constants';

export default {
  name: 'HistogramViewer',
  props: {
    dataSummary: {
      type: Object,
      required: true,
    },
    colormap: Object,
    id: {
      type: String,
      default: '',
    },
  },
  mixins: [TooltipIt],
  data() {
    return {
      infoShowed: {
        index: -1,
        categories: [],
        values: [],
      },
    };
  },
  computed: {
    hasHistogram() {
      return this.dataSummary.histogram.length > 0;
    },
    maxHistogramValue() {
      return Math.max.apply(null, this.dataSummary.histogram);
    },
    histogramWidth() {
      return 100 / this.dataSummary.histogram.length;
    },
    histogramMin() {
      if (this.dataSummary.minValue === 'NaN' || this.dataSummary.categorized) {
        return '';
      }
      return Math.round(this.dataSummary.minValue * 100) / 100;
    },
    histogramMax() {
      if (this.dataSummary.maxValue === 'NaN' || this.dataSummary.categorized) {
        return '';
      }
      return Math.round(this.dataSummary.maxValue * 100) / 100;
    },
    colormapWidth() {
      return 100 / this.colormap.colors.length;
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
    setInfoShowed(infoShowed = null) {
      if (infoShowed === null) {
        this.infoShowed = {
          index: -1,
          categories: [],
          values: [],
        };
      } else {
        this.infoShowed = {
          ...infoShowed,
        };
      }
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_DATA_INFO, this.setInfoShowed);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_DATA_INFO, this.setInfoShowed);
  },
};
</script>

<style lang="stylus">
@import '~variables'
.hv-histogram-container
  height $hv-histogram-height
  width 100%

.hv-histogram
.hv-histogram-nodata
  height "calc(100% - %s)" % $hv-data-details-height
  position relative
  &.k-with-colormap
    height "calc(100% - %s)" % ($hv-data-details-height + $hv-colormap-height)

.hv-histogram-nodata
  color #fff
  text-align center
  background-color $main-control-grey-alpha
  padding-top 20%

.hv-histogram-col
  float left
  height 100%
  position relative
  &:hover
    background $main-control-grey-alpha

.hv-histogram-val
  background #000
  width 100%
  position: absolute
  bottom 0

  border-right 1px solid alpha($main-control-grey, 0.85)
  border-left 1px solid alpha($main-control-grey, 0.85)
  &:hover
    background rgba(0, 0, 0, 0.7)

.hv-colormap
  height $hv-colormap-height
  position: relative

.hv-colormap-col
  float left
  height 100%
  background-color #fff
  min-width 1px

.hv-data-details
  color #fff
  text-align center
  font-size small
  padding 2px 0
  display inline-block
  overflow hidden
  white-space nowrap
  vertical-align: middle;
  height: $hv-data-details-height
  line-height: $hv-data-details-height
  text-overflow: ellipsis;

.hv-histogram-min
.hv-histogram-max
  width $hv-histogram-minmax-width

.hv-data-value, .hv-data-nodetail
  width "calc(100% - %s)" % ($hv-histogram-minmax-width * 2)
  border-left 1px solid #696969
  border-right 1px solid #696969

.hv-data-value, .hv-tooltip
  color $main-control-yellow
  transition none
  font-style normal
.hv-tooltip
  background-color #444

</style>
