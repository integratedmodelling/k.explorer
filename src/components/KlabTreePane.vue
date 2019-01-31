<template>
  <div id="klab-tree-pane">
    <klab-splitter :margin="0" :hidden="hasObservationInfo ? '' : 'right'" @close-info="onCloseInfo">
      <div slot="left-pane" id="ktp-left" class="full-height">
        <klab-tree v-if="hasTree" :class="{ 'with-splitter': hasObservationInfo }"></klab-tree>
        <div class="q-ma-md text-center text-white" v-else>
          {{ $t('label.noObservation') }}
        </div>
      </div>
      <div slot="right-pane" id="ktp-right" class="full-height">
        <observation-info v-if="hasObservationInfo"></observation-info>
      </div>
    </klab-splitter>
  </div>
</template>

<script>
import KlabTree from 'components/KlabTree.vue';
import KlabSplitter from 'components/KlabSplitter.vue';
import ObservationInfo from 'components/ObservationInfo.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'klabTreeContainer',
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
    },
  },
  mounted() {
  },
  watch: {
  },
  components: {
    KlabTree,
    KlabSplitter,
    ObservationInfo,
  },
};
</script>
<style lang="stylus">
  .q-tree .text-white {
    text-shadow: 1px 0 0 #aaa;
  }
</style>
