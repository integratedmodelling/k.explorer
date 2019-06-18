<template>
  <div class="klab-menu-component full-height dip-container">
    <div class="dip-close">
      <q-btn
        flat
        round
        size="sm"
        class="no-padding"
        icon="mdi-close"
        @click.native="closePanel"
      ></q-btn>
    </div>
    <div v-if="dataflowInfo !== null" id="dip-scroll-container">
      <div class="dip-content" v-html="dataflowInfo.html"></div>
    </div>
    <div v-else>No content</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SimpleBar from 'simplebar';

export default {
  name: 'DataflowInfoPane',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('data', [
      'dataflowInfo',
    ]),
    ...mapGetters('view', [
      'mainViewer',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setLeftMenuState',
      'setLeftMenuContent',
    ]),
    closePanel() {
      this.setLeftMenuContent(this.mainViewer.leftMenuContent);
      this.setLeftMenuState(this.mainViewer.leftMenuState);
    },
  },
  mounted() {
    if (document.getElementById('dip-scroll-container')) {
      this.scrollBar = new SimpleBar(document.getElementById('dip-scroll-container'));
    }
  },
};

</script>

<style lang="stylus">
  @import '~variables'
  .dip-container
    max-height calc(100% - 15px)
    color white
    .dip-close
      width 100%
      text-align right
    .simplebar-scrollbar:before
      background white
    article
      padding 0 10px
      h1
        font-size 1.2em
        color $main-control-main-color
        font-weight bold
      p
      table
        font-size 0.8em
        padding 10px 0
        thead
          th
            color $main-control-main-color
            text-align left
            border-bottom 1px solid $main-control-main-color

</style>
