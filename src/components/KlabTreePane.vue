<template>
  <div id="klab-tree-pane">
    <klab-splitter :margin="0" :hidden="hasObservationInfo ? '' : 'right'" @close-info="onCloseInfo">
      <div slot="left-pane" id="ktp-left" class="full-height">
        <template v-if="hasTree">
          <klab-splitter :horizontal="false">
            <div slot="left-pane">
              <klab-tree
                ref="klab-tree-main-component"
                id="kt-main"
                :isMain="true"
                :class="{ 'with-splitter': hasObservationInfo }">
              </klab-tree>
            </div>
            <div slot="right-pane">
              <klab-tree
                ref="klab-tree-nomain-component"
                id="kt-not-main"
                :isMain="false"
                :class="{ 'with-splitter': hasObservationInfo }">
              </klab-tree>
            </div>
          </klab-splitter>
        </template>
        <div class="q-ma-md text-center text-white" v-else>
          {{ $t('label.noObservation') }}
        </div>
      </div>
      <div slot="right-pane" id="ktp-right" class="full-height">
        <observation-info v-if="hasObservationInfo" @shownode="informTree($event)"></observation-info>
      </div>
    </klab-splitter>
  </div>
</template>

<script>
import KlabSplitter from 'components/KlabSplitter.vue';
import KlabTree from 'components/KlabTree.vue';
import ObservationInfo from 'components/ObservationInfo.vue';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'klabTreeContainer',
  components: {
    KlabSplitter,
    KlabTree,
    ObservationInfo,
  },
  /*
  data() {
    return {
      additionalContentType: '', // 'ObservationInfo' | 'MapInfo'
    };
  },
  */
  computed: {
    ...mapGetters('data', [
      'hasTree',
    ]),
    ...mapGetters('view', [
      'hasObservationInfo',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setObservationInfo',
    ]),
    onCloseInfo() {
      this.setObservationInfo(null);
      this.$eventBus.$emit(CUSTOM_EVENTS.OBSERVATION_INFO_CLOSED);
    },
    informTree({ nodeId, isMain, state }) {
      if (isMain && this.$refs['klab-tree-main-component']) {
        this.$refs['klab-tree-main-component'].changeNodeState({ nodeId, state });
      } else if (!isMain && this.$refs['klab-tree-nomain-component']) {
        this.$refs['klab-tree-nomain-component'].changeNodeState({ nodeId, state });
      }
    },
    showNodeListener(event) {
      this.informTree(event);
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
  },
};
</script>
<style lang="stylus">
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
</style>
