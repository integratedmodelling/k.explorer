<template>
  <div id="klab-tree-pane">
    <klab-splitter :margin="0" :hidden="hasObservationInfo ? '' : 'right'" @close-info="onCloseInfo">
      <div slot="left-pane" id="ktp-left" class="full-height">
        <div
          ref="kt-out-container"
          id="kt-out-container"
          v-if="hasTree"
          :class="{
            'ktp-loading':  taskOfContextIsAlive,
            'with-splitter': hasObservationInfo,
          }">
          <q-resize-observable @resize="outContainerResized"></q-resize-observable>
          <klab-tree
            ref="kt-user-tree"
            id="kt-user-tree"
            :tree="userTree"
            :is-user="true"
            :style="{ 'max-height': userTreeMaxHeight ? `${userTreeMaxHeight}px` : false }"
          >
          </klab-tree>
          <details id="kt-tree-details" :open="taskOfContextIsAlive">
            <summary></summary>
            <klab-tree
              ref="kt-tree"
              id="kt-tree"
              :tree="tree"
              :is-user="false"
              :style="{ 'max-height': treeHeight ? `${treeHeight}px` : false }"
            >
            </klab-tree>
          </details>
        </div>
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
import { dom } from 'quasar';

const { height } = dom;

export default {
  name: 'klabTreeContainer',
  components: {
    KlabSplitter,
    KlabTree,
    ObservationInfo,
  },

  data() {
    return {
      outContainerHeight: undefined,
      userTreeMaxHeight: undefined,
      userTreeHeight: undefined,
      treeHeight: undefined,
      detailsEL: undefined,
    };
  },

  computed: {
    ...mapGetters('data', [
      'tree',
      'userTree',
      'treeNode',
      'hasTree',
    ]),
    ...mapGetters('stomp', [
      'taskOfContextIsAlive',
    ]),
    ...mapGetters('view', [
      'hasObservationInfo',
      'isDocked',
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
    informTree({ nodeId, state }) {
      const node = this.treeNode(nodeId);
      if (node) {
        if (node.userNode && this.$refs['kt-user-tree']) {
          this.$refs['kt-user-tree'].changeNodeState({ nodeId, state });
        } else if (!node.userNode && this.$refs['kt-tree']) {
          this.$refs['kt-tree'].changeNodeState({ nodeId, state });
        }
      }
    },
    showNodeListener(event) {
      this.informTree(event);
    },
    outContainerResized() {
      if (this.isDocked) { // we're docked
        this.outContainerHeight = height(document.getElementById('dmc-tree')) - 24; // removed the detail size
      } else {
        this.outContainerHeight = Number.parseFloat(window.getComputedStyle(this.$refs['kt-out-container'], null).getPropertyValue('max-height'));
        this.recalculateTreeHeight();
      }
      this.recalculateTreeHeight();
    },
    recalculateTreeHeight() {
      this.$nextTick(() => {
        this.userTreeMaxHeight = this.outContainerHeight / 2;
        const userTreeEL = document.getElementById('kt-user-tree');
        if (userTreeEL && this.outContainerHeight) {
          this.userTreeHeight = height(userTreeEL);
          if (this.detailsEL && this.detailsEL.open) {
            this.treeHeight = this.outContainerHeight - this.userTreeHeight - 24;
          } else {
            this.treeHeight = undefined;
          }
        }
      });
    },
    initTree() {
      if (this.hasTree) {
        this.$nextTick(() => {
          this.outContainerResized();
          if (!this.detailsEL) {
            this.detailsEL = document.getElementById('kt-tree-details');
            this.detailsEL.addEventListener('toggle', () => {
              this.recalculateTreeHeight();
            });
          }
        });
      }
    },
  },
  watch: {
    userTree() {
      this.recalculateTreeHeight();
    },
    tree() {
      this.recalculateTreeHeight();
    },
    hasTree() {
      this.initTree();
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
    this.initTree();
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
  },
};
</script>
<style lang="stylus">
  .ktp-loading
    background linear-gradient(90deg, #333, #999)
    background-size 200% 100%
    animation loading-gradient 4s linear infinite

  .q-tree .text-white
    text-shadow 1px 0 0 #aaa

  #kt-user-tree
    padding-top 15px

  // Others
  .kt-separator
    width 96%
    left 4%
    height 2px
    border-top 1px solid rgba(124,124,124,0.8)
    border-bottom 1px solid rgba(124,124,124, 1)
    margin 0 4%

  #klab-tree-pane
    details
      padding 0 0 0 10px
      &:not([open])
        margin-bottom 15px
      summary
        outline none
        position relative
        color #484848
        font-size 1.2em
        width 97%
        cursor pointer
        &:after
          content ''
          width 96%
          left 4%
          position absolute
          top 10px
          border-top 1px solid #585858
          border-bottom 1px solid #787878
      &>div
        margin 5px 0 10px -10px

</style>
