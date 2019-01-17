<template>
  <div id="mc-report-wrapper" class="full-width">
    <div id="mc-report-content" v-html="report"></div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { axiosInstance } from 'plugins/axios';
import { mapState, mapGetters, mapActions } from 'vuex';
// import SimpleBar from 'simplebar';

export default {
  name: 'ReportViewer',
  data() {
    return {
      report: this.$t('messages.noLoadedReport'),
      scrollBar: undefined,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
    ]),
    ...mapState('view', [
      'reloadReport',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setReloadReport',
    ]),
    loadReport() {
      if (this.reloadReport && this.hasContext && this.hasObservations) {
        axiosInstance.get(`${process.env.WS_BASE_URL}${process.env.REST_SESSION_OBSERVATION}report/${this.contextId}`, {})
          .then(({ data }) => {
            if (data === '') {
              console.warn('Empty report');
              data = this.$t('messages.emptyReport');
            }
            this.report = data;
            this.setReloadReport(false);
          });
      }
    },
  },
  watch: {
    reloadReport() {
      if (!this._inactive) {
        this.loadReport();
      }
    },
  },
  activated() {
    this.loadReport();
  },
};
</script>

<style>
</style>
