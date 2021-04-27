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
            <div class="dv-reference" :id="doc.id" v-if="doc.type === DOCUMENTATION_TYPES.REFERENCE" @click="selectElement(`.link-${doc.id}`)" v-html="doc.bodyText"></div>
            <span v-else-if="doc.type === DOCUMENTATION_TYPES.CITATION" class="dv-citation"><a href="#" :title="doc.bodyText">{{ doc.bodyText }}</a></span>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.TABLE" class="dv-table-container">
              <div class="dv-table-title" :id="doc.id">{{ doc.title }}</div>
              <div class="dv-table" :style="{ 'font-size': `${tableFontSize}px` }" :id="`${doc.id}-table`"></div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.MODEL" class="dv-model-container">
              <div :id="doc.id" class="dv-model-code" v-html="getModelCode(doc.bodyText)"></div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.RESOURCE" class="dv-resource-container" :id="doc.id" >
              <div class="dv-resource-title">{{ doc.title }}</div>
              <div class="dv-resource-originator">{{ doc.resource.originatorDescription }}</div>
              <div class="dv-resource-content row justify-around">
                <div class="dv-resource-description col self-start" v-html="doc.resource.resourceDescription"></div>
                <div class="dv-resource-map col self-start text-center">
                  <img src="" :id="`resimg-${doc.id}`"  wdith=360 height=180 />
                </div>
              </div>
              <div class="dv-resource-urls">
                <a :href="url" v-for="(url, index) in doc.resource.urls" :key="index" class="klab-link" target="_blank">{{ url }}</a>
              </div>
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
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_TYPES, TABLE_TYPES, CUSTOM_EVENTS, DOCUMENTATION_TYPES_VIEWS, APPS_DEFAULT_VALUES } from 'shared/Constants';
import { flattenTree } from 'shared/Helpers';
import { axiosInstance } from 'plugins/axios';

export default {
  name: 'DocumentationViewer',
  data() {
    return {
      content: [],
      tables: [],
      rawDocumentation: [],
      DOCUMENTATION_TYPES,
      links: new Map(),
      tableCounter: 0,
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
    ...mapActions('view', [
      'setDocumentation',
    ]),
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
          return cell => (cell.getValue() && cell.getValue() !== '' ? printf(numberFormat, cell.getValue()) : '');
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
      let el;
      if (id.startsWith('.')) {
        el = document.querySelector(id);
      } else {
        el = document.getElementById(id);
      }
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
    getLinkedText(text) {
      if (text) {
        const toReplace = [];
        [...text.matchAll(/LINK\/(?<year>[^/]*)\/(?<month>[^/]*)\//g)].forEach((m) => {
          const link = this.documentationContent.get(m[2]);
          if (link) {
            let t;
            if (link.type === DOCUMENTATION_TYPES.REFERENCE) {
              t = `[${link.id}]`;
            } else if (link.type === DOCUMENTATION_TYPES.TABLE) {
              t = `<${link.id}${++this.tableCounter}>`;
            }
            toReplace.push({ what: m[0], with: `<a class="klab-online-link link-${m[2]}" title="${link.type === DOCUMENTATION_TYPES.REFERENCE ? link.bodyText : t}">${t}</a>` });
            this.links.set(m[2], link);
          }
        });
        if (toReplace.length > 0) {
          toReplace.forEach((tr) => {
            text = text.replace(tr.what, tr.with);
          });
        }
        return text;
      }
      return text;
    },
    getImage(id, url) {
      axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${url}`, { responseType: 'arraybuffer' })
        .then(({ data: image }) => {
          if (image) {
            document.getElementById(`resimg-${id}`).src = `data:image/png;base64,${Buffer.from(image, 'binary').toString('base64')}`;
          } else {
            document.getElementById(`resimg-${id}`).src = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
          }
        });
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
        if (content.bodyText) {
          content.bodyText = this.getLinkedText(content.bodyText);
        }
        this.content.push(content);
        switch (doc.type) {
          case DOCUMENTATION_TYPES.PARAGRAPH:
            // this.content += content.bodyText;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.RESOURCE:
            this.getImage(doc.id, content.resource.spaceDescriptionUrl);
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
    if (this.links.size > 0) {
      this.links.forEach((l, k) => {
        document.querySelectorAll(`.link-${k}`).forEach((link) => {
          link.onclick = () => {
            this.setDocumentation({ id: l.id, view: DOCUMENTATION_TYPES_VIEWS[l.type] });
          };
        });
      });
      this.links.clear();
      this.tableCounter = 0;
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
    margin 8px 0
    padding 8px 16px
    color $main-control-main-color
    font-weight 400
  .dv-resource-container
    border 1px solid $main-control-main-color
    border-radius 10px !important
    margin 16px 0
    &.dv-selected
      border-width 4px !important
    .dv-resource-title
      font-size var(--app-title-size)
      font-weight 300
      margin 16px 0 8px

    .dv-resource-originator
      margin-bottom 16px
      font-size var(--app-subtitle-size)
      font-weight 300
    .dv-resource-description
      font-size smaller
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
    .dv-resource-container
      border-color var(--app-main-color)
    .dv-model-container
      font-family monospace
      .dv-selected
        font-size larger
      .dv-model-space
        display inline-block
        width 2em
    .dv-reference
      margin 8px 0
      padding 8px 0
      &.dv-selected
        color var(--app-text-color)
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
