<template>
  <q-layout view="hhh lpr fFf" :class="{ 'kapp-main':  isRootLayout}" :id="`kapp-${idSuffix}`">
    <q-btn
      v-if="layout !== null && isRootLayout"
      color="app-main-color"
      flat
      round
      @click="setLayout(null)"
      icon="mdi-exit-to-app"
      class="klab-close-app"
      :class="[ header.height > 0 ? 'klab-close-app-on-header' : leftPanel.width > 0 ? 'klab-close-app-on-left' : 'klab-close-app-on-panel']"
      :style="{
        ...((header.height > 0 && { top: `${(header.height - 40) / 2}px`, right: '16px' }) || (leftPanel.width > 0) && { left: `${(leftPanel.width - 34)}px`, top: '4px' } || { top: '16px', left: '16px' }),
      }"
    >
      <q-tooltip class="klab-app-tooltip" anchor="center right" self="center left" :offset="[8, 0]" :delay="1000">{{ $t('label.appsClose') }}</q-tooltip>
    </q-btn>
    <q-layout-header
      :class="{ 'kapp-main':  isRootLayout}"
      class="kapp-header-container print-hide"
      :id="`kapp-${idSuffix}-header`"
      v-if="hasHeader"
      >
      <klab-app-viewer
        class="kapp-header"
        v-if="layout.header"
        :component="layout.header"
        direction="horizontal"
      ></klab-app-viewer>
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
      content-class="kapp-left-inner-container"
      v-if="showLeftPanel"
      v-model="showLeftPanel"
      :width="leftPanelWidth"
    >
      <template v-if="leftPanel">
        <klab-app-viewer
          :id="`kapp-${idSuffix}-left-0`"
          :component="layout.leftPanels[0]"
          direction="vertical">
        </klab-app-viewer>
      </template>
    </q-layout-drawer>
    <q-page-container>
      <k-explorer v-if="!layout || layout.panels.length === 0" class="kapp-main-container is-kexplorer" :id="`kapp-${idSuffix}-main`" :mainPanelStyle="mainPanelStyle"></k-explorer>
      <template v-else>
        <klab-app-viewer class="kapp-main-container print-hide" :id="`kapp-${idSuffix}-main-0`" :mainPanelStyle="mainPanelStyle" :component="layout.panels[0]"></klab-app-viewer>
      </template>
    </q-page-container>
    <q-resize-observable @resize="updateLayout" />
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import SimpleBar from 'simplebar';
import KExplorer from 'components/KExplorer.vue';
import KlabAppViewer from 'components/KlabAppViewer.vue';
import { CUSTOM_EVENTS, DEFAULT_STYLES, APPS_DEFAULT_VALUES } from 'shared/Constants';
import { getColorObject } from 'shared/Utils';
import { getBase64Resource } from 'shared/Helpers';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { dom } from 'quasar';

const { width, height } = dom;

export default {
  name: 'KlabLayout',
  components: {
    KExplorer,
    KlabAppViewer,
  },
  props: {
    layout: {
      type: Object,
      default: null,
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
      logoImage: APPS_DEFAULT_VALUES.DEFAULT_LOGO,
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
    leftPanelWidth() {
      return this.layout && this.layout.leftPanels && this.layout.leftPanels.length > 0 && this.layout.leftPanels[0].attributes.width ? this.layout.leftPanels[0].attributes.width : 512;
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
    ...mapActions('view', [
      'setLayout',
    ]),
    setLogoImage() {
      if (this.layout && this.layout.logo) {
        getBase64Resource(this.layout.projectId, this.layout.logo)
          .then((logo) => {
            if (logo !== null) {
              this.logoImage = logo;
            } else {
              this.logoImage = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
            }
          })
          .catch((error) => {
            console.error(error);
            this.logoImage = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
          });
      } else {
        this.logoImage = APPS_DEFAULT_VALUES.DEFAULT_LOGO;
      }
    },
    setStyle() {
      let style = null;
      if (this.layout === null) {
        style = DEFAULT_STYLES.default;
      } else {
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

      this.$nextTick(() => {
        const leftInnerContainer = document.querySelector('.kapp-left-inner-container');
        if (leftInnerContainer) {
          // eslint-disable-next-line no-new
          new SimpleBar(leftInnerContainer);
        }
      });
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
        this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
          { applicationId: oldLayout.applicationId, stop: true },
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
  .kapp-left-inner-container
    position absolute !important
  .kapp-main
    &.q-layout
      border 0
      padding 0
      margin 0
    .simplebar-scrollbar::before
      background-color var(--app-main-color)
  // header
  .kapp-header
    background-color var(--app-background-color)
    padding 0
    margin 0
    img
      max-width 80px
      max-height 80px
      &.kapp-logo
        margin 5px 10px
        float left
    .kapp-title-container
      color var(--app-title-color)
      float left
      height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      min-height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      vertical-align middle
      padding-top 22px // 25px padding - 6px/2 separation
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
  // close app button
  .klab-close-app
    position absolute
    z-index 100000
    &.klab-close-app-on-left
    &.klab-close-app-on-panel
      height 32px
      width 32px
      opacity 0.2
      .q-icon
        font-size 16px
      &:hover
        height 50px
        width 50px
        opacity 1
        .q-icon
          font-size 22px
    &.klab-close-app-on-left
      &:hover
        transform translate(-22px, 0)
    &.klab-close-app-on-panel
      background-color var(--app-main-color)
      color var(--app-background-color)

</style>
