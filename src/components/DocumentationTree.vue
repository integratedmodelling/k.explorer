<template>
  <div
    class="dt-container relative-position klab-menu-component"
  >
    <div class="dt-doc-container simplebar-vertical-only">
      <div v-show="tree.length === 0" class="dt-tree-empty">{{ $t('label.noDocumentation') }}</div>
      <klab-q-tree
        :nodes="tree"
        node-key="id"
        :check-click="false"
        :selected.sync="selected"
        :expanded.sync="expanded"
        :ticked.sync="ticked"
        text-color="white"
        control-color="white"
        color="white"
        :dark="true"
        :no-nodes-label="$t('label.noNodes')"
        :no-results-label="$t('label.noNodes')"
        :filter="documentationView"
        :filter-method="filter"
        >
      </klab-q-tree>
    </div>
    <q-resize-observable @resize="$emit('resized')"></q-resize-observable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_VIEWS, DOCUMENTATION_TYPES } from 'shared/Constants';
import KlabQTree from 'components/custom/KlabQTree';

export default {
  name: 'DocumentationTree',
  components: {
    KlabQTree,
  },
  data() {
    return {
      expanded: [],
      selected: null,
      ticked: [],
      DOCUMENTATION_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'documentationTrees',
    ]),
    ...mapGetters('view', [
      'documentationView',
      'documentationSelected',
    ]),
    tree() {
      const tree = this.documentationTrees.find(dt => dt.view === this.documentationView).tree || [];
      return tree;
    },
  },
  methods: {
    ...mapActions('view', [
      'setDocumentationSelected',
    ]),
    filter(node, filter) {
      return filter !== DOCUMENTATION_VIEWS.REPORT
        || (node.type !== DOCUMENTATION_TYPES.PARAGRAPH && node.type !== DOCUMENTATION_TYPES.CITATION);
    },
  },
  watch: {
    selected(newValue) {
      this.setDocumentationSelected(newValue);
    },
    documentationSelected() {
      this.selected = this.documentationSelected;
    },
  },
  mounted() {
    this.selected = this.documentationSelected;
  },
};
</script>
<style lang="stylus">
@import '~variables'
.dt-container
  padding-top 16px
  .dt-tree-empty
    margin 16px
    color white

</style>
