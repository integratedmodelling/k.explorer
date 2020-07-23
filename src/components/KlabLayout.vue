<template>
  <q-layout view="hhh lpr fFf" :class="{ 'kapp-main':  isRootLayout}" :id="`kapp-${idSuffix}`">
    <q-layout-header
      :class="{ 'kapp-main':  isRootLayout}"
      class="kapp-header-container print-hide"
      :id="`kapp-${idSuffix}-header`"
      v-if="hasHeader"
      >
      <klab-components-viewer
        class="kapp-header"
        v-if="layout.header"
        :component="layout.header"
        direction="horizontal"
      ></klab-components-viewer>
      <div class="kapp-header" v-else>
        <img ref="kapp-logo" class="kapp-logo" :id="`kapp-${idSuffix}-logo`" :src="logoImage"/>
        <div class="kapp-title-container">
          <div class="kapp-title" v-if="layout.label">{{ layout.label }}</div>
          <div class="kapp-subtitle" v-if="layout.description">{{ layout.description }}</div>
        </div>
      </div>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      :class="{ 'kapp-main':  isRootLayout}"
      class="kapp-left-container print-hide"
      :id="`kapp-${idSuffix}-left`"
      content-class="kapp-left-inner-container"
      v-if="showLeftPanel"
      v-model="showLeftPanel"
      :width="600"
    >
      <template v-if="leftPanel">
        <klab-components-viewer
          :id="`kapp-${idSuffix}-left-0`"
          :component="layout.leftPanels[0]"
          direction="vertical">
        </klab-components-viewer>
      </template>
    </q-layout-drawer>
    <q-page-container>
      <k-explorer v-if="!layout || layout.panels.length === 0" class="kapp-main-container is-kexplorer" :id="`kapp-${idSuffix}-main`" :mainPanelStyle="mainPanelStyle"></k-explorer>
      <template v-else>
        <klab-components-viewer class="kapp-main-container print-hide" :id="`kapp-${idSuffix}-main-0`" :mainPanelStyle="mainPanelStyle" :component="layout.panels[0]"></klab-components-viewer>
      </template>
    </q-page-container>
    <q-resize-observable @resize="updateLayout" />
  </q-layout>
</template>

<script>
import KExplorer from 'components/KExplorer.vue';
import KlabComponentsViewer from 'components/KlabComponentsViewer.vue';
import { CUSTOM_EVENTS, DEFAULT_STYLES } from 'shared/Constants';
import { getColorObject } from 'shared/Utils';
import { URLS } from 'shared/MessagesConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { dom } from 'quasar';
import { axiosInstance } from 'plugins/axios';

const { width, height } = dom;
const DEFAULT_LOGO = 'statics/klab-logo.png';

export default {
  name: 'KlabLayout',
  components: {
    KExplorer,
    KlabComponentsViewer,
  },
  props: {
    layout: {
      type: Object,
    },
  },
  data() {
    return {
      header: {
        width: 0,
        height: 0,
      },
      leftPanel: {
        width: 0,
        height: 0,
      },
      logoImage: DEFAULT_LOGO,
      showLeft: true,
    };
  },
  computed: {
    isRootLayout() {
      return this.layout !== null && this.layout.parentId === null;
    },
    hasHeader() {
      return this.layout && (this.layout.header || this.layout.logo || this.layout.label || this.layout.description);
    },
    showLeftPanel: {
      get() {
        return this.layout && this.layout.leftPanels.length > 0;
      },
      set() {
        // nothing to do
      },
    },
    mainPanelStyle() {
      return {
        width: `${this.header.width - this.leftPanel.width}px`,
        height: `${this.leftPanel.height}px`,
      };
    },
    idSuffix() {
      if (this.layout !== null) {
        return this.layout.applicationId;
      }
      return 'default';
    },
  },
  methods: {
    setLogoImage() {
      if (this.layout && this.layout.logo) {
        axiosInstance.get(`${process.env.WS_BASE_URL}${URLS.REST_GET_PROJECT_RESOURCE}/${this.layout.projectId}/${this.layout.logo.replace('/', ':')}`, {
          responseType: 'arraybuffer',
        }).then((response) => {
          if (response.data) {
            this.logoImage = `data:image/png;base64,${Buffer.from(response.data, 'binary').toString('base64')}`;
          } else {
            this.logoImage = DEFAULT_LOGO;
          }
        });
      } else {
        this.logoImage = DEFAULT_LOGO;
      }
    },
    setStyle() {
      if (this.layout) {
        let style = null;
        style = {
          ...(this.layout.style && DEFAULT_STYLES[this.layout.style] ? DEFAULT_STYLES[this.layout.style] : DEFAULT_STYLES.default),
        };
        if (this.layout.styleSpecs) {
          try {
            const jsonStyle = JSON.parse(this.layout.styleSpecs);
            style = {
              ...style,
              ...jsonStyle,
            };
          } catch (error) {
            console.error('Error parsing style specs', error);
          }
        }
        if (style !== null) {
          Object.keys(style).forEach((key) => {
            let value = style[key];
            if (key === 'density') {
              key = 'line-height';
              switch (style.density) {
                case 'default':
                  value = 1;
                  break;
                case 'confortable':
                  value = 1.5;
                  break;
                case 'compact':
                  value = 0.5;
                  break;
                default:
                  value = 1;
              }
            }
            document.documentElement.style.setProperty(`--app-${key}`, value);
            if (key.includes('color')) {
              try {
                const color = getColorObject(value);
                if (color && color.rgb) {
                  document.documentElement.style.setProperty(`--app-rgb-${key}`, `${color.rgb.r},${color.rgb.g},${color.rgb.b}`);
                }
              } catch (error) {
                console.warn(`Error trying to parse a color from the layout style: ${key}: ${value}`);
              }
            }
          });
        }
      }
    },
    updateLayout() {
      this.setLogoImage();
      const header = document.querySelector('.kapp-main.kapp-header-container');
      if (header) {
        this.header.height = height(header);
      } else {
        this.header.height = 0;
      }
      this.header.width = window.innerWidth;
      const leftPanels = document.querySelector('.kapp-main.kapp-left-container aside');
      if (leftPanels) {
        this.leftPanel.width = width(leftPanels);
      } else {
        this.leftPanel.width = 0;
      }
      this.leftPanel.height = window.innerHeight - this.header.height;
      this.$nextTick(() => {
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED, { type: 'changelayout', align: (this.layout && this.layout.leftPanels.length > 0) ? 'right' : 'left' });
      });
      this.setStyle();
    },
  },
  watch: {
    layout(newLayout, oldLayout) {
      // setTimeout(() => {
      this.$nextTick(() => {
        this.updateLayout();
        // }, 400);
      });
      if (oldLayout !== null) {
        this.sendStompMessage(MESSAGES_BUILDERS.STOP_APPLICATION(
          { applicationId: oldLayout.applicationId },
          this.$store.state.data.session,
        ).body);
      }
    },
  },
  created() {},
  mounted() {
    this.updateLayout();
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  body
    .kapp-header-container
    .kapp-footer-container
    .kapp-left-inner-container
    .kapp-main-container:not(.is-kexplorer)
      color var(--app-text-color)
      font-family var(--app-font-family)
      font-size var(--app-font-size)
      line-height var(--app-line-height)
      background-color var(--app-background-color)

  .kapp-main
    &.q-layout
      border 0
      padding 0
      margin 0

  .kapp-header
    background-color var(--app-background-color)
    padding 0
    margin 0
    .kapp-logo
      // width 80px
      height 70px
      margin 5px 10px
      float left
      img
        max-width 80px
        max-height 80px
    .kapp-title-container
      color var(--app-title-color)
      float left
      height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      min-height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      vertical-align middle
      padding-top 17px // 20px padding - 6px/2 separation
      padding-left 10px
      .kapp-title
        height var(--app-title-size)
        line-height var(--app-title-size)
        font-weight 500
        font-size var(--app-title-size)
        margin-bottom 6px
      .kapp-subtitle
        height var(--app-subtitle-size)
        line-height var(--app-subtitle-size)
        font-size var(--app-subtitle-size)
        font-weight 300
  /*
  .kapp-left-inner-container
  .kapp-main-container
    padding-top 10px

   */
</style>