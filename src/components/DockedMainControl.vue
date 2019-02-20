<template>
  <div
    id="dmc-container"
    class="full-height"
  >
    <klab-search-bar
      ref="klab-search-bar-docked"
      @touchstart.native="doubleTouch($event, callShowSuggestions, null)"
    ></klab-search-bar>
    <div id="dmc-tree" class="q-card-main full-height">
      <klab-tree-pane :horizontal="true" class="full-height"></klab-tree-pane>
    </div>
  </div>
</template>

<script>
import KlabSearchBar from 'components/KlabSearchBar';
import KlabTreePane from 'components/KlabTreePane.vue';
import DoubleTouch from 'shared/DoubleTouchMixin';

export default {
  name: 'DockedMainControl',
  components: {
    KlabSearchBar,
    KlabTreePane,
  },
  mixins: [DoubleTouch],
  methods: {
    callShowSuggestions(event) {
      this.$refs['klab-search-bar-docked'].showSuggestions(event, true);
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  #dmc-tree
    background-color: rgba(119,119,119,0.65);
    #oi-container
      height "calc(100% -  %s)" % ($main-control-spc-height + $main-control-scrollbar + $docked-padding)
      max-height "calc(100% - %s)" % ($main-control-spc-height + $main-control-scrollbar + $docked-padding)
      #oi-metadata-map-wrapper
        height "calc(100% - %s)" % ($docked-padding + $docked-correction)
        &.with-histogram
          height "calc(100% - %s)" % ($oi-controls-height + $oi-histogram-height + $docked-correction)

    #kt-container
      height "calc(100% - %s)" % $docked-padding
      max-height "calc(100% - %s)" % $docked-padding
      position relative

</style>
