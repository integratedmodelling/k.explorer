<template>
  <div class="fit no-padding with-background" id="dfv-container">
    <div id="sprotty"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Helpers } from 'shared/Helpers';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import 'reflect-metadata';
import { SelectHandlerInitializer } from 'shared/SprottyHandlers';
import { createContainer, ElkGraphJsonToSprotty } from 'k.elksprottybridge/lib';
import { TYPES, FitToScreenAction } from 'sprotty/lib';


export default {
  name: 'DataflowViewer',
  data() {
    return {
      graph: null, // the sprotty dataflow
      modelSource: null,
      actionDispatcher: null,
      interval: null,
      processing: false,
      visible: false,
      needsUpdate: true,
    };
  },
  computed: {
    ...mapGetters('data', [
      'dataflow',
      'dataflowStatuses',
    ]),
  },
  methods: {
    doGraph() {
      if (this.processing) {
        setTimeout(this.doGraph(), 100);
        return;
      }
      if (!this.visible) {
        this.needsUpdate = true;
        return;
      }
      // clone dataflow to avoid modification while processing
      const dataflow = JSON.parse(JSON.stringify(this.dataflow));
      this.processing = true;
      // const firstGraph = this.graph === null;
      this.graph = new ElkGraphJsonToSprotty().transform(dataflow);
      // if (firstGraph) {
      // this.updateStatuses();
      this.modelSource.setModel(this.graph);
      console.debug(JSON.stringify(this.graph, null, 4));
      this.actionDispatcher.dispatch(new FitToScreenAction([]));
      // } else {
      //  this.actionDispatcher.dispatch(new UpdateModelAction(this.graph));
      // }
      this.processing = false;
    },
    updateStatuses() {
      if (!this.visible) {
        this.needsUpdate = true;
        return;
      }
      if (this.dataflowStatuses.length === 0) {
        return;
      }
      const { length } = this.dataflowStatuses;
      for (let i = 0; i < length; i++) {
        const { id, status } = this.dataflowStatuses[i];
        const node = Helpers.findNodeById(this.graph, id);
        if (node !== null) {
          node.status = status;
          this.modelSource.updateModel();
        }
      }
    },
    /*
    changeModel() {
      for (let i = 0; i < this.graph.children.length; ++i) {
        const child = this.graph.children[i];
        if (child.status === 'waiting') {
          child.status = 'processing';
        } else if (child.status === 'processing') {
          child.status = 'processed';
        } else {
          child.status = 'waiting';
        }
      }
      // modelSource.update() would trigger hidden bounds computation, which is not necessary here
      this.actionDispatcher.dispatch(new UpdateModelAction(this.graph));
    },
    */
    /*
    updateSprottyModel(graph) {

    },
    */
    /*
    changeModel() {
      const id = Math.floor(Math.random() * 30);
      const node = Helpers.findNodeById(this.graph, `N${id}`);
      if (node !== null) {
        if (node.status === 'waiting') {
          node.status = 'processing';
        } else {
          node.status = 'processed';
        }
      }
      this.actionDispatcher.dispatch(new UpdateModelAction(this.graph));
      // this.modelSource.update();
    },
    */
  },
  watch: {
    dataflow() {
      if (this.dataflow !== null) {
        this.doGraph();
      }
    },
    dataflowStatuses: {
      handler() {
        this.updateStatuses();
      },
      deep: true,
    },
  },
  created() {
    // this.elk = new ELK({
    /*
      defaultLayoutOptions: {
        'elk.algorithm': 'layered',
        'elk.direction': 'DOWN',
      },
    */
    // });
  },
  mounted() {
    // Create Sprotty viewer
    // this.visible = true;
    const sprottyContainer = createContainer(false, 'info');
    sprottyContainer.bind(TYPES.IActionHandlerInitializer).to(SelectHandlerInitializer);

    this.modelSource = sprottyContainer.get(TYPES.ModelSource);
    this.actionDispatcher = sprottyContainer.get(TYPES.IActionDispatcher);
    this.$eventBus.$on(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, (action) => {
      if (action !== null && action.selectedElementsIDs) {
        const { length } = action.selectedElementsIDs;
        for (let i = length - 1; i >= 0; i -= 1) {
          this.sendStompMessage(MESSAGES_BUILDERS.DATAFLOW_NODE_DETAILS({ nodeId: action.selectedElementsIDs[i] }, this.session).body);
        }
      }
    });
  },
  activated() {
    this.visible = true;
    if (this.needsUpdate) {
      this.doGraph();
      this.updateStatuses();
      this.needsUpdate = false;
    }
  },
  deactivated() {
    this.visible = false;
  },
  beforeDestroy() {
    // clearInterval(this.interval);
  },

};
</script>

<style lang="stylus">
  @import '~variables'
  #dfv-container
    #sprotty
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      svg
        width 100%
        height 99%
        cursor default
        &:focus
          outline-style none
        .elknode
          stroke $blue-grey-3
          fill $blue-grey-1
          stroke-width 1
        .elkport
          stroke $blue-grey-5
          stroke-width 1
          fill $blue-grey-5
        .elkedge
          fill none;
          stroke $blue-grey-7
          stroke-width 1
        .elkedge.arrow
          fill $blue-grey-9
        .elklabel
          stroke-width 0
          stroke #000
          fill #000
          font-family monospace
          font-size 10pt
          dominant-baseline middle
        .elkjunction
          stroke none
          fill $blue-grey-9
        .selected > rect
          stroke-width 3
        .mouseover
          stroke $blue-grey-11
        .waiting
          /* fill #ffab32 */
        .processed
          fill $blue-grey-11
        .processing
          fill $blue-grey-13
</style>
