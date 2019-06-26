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
      background #888
    article
      padding 0 10px
      h1
        font-size 1.4em
        margin 0 0 10px 0
        color $main-control-main-color
        font-weight bold
      hr
        height: 1px;
        border-left none
        border-right none
        border-top 1px solid rgba(24,24,24,0.5)
        border-bottom 1px solid #444

      .dfe-fixed
        color rgba(255, 255, 255, .6)
        font-size .7em
        p
          margin 0 0 .6em 0
      .dfe-content
        font-size .8em
        table
          padding 10px 0
          th
            color $main-control-yellow
            text-align left
            border-bottom 1px solid
            margin 0
          tr
            &:nth-child(even)
              background-color rgba(152, 152, 152, .1)
        mark
          background-color transparent
          color $main-control-yellow
          font-weight bold
        div
          margin .2em 0 .8em 0
          padding 5px
          border-radius 5px
          background-color rgba(152, 152, 152, .4)
          p
            margin-bottom .5em
</style>
