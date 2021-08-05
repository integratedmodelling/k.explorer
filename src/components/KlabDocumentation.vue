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
    <q-modal class="kd-modal" v-model="print" @show="launchPrint" no-backdrop-dismiss no-esc-dismiss>
      <documentation-viewer :for-printing="true"></documentation-viewer>
      <q-btn icon="mdi-close" round flat size="sm" class="dv-print-hide print-hide" color="mc-main" @click="print=false"></q-btn>
    </q-modal>
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
      print: false,
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
      'reloadViews',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'loadDocumentation',
      'refreshDocumentation',
    ]),
    load({ view = null, force = false } = {}) {
      if (view === null) {
        view = this.documentationView;
      }
      if (this.reloadViews.indexOf(view) !== -1 || force) {
        this.loadDocumentation(view);
      }
    },
    printDocumentation() {
      this.print = true;
    },
    closePrint() {
      this.print = false;
    },
    launchPrint() {
      this.$eventBus.$emit(CUSTOM_EVENTS.FONT_SIZE_CHANGE, 'table');
      setTimeout(() => {
        window.print();
      }, 600);
    },
  },
  watch: {
    documentationView() {
      this.$nextTick(() => {
        this.load();
      });
    },
    reloadViews() {
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
    this.$eventBus.$on(CUSTOM_EVENTS.PRINT_DOCUMENTATION, this.printDocumentation);
    window.addEventListener('afterprint', this.closePrint);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, this.load);
    this.$eventBus.$off(CUSTOM_EVENTS.PRINT_DOCUMENTATION, this.printDocumentation);
    window.removeEventListener('afterprint', this.closePrint);
  },
};
</script>

<style lang="stylus">
.kexplorer-container.kd-is-app
  background-color var(--app-background-color)
.kd-modal
  .modal-content
    border-radius 20px
    padding 20px 0
    background-color white
    overflow hidden
    width 1024px
    min-height 80vh
  .dv-documentation-wrapper
    .dv-content
      padding-top 0
  .dv-print-hide
    position absolute
    top 5px
    right 20px
@media print
  body
    min-width 100%
  #q-app
    display none
  .kd-modal
    &.fullscreen
      position static
    .modal-content
      min-width 100%
      max-width 100%
      min-height 100%
      max-height 100%
      box-shadow none
      width 100% !important
      border-radius 0 !important
  .dv-documentation-wrapper table td
  .dv-documentation-wrapper p
    word-break break-word

  .dv-documentation-wrapper
    display block !important
    position relative !important
    overflow visible !important
    overflow-y visible !important
    width 100% !important
    height 100% !important
    margin 0 !important
    left 0 !important
    border none !important

  .modal-backdrop
    background transparent !important

</style>
