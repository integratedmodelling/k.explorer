<template>
  <div id="report-container" v-html="report"></div>
</template>

<script>
import { axiosInstance } from 'plugins/axios';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'ReportViewer',
  data() {
    return {
      needContent: true,
      report: 'No content',
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
              data = 'Nothing to say';
            }
            this.report = data;
            this.setReloadReport(false);
          });
      }
    },
  },
  watch: {
    reloadReport() {
      this.loadReport();
    },
  },
  mounted() {
    this.loadReport();
  },
};
</script>

<style>
</style>
