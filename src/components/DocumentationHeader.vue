<template>
  <div class="dh-container full-width row items-center">
    <div class="dh-tabs col justify-start">
      <q-tabs
        v-model="selectedTab"
        color="mc-main"
        underline-color="mc-main"
      >
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.REPORT" class="klab-tab" icon="mdi-text-box-outline" :alert="reloadViews.indexOf(DOCUMENTATION_VIEWS.REPORT) !== -1"></q-tab>
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.TABLES" class="klab-tab" icon="mdi-table" :alert="reloadViews.indexOf(DOCUMENTATION_VIEWS.TABLES) !== -1"></q-tab>
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.FIGURES" class="klab-tab" icon="mdi-image" :alert="reloadViews.indexOf(DOCUMENTATION_VIEWS.FIGURES) !== -1"></q-tab>
        <q-tab slot="title" :name="DOCUMENTATION_VIEWS.RESOURCES" class="klab-tab" icon="mdi-database-outline" :alert="reloadViews.indexOf(DOCUMENTATION_VIEWS.RESOURCES) !== -1"></q-tab>
        <!-- <q-tab slot="title" :name="DOCUMENTATION_VIEWS.MODELS" class="klab-tab" icon="mdi-graph-outline" :alert="reloadViews.indexOf(DOCUMENTATION_VIEWS.MODELS) !== -1"></q-tab> -->
      </q-tabs>
    </div>
    <div class="dh-actions justify-end">
      <q-btn icon="mdi-refresh" class="dh-button" flat color="mc-main" @click="forceReload">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appReload')}}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-printer" class="dh-button" flat color="mc-main" @click="print">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appPrint')}}</q-tooltip>
      </q-btn>
      <template v-if="selectedTab === DOCUMENTATION_VIEWS.TABLES">
        <q-btn class="dh-button" :disable="tableFontSize - 1 < 8" @click="tableFontSizeChange(-1)" flat icon="mdi-format-font-size-decrease" color="mc-main"></q-btn>
        <q-btn class="dh-button" :disable="tableFontSize + 1 > 50" @click="tableFontSizeChange(1)" flat icon="mdi-format-font-size-increase" color="mc-main"></q-btn>
      </template>
    </div>
    <div class="dh-spinner col-1 justify-end" v-if="hasSpinner">
      <transition
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <div
          id="kd-spinner"
          class="klab-spinner-div item-center"
        >
          <klab-spinner
            id="spinner-documentation"
            :store-controlled="true"
            :size="30"
            :ball="22"
            wrapperId="kd-spinner"
          ></klab-spinner>
        </div>
      </transition>
    </div>
    <!--
    <div class="dh-actions col justify-end self-center">
      <q-btn icon="mdi-refresh" class="dv-doc-reload" size="md" color="mc-main" @click="forceReload">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appReload')}}</q-tooltip>
      </q-btn>
    </div>
    -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { DOCUMENTATION_VIEWS, LEFTMENU_CONSTANTS, CUSTOM_EVENTS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner';

export default {
  name: 'DocumentationHeader',
  components: {
    KlabSpinner,
  },
  data() {
    return {
      DOCUMENTATION_VIEWS,
    };
  },
  computed: {
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
    ...mapGetters('view', [
      'leftMenuState',
      'hasHeader',
      'reloadViews',
      'tableFontSize',
    ]),
    hasSpinner() {
      return !(this.leftMenuState !== LEFTMENU_CONSTANTS.LEFTMENU_HIDDEN && !this.hasHeader);
    },
    selectedTab: {
      get() {
        return this.$store.getters['view/documentationView'];
      },
      set(value) {
        this.$store.dispatch('view/setDocumentationView', value, { root: true });
      },
    },
  },
  methods: {
    ...mapActions('view', [
      'setTableFontSize',
    ]),
    tableFontSizeChange(amount) {
      this.setTableFontSize(this.tableFontSize + amount);
      this.$eventBus.$emit(CUSTOM_EVENTS.FONT_SIZE_CHANGE, 'table');
    },
    forceReload() {
      this.$eventBus.$emit(CUSTOM_EVENTS.REFRESH_DOCUMENTATION, { force: true });
    },
    print() {
      this.$eventBus.$emit(CUSTOM_EVENTS.PRINT_DOCUMENTATION);
    },
  },
};
</script>

<style lang="stylus">
@import '~variables'
.dh-container
  background-color rgba(35,35,35,0.8)
  .dh-spinner
    width 28px
    margin-left 16px
    margin-right 16px
  .dh-tabs
    .q-tabs-head
      background-color rgba(0, 0, 0, 0)
      padding 0 !important
      .q-tab
        padding 10px 16px
        &.active
          color $main-control-main-color !important
        .q-dot
          background-color $main-control-main-color
          right -3px
          top -1px
  .dh-actions
    text-align right
    padding-right 12px
    .dh-button
      padding 8px
.kd-is-app
  .q-layout-header
    box-shadow none
    border-bottom 1px solid var(--app-darken-background-color)
  .dh-container
    // border-left 1px solid var(--app-main-color)
    // border-bottom 1px solid var(--app-main-color)
    background-color var(--app-darken-background-color)
  .dh-actions
    .dh-button
      color var(--app-main-color)
  .dh-tabs
    .q-tabs-head
      background-color rgba(0, 0, 0, 0)
      padding 0 !important
      .q-tab
        padding 13px 16px
        text-shadow none
        &.active
          color var(--app-main-color) !important
        .q-dot
          background-color var(--app-main-color)
    .q-tabs-bar
      color var(--app-main-color)
      border-bottom-width 4px
</style>
