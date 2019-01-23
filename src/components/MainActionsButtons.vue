<template>
  <div class="klab-actions" :class="orientation">
    <!-- MAP BUTTON -->
    <div class="klab-button klab-action"
         @click="mainViewerName !== VIEWERS.DATA_VIEWER.name ? setMainViewer(VIEWERS.DATA_VIEWER) : false"
         :class="[{ active: mainViewerName === VIEWERS.DATA_VIEWER.name }]"
    ><q-icon name="mdi-eye-outline">
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
      >{{ $t('tooltips.dataViewer') }}</q-tooltip>
    </q-icon></div>
    <!-- REPORT BUTTON -->
    <div class="klab-button klab-action"
         @click="mainViewerName !== VIEWERS.REPORT_VIEWER.name && hasObservations ? setMainViewer(VIEWERS.REPORT_VIEWER) : false"
         :class="[{ active: mainViewerName === VIEWERS.REPORT_VIEWER.name, disabled: mainViewerName !== VIEWERS.REPORT_VIEWER.name && !hasObservations }]"
    ><q-icon name="mdi-file-document-box-outline">
      <span class="klab-button-notification" v-if="mainViewerName !== VIEWERS.REPORT_VIEWER.name && reloadReport"></span>
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
      >{{ hasObservations ? $t('tooltips.reportViewer') : $t('tooltips.noReportObservation') }}</q-tooltip>
    </q-icon></div>
    <!-- DATAFLOW -->
    <div
      class="klab-button klab-action"
      @click="mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && hasContext ? setMainViewer(VIEWERS.DATAFLOW_VIEWER) : false"
      :class="[{ active: mainViewerName === VIEWERS.DATAFLOW_VIEWER.name, disabled: mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && !hasContext }]"
    ><q-icon name="mdi-sitemap">
      <span class="klab-button-notification" ><!-- v-if="mainViewerName !== VIEWERS.DATAFLOW_VIEWER.name && hasContext && reloadDataflow" --></span>
      <q-tooltip
        :offset="[0, 8]"
        self="top middle"
        anchor="bottom middle"
      >{{ hasDataflow ? $t('tooltips.dataflowViewer') : $t('tooltips.noDataflow') }}</q-tooltip>
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
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('view', [
      'reloadReport',
      'reloadDataflow',
    ]),
    ...mapGetters('data', [
      'hasContext',
      'hasObservations',
      'hasDataflow',
      'contextLabel',
      'contextId',
    ]),
    ...mapGetters('view', [
      'spinnerColor',
      'mainViewerName',
      'statusTextsString',
      'statusTextsLength',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
      'lastActiveTask',
      'tasks',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
  },
  created() {
    this.VIEWERS = VIEWERS;
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .vertical
    .klab-button
      display block
      font-size 48px
      width 60px
    .klab-button-notification
      width 16px
      height 16px
      border-radius 8px
      top 6px
      right 4px

</style>
