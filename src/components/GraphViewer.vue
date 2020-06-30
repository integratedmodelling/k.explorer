<template>
  <div class="fit gv-container" @wheel="changeForce">
    <q-spinner v-if="nodes.length === 0" color="mc-main" :size="40"></q-spinner>
    <q-resize-observable @resize="resize" />
    <d3-network
      :net-nodes="nodes"
      :net-links="links"
      :options="options"
      :ref="`gv-graph-${idx}`"
    ></d3-network>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import { getAxiosContent } from 'shared/Helpers';
import { graphDefaultData, CUSTOM_EVENTS } from 'shared/Constants';
import { URLS } from 'shared/MessagesConstants';

export default {
  name: 'GraphViewer',
  components: {
    D3Network,
  },
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  data() {
    const data = Object.assign({}, graphDefaultData);
    return data;
  },
  computed: {
    observation() {
      const obs = this.$store.getters['data/observationsOfViewer'](this.idx);
      if (obs.length > 0) {
        return obs[0];
      }
      return null;
    },
  },
  methods: {
    loadGraph() {
      const url = `${process.env.WS_BASE_URL}${URLS.REST_SESSION_VIEW}data/${this.observation.id}`;
      getAxiosContent(`gr_${this.observation.id}`, url, {
        params: {
          format: 'NETWORK',
          outputFormat: 'json',
        },
      }, (response, callback) => {
        if (response && typeof response.data !== 'undefined') {
          const { nodes, edges: links } = response.data;
          this.nodes = nodes.map(n => ({
            id: n.id,
            name: n.label,
            nodeSym: '~assets/klab-spinner.svg',
          }));
          this.links = links.map(l => ({
            id: l.id,
            name: l.label,
            sid: l.source,
            tid: l.target,
          }));
          this.resize();
        }
        callback();
      });
    },
    resize() {
      const size = {
        w: this.$el.clientWidth,
        h: this.$el.clientHeight,
      };
      this.updateOptions('size', size);
    },
    changeForce(event) {
      event.preventDefault();
      if (event && event.deltaY) {
        let { force } = this.options;
        if (event.deltaY < 0 && force < 5000) {
          force += 50;
        } else if (event.deltaY > 0 && force > 50) {
          force -= 50;
        } else {
          return;
        }
        this.updateOptions('force', force);
      }
    },
    updateOptions(name, value) {
      this.options = { ...this.options, [name]: value };
    },
    reset() {
      this.selected = {};
      this.linksSelected = {};
      this.nodes = [];
      this.links = [];
      this.$set(this.$data, 'options', graphDefaultData.options);
    },
    viewerClosedListener({ idx }) {
      if (idx === this.idx) {
        this.$eventBus.$emit(CUSTOM_EVENTS.SHOW_NODE, { nodeId: this.observation.id, state: false });
      }
    },
  },
  watch: {
    observation(newValue) {
      if (newValue !== null && this.nodes.length === 0) {
        this.loadGraph();
      } else if (newValue === null) {
        this.reset();
      }
    },
  },
  mounted() {
    this.options.size.w = this.$el.clientWidth;
    this.options.size.h = this.$el.clientHeight;
    this.$eventBus.$on(CUSTOM_EVENTS.VIEWER_CLOSED, this.viewerClosedListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.VIEWER_CLOSED, this.viewerClosedListener);
  },
};
</script>
<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<style lang="stylus">
  @import '~variables'

  .gv-container
    background-color $grey-4
    overflow hidden
    .q-spinner
      position absolute
      top calc(50% - 20px)
      left calc(50% - 20px)
</style>
