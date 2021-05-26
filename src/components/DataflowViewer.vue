<template>
  <div class="dfv-wrapper">
    <div class="fit no-padding with-background dfv-container" :class="{ 'dfv-with-info': dataflowInfoOpen }">
      <div id="sprotty"></div>
      <q-resize-observable @resize="resize" :debounce="300" />
    </div>
    <div class="dfv-info-container" v-if="dataflowInfoOpen">
      <dataflow-info width="infoWidth"></dataflow-info>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { findNodeById } from 'shared/Helpers';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { URLS } from 'shared/MessagesConstants';
import 'reflect-metadata';
import { KlabActionHandler } from 'shared/SprottyHandlers';
import { createContainer, ElkGraphJsonToSprotty } from 'ts/elk-sprotty-bridge/index';
import DataflowInfo from 'components/DataflowInfoPane.vue';
import { TYPES, FitToScreenAction, InitializeCanvasBoundsAction } from 'sprotty/lib';

export default {
  name: 'DataflowViewer',
  components: {
    DataflowInfo,
  },
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
      'dataflowInfo',
      'dataflowStatuses',
      'contextId',
      'session',
      'context',
    ]),
    ...mapGetters('view', [
      'leftMenuState',
      'dataflowInfoOpen',
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
    ...mapActions('view', [
      'setDataflowInfoOpen',
    ]),
    loadDataflow() {
      console.info('Ask for dataflow');
      this.$axios.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}dataflow/${this.contextId}`, {})
        .then(({ data }) => {
          if (typeof data.jsonElkLayout !== 'undefined' && data.jsonElkLayout !== null) {
            try {
              const jsonElkLayout = JSON.parse(data.jsonElkLayout);
              jsonElkLayout.restored = this.context.restored;
              this.addDataflow(jsonElkLayout);
            } catch (e) {
              console.error(`Error in dataflow layout for the context ${data.taskId}: ${e}`);
            }
          } else {
            console.error(`Dataflow in task ${data.taskId} has no layout`);
          }
        });
    },
    doGraph() {
      if (this.dataflow === null) {
        return;
      }
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
      this.graph = new ElkGraphJsonToSprotty().transform(dataflow);
      this.modelSource.setModel(this.graph);
      this.actionDispatcher.dispatch(new FitToScreenAction([], 40));
      this.processing = false;
      this.reloadDataflow = false;
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
        const node = findNodeById(this.graph, id);
        if (node !== null) {
          node.status = status;
        }
      }
    },
    graphNodeSelectedListener(action) {
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
        this.actionDispatcher.dispatch(new FitToScreenAction(this.dataflow ? this.dataflow.children.map(c => c.id) : [], 40));
      });
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
    if (this.dataflow === null) {
      this.loadDataflow();
    } else if (this.needsUpdate) {
      this.doGraph();
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
    #sprotty
      position absolute
      background-color #e0e0e0
      top 0
      left 0
      right 0
      bottom 0
      svg
        width 100%
        height 100%
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
          font-size 10pt
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
