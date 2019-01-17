<template>
  <div class="fit no-padding with-background" id="dfv-container">
    <div id="sprotty"></div>
  </div>
</template>

<script>
import { axiosInstance } from 'plugins/axios';
import { mapGetters, mapActions } from 'vuex';
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
      'contextId',
    ]),
    reloadDataflow: {
      get() {
        return this.$store.state.view.reloadDataflow;
      },
      set(value) {
        this.$store.state.view.reloadDataflow = value;
      },
    },
  },
  methods: {
    ...mapActions('data', [
      'addDataflow',
    ]),
    loadDataflow() {
      return new Promise((resolve, reject) => {
        if (this.dataflow === null) {
          /* This is possible?
          if (!this.hasContext) {
            reject(new Error('Ask for dataflow but no context'));
          }
          */
          axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_OBSERVATION}dataflow/${this.contextId}`, {})
            .then(({ data }) => {
              if (typeof data.jsonElkLayout !== 'undefined' && data.jsonElkLayout !== null) {
                try {
                  const jsonEklLayout = JSON.parse(data.jsonElkLayout);
                  this.addDataflow(jsonEklLayout);
                  this.doGraph();
                  this.reloadDataflow = false;
                  resolve();
                } catch (e) {
                  reject(new Error(`Error in dataflos layout for the context ${data.taskId}: ${e}`));
                }
              } else {
                reject(new Error(`Dataflow in task ${data.taskId} has no layout`));
              }
            });
        } else {
          this.reloadDataflow = false;
          resolve();
        }
      });
    },
    doGraph() {
      if (this.dataflow === null) {
        return;
      }
      if (this.processing) {
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
  },
  watch: {
    dataflow() {
      if (this.dataflow !== null) {
        this.doGraph();
      }
    },
    dataflowStatuses: {
      handler() {
        if (this.dataflow !== null) {
          this.updateStatuses();
        }
      },
      deep: true,
    },
    reloadDataflow() {
      // eslint-disable-next-line no-underscore-dangle
      if (!this._inactive) {
        this.loadDataflow();
      }
    },
  },

  mounted() {
    // Create Sprotty viewer
    // this.visible = true;
    const sprottyContainer = createContainer({ needsClientLayout: false, needsServerLayout: true }, 'info');
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
    this.loadDataflow();
  },

  activated() {
    this.loadDataflow().then(() => {
      this.visible = true;
      if (this.needsUpdate) {
        this.doGraph();
        this.updateStatuses();
        this.needsUpdate = false;
      }
    }).catch((error) => {
      console.error(error);
    });
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
