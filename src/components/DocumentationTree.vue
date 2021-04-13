<template>
  <div
    class="dt-container relative-position klab-menu-component"
  >
    <q-tabs
      v-model="selectedTab"
      color="mc-main"
      underline-color="mc-main"
    >
      <q-tab slot="title" :name="DOCUMENTATION_VIEWS.REPORT" class="klab-tab" icon="mdi-text-box-outline" />
      <q-tab slot="title" :name="DOCUMENTATION_VIEWS.TABLES" class="klab-tab" icon="mdi-table" />
      <q-tab slot="title" :name="DOCUMENTATION_VIEWS.FIGURES" class="klab-tab" icon="mdi-image" />
      <q-tab slot="title" :name="DOCUMENTATION_VIEWS.RESOURCES" class="klab-tab" icon="mdi-database-outline" />
      <q-tab slot="title" :name="DOCUMENTATION_VIEWS.MODELS" class="klab-tab" icon="mdi-graph-outline" />
    </q-tabs>
    <div class="dt-doc-container simplebar-vertical-only">
      <div v-show="tree.length === 0" class="dt-tree-empty">{{ $t('label.noDocumentation') }}</div>
      <klab-q-tree
        ref="klab-doc-tree"
        :nodes="tree"
        node-key="id"
        :selected.sync="selected"
        :expanded.sync="expanded"
        text-color="white"
        control-color="white"
        color="white"
        :dark="true"
        :no-nodes-label="$t('label.noNodes')"
        :no-results-label="$t('label.noNodes')"
        :double-click-function="doubleClick"
        :filter="view"
        :filter-method="noParagraph"
        >
      </klab-q-tree>
    </div>
    <q-resize-observable @resize="$emit('resized')"></q-resize-observable>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { DOCUMENTATION_VIEWS, DOCUMENTATION_TYPES } from 'shared/Constants';
// import SimpleBar from 'simplebar';
import KlabQTree from 'components/custom/KlabQTree';

export default {
  name: 'DocumentationTree',
  components: {
    KlabQTree,
  },
  props: {
    view: {
      type: String,
      default: DOCUMENTATION_VIEWS.REPORT,
    },
  },
  data() {
    return {
      selected: null,
      expanded: [],
      selectedTab: this.view,
      DOCUMENTATION_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'documentationTrees',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.selectedTab).tree || [];
    },
  },
  methods: {
    async doubleClick() {
      // NOTHING TO DO
    },
    noParagraph(node, filter) {
      return filter === DOCUMENTATION_VIEWS.REPORT && node.type !== DOCUMENTATION_TYPES.PARAGRAPH;
    },
  },
  watch: {
  },
  mounted() {
  },
  beforeDestroy() {
  },

};
</script>
<style lang="stylus">
@import '~variables'
.dt-container
  .dt-tree-empty
    margin 16px 0
    color white
  .q-tabs-head
    background-color rgba(0, 0, 0, 0)
    margin-bottom 16px
    .q-tab
      padding-top 16px
      padding-bottom 16px
      &.active
        color $main-control-main-color
</style>
