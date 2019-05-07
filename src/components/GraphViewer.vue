<template>
  <div class="fit gv-container">
    <q-spinner class="absolute-center" v-if="graph === null" color="mc-main" size="40px"></q-spinner>
    <template v-else>
      <q-resize-observable @resize="resize" />
      <d3-network
        :net-nodes="graph.nodes"
        :net-links="graph.links"
        :options="graph.options"
        :ref="`gv-graph-${idx}`"
      ></d3-network>
    </template>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import { getAxiosContent } from 'shared/Helpers';

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
    return {
      graph: null,
      generalOptions: {
        nodeLabels: true,
        nodeSize: 10,
        resizeListener: false,
      },
      graphDiv: undefined,
    };
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
      const url = `${process.env.WS_BASE_URL}${process.env.REST_SESSION_VIEW}data/${this.observation.id}`;
      getAxiosContent(`gr_${this.observation.id}`, url, {
        params: {
          format: 'NETWORK',
          outputFormat: 'json',
        },
      }, (response, callback) => {
        if (response && typeof response.data !== 'undefined') {
          let { nodes, edges: links } = response.data;
          nodes = nodes.map(n => ({ id: n.id, name: n.label, svgSym: '~assets/klab-spinner.svg' }));
          links = links.map(l => ({
            id: l.id,
            name: l.label,
            sid: l.source,
            tid: l.target,
          }));
          this.graph = {
            id: this.observation.id,
            options: {
              ...this.generalOptions,
            },
            nodes,
            links,
          };
          this.resize();
        }
        callback();
      });
    },
    resize() {
      if (this.graph !== null) {
        console.info(`Resized to w: ${this.$el.clientWidth}, h: ${this.$el.clientHeight}`);
        this.$nextTick(() => {
          const gvGraph = this.$refs[`gv-graph-${this.idx}`];
          gvGraph.updateOptions({
            size: {
              w: this.$el.clientWidth - 10,
              h: this.$el.clientHeight - 10,
            },
          });
          gvGraph.onResize();
        });
      }
    },
  },
  watch: {
    observation(newValue) {
      if (newValue !== null) {
        this.loadGraph();
      }
    },
  },
  mounted() {
    // find or build graph
    /*
    const graph = {
      id: 1,
      options: { ...this.generalOptions },
      // eslint-disable-next-line object-curly-newline,quote-props,key-spacing,comma-spacing,object-curly-spacing
      nodes: [{'id':0,'name':'r2zfwg'},{'id':1,'name':'7slft'},{'id':2,'name':'8fcim'},{'id':3,'name':'rw48ux'},{'id':4,'name':'ci2ct'},{'id':5,'name':'lfbkd'},{'id':6,'name':'0t25xd'},{'id':7,'name':'5marna'},{'id':8,'name':'rgnnvr'},{'id':9,'name':'tok2hv'},{'id':10,'name':'v9w3th'},{'id':11,'name':'g7igz9'},{'id':12,'name':'90a33'},{'id':13,'name':'hjd46t'},{'id':14,'name':'rxvfen'},{'id':15,'name':'2wzg6d'},{'id':16,'name':'qymbx'},{'id':17,'name':'ws51c'},{'id':18,'name':'h0tbv'},{'id':19,'name':'0h74ib'},{'id':20,'name':'ot6hg3'},{'id':21,'name':'2hpowe'},{'id':22,'name':'k4ej9'},{'id':23,'name':'j0ele'},{'id':24,'name':'57bk3'},{'id':25,'name':'lo66sp'},{'id':26,'name':'i0lwqr'},{'id':27,'name':'1khpdh'},{'id':28,'name':'blhgy9'},{'id':29,'name':'nq7e6'},{'id':30,'name':'nsmhq'},{'id':31,'name':'wy29uu'},{'id':32,'name':'s8gnc5'},{'id':33,'name':'xhluwq'},{'id':34,'name':'7ssfdm'},{'id':35,'name':'nhe9t8'},{'id':36,'name':'e0xb5i'},{'id':37,'name':'cf3thk'},{'id':38,'name':'ns1lgh'},{'id':39,'name':'38rftl'},{'id':40,'name':'icg3uj'}],
      // eslint-disable-next-line object-curly-newline,quote-props,key-spacing,comma-spacing,object-curly-spacing
      links: [{'id':1,'sid':0,'tid':8},{'id':2,'sid':1,'tid':34},{'id':3,'sid':2,'tid':16},{'id':4,'sid':3,'tid':32},{'id':5,'sid':3,'tid':3},{'id':6,'sid':4,'tid':25},{'id':7,'sid':5,'tid':20},{'id':8,'sid':6,'tid':5},{'id':9,'sid':6,'tid':29},{'id':10,'sid':6,'tid':39},{'id':11,'sid':7,'tid':4},{'id':12,'sid':7,'tid':25},{'id':13,'sid':7,'tid':33},{'id':14,'sid':8,'tid':34},{'id':15,'sid':8,'tid':15},{'id':16,'sid':8,'tid':36},{'id':17,'sid':9,'tid':0},{'id':18,'sid':9,'tid':34},{'id':19,'sid':9,'tid':3},{'id':20,'sid':10,'tid':2},{'id':21,'sid':11,'tid':22},{'id':22,'sid':12,'tid':39},{'id':23,'sid':13,'tid':4},{'id':24,'sid':13,'tid':12},{'id':25,'sid':13,'tid':32},{'id':26,'sid':14,'tid':26},{'id':27,'sid':14,'tid':38},{'id':28,'sid':14,'tid':33},{'id':29,'sid':15,'tid':21},{'id':30,'sid':15,'tid':35},{'id':31,'sid':15,'tid':0},{'id':32,'sid':16,'tid':28},{'id':33,'sid':16,'tid':39},{'id':34,'sid':16,'tid':32},{'id':35,'sid':17,'tid':27},{'id':36,'sid':17,'tid':26},{'id':37,'sid':17,'tid':19},{'id':38,'sid':18,'tid':30},{'id':39,'sid':19,'tid':39},{'id':40,'sid':19,'tid':5},{'id':41,'sid':19,'tid':32},{'id':42,'sid':20,'tid':25},{'id':43,'sid':20,'tid':40},{'id':44,'sid':20,'tid':30},{'id':45,'sid':21,'tid':4},{'id':46,'sid':21,'tid':3},{'id':47,'sid':21,'tid':29},{'id':48,'sid':22,'tid':40},{'id':49,'sid':22,'tid':27},{'id':50,'sid':23,'tid':6},{'id':51,'sid':23,'tid':2},{'id':52,'sid':24,'tid':20},{'id':53,'sid':24,'tid':26},{'id':54,'sid':25,'tid':7},{'id':55,'sid':26,'tid':15},{'id':56,'sid':26,'tid':7},{'id':57,'sid':27,'tid':29},{'id':58,'sid':27,'tid':6},{'id':59,'sid':28,'tid':25},{'id':60,'sid':28,'tid':34},{'id':61,'sid':28,'tid':34},{'id':62,'sid':29,'tid':27},{'id':63,'sid':29,'tid':33},{'id':64,'sid':29,'tid':25},{'id':65,'sid':30,'tid':5},{'id':66,'sid':31,'tid':27},{'id':67,'sid':32,'tid':15},{'id':68,'sid':32,'tid':38},{'id':69,'sid':33,'tid':26},{'id':70,'sid':33,'tid':9},{'id':71,'sid':34,'tid':34},{'id':72,'sid':34,'tid':12},{'id':73,'sid':34,'tid':11},{'id':74,'sid':35,'tid':25},{'id':75,'sid':36,'tid':27},{'id':76,'sid':36,'tid':39},{'id':77,'sid':37,'tid':23},{'id':78,'sid':38,'tid':20},{'id':79,'sid':38,'tid':13},{'id':80,'sid':38,'tid':17},{'id':81,'sid':39,'tid':8},{'id':82,'sid':39,'tid':13},{'id':83,'sid':40,'tid':2},{'id':84,'sid':40,'tid':6}],
    };
    this.graph.push(graph);
    */
  },
};
</script>
<style src="vue-d3-network/dist/vue-d3-network.css"></style>
<style lang="stylus">
  @import '~variables'

  .gv-container
    background-color $grey-4
</style>
