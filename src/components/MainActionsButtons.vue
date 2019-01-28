<template>
  <div class="klab-actions" :class="orientation">
    <div class="klab-main-actions">
      <!-- MAP BUTTON -->
      <div class="klab-button klab-action"
           @click="mainViewerName !== VIEWERS.DATA_VIEWER.name ? setMainViewer(VIEWERS.DATA_VIEWER) : false"
           :class="[{ active: mainViewerName === VIEWERS.DATA_VIEWER.name }]"
      ><q-icon name="mdi-eye-outline">
        <q-tooltip
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
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
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
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
    <div :class="separatorClass" class="mab-separator"></div>
    <!-- RESET CONTEXT or INTERRUPT TASK-->
    <div class="klab-destructive-actions">
      <div class="klab-button klab-reset-context"
           @click="resetContext"
           v-if="!hasTasks(contextId)"
      ><q-icon name="mdi-close-circle-outline">
        <q-tooltip
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ $t('tooltips.resetContext') }}</q-tooltip>
      </q-icon></div>
      <div class="klab-button klab-interrupt-task"
           @click="interruptTask"
           v-if="hasTasks(contextId)"
      ><q-icon name="mdi-stop-circle-outline">
        <q-tooltip
          :offset="[0, 8]"
          :self="tooltipAnchor('top')"
          :anchor="tooltipAnchor('bottom')"
        >{{ $t('tooltips.interruptTask',{ taskDescription: lastActiveTaskText }) }}</q-tooltip>
      </q-icon></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { VIEWERS, FAKE_TEXTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

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
    lastActiveTaskText() {
      const text = this.lastActiveTask(this.contextId) === null ? '' : this.lastActiveTask(this.contextId).description;
      if (text === FAKE_TEXTS.UNKNOWN_SEARCH_OBSERVATION) {
        return this.$t('messages.unknownSearchObservation');
      }
      return text;
    },
  },
  methods: {
    ...mapActions('view', [
      'setMainViewer',
    ]),
    tooltipAnchor(where) {
      return `${where} ${this.orientation === 'horizontal' ? 'middle' : 'left'}`;
    },
    resetContext() {
      this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
    },
    interruptTask() {
      const task = this.lastActiveTask(this.contextId);
      if (task !== null && task.alive) {
        this.sendStompMessage(MESSAGES_BUILDERS.TASK_INTERRUPTED({
          taskId: task.id,
        }, this.$store.state.data.session).body);
      }
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
