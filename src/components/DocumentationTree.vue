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
        :filter-method="noParagraph"
        >
      </klab-q-tree>
    </div>
    <q-resize-observable @resize="$emit('resized')"></q-resize-observable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_VIEWS, DOCUMENTATION_TYPES, CUSTOM_EVENTS } from 'shared/Constants';
import { URLS } from 'shared/MessagesConstants';
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
      'hasContext',
      'contextId',
      'hasObservations',
      'documentationTrees',
      'documentationContent',
    ]),
    ...mapGetters('view', [
      'documentationView',
      'documentationSelected',
      'needReloadDoc',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.documentationView).tree || [];
    },
  },
  methods: {
    noParagraph(node, filter) {
      return filter !== DOCUMENTATION_VIEWS.REPORT
        || (node.type !== DOCUMENTATION_TYPES.PARAGRAPH && node.type !== DOCUMENTATION_TYPES.CITATION);
    },
    ...mapActions('data', [
      'reloadDocumentation',
    ]),
    ...mapActions('view', [
      'setNeedReloadDoc',
      'setDocumentationSelected',
    ]),
    loadDocumentation() {
      if (this.needReloadDoc && this.hasContext && this.hasObservations) {
        this.$axios.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}documentation/${this.documentationView}/${this.contextId}`, {})
          .then(({ data }) => {
            if (data === '') {
              console.warn('Empty report');
              this.content = this.$t('messages.emptyReport');
            } else {
              this.reloadDocumentation({ view: this.documentationView, documentation: data });
              this.setNeedReloadDoc(false);
            }
          });
      }
    },
  },
  watch: {
    needReloadDoc() {
      // eslint-disable-next-line no-underscore-dangle
      if (!this._inactive) {
        this.loadDocumentation();
      }
    },
    selected(newValue) {
      console.warn(`Selected ${newValue}`);
      this.setDocumentationSelected(newValue);
    },
    documentationView() {
      this.setNeedReloadDoc(true);
      this.loadDocumentation();
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.DOCUMETATION_ACTIVATED, this.loadDocumentation);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.DOCUMETATION_ACTIVATED, this.loadDocumentation);
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
