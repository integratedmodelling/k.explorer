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
      :width="400"
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
    <q-resize-observable @resize="updateLayout" />
  </q-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import KExplorer from 'pages/KExplorer.vue';
import KlabLayoutViewer from 'components/KlabLayoutViewer.vue';
import KlabComponentsViewer from 'components/KlabComponentsViewer.vue';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { URLS } from 'shared/MessagesConstants';
import { dom } from 'quasar';
import { axiosInstance } from '../plugins/axios';

const { width, height } = dom;
const DEFAULT_LOGO = 'statics/klab-logo.png';

export default {
  name: 'LayoutDefault',
  components: {
    KExplorer,
    KlabLayoutViewer,
    KlabComponentsViewer,
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
    ...mapGetters('view', [
      'layout',
    ]),
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
        this.$eventBus.$emit(CUSTOM_EVENTS.MAP_SIZE_CHANGED, 'changelayout');
      });
    },
  },
  watch: {
    layout() {
      // setTimeout(() => {
      this.$nextTick(() => {
        this.updateLayout();
      // }, 400);
      });
    },
  },
  created() {},
  mounted() {
    this.updateLayout();
  },
};
</script>

<style lang="stylus">
  .q-layout
    border 0
    padding 0
    margin 0
  #klab-main-header
    background-color white
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
      color #333
      float left
      height 80px
      vertical-align center
      font-weight 400
      padding-top 20px
      padding-left 10px
      .main-title
      .main-subtitle
        height 20px
      .main-title
        font-weight 500
      .main-subtitle
        font-size small
  .klab-main-left-panel
    background-color white
  .klab-main-container
    background-color #eee
</style>
