<template>
  <q-layout view="hhh lpr fFf" :class="{ 'kapp-main':  isRootLayout}" class="kapp-layout-container" :id="`kapp-${idSuffix}`" :style="modalDimensions">
    <q-layout-header
      :class="{ 'kapp-main':  isRootLayout }"
      class="kapp-header-container kapp-container print-hide"
      :id="`kapp-${idSuffix}-header`"
      v-if="!isModal && hasHeader"
      >
      <klab-app-viewer
        class="kapp-header"
        v-if="layout.header"
        :component="layout.header"
        direction="horizontal"
      ></klab-app-viewer>
      <div class="kapp-header row" v-else>
        <div class="kapp-logo-container">
          <img ref="kapp-logo" class="kapp-logo" :id="`kapp-${idSuffix}-logo`" :src="logoImage"/>
        </div>
        <div class="kapp-title-container">
          <div class="kapp-title" v-if="layout.label">{{ layout.label }}<span class="kapp-version" v-if="layout.versionString">{{ layout.versionString }}</span></div>
          <div class="kapp-subtitle" v-if="layout.description">{{ layout.description }}</div>
        </div>
        <div class="kapp-header-menu-container" v-if="layout.menu && layout.menu.length > 0">
          <div class="kapp-header-menu-item klab-link" v-for="item in layout.menu" :key="item.id" @click="clickOnMenu(item.id)">{{ item.text }}</div>
        </div>
        <div class="kapp-actions-container row items-end justify-end">
          <main-actions-buttons :is-header="true" class="col items-end"></main-actions-buttons>
        </div>
      </div>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      :class="{ 'kapp-main':  isRootLayout}"
      class="kapp-left-container kapp-container print-hide"
      content-class="kapp-left-inner-container"
      v-if="showLeftPanel"
      v-model="showLeftPanel"
      :width="leftPanelWidth"
    >
      <template v-if="leftPanel">
          <klab-app-viewer
            :id="`kapp-${idSuffix}-left-0`"
            :component="layout.leftPanels[0]"
            direction="vertical"
            class="kapp-left-wrapper"
          >
          </klab-app-viewer>

      </template>
    </q-layout-drawer>
    <q-page-container>
      <k-explorer v-if="!layout || layout.panels.length === 0" class="kapp-main-container is-kexplorer" :id="`kapp-${idSuffix}-main`" :mainPanelStyle="mainPanelStyle"></k-explorer>
      <template v-else>
        <klab-app-viewer class="kapp-main-container kapp-container print-hide" :id="`kapp-${idSuffix}-main-0`" :mainPanelStyle="mainPanelStyle" :component="layout.panels[0]"></klab-app-viewer>
      </template>
    </q-page-container>
    <q-resize-observable @resize="updateLayout()" />
    <q-modal
      v-model="blockApp"
      no-esc-dismiss
      no-backdrop-dismiss
      :content-classes="['absolute-center', 'kapp-loading']"
      class="kapp-modal"
    >
      <q-spinner color="app-main-color" size="3em"></q-spinner>
      <!-- div class="kapp-loading-message">{{ $t('label.resettingContext') }}</div> -->
    </q-modal>
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import SimpleBar from 'simplebar';
import KExplorer from 'components/KExplorer.vue';
import KlabAppViewer from 'components/KlabAppViewer.vue';
import MainActionsButtons from 'components/MainActionsButtons';
import { CUSTOM_EVENTS, DEFAULT_STYLES, APPS_DEFAULT_VALUES, WEB_CONSTANTS } from 'shared/Constants';
import * as colors from 'shared/colors';
import { getColorObject } from 'shared/Utils';
// import { getBase64Resource } from 'shared/Helpers';
import { URLS } from 'shared/MessagesConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { dom } from 'quasar';


const { lighten } = colors;
const { width, height } = dom;

export default {
  name: 'KlabLayout',
  components: {
    MainActionsButtons,
    KExplorer,
    KlabAppViewer,
  },
  props: {
    layout: {
      type: Object,
      default: null,
    },
    isModal: {
      type: Boolean,
      default: false,
    },
    modalWidth: {
      type: String,
      default: '60vw',
    },
    modalHeight: {
      type: String,
      default: '60vh',
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
      resetTimeout: null,
      blockApp: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'sessionReference',
      'session',
    ]),
    ...mapGetters('view', [
      'isApp',
      'hasHeader',
    ]),
    isRootLayout() {
      return this.isModal ? false : this.layout !== null && this.layout.parentId === null;
    },
    /*
    hasHeader() {
      return this.layout && (this.layout.header || this.layout.logo || this.layout.label || this.layout.description);
    },
     */
    showLeftPanel: {
      get() {
        return this.layout && this.layout.leftPanels.length > 0;
      },
      set() {
        // nothing to do
      },
    },
    leftPanelWidth() {
      return this.layout && this.layout.leftPanels && this.layout.leftPanels.length > 0 && this.layout.leftPanels[0].attributes.width ? parseInt(this.layout.leftPanels[0].attributes.width, 10) : 512;
    },
    mainPanelStyle() {
      return {
        width: this.header.width - this.leftPanel.width,
        height: this.leftPanel.height,
      };
    },
    idSuffix() {
      if (this.layout !== null) {
        return this.layout.applicationId;
      }
      return 'default';
    },
    modalDimensions() {
      if (this.isModal) {
        return { width: this.modalWidth, height: this.modalHeight, 'min-height': this.modalHeight };
      }
      return {};
    },
  },
  methods: {
    setLogoImage() {
      if (this.layout && this.layout.logo) {
        this.logoImage = `${process.env.WS_BASE_URL}${URLS.REST_GET_PROJECT_RESOURCE}/${this.layout.projectId}/${this.layout.logo.replace('/', ':')}`;
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
        const bodyMinWidth = this.layout.leftPanels.length > 0 && this.layout.leftPanels[0].attributes.width ? parseInt(this.layout.leftPanels[0].attributes.width, 10) : 0;
        if (bodyMinWidth !== 0) {
          document.documentElement.style.setProperty('--body-min-width', `calc(640px + ${bodyMinWidth}px)`);
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
                const multiplier = this.layout && this.layout.style === 'dark' ? -1 : 1;
                document.documentElement.style.setProperty(`--app-rgb-${key}`, `${color.rgb.r},${color.rgb.g},${color.rgb.b}`);
                document.documentElement.style.setProperty(`--app-highlight-${key}`, lighten(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`, -15 * multiplier));
                document.documentElement.style.setProperty(`--app-darklight-${key}`, lighten(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`, -5 * multiplier));
                document.documentElement.style.setProperty(`--app-darken-${key}`, lighten(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`, -20 * multiplier));
                document.documentElement.style.setProperty(`--app-lighten-${key}`, lighten(`rgb(${color.rgb.r},${color.rgb.g},${color.rgb.b})`, 20 * multiplier));
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
    updateLayout(layoutChanged = false) {
      this.setLogoImage();
      const header = document.querySelector('.kapp-main.kapp-header-container');
      if (header) {
        this.header.height = height(header);
      } else {
        this.header.height = 0;
      }
      this.header.width = window.innerWidth;
      this.leftPanel.height = window.innerHeight - this.header.height;
      const leftPanels = document.querySelector('.kapp-main.kapp-left-container aside');
      if (leftPanels) {
        this.leftPanel.width = width(leftPanels);
      } else {
        this.leftPanel.width = 0;
      }
      this.$nextTick(() => {
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED, { type: 'changelayout', align: (this.layout && this.layout.leftPanels.length > 0) ? 'right' : 'left' });
      });
      this.setStyle();
      if (layoutChanged) {
        this.$eventBus.$emit(CUSTOM_EVENTS.SHOW_NOTIFICATIONS, {
          apps: this.layout !== null ? [this.layout.name] : [],
          groups: this.sessionReference && this.sessionReference.owner && this.sessionReference.owner.groups
            ? this.sessionReference.owner.groups.map(g => g.id)
            : [],
        });
      }
    },
    downloadListener({ url, parameters }) {
      this.$axios.get(`${process.env.WS_BASE_URL}${process.env.ENGINE_URL}${url}`, {
        params: {
          format: 'RAW',
        },
        responseType: 'blob',
      }).then((response) => {
        // const blob = new Blob([response.data]);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(response.data);
        link.setAttribute('download', parameters.filename || `output_${new Date().getTime()}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(link.href), 5000);
      }).catch((error) => {
        console.error(error);
      });
    },
    clickOnMenu(id) {
      if (this.layout) {
        const { applicationId, identity } = this.layout;
        this.sendStompMessage(MESSAGES_BUILDERS.MENU_ACTION({
          // ...EMPTY_VIEWACTION_MESSAGE,
          identity,
          applicationId,
          menuId: id,
        }, this.$store.state.data.session).body);
      }
    },
    resetContextListener() {
      if (this.resetTimeout !== null) {
        clearTimeout(this.resetTimeout);
        this.resetTimeout = null;
      }
      this.blockApp = true;
      this.resetTimeout = setTimeout(() => {
        this.blockApp = false;
        this.resetTimeout = null;
      }, 1000);
    },
    viewActionListener() {
      if (this.resetTimeout !== null) {
        this.resetContextListener();
      }
    },
  },
  watch: {
    layout(newLayout, oldLayout) {
      // this.$eventBus.$emit(CUSTOM_EVENTS.LAYOUT_CHANGED);
      if (!this.isApp) {
        // setTimeout(() => {
        this.$nextTick(() => {
          this.updateLayout(true);
          // }, 400);
        });
        if (oldLayout !== null && oldLayout.name !== null) {
          this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
            { applicationId: oldLayout.name, stop: true },
            this.$store.state.data.session,
          ).body);
          const storedApp = localStorage.getItem(WEB_CONSTANTS.LOCAL_STORAGE_APP_ID);
          if (storedApp && storedApp === oldLayout.name) {
            localStorage.removeItem(WEB_CONSTANTS.LOCAL_STORAGE_APP_ID);
          }
        }
      }
      if (this.layout !== null) {
        // check reset events
        if (this.isRootLayout) {
          this.$eventBus.$on(CUSTOM_EVENTS.RESET_CONTEXT, this.resetContextListener);
          this.$eventBus.$on(CUSTOM_EVENTS.VIEW_ACTION, this.viewActionListener);
        }
      } else {
        this.$eventBus.$off(CUSTOM_EVENTS.RESET_CONTEXT, this.resetContextListener);
        this.$eventBus.$off(CUSTOM_EVENTS.VIEW_ACTION, this.viewActionListener);
      }
    },
  },
  created() {},
  mounted() {
    this.updateLayout(true);
    this.$eventBus.$on(CUSTOM_EVENTS.DOWNLOAD_URL, this.downloadListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.DOWNLOAD_URL, this.downloadListener);
    this.$eventBus.$off(CUSTOM_EVENTS.RESET_CONTEXT, this.resetContextListener);
    this.$eventBus.$off(CUSTOM_EVENTS.VIEW_ACTION, this.viewActionListener);
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  body
    .klab-main-app
      position relative
    .kapp-header-container
    .kapp-footer-container
    .kapp-left-inner-container
    .kapp-main-container:not(.is-kexplorer)
      color var(--app-text-color)
      font-family var(--app-font-family)
      font-size var(--app-font-size)
      line-height var(--app-line-height)
      background-color var(--app-background-color)
      padding 0
      margin 0
    .kapp-left-inner-container
      position absolute !important
      .kapp-left-wrapper
        overflow hidden
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
    display flex
    flex-wrap nowrap
    flex-direction row
    height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
    min-height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
    .kapp-logo-container
      align-self center
      margin 0 10px
      img
        max-width 80px
        max-height 80px
    .kapp-title-container
      color var(--app-title-color)
      flex-grow 1
      align-self center
      // padding-top 22px // 25px padding - 6px/2 separation
      padding-left 10px
      .kapp-title
        height var(--app-title-size)
        line-height var(--app-title-size)
        font-weight 500
        font-size var(--app-title-size)
        margin-bottom 6px
      .kapp-version
        display inline-block
        font-weight 300
        font-size var(--app-subtitle-size)
        margin-left 16px
        position relative
        bottom 3px
        padding 0px 4px
        opacity .5
        border 1px solid var(--app-main-color)
      .kapp-subtitle
        height var(--app-subtitle-size)
        line-height var(--app-subtitle-size)
        font-size var(--app-subtitle-size)
        font-weight 300
    .kapp-header-menu-container
      position absolute
      right 0
      padding 10px 16px
      .kapp-header-menu-item
        margin 0 0 0 16px
        color var(--app-title-color)
        cursor pointer
    .kapp-actions-container
      .klab-main-actions
        margin 0 1px 0 0
        min-width 178px
        .klab-button
          width 60px
          height 45px
          font-size 26px
          margin 0 -1px 0 0
          text-align center
          padding 10px 0
          border-top-left-radius 4px !important
          border-top-right-radius 4px !important
          border 1px solid var(--app-main-color)
          border-bottom 0
          //text-shadow none
          text-shadow 0 1px 2px var(--app-lighten-background-color)
          color var(--app-main-color) !important
          position relative
          bottom -1px
          &.active
            background-color var(--app-darken-background-color)
          &:hover:not(.active)
            // color var(--app-background-color) !important
            background-color var(--app-darken-background-color)
            border-bottom 1px solid var(--app-main-color)
        .klab-button-notification
          width 11px
          height 11px
          border-radius 10px
          top 5px
          right 11px
          background-color var(--app-main-color) !important
          border 1px solid var(--app-background-color)
  .kcv-dir-vertical
    display flex
    flex-direction column
    height 100% !important
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
  .kapp-loading
    background-color var(--app-background-color)
    padding 16px
    text-align center
    min-width 60px
    border-radius 20px
    div
      margin-top 15px
      color var(--app-main-color)
</style>
