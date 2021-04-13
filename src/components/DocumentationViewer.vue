<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <div class="dv-empty-documentation" v-if="content === ''">{{ $t('messages.noDocumentation') }}</div>
      <div class="dv-content" v-html="content" v-else></div>
      <q-btn icon="mdi-refresh" round class="mc-report-reload" color="mc-main" @click="forceReload">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appReload')}}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { URLS } from 'shared/MessagesConstants';
import { DOCUMENTATION_VIEWS, DOCUMENTATION_TYPES } from 'shared/Constants';
import { flattenTree } from 'shared/Helpers';
// import SimpleBar from 'simplebar';

export default {
  name: 'DocumentationViewer',
  props: {
    view: {
      type: String,
      default: DOCUMENTATION_VIEWS.REPORT,
    },
  },
  data() {
    return {
      content: '',
      rawDocumentation: [],
    };
  },
  computed: {
    ...mapState('view', [
      'reloadDocumentation',
    ]),
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
      'documentationTrees',
      'documentationContent',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.view).tree;
    },
  },
  methods: {
    ...mapActions('data', [
      'refreshDocumentation',
    ]),
    ...mapActions('view', [
      'setReloadDocumentation',
    ]),
    loadDocumentation() {
      if (this.reloadDocumentation && this.hasContext && this.hasObservations) {
        this.$axios.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}documentation/REPORT/${this.contextId}`, {})
          .then(({ data }) => {
            if (data === '') {
              console.warn('Empty report');
              this.content = this.$t('messages.emptyReport');
            } else {
              this.refreshDocumentation({ view: this.view, documentation: data });
              this.setReloadDocumentation(false);
            }
          });
      }
    },
    forceReload() {
      this.setReloadDocumentation(true);
    },
  },
  watch: {
    reloadDocumentation() {
      // eslint-disable-next-line no-underscore-dangle
      if (!this._inactive) {
        this.loadDocumentation();
      }
    },
    tree() {
      this.rawDocumentation.splice(0, this.rawDocumentation.length);
      this.content = '';
      this.tree.forEach((doc) => {
        flattenTree(doc, 'children').forEach((e) => {
          this.rawDocumentation.push(e);
        });
      });
      this.rawDocumentation.forEach((doc) => {
        const content = this.documentationContent.get(doc.id);
        switch (doc.type) {
          case DOCUMENTATION_TYPES.PARAGRAPH:
            this.content += content.bodyText;
            break;
          case DOCUMENTATION_TYPES.SECTION:
            this.content += `<h1>${content.title}</h1>${content.subtitle ? `<h4>${doc.subtitle}` : ''}`;
            break;
          default:
            break;
        }
      });
    },
  },
  activated() {
    this.loadDocumentation();
  },
};
</script>

<style lang="stylus">
@media print
  #q-app
    display none
  .dv-content table td
  .dv-content p
    word-break break-word

  .dv-content
    display: block !important
    position: relative !important
    overflow: visible !important
    overflow-y: visible !important
    width: 100% !important
    height: 100% !important
    margin: 0 !important
    left: 0 !important
    border: none !important

  .dv-empty-documentation
    position absolute
    width 400px
    height 80px
    left calc((100% - 400px) / 2)
    top calc((100% - 80px) / 2)
    margin-left -200px
    margin-top -40px
    padding 0
    text-align center
    font-size 60px
    font-weight bold
    color rgb(17, 170, 187)

  .dv-content-container
    position absolute
    width 1024px
    left calc((100% - 1024px) / 2)
    height 100%
    overflow auto
    border none
  .dv-doc-reload
    position absolute
    top 10px
    right 60px
</style>
