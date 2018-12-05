<template>
  <div class="fit no-padding" id="dfv-container">
    <div id="sprotty"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Helpers } from 'shared/Helpers';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import 'reflect-metadata';
import { createContainer, ElkGraphJsonToSprotty } from 'klab-elk-sprotty-bridge/lib';
import { TYPES, FitToScreenAction } from 'sprotty/lib';
import { SelectHandlerInitializer } from 'shared/SprottyHandlers';


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
      console.log(JSON.stringify(this.graph, null, 4));
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
          // stroke #9da6e0
          // fill #eaedff
          stroke #86b38e
          fill #e7ffee
          stroke-width 1
        .elkport
          stroke: #777;
          stroke-width 1
          fill #35cc82
        .elkedge
          fill: none;
          stroke: #777;
          stroke-width: 1;
        .elkedge.arrow
          fill #3e664d
        .elklabel
          stroke-width 0
          stroke #000
          fill #000
          font-family sans-serif
          //font-size 10pt
          dominant-baseline middle
        .elkjunction
          stroke none
          fill #35443c
        .selected > rect
          stroke-width 3
        .mouseover
          stroke #408062
        .waiting
          /* fill #ffab32 */
        .processed
          fill #8fb
        .processing
          fill #ffb3b3
</style>
