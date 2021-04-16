<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <div class="dv-empty-documentation" v-if="content.length === 0">{{ $t('messages.noDocumentation') }}</div>
      <div class="dv-content" v-else>
        <div class="dv-item" v-for="doc in content" :key="doc.id">
          <template v-if="doc.type === DOCUMENTATION_TYPES.SECTION">
            <h1 :id="doc.id">{{ doc.title }}</h1><h4 v-if="doc.subtitle">{{  doc.subtitle }}</h4>
          </template>
          <div class="dv-paragraph" v-if="doc.type === DOCUMENTATION_TYPES.PARAGRAPH" v-html="doc.bodyText"></div>
          <span v-else-if="doc.type === DOCUMENTATION_TYPES.CITATION" class="dv-citation"><a href="#" :title="doc.bodyText">{{ doc.bodyText }}</a></span>
          <div v-else-if="doc.type === DOCUMENTATION_TYPES.TABLE" class="dv-table-container">
            <div class="dv-table-title">{{ doc.title }}</div>
            <div class="dv-table" :style="{ 'font-size': `${tableFontSize}px` }" :id="doc.id"></div>
            <div class="dv-table-actions col">
              <div class="dv-actions-right justify-end row">
                <q-btn class="dv-button" :disable="tableFontSize + 1 > 50" @click="tableFontSizeChange(doc.id, 1)" flat icon="mdi-format-font-size-increase" color="mc-main"></q-btn>
                <q-btn class="dv-button" :disable="tableFontSize - 1 < 8" @click="tableFontSizeChange(doc.id, -1)" flat icon="mdi-format-font-size-decrease" color="mc-main"></q-btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tabulator from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator_midnight.min.css';
import { mapGetters } from 'vuex';
import { DOCUMENTATION_TYPES, CUSTOM_EVENTS, TABLE_TYPES } from 'shared/Constants';
import { flattenTree } from 'shared/Helpers';

export default {
  name: 'DocumentationViewer',
  data() {
    return {
      content: [],
      tables: [],
      rawDocumentation: [],
      tableFontSize: 12,
      DOCUMENTATION_TYPES,
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
    tableFontSizeChange(id, amount) {
      const table = this.tables.find(t => t.id === id);
      if (table) {
        this.tableFontSize += amount;
        table.instance.redraw(true);
      }
    },
  },
  watch: {
    tree() {
      this.rawDocumentation.splice(0, this.rawDocumentation.length);
      this.content.splice(0, this.content.length);
      this.tables.splice(0, this.tables.length);
      this.tree.forEach((doc) => {
        flattenTree(doc, 'children').forEach((e) => {
          this.rawDocumentation.push(e);
        });
      });
      this.rawDocumentation.forEach((doc) => {
        const content = this.documentationContent.get(doc.id);
        this.content.push(content);
        switch (doc.type) {
          case DOCUMENTATION_TYPES.PARAGRAPH:
            // this.content += content.bodyText;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.CITATION:
            // this.content += `<span class="dv-citation"><a href="#" title="${content.bodyText}">${content.bodyText}</a></span>`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.SECTION:
            // this.content += `<h1 id="${content.id}">${content.title}</h1>${content.subtitle ? `<h4>${doc.subtitle}` : ''}`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.TABLE:
            // this.content += `<div class="dv-table-container">
            //                   <div class="dv-table-title">${content.title}</div>
            //                   <div class="dv-table" style="font-size: ${this.tableFontSize}px" id="${content.id}"></div>
            //                   <div class="dv-table-actions"><q-btn flat @click="tableFontSize++"></q-btn></div>
            //                 </div>`;
            // this.$nextTick(() => {
            this.tables.push({
              id: content.id,
              tabulator: {
                data: content.table.rows,
                columns: this.formatColumns(content.table.columns),
              },
            });
            // });
            break;
          default:
            // console.warn(content);
            break;
        }
      });
      this.$nextTick(() => {
        this.tables.forEach((table) => {
          table.instance = new Tabulator(`#${table.id}`, table.tabulator);
        });
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
    left 0
    width 100%
    height 100%
    overflow auto
    border none

  .dv-documentation
    .dv-content [id]
      transition: .3s ease;
      border-radius: 5px;
      &.dv-selected
        box-shadow 0 2px 6px rgba(17, 170, 187, .5);
        transform translateY(15px) scale(1.02);
        padding: 5px 10px;
        margin-bottom calc(0.6em + 15px)
    .dv-table-container
      .dv-table-title
        font-weight bold
        color rgb(17, 170, 187)
        font-size larger
        padding-bottom 16px
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
    .dv-table-actions
      padding-top 16px
      .q-btn
        padding 8px

</style>
