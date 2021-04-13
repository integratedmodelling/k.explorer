<template>
  <div class="klab-actions" :class="orientation">
    <div class="klab-main-actions">
      <!-- MAP BUTTON -->
      <div class="klab-button klab-action"
           @click="mainViewerName !== VIEWERS.DATA_VIEWER.name ? setMainViewer(isMainControlDocked ? VIEWERS.DOCKED_DATA_VIEWER : VIEWERS.DATA_VIEWER) : false"
           :class="[{ active: mainViewerName === VIEWERS.DATA_VIEWER.name }]"
           v-if="orientation !== 'horizontal'"
      ><q-icon name="mdi-eye-outline">
        <q-tooltip
          :delay="600"
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ $t('tooltips.dataViewer') }}</q-tooltip>
      </q-icon></div>
      <!-- DOCUMENTATION BUTTON -->
      <div class="klab-button klab-action"
           @click="mainViewerName !== VIEWERS.DOCUMENTATION_VIEWER.name && hasObservations ? setMainViewer(VIEWERS.DOCUMENTATION_VIEWER) : false"
           :class="[{ active: mainViewerName === VIEWERS.DOCUMENTATION_VIEWER.name, disabled: mainViewerName !== VIEWERS.DOCUMENTATION_VIEWER.name && !hasObservations }]"
      ><q-icon name="mdi-text-box-multiple-outline">
        <span class="klab-button-notification" v-if="mainViewerName !== VIEWERS.DOCUMENTATION_VIEWER.name && hasObservations"></span>
        <q-tooltip
          :delay="600"
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ hasObservations ? $t('tooltips.documentationViewer') : $t('tooltips.noDocumentation') }}</q-tooltip>
      </q-icon></div>
      <!-- REPORT BUTTON -->
      <div class="klab-button klab-action"
           @click="mainViewerName !== VIEWERS.REPORT_VIEWER.name && hasObservations ? setMainViewer(VIEWERS.REPORT_VIEWER) : false"
           :class="[{ active: mainViewerName === VIEWERS.REPORT_VIEWER.name, disabled: mainViewerName !== VIEWERS.REPORT_VIEWER.name && !hasObservations }]"
      ><q-icon name="mdi-text-box-outline">
        <span class="klab-button-notification" v-if="mainViewerName !== VIEWERS.REPORT_VIEWER.name && reloadDocumentation && hasObservations"></span>
        <q-tooltip
          :delay="600"
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ hasObservations ? $t('tooltips.reportViewer') : $t('tooltips.noReportObservation') }}</q-tooltip>
      </q-icon></div>
      <!-- DATAFLOW -->
      <div
        class="klab-button klab-action"
        @click="mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && hasContext ? setMainViewer(VIEWERS.DATAFLOW_VIEWER) : false"
        :class="[{ active: mainViewerName === VIEWERS.DATAFLOW_VIEWER.name, disabled: mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && !hasContext }]"
      ><q-icon name="mdi-sitemap">
        <span class="klab-button-notification" v-if="mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && hasContext && reloadDataflow"></span>
        <q-tooltip
          :delay="600"
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ hasDataflow || reloadDataflow ? $t('tooltips.dataflowViewer') : $t('tooltips.noDataflow') }}</q-tooltip>
      </q-icon></div>
      <!-- PROVENANCE (disabled) -->
      <!-- in the future
      <div class="klab-button klab-action disabled"
      ><q-icon name="mdi-brain">
        <q-tooltip
          :offset="[0, 8]"
          self="top middle"
          anchor="bottom middle"
        >{{ $t('tooltips.dataflowViewer') }}</q-tooltip>
      </q-icon></div>
      -->
    </div>
    <!-- <div :class="separatorClass" class="mab-separator"></div> -->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { VIEWERS } from 'shared/Constants';

export default {
  name: 'MainActionsButtons',
  props: {
    orientation: {
      type: String,
      default: 'horizontal',
    },
    separatorClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('view', [
      'reloadDocumentation',
      'reloadDataflow',
    ]),
    ...mapGetters('data', [
      'hasObservations',
      'hasDataflow',
      'hasContext',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'mainViewerName',
      'statusTextsString',
      'statusTextsLength',
      'isMainControlDocked',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
    tooltipAnchor(where) {
      return `${where} ${this.orientation === 'horizontal' ? 'middle' : 'left'}`;
    },
  },
  created() {
    this.VIEWERS = VIEWERS;
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .klab-destructive-actions .klab-button
    color $main-control-red !important
</style>
