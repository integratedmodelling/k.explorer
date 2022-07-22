<template>
  <!-- histogram and colormap container FIXED WIDTH -->
  <div
    class="hv-histogram-container"
    :class="`hv-histogram-${direction}`"
    v-if="dataSummary !== null"
    :style="{ [`min-${colormapStyle}`]: `${Math.max(dataSummary.histogram.length * 4, 256)}px` }"
    @mouseleave="tooltips ? setInfoShowed(null) : false">
    <template v-if="isHorizontal">
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
    </template>
    <!-- colormap FIXED size -->
    <div class="hv-colormap-container" :class="[`hv-colormap-container-${direction}`]" v-if="dataSummary.categories.length > 0">
      <div class="hv-colormap" :class="[`hv-colormap-${direction}`]" v-if="colormap !== null" :style="{ [`min-${colormapStyle}`]: `${Math.min(colormap.colors.length, 256)}px` }">
        <div
          class="hv-colormap-col"
          v-for="(data, index) in colormap.colors"
          :key="index"
          :style="{ [colormapStyle]:`${ colormapWidth }%`, 'background-color': data  }"
          @mouseover="tooltips ? infoShowed = { index, categories: [], values: colormap.labels } : false"
        >
        </div>
      </div>
      <div class="hv-legend hv-categories full-height" v-if="legend && dataSummary.categories.length > 0">
        <div v-for="(category, index) in dataSummary.categories" :key="index" class="hv-category" :style="{ 'line-height': `${calculateFontSize()}px`, 'font-size': `${calculateFontSize()}px` }">
          <span v-if="dataSummary.categorized" :class="{ 'hv-zero-category': dataSummary.histogram[index] === 0 }">{{ category }}</span>
          <span v-else>{{ category.split(" ")[0] }}</span>
        </div>
        <div v-if="!dataSummary.categorized" class="hv-category">{{ histogramMax }}</div>
      </div>
    </div>
    <!-- info about everything on tooltip if horizontal FIXED sixe -->
    <div class="hv-data-details-container" :class="{ 'hv-details-nodata': !hasHistogram && colormap == null }" v-if="tooltips">
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
import { dom } from 'quasar';

const { height } = dom;

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
    direction: {
      type: String,
      default: 'horizontal',
      validator: value => ['horizontal', 'vertical'].indexOf(value) !== -1,
    },
    tooltips: {
      type: Boolean,
      default: true,
    },
    legend: {
      type: Boolean,
      default: false,
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
    isHorizontal() {
      return this.direction === 'horizontal';
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
    colormapStyle() {
      return this.direction === 'horizontal' ? 'width' : 'height';
    },
    categoryHeight() {
      console.warn(100 / this.dataSummary.categories.length + (this.dataSummary.categorized ? 0 : 2));
      return 100 / (this.dataSummary.categories.length + (this.dataSummary.categorized ? 0 : 2));
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
    calculateFontSize() {
      const el = document.querySelector('.hv-categories');
      if (el) {
        const h = height(el);
        return Math.min(Math.max(h / this.dataSummary.categories.length, 6), 12);
      }
      return 12;
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
  &.hv-histogram-horizontal
    height $hv-histogram-height
    width 100%
  &.hv-histogram-vertical
    height 100%

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

.hv-colormap-horizontal
  height $hv-colormap-height
  position: relative
  .hv-colormap-col
    float left
    height 100%
    min-width 1px

.hv-colormap-vertical
  width $hv-colormap-width
  min-width $hv-colormap-width
  position relative
  flex-direction column
  .hv-colormap-col
    display block
    width 100%
    min-height 1px
.hv-colormap-container-vertical
  display flex
  height 100%
  .hv-colormap-legend
    flex 1
    flex-direction column
  .hv-categories
    overflow hidden

.hv-colormap-col
  background-color #fff

.hv-details-vertical
  float left
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
.hv-categories
  display flex
  flex-direction column
  justify-content space-between
  margin-left 16px
  .hv-category
    text-overflow: ellipsis;
    white-space nowrap
    align-items  flex-end
    flex-direction row
    font-size 12px
.hv-zero-category
  font-style italic
  opacity .5

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
