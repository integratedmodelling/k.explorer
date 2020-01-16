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
          <details id="kt-tree-details" :open="taskOfContextIsAlive || mainTreeHasNodes(true) || detailsOpen" v-show="mainTreeHasNodes()">
            <summary>
              <q-icon name="mdi-dots-horizontal" id="ktp-main-tree-arrow">
                <q-tooltip
                  :offset="[0, 0]"
                  self="top left"
                  anchor="bottom right"
                >{{ detailsOpen ? $t('tooltips.displayMainTree') : $t('tooltips.hideMainTree') }}</q-tooltip>
              </q-icon>
            </summary>
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
        <div class="q-ma-md text-center text-white ktp-no-tree" v-else-if="!hasContext">
          {{ $t('label.noContext') }}
        </div>
        <div class="q-ma-md text-center text-white ktp-no-tree" v-else>
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
      detailsOpen: false,
    };
  },

  computed: {
    ...mapGetters('data', [
      'tree',
      'userTree',
      'treeNode',
      'hasTree',
      'mainTreeHasNodes',
      'hasContext',
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
        if (this.$refs['kt-tree']) {
          this.$refs['kt-tree'].changeNodeState({ nodeId, state });
        }
        if (node.userNode && this.$refs['kt-user-tree']) {
          this.$refs['kt-user-tree'].changeNodeState({ nodeId, state });
        }
      }
    },
    showNodeListener(event) {
      this.informTree(event);
    },
    outContainerResized() {
      if (this.isDocked) { // we're docked
        this.outContainerHeight = height(document.getElementById('dmc-tree')) - 24; // removed the detail size
      } else if (this.$refs['kt-out-container']) {
        this.outContainerHeight = Number.parseFloat(window.getComputedStyle(this.$refs['kt-out-container'], null).getPropertyValue('max-height'));
        this.recalculateTreeHeight();
      }
      this.recalculateTreeHeight();
    },
    recalculateTreeHeight() {
      this.$nextTick(() => {
        this.userTreeMaxHeight = this.mainTreeHasNodes() ? this.outContainerHeight / 2 : this.outContainerHeight;
        const userTreeEL = document.getElementById('kt-user-tree');
        if (userTreeEL && this.outContainerHeight) {
          this.userTreeHeight = height(userTreeEL);
          this.treeHeight = this.outContainerHeight - this.userTreeHeight - 20;
        }
      });
    },
    initTree() {
      if (this.hasTree) {
        this.$nextTick(() => {
          this.outContainerResized();
          document.getElementById('kt-tree-details').addEventListener('toggle', (event) => {
            this.detailsOpen = event.srcElement.open;
            this.recalculateTreeHeight();
          });
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
    taskOfContextIsAlive() {
      this.detailsOpen = this.taskOfContextIsAlive;
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
    window.addEventListener('resize', this.outContainerResized);
    this.initTree();
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.SHOW_NODE, this.showNodeListener);
    window.removeEventListener('resize', this.outContainerResized);
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
    padding-bottom 10px

  // Others
  .kt-separator
    width 96%
    left 4%
    height 2px
    border-top 1px solid rgba(124,124,124,0.8)
    border-bottom 1px solid rgba(124,124,124, 1)
    margin 0 4%

  #klab-tree-pane
    user-select none
    -khtml-user-select none
    -o-user-select none
    -moz-user-select -moz-none
    -webkit-user-select none
    details
      padding 6px 0 10px 10px
      background-color #7d7d7d
      border-top 1px solid #555
      &:not([open])
        padding 0
        margin-bottom 15px
        #ktp-main-tree-arrow
          top -12px
      &[open]
        #ktp-main-tree-arrow
          transform rotate(90deg)
        .kt-download
          transform translateX(-2px)
      summary
        height 0
        outline none
        position relative
        cursor pointer
        display block
        &::-webkit-details-marker
          color transparent
      #ktp-main-tree-arrow
        position: absolute
        width 22px
        height 22px
        right 10px
        top -18px
        color #fff
        background-color #555
        border-radius 12px
        transition transform .2s ease-in-out;
      &>div
        margin 5px 0 0 -10px
  .ktp-no-tree
    height 30px
</style>
