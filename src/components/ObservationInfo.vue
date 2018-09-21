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
    <div id="oi-scroll-container" :class="metadataClass">
      <div id="oi-scroll-metadata-container">
        <div id="oi-metadata" v-for="(value, name) in observationInfo.metadata" :key="name">
          <div class="oi-metadata-name">{{ name }}</div>
          <div class="oi-metadata-value" @dblclick="copyToClipboard(value)">{{ value }}</div>
        </div>
      </div>
    </div>
    <div id="oi-histogram-container" v-if="observationInfo.dataSummary !== null" :style="{ 'min-width': `${observationInfo.dataSummary.histogram.length * 4}px` }">
      <div id="oi-histogram" v-if="observationInfo.dataSummary.histogram.length > 0" @mouseout="histogramIndex = -1">
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
      <div id="oi-histogram-info">
        <div id="oi-histogram-min" class="oi-histogram-info">{{ histogramMin }}</div>
        <div id="oi-histogram-data" class="oi-histogram-info" v-html="histogramCategoryContent"></div>
        <div id="oi-histogram-max" class="oi-histogram-info">{{ histogramMax }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import { Helpers } from 'shared/Helpers';

import 'simplebar/dist/simplebar.css';

export default {
  name: 'ObservationInfo',
  data() {
    return {
      scrollBar: undefined,
      histogramIndex: -1,
    };
  },
  computed: {
    ...mapGetters('view', [
      'observationInfo',
    ]),
    maxHistogramValue() {
      return Math.max.apply(null, this.observationInfo.dataSummary.histogram);
    },
    histogramWidth() {
      return 100 / this.observationInfo.dataSummary.histogram.length;
    },
    histogramCategoryContent: {
      set(value) {
        this.histogramIndex = value;
      },
      get() {
        if (this.observationInfo.dataSummary.histogram.length === 0) {
          return this.$t('label.noHistogramValues');
        }
        if (this.histogramIndex === -1) {
          return this.$t('label.noHistogramValueSelected');
        }
        return `${this.observationInfo.dataSummary.categories[this.histogramIndex]}: <span>${this.observationInfo.dataSummary.histogram[this.histogramIndex]}</span>`;
      },
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

    metadataClass() {
      if (!this.observationInfo.visible) {
        if (this.observationInfo.dataSummary === null) {
          return '';
        }
        return 'with-histogram';
      }
      if (this.observationInfo.dataSummary === null) {
        return 'with-slider';
      }
      return 'with-slider-histogram';
    },
  },
  methods: {
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
  },
  watch: {
  },
  mounted() {
    this.scrollBar = new SimpleBar(document.getElementById('oi-scroll-container'));
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $oi-max-height = 100%
  $oi-slider-height = 30px
  $oi-histogram-height = 20%
  $oi-histogram-info-height = 10px
  $oi-histogram-minmax-width = 45px
  #oi-container {
    height $main-control-max-height - $main-control-spc-height - $main-control-scrollbar
    padding 10px 0;
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
  #oi-scroll-container.with-slider-histogram {
    height "calc(%s - 30px)" % ($oi-max-height - $oi-histogram-height)
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
    background #666
    width 100%
    position absolute
    bottom 0
    box-shadow inset 0px 0px 0px 1px rgba(119,119,119,0.5)
  }
  .oi-histogram-val:hover {
    background #6c6c6c
  }
  #oi-histogram-info {
    position: relative
  }
  .oi-histogram-info {
    height $oi-histogram-info-height
    color #fff
    text-align center
    font-size xx-small
    display inline-block
    white-space nowrap
    overflow hidden
    padding 2px
  }
  #oi-histogram-min, #oi-histogram-max {
    width $oi-histogram-minmax-width
  }
  #oi-histogram-data {
    width "calc(100% - %s)" % ($oi-histogram-minmax-width * 2)
    border-left 1px solid #7A7A7A
    border-right 1px solid #7A7A7A
  }
  #oi-histogram-data span {
    color $main-control-yellow
  }
</style>
