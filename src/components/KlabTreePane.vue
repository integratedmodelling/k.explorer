<template>
  <div id="klab-tree-pane">
    <klab-splitter :margin="0" :hidden="additionalContentType === '' ? 'right' : ''" @close-info="onCloseInfo">
      <div slot="left-pane">
        <klab-tree></klab-tree>
      </div>
      <div slot="right-pane">
        <transition
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <component :is="additionalContentType"></component>
        </transition>
      </div>
    </klab-splitter>
  </div>
</template>

<script>
import KlabTree from 'components/KlabTree.vue';
import KlabSplitter from 'components/KlabSplitter.vue';
import ObservationInfo from 'components/ObservationInfo.vue';
import MapInfo from 'components/MapInfo.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'klabTreeContainer',
  data() {
    return {
      additionalContentType: '', // 'ObservationInfo' | 'MapInfo'
    };
  },
  computed: {
    ...mapGetters('view', [
      'hasObservationInfo',
      'exploreMapMode',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'resetObservationInfo',
    ]),
    onCloseInfo() {
      this.additionalContentType = '';
      this.resetObservationInfo();
    },
  },
  mounted() {
  },
  watch: {
    exploreMapMode() {
      if (this.exploreMapMode) {
        this.additionalContentType = 'MapInfo';
      } else {
        this.additionalContentType = '';
      }
    },
    hasObservationInfo() {
      if (!this.hasObservationInfo) {
        this.additionalContentType = '';
        return;
      }
      // if exploreMap mode is active, nothing to do
      if (this.exploreMapMode) {
        return;
      }
      this.additionalContentType = 'ObservationInfo';
    },
  },
  components: {
    KlabTree,
    KlabSplitter,
    ObservationInfo,
    MapInfo,
  },
};
</script>
<style lang="stylus">
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
</style>
