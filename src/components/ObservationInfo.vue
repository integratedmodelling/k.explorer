<template>
  <div id="oi-container">
    <div id="oi-label">{{ observationInfo.label }}</div>
    <q-slider
      :disabled="!observationInfo.visible"
      :readonly="!observationInfo.visible"
      v-model="observationInfo.layerOpacity"
      :min="0"
      :max="1"
      :step="0.1"
      :decimals="1"
      color="mc-yellow"
      label
      :label-value="`${observationInfo.layerOpacity*100}%`"
    />
    <div id="oi-scroll-container">
      <div id="oi-scroll-data-container">
        <div id="oi-metadata" v-for="(value, name) in observationInfo.metadata" :key="name">
          <div class="oi-metadata-name">{{ name }}</div><div class="oi-metadata-value">{{ value }}</div>
        </div>
      </div>
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
    };
  },
  computed: {
    ...mapGetters('view', [
      'observationInfo',
    ]),
  },
  mounted() {
    this.scrollBar = new SimpleBar(document.getElementById('oi-scroll-container'));
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #oi-label {
    color $main-control-yellow
    font-size larger
    padding 5px
    font-weight bold
    text-shadow 0 0 1px #666
  }
  #oi-scroll-container {
    max-height 60vh
  }
  .oi-metadata-name {
    color $main-control-yellow
    font-weight bold
    padding 0 0 5px 5px
  }
  .oi-metadata-value {
    color white
    margin 0 5px 10px 5px
    border 1px solid #999
    padding 2px 0 2px 5px
  }
  .q-slider {
    padding 0 10px 0 5px
  }
</style>
