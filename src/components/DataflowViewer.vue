<template>
  <div class="fit no-padding"  @click.native="change">
    <div id="sprotty"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// eslint-disable-next-line object-curly-newline
import { createContainer, TYPES, FitToScreenAction, UpdateModelAction, ElkGraphJsonToSprotty, LocalModelSource } from 'klab-elk-sprotty-bridge/lib';
import { Helpers } from '../shared/Helpers';

export default {
  name: 'DataflowViewer',
  data() {
    return {
      graph: undefined, // the sprotty dataflow
      modelSource: undefined,
      actionDispatcher: undefined,
      elkToSprotty: undefined,
      interval: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'dataflow',
    ]),
  },
  methods: {
    initGraph() {
      if (this.dataflow !== null) {
        this.$ELK.layout(this.dataflow).then((graph) => {
          this.graph = new ElkGraphJsonToSprotty().transform(graph);
          this.modelSource.setModel(this.graph);
          this.actionDispatcher.dispatch(new FitToScreenAction([]));
        });
      } else {
        this.graph = null;
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
  },
  watch: {
    dataflow() {
      if (this.dataflow === null) {
        this.initGraph();
      }
    },
  },
  mounted() {
    // Create Sprotty viewer
    const sprottyContainer = createContainer();
    sprottyContainer.bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();
    this.modelSource = sprottyContainer.get(TYPES.ModelSource);
    this.actionDispatcher = sprottyContainer.get(TYPES.IActionDispatcher);
    this.elkToSprotty = new ElkGraphJsonToSprotty();
    this.initGraph();
    setInterval(() => this.changeModel(), 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

};
</script>

<style>
  #sprotty {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  svg {
    width: 100%;
    height: 100%;
  }
  .elknode {
    stroke: #448;
    stroke-width: 1;
    fill: #ddf;
  }

  .elkport {
    stroke: #448;
    stroke-width: 1;
    fill: #66c;
  }

  .elkedge {
    fill: none;
    stroke: #224;
    stroke-width: 1;
  }

  .elkedge.arrow {
    fill: #336;
  }

  .elklabel {
    stroke-width: 0;
    stroke: #000;
    fill: #000;
    font-family: sans-serif;
    font-size: 10pt;
    dominant-baseline: hanging;
  }

  .elkjunction {
    stroke: none;
    fill: #224;
  }

  .selected > rect {
    stroke-width: 3;
  }

  .mouseover {
    stroke: #88f;
  }

  .waiting {
    fill: #ffab32;
  }
  .processed {
    fill: #0f0;
  }

  .processing {
    fill: #f00;
  }


</style>
