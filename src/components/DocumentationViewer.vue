<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <template v-if="content.length === 0">
        <div class="dv-main-actions">
          <q-btn icon="mdi-refresh" class="dv-button" flat color="mc-main" @click="forceReload">
            <q-tooltip
              :offset="[0, 8]"
              self="bottom middle"
              anchor="top middle"
              :delay="1000"
            >{{ $t('label.appReload')}}</q-tooltip>
          </q-btn>
        </div>
        <div class="dv-empty-documentation">{{ $t('messages.noDocumentation') }}</div>
      </template>
      <template v-else>
        <div class="dv-main-actions">
          <q-btn class="dv-button" :disable="tableFontSize - 1 < 8" @click="tableFontSizeChange(-1)" flat icon="mdi-format-font-size-decrease" color="mc-main"></q-btn>
          <q-btn class="dv-button" :disable="tableFontSize + 1 > 50" @click="tableFontSizeChange( 1)" flat icon="mdi-format-font-size-increase" color="mc-main"></q-btn>
          <q-btn icon="mdi-refresh" class="dv-button" flat color="mc-main" @click="forceReload">
            <q-tooltip
              :offset="[0, 8]"
              self="bottom middle"
              anchor="top middle"
              :delay="1000"
            >{{ $t('label.appReload')}}</q-tooltip>
          </q-btn>
        </div>
        <div class="dv-content">
          <div class="dv-item" v-for="doc in content" :key="doc.id">
            <template v-if="doc.type === DOCUMENTATION_TYPES.SECTION">
              <h1 :id="doc.id">{{ doc.title }}</h1><h4 v-if="doc.subtitle">{{  doc.subtitle }}</h4>
            </template>
            <div class="dv-paragraph" v-if="doc.type === DOCUMENTATION_TYPES.PARAGRAPH" v-html="doc.bodyText"></div>
            <span v-else-if="doc.type === DOCUMENTATION_TYPES.CITATION" class="dv-citation"><a href="#" :title="doc.bodyText">{{ doc.bodyText }}</a></span>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.TABLE" class="dv-table-container">
              <div class="dv-table-title" :id="doc.id">{{ doc.title }}</div>
              <div class="dv-table" :style="{ 'font-size': `${tableFontSize}px` }" :id="`${doc.id}-table`"></div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Tabulator from 'tabulator-tables';
import printf from 'printf';
import 'tabulator-tables/dist/css/tabulator_simple.min.css';
import { mapGetters } from 'vuex';
import { DOCUMENTATION_TYPES, TABLE_TYPES, CUSTOM_EVENTS } from 'shared/Constants';
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
      /*
      columns: [{
        title: '',
        id: 'rowtitles_1',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'TEXT',
        frozen: true,
        caption: null,
        columns: [],
      }, {
        title: 'Temperate forest',
        id: 'c3',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        columns: [{
          title: 'Opening value',
          id: 'g1',
          headerVertical: false,
          sorter: null,
          hozAlign: null,
          formatter: null,
          type: 'NUMBER',
          frozen: false,
          caption: null,
          columns: [],
        }, {
          title: 'Closing value',
          id: 'g2',
          headerVertical: false,
          sorter: null,
          hozAlign: null,
          formatter: null,
          type: 'NUMBER',
          frozen: false,
          caption: null,
          columns: [],
        }, {
          title: 'Change',
          id: 'c',
          headerVertical: false,
          sorter: null,
          hozAlign: null,
          formatter: null,
          type: 'NUMBER',
          frozen: false,
          caption: null,
          columns: [],
        }],
      }],
      rows: [{
        c3c: '0.04945810482210633',
        c3g2: '0.7105812909906749',
        c3g1: '0.6611231861685686',
        rowtitles_1: 'indicator_normalized_difference_vegetation_index',
      }, {
        c3c: '0.11011138858305558',
        c3g2: '2.104810344827588',
        c3g1: '1.9946989562445323',
        rowtitles_1: 'indicator_leaf_area_index',
      }],
      */
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
    getFormatter(data, params) {
      const { numberFormat } = params;
      switch (data) {
        case TABLE_TYPES.TEXT:
        case TABLE_TYPES.VALUE:
        case TABLE_TYPES.BOOLEAN:
          return 'plaintext';
        case TABLE_TYPES.NUMBER:
          return numberFormat ? cell => printf(numberFormat, cell.getValue()) : 'plaintext';
        default:
          return 'plaintext';
      }
    },
    formatColumns(columns, params = {}) {
      const { numberFormat } = params;
      const getColumn = (c, parentId) => {
        const field = `${parentId || ''}${c.id}`;
        return {
          title: c.title,
          field,
          headerVertical: c.headerVertical,
          frozen: c.frozen,
          ...(c.sorter && { sorter: c.sorter }),
          ...(c.hozAlign && { hozAlign: c.hozAlign }),
          ...(c.formatter && { formatter: c.formatter }),
          ...(!c.formatter && c.type && { formatter: this.getFormatter(c.type, { numberFormat: c.numberFormat || numberFormat }) }),
          ...(c.columns && c.columns.length > 0 && { columns: c.columns.map(col => getColumn(col, field)) }),
        };
      };
      return columns.map(c => ({
        ...getColumn(c),
      }));
    },
    tableFontSizeChange(amount) {
      if (this.tables.length > 0) {
        this.tableFontSize += amount;
        this.tables.forEach((t) => {
          t.instance.redraw(true);
        });
      }
    },
    selectElement(id) {
      const el = document.getElementById(id);
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('dv-selected');
      }
    },
    forceReload() {
      this.$eventBus.$emit(CUSTOM_EVENTS.REFRESH_DOCUMENTATION);
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
            this.tables.push({
              id: content.id,
              tabulator: {
                data: content.table.rows,
                // data: this.rows,
                columns: this.formatColumns(content.table.columns, { ...(content.table.numberFormat && { numberFormat: content.table.numberFormat }) }),
                // columns: this.formatColumns(this.columns),
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
          table.instance = new Tabulator(`#${table.id}-table`, table.tabulator);
        });
      });
    },
    documentationSelected(newValue) {
      Array.prototype.forEach.call(document.getElementsByClassName('dv-selected'), (e) => {
        e.classList.remove('dv-selected');
      });
      if (newValue !== null) {
        this.selectElement(newValue);
      }
    },
  },
  mounted() {
    if (this.documentationSelected !== null) {
      this.selectElement(this.documentationSelected);
    }
  },
  updated() {
    if (this.documentationSelected !== null) {
      this.selectElement(this.documentationSelected);
    }
  },
};
</script>

<style lang="stylus">
@import '~variables'
.dv-empty-documentation
  position absolute
  width 100%
  height 80px
  text-aling center
  top calc((100% - 80px) / 2)
  padding 0
  text-align center
  font-size 60px
  font-weight bold
  color $main-control-main-color

.dv-documentation-wrapper
  position absolute
  // width 1024px
  // left calc((100% - 1024px) / 2)
  left 0
  width 100%
  height 100%
  overflow auto
  border none
.dv-main-actions
  position absolute
  right 0
  .dv-button
    padding 8px
.dv-documentation
  .dv-content
    h1
    h2
    h3
    h4
    h5
    h6
      font-weight bold
      color $main-control-grey
  .dv-content [id]
    transition: .3s ease;
    border-radius: 5px;
    &.dv-selected
      // box-shadow 0 2px 6px $main-control-grey-alpha
      transform translateY(15px) scale(1.02)
      padding 5px 10px
      margin-bottom calc(0.6em + 15px)
  .dv-table-container
    .dv-table-title
      font-weight bold
      color $main-control-grey
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
.kd-is-app
  background-image none !important
  .dv-main-actions
    .dv-button
      color var(--app-main-color)
  .dv-empty-documentation
    color var(--app-text-color)
  .dv-documentation
    background-color var(--app-background-color)
    .dv-content
      background-color var(--app-background-color)
      h1
      h2
      h3
      h4
      h5
      h6
        color var(--app-text-color)
    .dv-table-container
      .dv-table-title
        color var(--app-main-color)
</style>
