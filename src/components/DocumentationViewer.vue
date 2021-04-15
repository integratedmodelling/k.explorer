<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <div class="dv-empty-documentation" v-if="content === ''">{{ $t('messages.noDocumentation') }}</div>
      <div class="dv-content" v-html="content" v-else></div>
      <q-btn icon="mdi-refresh" round class="dv-doc-reload" color="mc-main" @click="forceReload">
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
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator_midnight.min.css';
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_TYPES, CUSTOM_EVENTS, TABLE_TYPES } from 'shared/Constants';
import { flattenTree } from 'shared/Helpers';

export default {
  name: 'DocumentationViewer',
  data() {
    return {
      content: '',
      tables: [],
      rawDocumentation: [],
    };
  },
  computed: {
    ...mapGetters('data', [
      'documentationTrees',
      'documentationContent',
    ]),
    ...mapGetters('view', [
      'documentationView',
      'documentationSelected',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.documentationView).tree;
    },
  },
  methods: {
    ...mapActions('view', [
      'setNeedReloadDoc',
    ]),
    forceReload() {
      this.setNeedReloadDoc(true);
    },
    getFormatter(data) {
      switch (data) {
        case TABLE_TYPES.TEXT:
        case TABLE_TYPES.VALUE:
        case TABLE_TYPES.BOOLEAN:
        case TABLE_TYPES.NUMBER:
        default:
          return 'plaintext';
      }
    },
    formatColumns(columns) {
      const getColumn = c => ({
        title: c.title,
        field: c.id,
        headerVertical: c.headerVertical,
        ...(c.sorter && { sorter: c.sorter }),
        ...(c.hozAlign && { hozAlign: c.hozAlign }),
        ...(c.formatter && { formatter: c.formatter }),
        ...(!c.formatter && c.type && { formatter: this.getFormatter(c.type) }),
        ...(c.columns && c.columns.length > 0 && [...c.columns.forEach(col => getColumn(col))]),
      });
      return columns.map(c => ({
        ...getColumn(c),
      }));
    },
  },
  watch: {
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
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.CITATION:
            this.content += `<span class="dv-citation"><a href="#" title="${content.bodyText}">${content.bodyText}</a></span>`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.SECTION:
            this.content += `<h1 id="${content.id}">${content.title}</h1>${content.subtitle ? `<h4>${doc.subtitle}` : ''}`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.TABLE:
            this.content += `<div class="dv-table" id="${content.id}"></div>`;
            this.$nextTick(() => {
              this.tables.push(new Tabulator(`#${content.id}`, {
                data: content.table.rows,
                columns: this.formatColumns(content.table.columns),
              }));
            });
            break;
          default:
            // console.warn(content);
            break;
        }
      });
    },
    documentationSelected(newValue) {
      Array.prototype.forEach.call(document.getElementsByClassName('dv-selected'), (e) => {
        e.classList.remove('dv-selected');
      });
      if (newValue !== null) {
        const el = document.getElementById(newValue);
        if (el) {
          // Use el.scrollIntoView() to instantly scroll to the element
          el.scrollIntoView({ behavior: 'smooth' });
          el.classList.add('dv-selected');
        }
      }
    },
  },
  activated() {
    this.$eventBus.$emit(CUSTOM_EVENTS.DOCUMETATION_ACTIVATED);
  },
  mounted() {
  },
  beforeDestroy() {
  },
};
</script>

<style lang="stylus">
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

  .dv-documentation-wrapper
    position absolute
    // width 1024px
    // left calc((100% - 1024px) / 2)
    top 78px
    left 0
    width 100%
    height calc(100% - 78px)
    overflow auto
    border none
  .dv-doc-reload
    position fixed
    top 10px
    right 30px

  .dv-documentation
    .dv-content [id]
      transition: .3s ease;
      border-radius: 5px;
      &.dv-selected
        box-shadow 0 2px 6px rgba(17, 170, 187, .5);
        transform translateY(15px) scale(1.02);
        padding: 5px 10px;
        margin-bottom calc(0.6em + 15px)
    .dv-citation
      color var(--app-main-color)
      a
        display inline-block
        text-decoration none
        color var(--app-main-color)
        &:visited
          color var(--app-main-color)
        &::after
          content ''
          display block
          width 0
          border-bottom-width 1px
          border-bottom-style solid
          transition width .3s
        &:not(.disabled):hover::after
          width: 100%;
        &.disabled
          cursor default !important
</style>
