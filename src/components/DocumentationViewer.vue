<template>
  <div class="dv-documentation">
    <div class="dv-documentation-wrapper">
      <template v-if="content.length === 0">
        <div class="dv-empty-documentation">{{ $t('messages.noDocumentation') }}</div>
      </template>
      <template v-else>
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
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.MODEL" class="dv-model-container">
              <div :id="doc.id" class="dv-model-code" v-html="getModelCode(doc.bodyText)"></div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.RESOURCE" class="dv-resource-container">
              <div :id="doc.id" class="dv-resource-name">{{ doc.id }}</div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.TABLE" class="dv-other-container">
              <div class="dv-other-content">{{ JSON.stringify(doc, null, 2) }}</div>
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
        numberformat: null,
        columns: [],
      }, {
        title: 'Cropland',
        id: 'c2',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Urban industrial ecosystem',
        id: 'c3',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Coastal saltmarsh reedbed',
        id: 'c6',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Episodic arid floodplain',
        id: 'c9',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Boreal cool temperate palustrine wetland',
        id: 'c11',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Warm temperate tropical marsh',
        id: 'c12',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Polar alpine rocky outcrop',
        id: 'c15',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Alpine grassland shrubland',
        id: 'c16',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Temperate woodland',
        id: 'c19',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Temperate subhumid grassland',
        id: 'c20',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Aquatic',
        id: 'c22',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Rocky pavement lavaflow scree',
        id: 'c27',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Cool temperate heathland',
        id: 'c28',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Seasonally dry temperate heath shrubland',
        id: 'c29',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Boreal temperate montane forest woodland',
        id: 'c31',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }, {
        title: 'Temperate forest',
        id: 'c32',
        headerVertical: false,
        sorter: null,
        hozAlign: null,
        formatter: null,
        type: 'NUMBER',
        frozen: false,
        caption: null,
        numberformat: null,
        columns: [],
      }],
      rows: [{
        c20: '2527.4165229785126',
        c31: '2.9716831545897433',
        c11: '279.3382165314367',
        c22: '6744.23491934154',
        c32: '124315.90724741382',
        c12: '4.4575247318846145',
        c15: '20.801782082128202',
        c28: '16428.950320145992',
        c16: '243.6780186763596',
        c27: '564.6197993720531',
        c19: '3940.451862985725',
        c29: '2.9716831545897433',
        rowtitles_1: 'Extent at start of 2010 (km²)',
        c2: '289314.15688079834',
        c3: '23703.630682578372',
        c6: '1450.1813794398',
        c9: '1181.244053949427',
      }, {
        c20: '9689.172925539522',
        c31: '25.259306814012813',
        c11: '62.405346246384575',
        c22: '5301.4827477879935',
        c32: '127119.6903037611',
        c12: '',
        c15: '34.17435627778204',
        c28: '22988.940883899864',
        c16: '200.58861293480817',
        c27: '150.06999930678234',
        c19: '1303.083063287607',
        c29: '',
        rowtitles_1: 'Extent at start of 2019 (km²)',
        c2: '284913.0941288637',
        c3: '16712.746061409183',
        c6: '1531.9026661910182',
        c9: '692.4021750194125',
      }, {
        c20: '7161.75640256101',
        c31: '22.28762365942307',
        c11: '-216.9328702850521',
        c22: '-1442.7521715535468',
        c32: '2803.7830563472817',
        c12: '-4.4575247318846145',
        c15: '13.372574195653836',
        c28: '6559.990563753872',
        c16: '-43.089405741551445',
        c27: '-414.54980006527074',
        c19: '-2637.368799698118',
        c29: '-2.9716831545897433',
        rowtitles_1: 'Net change',
        c2: '-4401.062751934631',
        c3: '-6990.884621169189',
        c6: '81.72128675121826',
        c9: '-488.84187893001456',
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
      'tableFontSize',
    ]),
    tree() {
      return this.documentationTrees.find(dt => dt.view === this.documentationView).tree;
    },
  },
  methods: {
    getFormatter(data, params) {
      let { numberFormat } = params;
      if (!numberFormat) {
        numberFormat = '%f';
      }
      switch (data) {
        case TABLE_TYPES.TEXT:
        case TABLE_TYPES.VALUE:
        case TABLE_TYPES.BOOLEAN:
          return 'plaintext';
        case TABLE_TYPES.NUMBER:
          return cell => (cell.getValue() && cell.getValue() !== '' ? printf(numberFormat, cell.getValue()) : 'plaintext');
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
    selectElement(id) {
      const el = document.getElementById(id);
      if (el) {
        // Use el.scrollIntoView() to instantly scroll to the element
        el.scrollIntoView({ behavior: 'smooth' });
        el.classList.add('dv-selected');
      }
    },
    getModelCode(code) {
      if (code) {
        return code.replaceAll('\n', '<br>').replaceAll('  ', '<span class="dv-model-space"></span>');
      }
      return '';
    },
    fontSizeChangeListener(event) {
      if (event === 'table') {
        if (this.tables.length > 0) {
          this.tables.forEach((t) => {
            t.instance.redraw(true);
          });
        }
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
            this.tables.push({
              id: content.id,
              tabulator: {
                clipboard: 'copy',
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
    this.$eventBus.$on(CUSTOM_EVENTS.FONT_SIZE_CHANGE, this.fontSizeChangeListener);
  },
  updated() {
    if (this.documentationSelected !== null) {
      this.selectElement(this.documentationSelected);
    }
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.FONT_SIZE_CHANGE, this.fontSizeChangeListener);
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
      margin 0
      padding 0.6em 0
  .dv-content [id]
    transition .3s ease
    border-radius 4px
    &.dv-selected
      // box-shadow 0 2px 6px $main-control-grey-alpha
      animation blinker 1.5s
      // transform translateY(10px) scale(1.02)
      // padding 5px 10px
      // margin-bottom calc(0.6em + 10px)
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
  .dv-resource-container
  .dv-model-container
    padding 8px 16px
    color $main-control-main-color
    font-weight 400
.kd-is-app
  background-image none !important
  .kd-container
    background-color var(--app-darken-background-color)
  .dv-documentation-wrapper
    border-top-left-radius 8px
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
    .dv-resource-container
    .dv-model-container
      color var(--app-main-color)
      font-family monospace
      .dv-selected
        font-size larger
      .dv-model-space
        display inline-block
        width 2em

@keyframes blinker {
  40% {
    opacity 1
  }
  60% {
    opacity .2
  }
  80% {
    opacity 1
  }
}
</style>
