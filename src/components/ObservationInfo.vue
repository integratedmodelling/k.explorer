<template>
  <div id="oi-container">
    <div id="oi-scroll-container">
      <div id="oi-scroll-data-container">
        <div id="oi-metadata" v-for="metadata in observationInfo.metadataInfo" :key="metadata.key">
          <div class="oi-metadata-name">{{ metadata.key }}</div><div class="oi-metadata-value">{{ metadata.value }}</div>
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
  #oi-scroll-container {
    max-height 70vh
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
</style>
