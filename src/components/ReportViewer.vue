<template>
  <div id="mc-report-wrapper" class="full-width">
    <div id="mc-report-container" v-html="report"></div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { axiosInstance } from 'plugins/axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ReportViewer',
  data() {
    return {
      report: this.$t('messages.noLoadedReport'),
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
    ]),
    ...mapGetters('view', [
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

<style lang="stylus">
@import '../css/report.styl'
</style>
