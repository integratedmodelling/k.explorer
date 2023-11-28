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
              <h1 :id="getId(doc.id)">{{ doc.idx }} {{ doc.title }}</h1><h4 v-if="doc.subtitle">{{  doc.subtitle }}</h4>
            </template>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.PARAGRAPH" class="dv-paragraph" v-html="doc.bodyText"></div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.REFERENCE" class="dv-reference" :id="getId(doc.id)" @click="selectElement(`.link-${doc.id}`)" v-html="doc.bodyText"></div>
            <span v-else-if="doc.type === DOCUMENTATION_TYPES.CITATION" class="dv-citation"><a href="#" :title="doc.bodyText">{{ doc.bodyText }}</a></span>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.TABLE" class="dv-table-container">
              <div class="dv-table-title" :id="getId(doc.id)">{{ `${$t('label.reportTable')} ${doc.idx}. ${doc.title}` }}</div>
              <div class="dv-table" :style="{ 'font-size': `${tableFontSize}px` }" :id="`${getId(doc.id)}-table`"></div>
              <div class="dv-table-bottom text-right print-hide">
                <q-btn class="dv-button" flat color="mc-main" icon="mdi-content-copy" @click="tableCopy(doc.id)">
                  <q-tooltip
                    anchor="bottom middle"
                    self="top middle"
                    :offset="[0, 5]"
                  >{{ $t('label.tableCopy') }}</q-tooltip>
                </q-btn>
                <q-btn class="dv-button" flat color="mc-main" icon="mdi-download" @click="tableDownload(doc.id)">
                  <q-tooltip
                    anchor="bottom middle"
                    self="top middle"
                    :offset="[0, 5]"
                  >{{ $t('label.tableDownloadAsXSLX') }}</q-tooltip>
                </q-btn>
              </div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.FIGURE" class="dv-figure-container" :id="getId(doc.id)">
              <div class="dv-figure-wrapper col">
                <div class="content-center row">
                  <div class="dv-figure-content col">
                    <div class="dv-figure-caption-wrapper row items-end">
                      <div class="dv-figure-caption col">{{ `${$t('label.reportFigure')} ${doc.idx }${doc.figure.caption !== '' ? `. ${doc.figure.caption}` : ''}` }}</div>
                      <div v-if="doc.figure.timeString && doc.figure.timeString !== ''" class="dv-figure-timestring col">{{ doc.figure.timeString }}</div>
                    </div>
                  </div>
                  <div class="dv-col-fill col"></div>
                </div>
                <div class="row content-center">
                  <div class="dv-figure-content col">
                    <div class="dv-figure-wait row items-center" :style="{ height: `${waitHeight}px` }" v-show="loadingImages.includes(doc.id)">
                      <q-spinner size="3em" class="col"></q-spinner>
                    </div>
                    <div class="dv-figure-image col" :class="`dv-figure-${documentationView.toLowerCase()}`">
                      <img src=""
                           :id="`figimg-${documentationView}-${getId(doc.id)}`"
                           class="dv-figure-img"
                           :class="[forPrinting ? 'dv-figure-print' : 'dv-figure-display' ]"
                           :alt="doc.figure.caption" />
                    </div>
                  </div>
                  <div class="dv-figure-legend col">
                    <histogram-viewer
                      class="dv-figure-colormap"
                      :dataSummary="doc.figure.dataSummary"
                      :colormap="doc.figure.colormap"
                      :id="getId(doc.observationId)"
                      direction="vertical"
                      :tooltips="false"
                      :legend="true"
                    ></histogram-viewer>
                  </div>
                </div>
                <div class="row content-center">
                  <div class="dv-figure-content col">
                    <div class="dv-figure-time col">
                      <figure-timeline
                        :start="doc.figure.startTime"
                        :end="doc.figure.endTime"
                        :raw-slices="doc.figure.timeSlices"
                        :observationId="doc.figure.observationId"
                        v-on:timestampchange="changeTime($event, doc.id)"
                      ></figure-timeline>
                    </div>
                  </div>
                  <div class="dv-col-fill col"></div>
                </div>
              </div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.MODEL" class="dv-model-container">
              <div :id="getId(doc.id)" class="dv-model-code" v-html="getModelCode(doc.bodyText)"></div>
            </div>
            <div v-else-if="doc.type === DOCUMENTATION_TYPES.RESOURCE" class="dv-resource-container" :id="getId(doc.id)" >
              <div class="dv-resource-title-container">
                <div class="dv-resource-title">{{ doc.title }}</div>
                <div class="dv-resource-originator">{{ doc.resource.originatorDescription }}</div>
                <div class="dv-resource-keywords text-right" v-if="doc.resource.keywords.length > 0">
                  <div class="dv-resource-keyword" v-for="(keyword, index) in doc.resource.keywords" :key="index">
                    <span class="dv-resource-keyword">{{ keyword }}</span>
                    <span class="dv-resource-keyword-separator" v-if="index < doc.resource.keywords.length - 1">/</span>
                  </div>
                </div>
              </div>
              <div class="dv-resource-content row justify-around">
                <div class="dv-resource-description col self-start" v-html="doc.resource.resourceDescription"></div>
                <div class="dv-map-container col self-start">
                  <div class="dv-resource-map-wrapper row justify-center">
                    <div class="dv-resource-map">
                      <img src="" :id="`resimg-${getId(doc.id)}`" wdith=360 height=180 />
                      <div class="dv-resource-authors" v-if="doc.resource.authors.length > 0">
                        <div class="dv-resource-author-wrapper" v-for="(author, index) in doc.resource.authors" :key="index">
                          <span class="dv-resource-author">{{ author }}</span>
                          <span class="dv-resource-author-separator" v-if="index < doc.resource.authors.length - 1">,</span>
                        </div>
                      </div>
                      <div class="dv-resource-references" v-if="doc.resource.bibliographicReference">{{ doc.resource.bibliographicReference }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dv-resource-urls">
                <a :href="url" v-for="(url, index) in doc.resource.urls" :key="index" class="klab-link" target="_blank">{{ url }}</a>
              </div>
            </div>
            <div v-else class="dv-other-container">
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
import HistogramViewer from 'components/HistogramViewer';
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_TYPES, TABLE_TYPES, CUSTOM_EVENTS,
  DOCUMENTATION_TYPES_VIEWS, GEOMETRY_CONSTANTS } from 'shared/Constants';
import { flattenTree, getColormap } from 'shared/Helpers';
import { axiosInstance } from 'plugins/axios';
import FigureTimeline from 'components/FigureTimeline';

export default {
  name: 'DocumentationViewer',
  props: {
    forPrinting: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    FigureTimeline,
    HistogramViewer,
  },
  data() {
    return {
      content: [],
      tables: [],
      images: [],
      loadingImages: [],
      figures: [],
      rawDocumentation: [],
      DOCUMENTATION_TYPES,
      links: new Map(),
      tableCounter: 0,
      referenceCounter: 0,
      viewport: null,
      needUpdates: false,
      visible: false,
      waitHeight: 320, // initial wait height
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
      'documentationCache',
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
    getId(originalId) {
      if (this.forPrinting) {
        return `${originalId}-fp`;
      }
      return originalId;
    },
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
        el = document.getElementById(this.getId(id));
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
            if (t.instance) {
              t.instance.redraw(true);
            }
          });
        }
        if (this.forPrinting) {
          this.visible = true;
          this.build();
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
            link.index = ++this.referenceCounter;
            toReplace.push({ what: m[0], with: `<a class="klab-inline-link link-${m[2]}" title="${link.type === DOCUMENTATION_TYPES.REFERENCE ? link.bodyText : t}">${link.index}</a>` });
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
      const docImage = document.getElementById(`resimg-${this.getId(id)}`);
      if (docImage) {
        if (this.documentationCache.has(id)) {
          const src = this.documentationCache.get(id);
          if (src !== null) {
            docImage.src = this.documentationCache.get(id);
          } else {
            docImage.style.display = 'none';
          }
        } else {
          axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${url}`, { responseType: 'arraybuffer' })
            .then(({ data: image }) => {
              if (image && image.byteLength > 0) {
                docImage.src = `data:image/png;base64,${Buffer.from(image, 'binary').toString('base64')}`;
                this.documentationCache.set(id, docImage.src);
              } else {
                // docImage.src = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
                docImage.style.display = 'none';
                this.documentationCache.set(id, null);
              }
            });
        }
      }
    },
    getFigure(figureId, instance, timestamp = -1, timeString = '') {
      const image = document.getElementById(`figimg-${this.documentationView}-${this.getId(figureId)}`);
      if (image) {
        const content = this.documentationContent.get(figureId);
        const imageId = `${instance.observationId}/${timestamp}`;
        content.figure.timeString = timeString;
        if (image.src !== '') {
          this.waitHeight = image.clientHeight;
        }
        if (this.documentationCache.has(imageId)) {
          image.src = this.documentationCache.get(imageId).src;
          content.figure.colormap = this.documentationCache.get(imageId).colormap;
        } else if (!this.loadingImages.includes(figureId)) {
          this.loadingImages.push(figureId);
          image.src = '';
          const self = this;
          axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${instance.baseUrl}`, {
            params: {
              format: GEOMETRY_CONSTANTS.TYPE_RASTER,
              viewport: self.viewport,
              ...(timestamp !== -1 && { locator: `T1(1){time=${timestamp}}` }),
            },
            responseType: 'blob',
          })
            .then((response) => {
              const liIdx = self.loadingImages.indexOf(figureId);
              if (liIdx !== -1) {
                self.loadingImages.splice(self.loadingImages.indexOf(figureId), 1);
              }
              if (response) {
                const reader = new FileReader();
                const cachedImage = {
                  src: null,
                  colormap: null,
                };
                reader.readAsDataURL(response.data);
                reader.onload = () => {
                  image.src = reader.result;
                  cachedImage.src = reader.result;
                };
                axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${instance.baseUrl}`, {
                  params: {
                    format: GEOMETRY_CONSTANTS.TYPE_COLORMAP,
                    ...(timestamp !== -1 && { locator: `T1(1){time=${timestamp}}` }),
                  },
                })
                  .then((colormapResponse) => {
                    if (colormapResponse && colormapResponse.data) {
                      content.figure.colormap = getColormap(colormapResponse.data);
                      cachedImage.colormap = content.figure.colormap;
                    }
                    self.documentationCache.set(imageId, cachedImage);
                  })
                  .catch((error) => {
                    console.error(error);
                    self.documentationCache.set(imageId, cachedImage);
                  });
              }
            })
            .catch((error) => {
              const liIdx = self.loadingImages.indexOf(figureId);
              if (liIdx !== -1) {
                self.loadingImages.splice(self.loadingImages.indexOf(figureId), 1);
              }
              console.error(error);
            });
        }
      }
    },
    tableCopy(id) {
      const table = this.tables.find(t => t.id === id);
      if (table) {
        table.instance.copyToClipboard('all');
      } else {
        console.warn('table not found');
      }
    },
    tableDownload(id) {
      const table = this.tables.find(t => t.id === id);
      if (table) {
        table.instance.download('xlsx', `${table.name}.xlsx`);
      } else {
        console.warn('table not found');
      }
    },
    updateThings() {
      if (this.visible && this.needUpdates) {
        console.debug('Update things');
        const self = this;
        this.$nextTick(() => {
          this.tables.forEach((table) => {
            const el = document.querySelector(`#${self.getId(table.id)}-table`);
            if (el) {
              table.instance = new Tabulator(`#${self.getId(table.id)}-table`, table.tabulator);
            }
          });
          this.images.forEach((image) => {
            this.getImage(image.id, image.url);
          });
          this.figures.forEach((figure) => {
            this.getFigure(figure.id, figure.instance, figure.time, figure.timeString);
          });
          this.needUpdates = false;
        });
      }
    },
    clearCache() {
      this.documentationCache.clear();
      this.needUpdates = true;
    },
    changeTime(event, id) {
      const figure = this.figures.find(f => f.id === id);
      if (figure) {
        figure.time = event.time;
        this.getFigure(figure.id, figure.instance, figure.time, event.timeString);
      }
    },
    build() {
      this.rawDocumentation.splice(0, this.rawDocumentation.length);
      this.content.splice(0, this.content.length);
      this.tables.splice(0, this.tables.length);
      this.images.splice(0, this.images.length);
      this.figures.splice(0, this.figures.length);
      // this.cache.clear();
      this.tree.forEach((doc) => {
        flattenTree(doc, 'children').forEach((e) => {
          this.rawDocumentation.push(e);
        });
      });
      const nodelist = document.querySelectorAll(`.dv-figure-${this.forPrinting ? 'print' : 'display'}`);
      nodelist.forEach((node) => {
        node.setAttribute('src', '');
      });
      this.needUpdates = true;
      const self = this;
      this.rawDocumentation.forEach((doc) => {
        const content = self.documentationContent.get(doc.id);
        if (content.bodyText) {
          content.bodyText = self.getLinkedText(content.bodyText);
        }
        self.content.push(content);
        switch (doc.type) {
          case DOCUMENTATION_TYPES.PARAGRAPH:
            // self.content += content.bodyText;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.RESOURCE:
            self.images.push({
              id: doc.id,
              url: content.resource.spaceDescriptionUrl,
            });
            // self.content += `<span class="dv-citation"><a href="#" title="${content.bodyText}">${content.bodyText}</a></span>`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.SECTION:
            // self.content += `<h1 id="${content.id}">${content.title}</h1>${content.subtitle ? `<h4>${doc.subtitle}` : ''}`;
            // console.warn(content);
            break;
          case DOCUMENTATION_TYPES.TABLE:
            self.tables.push({
              id: content.id,
              name: content.bodyText.replaceAll(' ', '_').toLowerCase(),
              tabulator: {
                clipboard: 'copy',
                printAsHtml: true,
                data: content.table.rows,
                // data: self.rows,
                columns: self.formatColumns(content.table.columns, { ...(content.table.numberFormat && { numberFormat: content.table.numberFormat }) }),
                // columns: self.formatColumns(self.columns),
                clipboardCopied: () => {
                  self.$q.notify({
                    message: self.$t('messages.tableCopied'),
                    type: 'info',
                    icon: 'mdi-information',
                    timeout: 1000,
                  });
                },
              },
            });
            // });
            break;
          case DOCUMENTATION_TYPES.FIGURE: {
            self.$set(content.figure, 'colormap', null);
            self.$set(content.figure, 'timeString', '');
            self.figures.push({
              id: content.id,
              instance: content.figure,
              time: -1,
              timeString: '',
            });
            break;
          }
          default:
            // console.warn(content);
            break;
        }
      });
      this.updateThings();
    },
  },
  watch: {
    tree() {
      this.build();
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
    this.viewport = Math.min(document.body.clientWidth, 640);
    this.$eventBus.$on(CUSTOM_EVENTS.FONT_SIZE_CHANGE, this.fontSizeChangeListener);
    if (!this.forPrinting) {
      if (this.documentationSelected !== null) {
        this.selectElement(this.documentationSelected);
      }
      this.$eventBus.$on(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, this.clearCache);
    }
  },
  activated() {
    this.visible = true;
    this.updateThings();
  },
  deactivated() {
    this.visible = false;
  },
  updated() {
    if (!this.forPrinting) {
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
        this.referenceCounter = 0;
      }
    }
  },
  beforeDestroy() {
    if (!this.forPrinting) {
      this.$eventBus.$off(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, this.clearCache);
    }
    this.$eventBus.$off(CUSTOM_EVENTS.FONT_SIZE_CHANGE, this.fontSizeChangeListener);
  },
};
</script>

<style lang="stylus">
@import '~variables'
$img-max-width-big = 640px
$img-max-width-print = 320px
$legend-min-width-big = 320px
$img-max-width-normal = 512px
$legend-min-width-normal = 256px
$img-max-width-small = 320px
$legend-min-width-small = 160px
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
    padding 1em 2em
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
      padding 16px 0
    .dv-table-bottom
      margin 8px 0 0 0
  .dv-figure-container
    padding 16px
    margin 16px 0
    border 1px solid $main-control-main-color
    max-width ($img-max-width-big + $legend-min-width-big)
    .dv-figure-caption-wrapper
      padding-bottom 8px
    .dv-figure-caption
      color $main-control-main-color
      font-style italic
    .dv-figure-timestring
      color $main-control-main-color
      font-size .8em
      text-align right
  .dv-figure-wrapper
    .dv-figure-image
      text-align center
      overflow hidden
      max-width $img-max-width-big
      img
        width 100%
        max-width $img-max-width-big
    .dv-figure-legend
    .dv-col-fill
      padding-left 16px
      width $legend-min-width-big
      max-width $legend-min-width-big
    .dv-figure-wait
      max-width $img-max-width-big
      min-height ($img-max-width-big / 2)
      height auto
      border 1px solid $grey-3
      text-align center
      .q-spinner
        color $grey-6
    .hv-histogram-nodata
    .hv-details-nodata
      display none
    .hv-categories
      margin-left 8px
      .hv-category
        overflow hidden
        color $main-control-main-color

  .dv-citation
  .dv-paragraph
  .dv-reference
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
    .dv-resource-title-container
      background-color var(--app-darklight-background-color)
      padding 8px
      margin 8px 0 16px 0
      border-radius 2px
      .dv-resource-title
        font-size var(--app-title-size)
        font-weight 300
      .dv-resource-originator
        font-size var(--app-subtitle-size)
        font-weight 300
      .dv-resource-keywords
        padding 8px 8px 0 0
        .dv-resource-keyword-wrapper
        .dv-resource-keyword
        .dv-resource-keyword-separator
          display inline-block
          font-size var(--app-small-size)
          color var(--app-link-color)
    .dv-resource-description
      font-size smaller
  .dv-resource-map
    width 360px
    .dv-resource-authors
      font-size var(--app-small-size)
      padding-bottom 5px
      .dv-resource-author-wrapper
      .dv-resource-author-separator
      .dv-resource-author
        display inline-block
      .dv-resource-author-separator
        padding-right 8px
    .dv-resource-references
      font-size calc(var(--app-small-size) - 2px)
  .dv-resource-urls
    margin 16px 0 0
    font-size var(--app-small-size)
  .klab-inline-link
    font-size var(--app-small-size)
    vertical-align super
  .dv-button
    padding 8px
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
    .dv-figure-container
      .dv-figure-caption
        color var(--app-text-color)
      .dv-figure-timestring
        color var(--app-main-color)
      .dv-figure-wait
        .q-spinner
          color var(--app-main-color)
      .hv-categories .hv-category
          color var(--app-text-color)
      .hv-data-value, .hv-tooltip
        color var(--app-text-color)
      .hv-data-details
        color var(--app-text-color)
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
    .dv-other-container
      display none
    .klab-link
      color var(--app-link-color)
      font-weight 500 !important
      &:visited
        color var(--app-link-visited-color)
    .dv-button
      color var(--app-main-color)

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
@media print
  .kd-modal .modal-content
    .dv-figure-wrapper
    .dv-resource-container
    .dv-table-container
      break-inside avoid
    .dv-figure-container
      border none
      .dv-figure-caption
        color black
      .dv-figure-timestring
        color black
    .hv-category
      color black !important
    .ft-container
      .ft-time .ft-date-container
          background-color white
      .ft-time-origin-container
        color black
        .ft-time-origin
          color black
          &.ft-time-origin-active
            color black
      .ft-timeline-container
        .ft-timeline
          background-color white
          .ft-timeline-viewer
            background-color black
          .ft-slice-container
            .ft-slice
              background-color black
            .ft-slice-caption
              color black
          .ft-actual-time
            color black
    .dv-resource-container
    .dv-model-container
      color black
    .dv-resource-container
      border 1px solid black
      .dv-resource-title-container
        background-color white
        .dv-resource-keywords
          .dv-resource-keyword-wrapper
          .dv-resource-keyword
          .dv-resource-keyword-separator
            color black
      .dv-resource-urls .klab-link
        color black
</style>
