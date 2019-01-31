<template>
  <div id="dmc-container" class="full-height">
    <klab-search-bar></klab-search-bar>
    <div id="dmc-tree" class="q-card-main full-height">
      <klab-tree-pane :horizontal="true" class="full-height"></klab-tree-pane>
    </div>
  </div>
</template>

<script>
import KlabSearchBar from 'components/KlabSearchBar';
import KlabTreePane from 'components/KlabTreePane.vue';

export default {
  name: 'DockedMainControl',
  components: {
    KlabSearchBar,
    KlabTreePane,
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
      height "calc(100% -  %s)" % ($main-control-spc-height + $main-control-scrollbar + $docked-padding + $docked-correction)
      max-height "calc(100% - %s)" % ($main-control-spc-height + $main-control-scrollbar + $docked-padding + $docked-correction)
      #oi-scroll-container
        height "calc(100% - %s)" % ($main-control-scrollbar + $docked-correction)
        &.with-mapinfo
          height "calc(100% - %s)" % ($main-control-scrollbar + $docked-correction + $oi-mapinfo-min-height)
    #kt-container
      height "calc(100% - %s)"
      max-height "calc(100% - %s)" % $docked-padding
      position relative

</style>
