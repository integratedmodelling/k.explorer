<template>
  <div id="mc-report-wrapper" class="full-width">
    <div id="mc-report-content" v-html="report"></div>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */

import { axiosInstance } from 'plugins/axios';
import { mapGetters, mapActions } from 'vuex';
// import SimpleBar from 'simplebar';
// import 'simplebar/dist/simplebar.css';

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
      // this.scrollBar.recalculate();
    },
  },
  activated() {
    this.loadReport();
  },
  mounted() {
    // this.scrollBar = new SimpleBar(document.getElementById('mc-report-content'));
  },
};
</script>

<style lang="stylus">
#mc-report-wrapper {

}
#mc-report-content {
  overflow auto
}
</style>
