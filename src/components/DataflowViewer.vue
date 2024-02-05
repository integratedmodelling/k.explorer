<template>
  <div class="dfv-wrapper" :class="`dfv-${flowchartSelected}`">
    <div class="fit no-padding with-background dfv-container" :class="{ 'dfv-with-info': dataflowInfoOpen }">
      <div class="dfv-graph-info">
        <div class="dfv-graph-type"><span>{{ flowchart(flowchartSelected) ? flowchart(flowchartSelected).label : 'Nothing' }}</span></div>
        <div class="dfv-graph-selector">
          <q-btn
            :disable="!(flowchart(CONSTANTS.GRAPH_DATAFLOW).flowchart || flowchart(CONSTANTS.GRAPH_DATAFLOW).updatable)"
            icon="mdi-sitemap"
            class="dfv-button"
            flat
            color="app-main-color"
            :class="flowchartSelected === CONSTANTS.GRAPH_DATAFLOW ? 'dfv-graph-selected' : ''"
            @click="flowchartSelected !== CONSTANTS.GRAPH_DATAFLOW ? setFlowchartSelected(CONSTANTS.GRAPH_DATAFLOW) : false">
            <q-tooltip
              :offset="[0, 8]"
              self="bottom middle"
              anchor="top middle"
              :delay="500"
            >{{ flowchart(CONSTANTS.GRAPH_DATAFLOW).label }}</q-tooltip>
          </q-btn>
          <q-btn
            :disable="!(flowchart(CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED).flowchart || flowchart(CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED).updatable)"
            icon="mdi-graph-outline"
            flat
            color="app-main-color"
            :class="flowchartSelected ===  CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED ? 'dfv-graph-selected' : ''"
            @click="flowchartSelected !== CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED ? setFlowchartSelected(CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED) : false">
            <q-tooltip
              :offset="[0, 8]"
              self="bottom middle"
              anchor="top middle"
              :delay="500"
            >{{ flowchart(CONSTANTS.GRAPH_PROVENANCE_SIMPLIFIED).label }}</q-tooltip>
          </q-btn>
        </div>
      </div>
      <div>
        <div id="sprotty"></div>
        <q-resize-observable @resize="resize" :debounce="300" />
      </div>
    </div>
    <div class="dfv-info-container" v-if="dataflowInfoOpen">
      <dataflow-info width="infoWidth"></dataflow-info>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { findNodeById } from 'shared/Helpers';
import { CONSTANTS, CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import 'reflect-metadata';
import { KlabActionHandler } from 'shared/SprottyHandlers';
import { createContainer, ElkGraphJsonToSprotty } from 'ts/elk-sprotty-bridge/index';
import DataflowInfo from 'components/DataflowInfoPane.vue';
import { TYPES, FitToScreenAction, CenterAction, InitializeCanvasBoundsAction } from 'sprotty/lib';

export default {
  name: 'DataflowViewer',
  components: {
    DataflowInfo,
  },
  data() {
    return {
      modelSource: null,
      actionDispatcher: null,
      interval: null,
      processing: false,
      visible: false,
      needsUpdate: true,
      CONSTANTS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'flowchart',
      'flowcharts',
      'dataflowInfo',
      'dataflowStatuses',
      'contextId',
      'session',
      'context',
    ]),
    ...mapGetters('view', [
      'leftMenuState',
      'flowchartSelected',
      'dataflowInfoOpen',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadFlowchart',
    ]),
    ...mapActions('view', [
      'setFlowchartSelected',
      'setDataflowInfoOpen',
    ]),
    doGraph() {
      const flowchartObject = this.flowchart(this.flowchartSelected);
      if (flowchartObject) {
        if (this.processing) {
          setTimeout(this.doGraph(), 100);
          return;
        }
        if (flowchartObject.updatable) {
          this.loadFlowchart(this.flowchartSelected)
            .then(() => {
              // clone dataflow to avoid modification while processing
              const graph = JSON.parse(JSON.stringify(flowchartObject.flowchart));
              this.processing = true;
              flowchartObject.graph = new ElkGraphJsonToSprotty().transform(graph);
              this.setModel(flowchartObject);
              this.centerGraph();
              this.processing = false;
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (flowchartObject.graph !== null && !flowchartObject.visible) {
          this.setModel(flowchartObject);
          this.centerGraph();
        }
      }
    },
    setModel(flowchartObject) {
      this.modelSource.setModel(flowchartObject.graph);
      this.flowcharts.forEach((f) => { f.visible = false; });
      flowchartObject.visible = true;
    },
    centerGraph() {
      if (this.flowchartSelected === CONSTANTS.GRAPH_DATAFLOW) {
        this.actionDispatcher.dispatch(new FitToScreenAction([], 40));
      } else {
        this.actionDispatcher.dispatch(new CenterAction([], 40));
      }
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
        const node = findNodeById(this.flowchart(this.flowchartSelected).graph, id);
        if (node !== null) {
          node.status = status;
        }
      }
      this.modelSource.updateModel();
    },
    graphNodeSelectedListener(action) {
      if (this.flowchartSelected === CONSTANTS.GRAPH_DATAFLOW) {
        if (action !== null && action.selectedElementsIDs) {
          const { length } = action.selectedElementsIDs;
          if (length === 0) {
            this.setDataflowInfoOpen(false);
            return;
          }
          for (let i = length - 1; i >= 0; i -= 1) {
            this.sendStompMessage(MESSAGES_BUILDERS.DATAFLOW_NODE_DETAILS({
              nodeId: action.selectedElementsIDs[i],
              contextId: this.context.id,
            }, this.session).body);
          }
        }
      }
    },
    closePanel() {
      this.setDataflowInfoOpen(false);
    },
    resize() {
      this.$nextTick(() => {
        const el = document.getElementById('sprotty');
        if (el === null) {
          return;
        }
        const bounds = el.getBoundingClientRect();
        this.actionDispatcher.dispatch(new InitializeCanvasBoundsAction({
          x: bounds.left,
          y: bounds.top,
          width: bounds.width,
          height: bounds.height,
        }));
        this.centerGraph();
      });
    },
  },
  watch: {
    flowchartSelected() {
      if (this.visible) {
        this.doGraph();
      }
    },
    flowcharts: {
      handler() {
        if (this.visible) {
          this.doGraph();
        }
      },
      deep: true,
    },
    dataflowStatuses: {
      handler() {
        if (this.flowchartSelected === CONSTANTS.GRAPH_DATAFLOW && this.flowchart(this.flowchartSelected) !== null) {
          this.updateStatuses();
        }
      },
      deep: true,
    },
    dataflowInfo(newValue, oldValue) {
      if (newValue === null) {
        this.setDataflowInfoOpen(false);
      } else if (oldValue === null) {
        this.setDataflowInfoOpen(true);
      } else if (newValue.elementId === oldValue.elementId && this.dataflowInfoOpen) {
        this.setDataflowInfoOpen(false);
      } else {
        this.setDataflowInfoOpen(true);
      }
    },
    dataflowInfoOpen() {
      this.resize();
    },
  },

  mounted() {
    const sprottyContainer = createContainer({ needsClientLayout: false, needsServerLayout: true }, 'info');
    sprottyContainer.bind(TYPES.IActionHandlerInitializer).to(KlabActionHandler);
    this.modelSource = sprottyContainer.get(TYPES.ModelSource);
    this.actionDispatcher = sprottyContainer.get(TYPES.IActionDispatcher);
    this.$eventBus.$on(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, this.graphNodeSelectedListener);
  },

  activated() {
    this.visible = true;
    this.doGraph();
    if (this.flowchartSelected === CONSTANTS.GRAPH_DATAFLOW && this.needsUpdate) {
      this.updateStatuses();
      this.needsUpdate = false;
    }
  },
  deactivated() {
    this.visible = false;
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.GRAPH_NODE_SELECTED, this.graphNodeSelectedListener);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  opaque(variable, opacity = 1)
    s('rgba(var(%s), %s)', variable, opacity)

  .dfv-container
    width 100%
    &.dfv-with-info
      width calc(100% - 320px)
      #sprotty
        right 320px
    .dfv-graph-info
      position absolute
      top 0
      left 0
      width 100%
      height 40px
      background-color var(--app-background-color)
      border-bottom 1px solid "rgba(%s, .1)" % var(--app-rgb-main-color)
      border-left 1px solid "rgba(%s, .1)" % var(--app-rgb-main-color)
      .dfv-graph-type
        padding 10px
        font-weight 500
        min-width 100px
        width 50%
        float left
        color var(--app-title-color)
      .dfv-graph-selector
        text-align right
        min-width 100px
        width 50%
        right 0
        float left
        margin 1px 0
      .dfv-graph-selected
        cursor default
        background-color var(--app-main-color)
        color var(--app-background-color)
    #sprotty
      position absolute
      background-color #e0e0e0
      top 40px
      left 0
      right 0
      bottom 0
      svg
        width 100%
        height calc(100% - 5px)
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
          font-family Roboto
          font-size 12px
          dominant-baseline middle
        .elkjunction
          stroke none
          fill $blue-grey-9
        .selected > rect
          stroke-width 3px
        .mouseover
          stroke-width 2px

        .elk-resources
        .elk-actuator
        .elk-resolver
        .elk-instantiator
        .elk-table
          stroke-width 2px
        .waiting
          &.elk-resource
            fill $green-1
            stroke $green-2
          &.elk-actuator
          &.elk-resolver
            fill $blue-grey-11
            stroke $blue-grey-12
          &.elk-instantiator
          &.elk-table
            fill $grey-4
            stroke $grey-5
          // provenance
          &.elk-resource_entity
            fill $teal-3
            stroke blue-$grey-4
          &.elk-semantic_entity
            fill $teal-2
            stroke $teal-3
          &.elk-literal_entity
            fill $teal-3
            stroke $teal-4
          &.elk-model_activity
            fill $teal-4
            stroke $teal-5
          &.elk-task_activity
            fill $teal-1
            stroke $teal-2
          &.elk-dataflow_plan
            fill $teal-2
            stroke $teal-3
          &.elk-klab_agent
            fill $teal-3
            stroke $teal-4
          &.elk-user_agent
            fill $teal-4
            stroke $teal-5
          &.elk-view_entity
            fill $teal-4
            stroke $teal-5
        .processed
          &.elk-resource
            fill $green-2
            stroke $green-3
          &.elk-actuator
          &.elk-resolver
            fill $blue-grey-12
            stroke $blue-grey-13
          &.elk-instantiator
          &.elk-table
            fill $grey-5
            stroke $grey-6
        .processing
          &.elk-resource
            fill $green-3
            stroke $green-4
          &.elk-actuator
          &.elk-resolver
            fill $blue-grey-13
            stroke $blue-grey-14
          &.elk-instantiator
          &.elk-table
            fill $grey-6
            stroke $grey-7
  /*
  .dfv-wrapper
    &.dfv-provenance_simplified
    &.dfv-dataflow
      .elk-resolver
        fill $grey-3 !important
        stroke $grey-4 !important
*/
  .dfv-info-container
    position absolute
    background-color rgba(35,35,35,0.9)
    overflow: hidden
    height 100% !important
    width 320px
    left calc(100% - 320px);
    right 0
    bottom 0
    top 0
    z-index 1001
  .kd-is-app
    #dfv-container #sprotty
      background-color var(--app-darken-background-color)
      padding-left 16px
    .dfv-info-container
      background-color opaque(--app-rgb-background-color, 0.9)
</style>
