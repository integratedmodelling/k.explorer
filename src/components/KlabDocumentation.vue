<template>
  <q-layout :style="{ width: `${containerStyle.width}px`, height: `${containerStyle.height}px` }" view="hHh Lpr fFf" class="kd-main-container print-hide" container>
    <q-layout-header>
      <documentation-header></documentation-header>
    </q-layout-header>
    <q-layout-drawer
      side="left"
      :breakpoint="0"
      :content-class="['klab-left', 'no-scroll']"
      :width="LEFTMENU_CONSTANTS.LEFTMENU_DOCUMENTATION_SIZE"
      v-model="leftMenu"
      :overlay="false"
    >
      <documentation-tree></documentation-tree>
    </q-layout-drawer>

    <q-page-container>
      <q-page class="column">
        <div class="col row full-height kd-container">
          <documentation-viewer></documentation-viewer>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>


<script>
import { mapGetters, mapActions } from 'vuex';
import DocumentationHeader from 'components/DocumentationHeader.vue';
import DocumentationTree from 'components/DocumentationTree';
import DocumentationViewer from 'components/DocumentationViewer';
import { LEFTMENU_CONSTANTS } from 'shared/Constants';
import { CUSTOM_EVENTS } from '../shared/Constants';

export default {
  name: 'KlabDocumentation',
  components: {
    DocumentationHeader,
    DocumentationTree,
    DocumentationViewer,
  },
  props: {
    containerStyle: {
      required: true,
    },
  },
  data() {
    return {
      leftMenu: true,
      LEFTMENU_CONSTANTS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
    ]),
    ...mapGetters('view', [
      'documentationView',
      'reloadDocumentation',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadDocumentation',
      'refreshDocumentation',
    ]),
    load(view = null) {
      if (this.hasContext && this.hasObservations) {
        this.loadDocumentation(view || this.documentationView);
      }
    },
  },
  watch: {
    documentationView() {
      this.$nextTick(() => {
        this.load();
      });
    },
    reloadDocumentation() {
      this.$nextTick(() => {
        this.load();
      });
    },
  },
  activated() {
    this.load();
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, this.load);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, this.load);
  },
};
</script>

<style lang="stylus">
.kexplorer-container.kd-is-app
  background-color var(--app-background-color)
</style>