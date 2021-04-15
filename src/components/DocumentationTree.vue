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
        :filter="selectedTab"
        :filter-method="noParagraph"
        >
      </klab-q-tree>
    </div>
    <q-resize-observable @resize="$emit('resized')"></q-resize-observable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_VIEWS, DOCUMENTATION_TYPES } from 'shared/Constants';
import { URLS } from 'shared/MessagesConstants';
// import SimpleBar from 'simplebar';
import KlabQTree from 'components/custom/KlabQTree';
import { CUSTOM_EVENTS } from '../shared/Constants';

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
    selectedTab: {
      get() {
        return this.$store.getters['view/documentationView'];
      },
      set(value) {
        this.$store.dispatch('view/setDocumentationView', value, { root: true });
      },
    },
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.selectedTab).tree || [];
    },
  },
  methods: {
    noParagraph(node, filter) {
      return filter === DOCUMENTATION_VIEWS.REPORT && node.type !== DOCUMENTATION_TYPES.PARAGRAPH;
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
  .dt-tree-empty
    margin 16px
    color white
  .q-tabs-head
    background-color rgba(0, 0, 0, 0)
    margin-bottom 16px
    .q-tab
      padding-top 16px
      padding-bottom 16px
      &.active
        color $main-control-main-color !important
</style>
