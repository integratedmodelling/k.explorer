<template>
  <q-layout view="hhh lpr fFf">
    <q-layout-header id="klab-main-header" v-if="layout && (layout.header  || layout.logo || layout.label || layout.description)">
      <klab-components-viewer class="klab-main-header" v-if="layout.header" :component="layout.header" direction="horizontal"></klab-components-viewer>
      <div class="klab-main-header" v-else>
        <img ref="main-logo" class="main-logo" :src="logoImage"/>
        <div class="main-title-container">
          <div class="main-title" v-if="layout.label">{{ layout.label }}</div>
          <div class="main-subtitle" v-if="layout.description">{{ layout.description }}</div>
        </div>
      </div>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      id="klab-main-left-panel"
      content-class="klab-main-left-panel"
      v-if="showLeftPanel"
      v-model="showLeftPanel"
      :width="600"
    >
      <template v-if="leftPanel">
        <klab-components-viewer id="left-panel-0" :component="layout.leftPanels[0]" direction="vertical"></klab-components-viewer>
      </template>
    </q-layout-drawer>

    <q-page-container>
        <k-explorer v-if="!layout || layout.panels.length === 0" class="klab-main-container" :mainPanelStyle="mainPanelStyle"></k-explorer>
        <template v-else>
          <klab-components-viewer class="klab-main-container" :mainPanelStyle="mainPanelStyle" :component="layout.panels[0]"></klab-components-viewer>
        </template>
    </q-page-container>
    <div class="klab-settings-button q-layout-transition">
      <q-fab
        ref="klab-settings"
        color="app-title-color"
        icon="mdi-settings"
        direction="up"
      >
        <q-fab-action
          v-if="layout !== null"
          color="app-main-background"
          text-color="app-title-color"
          @click="setLayout(null)"
          icon="mdi-exit-to-app"
        >
          <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[20, 0]">{{ $t('label.appClose') }}</q-tooltip>
        </q-fab-action>
        <q-fab-action
          color="app-main-background"
          text-color="app-title-color"
          icon="mdi-account-circle"
          @click="userDetailsVisible = true"
        >
          <q-tooltip class="klab-setting-tooltip" anchor="center left" self="center right" :offset="[16, 0]">{{ $t('label.userDetails') }}</q-tooltip>
        </q-fab-action>
      </q-fab>
    </div>
    <q-modal
      id="modal-connection-status"
      v-model="modalVisible"
      no-esc-dismiss
      no-backdrop-dismiss
      :content-css="{'background-color': `rgba(${hexToRgbValues(modalColor)}, 0.5)`}"
      :content-classes="['modal-borders', 'no-padding', 'no-margin']"
    >
      <div class="bg-opaque-white modal-borders">
        <div class="q-pa-xs text-bold modal-klab-content" :style="{color: modalColor}">
          <klab-spinner
            :color="modalColor"
            :size="40"
            :ball="18"
            id="modal-spinner"
            :animated="modalAnimated"
            wrapperId="modal-connection-status"
          ></klab-spinner>
          <span class="text-white">{{ modalText }}</span>
        </div>
      </div>
    </q-modal>
    <q-modal
      id="klab-user-details"
      :content-classes="['kud-container']"
      v-model="userDetailsVisible"
    >
      <div class="kud-button">
        <q-btn round size="xs" flat color="app-title-color" @click="userDetailsVisible = false" icon="mdi-close"></q-btn>
      </div>
      <div class="kud-title">{{ $t('label.userDetails') }}</div>
      <div class="kud-owner">
        <div class="kud-owner-unknown" v-if="owner.unknown">{{ owner.unknown }}</div>
        <template v-else>
          <div class="kud-owner-id"><span class="kud-label">{{ $t('label.userId') }}</span><span class="kud-value">{{ owner.id }}</span></div>
          <div class="kud-owner-email"><span class="kud-label">{{ $t('label.userEmail') }}</span><span class="kud-value">{{ owner.email }}</span></div>
          <div class="kud-owner-lastlogin"><span class="kud-label">{{ $t('label.userLastLogin') }}</span><span class="kud-value">{{ owner.lastLogin }}</span></div>
          <div class="kud-owner-groups"><span class="kud-label">{{ $t('label.userGroups') }}</span><span class="kud-value">{{ owner.groups }}</span></div>
        </template>
      </div>
    </q-modal>
    <q-modal
      v-model="hasActiveAlerts"
      v-if="activeAlert"
      content-classes="kaa-container"
    >
      <div class="kaa-content" v-html="activeAlert.content"></div>
      <div class="kaa-button">
        <q-btn
          color="app-title-color"
          @click="activeAlert.dismiss = true"
          :label="$t('label.acceptAlert')"
        />
      </div>
    </q-modal>
    <klab-presentation></klab-presentation>
    <q-resize-observable @resize="updateLayout" />
  </q-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import KExplorer from 'pages/KExplorer.vue';
import KlabComponentsViewer from 'components/KlabComponentsViewer.vue';
import KlabPresentation from 'components/KlabPresentation';
import KlabSpinner from 'components/KlabSpinner.vue';
import { CUSTOM_EVENTS, CONNECTION_CONSTANTS } from 'shared/Constants';
import { URLS } from 'shared/MessagesConstants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { colors, dom } from 'quasar';
import { axiosInstance } from 'plugins/axios';

const { width, height } = dom;
const DEFAULT_LOGO = 'statics/klab-logo.png';

export default {
  name: 'LayoutDefault',
  components: {
    KExplorer,
    KlabComponentsViewer,
    KlabPresentation,
    KlabSpinner,
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
      userDetailsVisible: false,
      activeAlert: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'sessionReference',
    ]),
    ...mapGetters('stomp', [
      'connectionState',
      'connectionDown',
    ]),
    ...mapGetters('view', [
      'layout',
      'activeAlerts',
    ]),
    hasActiveAlerts: {
      get() {
        return this.activeAlerts.length > 0;
      },
      set() {
        // nothing to do
      },
    },
    modalVisible: {
      get() {
        return this.connectionDown;
      },
      set(visible) {
        console.warn(`Try to set modalVisible as ${visible}`);
      },
    },
    modalText() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
    modalColor() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: colors.getBrand('info'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: colors.getBrand('negative'),
      }[this.connectionState];
    },
    modalAnimated() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: true,
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: false,
      }[this.connectionState];
    },
    owner() {
      return (this.sessionReference && this.sessionReference.owner) ? this.sessionReference.owner : {
        unknown: this.$t('label.unknownUser'),
      };
    },
    hasHeader() {
      return this.logo !== null || this.layout.header !== null;
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
  },
  methods: {
    ...mapActions('view', [
      'setLayout',
    ]),
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
    updateLayout() {
      this.setLogoImage();
      const header = document.getElementById('klab-main-header');
      if (header) {
        this.header.height = height(header);
      } else {
        this.header.height = 0;
      }
      this.header.width = window.innerWidth;
      const leftPanels = document.querySelector('#klab-main-left-panel aside');
      if (leftPanels) {
        this.leftPanel.width = width(leftPanels);
      } else {
        this.leftPanel.width = 0;
      }
      this.leftPanel.height = window.innerHeight - this.header.height;
      this.$nextTick(() => {
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED, { type: 'changelayout', align: (this.layout && this.layout.leftPanels.length > 0) ? 'right' : 'left' });
      });
      if (this.layout && this.layout.styleSpecs) {
        Object.keys(this.layout.styleSpecs).forEach((key) => {
          let value = this.layout.styleSpecs[key];
          if (key === 'density') {
            key = 'line-height';
            switch (this.layout.styleSpecs.density) {
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
        });
      }
    },
    setActiveAlert() {
      if (this.activeAlerts.length > 0) {
        this.activeAlert = this.activeAlerts[this.activeAlerts.length - 1];
      } else {
        this.$nextTick(() => {
          this.activeAlert = null;
        });
      }
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
    activeAlerts() {
      this.setActiveAlert();
    },
  },
  created() {},
  mounted() {
    this.updateLayout();
    this.setActiveAlert();
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  $title-size = var(--app-title-size);
  $subtitle-size = var(--app-subtitle-size);
  body
    color var(--app-text-color)
    font-family var(--app-font-family)
    font-size var(--app-font-size)
    line-height var(--app-line-height)
  .bg-opaque-white
    background rgba(255, 255, 255, 0.3)
  .modal-borders
    border-radius 40px

  #modal-spinner
    margin-right 10px
    margin-left 1px

  .modal-klab-content > span
    display inline-block
    line-height 100%
    vertical-align middle
    margin-right 15px

  #modal-connection-status .modal-content
    min-width 200px

  #modal-connection-status.fullscreen
    z-index 10000

  .q-layout
    border 0
    padding 0
    margin 0
  #klab-main-header
    background-color var(--app-background-color)
    padding 0
    margin 0
    .main-logo
      // width 80px
      height 70px
      margin 5px 10px
      float left
      img
        max-width 80px
        max-height 80px
    .main-title-container
      color var(--app-title-color)
      float left
      height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      min-height calc(40px + var(--app-title-size) + var(--app-subtitle-size))
      vertical-align middle
      padding-top 17px // 20px padding - 6px/2 separation
      padding-left 10px
      .main-title
        height var(--app-title-size)
        line-height var(--app-title-size)
        font-weight 500
        font-size var(--app-title-size)
        margin-bottom 6px
      .main-subtitle
        height var(--app-subtitle-size)
        line-height var(--app-subtitle-size)
        font-size var(--app-subtitle-size)
        font-weight 300
  .klab-main-left-panel
  .klab-main-container
    padding-top 10px
    background-color var(--app-background-color)
  .klab-settings-button
    position fixed
    bottom 36px
    right 26px
    opacity 0.2
    .q-btn-fab
      height 32px
      width 32px
      .q-icon
        font-size 16px
    .q-btn-fab-mini
      height 24px
      width 24px
      .q-icon
        font-size 12px
  .q-fab-up
    bottom 100%
    padding-bottom 10%
  .klab-settings-button
  .q-fab-actions
    &:hover
      opacity 1
      .q-btn-fab
        height 56px
        width 56px
        .q-icon
          font-size 28px
      .q-btn-fab-mini
        height 48px
        width 48px
        .q-icon
          font-size 24px
  .klab-setting-tooltip
    background-color var(--app-main-color)
  .kud-container
  .kaa-container
    background-color rgba(253,253,253,.8)
    padding 15px
    border-radius 5px
  .kud-container
    width 500px
    .kud-title
      font-size 1.3em
      color var(--app-title-color)
      font-width: 400;
    .kud-owner
      border 1px solid var(--app-main-color)
      border-radius 5px
      padding 20px
      .kud-label
        display inline-block
        width 100px
        line-height 1.5em
        color var(--app-title-color)
      .kud-value
        display inline-block
        line-height 1.5em
    .kud-button
      position absolute
      width 10px
      height 10px
      top 5px
      right 20px
  .kaa-container
    .kaa-content
      border 1px solid var(--app-main-color)
      border-radius 5px
      padding 20px
      color var(--app-title-color)
    .kaa-button
      margin 10px 0 0 0
      width 100%
      text-align right
</style>
