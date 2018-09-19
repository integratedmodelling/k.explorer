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
          <div class="oi-metadata-name">{{ name }}</div><div class="oi-metadata-value">{{ value }}</div>
        </div>
      </div>
    </div>
    <div id="oi-histogram-container" v-if="observationInfo.dataSummary !== null" :style="{ 'min-width': `${observationInfo.dataSummary.histogram.length * 4}px` }">
      <div id="oi-histogram" @mouseout="histogramCategory = null">
        <div
          class="oi-histogram-col"
          v-for="(data, index) in observationInfo.dataSummary.histogram"
          :key="index"
          :style="{ width:`${histogramWidth}%`, left: `${histogramWidth * index}%` }"
          @mouseover="histogramCategory = observationInfo.dataSummary.categories[index]"
        >
          <div class="oi-histogram-val" :style="{ height: `${getHeight(data)}%` }">
          </div>
        </div>
      </div>
      <div id="oi-histogram-data">{{ histogramCategoryLabel }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';

import 'simplebar/dist/simplebar.css';

export default {
  name: 'ObservationInfo',
  data() {
    return {
      scrollBar: undefined,
      histogramCategory: null,
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
      return Math.floor(100 / this.observationInfo.dataSummary.histogram.length);
    },
    histogramCategoryLabel: {
      set(value) {
        this.histogramCategory = value;
      },
      get() {
        return this.histogramCategory === null ? this.$t('label.noHistogramValueSelected') : this.histogramCategory;
      },
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
      return Math.floor(value * 100 / this.maxHistogramValue);
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
  $max-height = 68vh
  $slider-height = 30px
  $histogram-height = 20vh
  $histogram-data-height = 20px
  #oi-scroll-container {
    height $max-height
  }
  #oi-scroll-container.with-slider {
    height "calc(%s - 30px)" % $max-height
  }
  #oi-scroll-container.with-histogram {
    height $max-height - $histogram-height
  }
  #oi-scroll-container.with-slider-histogram {
    height "calc(%s - 30px)" % ($max-height - $histogram-height)
  }
  #oi-histogram-container {
    width 100%
    height $histogram-height
  }
  #oi-histogram {
    height: "calc(100% - %s)" % $histogram-data-height;
    position: relative;
  }
  .oi-histogram {
    position: absolute;
    background: #fff;
    bottom: 0;
  }
  .oi-histogram-col {
    position absolute
    height 100%
    background #777
  }
  .oi-histogram-col:hover {
    background #7c7c7c
  }
  .oi-histogram-val {
    background #666
    width 100%
    position absolute
    bottom 0
    box-shadow inset 0px 0px 0px 1px #777
  }
  .oi-histogram-val:hover {
    background #6c6c6c
  }
  #oi-histogram-data {
    height $histogram-data-height
    padding 5px
    color #fff
    font-size smaller
  }
  #oi-slider {
    height $slider-height
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
  .q-slider {
    padding 0 10px 0 5px
  }
</style>
