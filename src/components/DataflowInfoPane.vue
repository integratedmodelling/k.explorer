<template>
  <div id="klab-dataflowinfo-pane" class="klab-menu-component kp-container">
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
    <div v-if="dataflowInfo !== null" class="dip-content" v-html="dataflowInfo.html"></div>
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
    this.scrollBar = new SimpleBar(document.getElementById('klab-dataflowinfo-pane'));
  },
};

</script>

<style lang="stylus">
  @import '~variables'
  .kp-container
    color white
    max-height: "calc(var(--main-control-max-height) - %s - 10px)" % ($main-control-header-height + $main-control-actions-height)
    .dip-close
      float right
    article
      padding 5px 10px
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
