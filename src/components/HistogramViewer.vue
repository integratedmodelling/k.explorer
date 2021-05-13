<template>
  <!-- histogram and colormap container FIXED WIDTH -->
  <div id="oi-histogram-container" v-if="dataSummary !== null" :style="{ 'min-width': `${Math.max(dataSummary.histogram.length * 4, 256)}px` }"  @mouseleave="setInfoShowed(null)">
    <!-- histogram  % to fill container -->
    <div id="oi-histogram" v-if="hasHistogram" :class="[colormap !== null ? 'with-colormap' : '']">
      <div
        class="oi-histogram-col"
        v-for="(data, index) in dataSummary.histogram"
        :key="index"
        :style="{ width:`${histogramWidth}%` }"
        @mouseover="infoShowed = { index, categories: dataSummary.categories, values: dataSummary.histogram }"
      >
        <q-tooltip :offset="[0,10]" :delay="500">{{ infoShowed.values[infoShowed.index] }}</q-tooltip>
        <div class="oi-histogram-val" :style="{ height: `${getHistogramDataHeight(data)}%` }">
        </div>
      </div>
    </div>
    <div id="oi-histogram-nodata" v-else>{{ $t('label.noHistogramData') }}</div>
    <!-- colormap FIXED sixe -->
    <div id="oi-colormap" v-if="colormap !== null" :style="{ 'min-width': `${Math.min(colormap.colors.length, 256)}px`}">
      <div
        class="oi-colormap-col"
        v-for="(data, index) in colormap.colors"
        :key="index"
        :style="{ width:`${ colormapWidth }%`, 'background-color': data  }"
        @mouseover="infoShowed = { index, categories: [], values: colormap.labels }"
      >
      </div>
    </div>
    <!-- info about everything FIXED sixe -->
    <div id="oi-data-details">
      <div id="oi-histogram-min" class="oi-data-details" @mouseover="tooltipIt($event, `q-hmin-${infoShowed.index}`)">{{ histogramMin }}
        <q-tooltip v-show="needTooltip(`q-hmin-${infoShowed.index}`)" class="oi-tooltip">{{ histogramMin }}</q-tooltip></div>
      <template v-if="infoShowed.index === -1"><div id="oi-data-nodetail" class="oi-data-details">{{ $t('label.noInfoValues') }}</div></template>
      <template v-else>
        <div id="oi-data-detail" class="oi-data-details" @mouseover="tooltipIt($event, `q-hdata-${infoShowed.index}`)">
          {{ infoShowedText }}
          <q-tooltip class="oi-tooltip" v-show="needTooltip(`q-hdata-${infoShowed.index}`)" anchor="center right" self="center left" :offset="[10, 10]">
            {{ infoShowedText }}
          </q-tooltip>
        </div>
      </template>
      <div id="oi-histogram-max" class="oi-data-details" @mouseover="tooltipIt($event, `q-hmax-${infoShowed.index}`)">{{ histogramMax }}
        <q-tooltip v-show="needTooltip(`q-hmax-${infoShowed.index}`)" class="oi-tooltip">{{ histogramMax }}</q-tooltip></div>
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
</style>
