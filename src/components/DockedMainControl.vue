<template>
  <div id="dmc-container" class="full-height">
    <klab-search-bar></klab-search-bar>
    <div id="dmc-tree" class="q-card-main">
      <klab-tree-pane :horizontal="true"></klab-tree-pane>
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
    background-color rgba(119,119,119,0.3)
</style>
