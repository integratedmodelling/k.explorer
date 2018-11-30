<template>
  <div class="fit no-padding" id="dfv-container">
    <div id="sprotty"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// import ELK from 'elkjs';
// eslint-disable-next-line object-curly-newline
import { createContainer, TYPES, FitToScreenAction, /* UpdateModelAction, */ElkGraphJsonToSprotty } from 'klab-elk-sprotty-bridge/lib';


export default {
  name: 'DataflowViewer',
  data() {
    return {
      graph: null, // the sprotty dataflow
      modelSource: null,
      actionDispatcher: null,
      interval: null,
      processing: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'dataflow',
    ]),
  },
  methods: {
    doGraph() {
      if (this.processing) {
        setTimeout(this.doGraph(), 100);
        return;
      }
      // clone dataflow to avoid modification while processing
      const dataflow = JSON.parse(JSON.stringify(this.dataflow));
      this.processing = true;
      // const firstGraph = this.graph === null;
      this.graph = new ElkGraphJsonToSprotty().transform(dataflow);
      // if (firstGraph) {
      this.modelSource.setModel(this.graph);
      this.actionDispatcher.dispatch(new FitToScreenAction([]));
      // } else {
      //  this.actionDispatcher.dispatch(new UpdateModelAction(this.graph));
      // }
      this.processing = false;
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
    const sprottyContainer = createContainer(false, 'info');
    this.modelSource = sprottyContainer.get(TYPES.ModelSource);
    this.actionDispatcher = sprottyContainer.get(TYPES.IActionDispatcher);
    this.doGraph();
    // setInterval(() => this.changeModel(), 1000);
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
        width 98%
        height 98%
        margin auto
        .elknode
          stroke #448
          stroke-width 1
          fill #ddf
        .elkport
          stroke #448
          stroke-width 1
          fill #66c
        .elkedge
          fill none
          stroke #224
          stroke-width 1
        .elkedge.arrow
          fill #336
        .elklabel
          stroke-width 0
          stroke #000
          fill #000
          font-family sans-serif
          //font-size 10pt
          dominant-baseline middle
        .elkjunction
          stroke none
          fill #224
        .selected > rect
          stroke-width 3
        .mouseover
          stroke #88f
        .waiting
          fill #ffab32
        .processed
          fill #0f0
        .processing
          fill #f00
</style>
