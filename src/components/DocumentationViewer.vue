<template>
  <div class="dv-main-container">
    <div>{{ content }}</div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { URLS } from 'shared/MessagesConstants';
import { DOCUMENTATION_VIEWS } from 'shared/Constants';
// import SimpleBar from 'simplebar';

export default {
  name: 'DocumentationViewer',
  props: {
    view: {
      type: String,
      default: DOCUMENTATION_VIEWS.REPORT,
    },
  },
  data() {
    return {
      content: this.$t('messages.noLoadedReport'),
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'refreshDocumentation',
    ]),
    loadDocumentation() {
      if (this.hasContext && this.hasObservations) {
        this.$axios.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}documentation/REPORT/${this.contextId}`, {})
          .then(({ data }) => {
            if (data === '') {
              console.warn('Empty report');
              data = this.$t('messages.emptyReport');
            } else {
              this.refreshDocumentation({ view: this.view, documentation: data });
            }
          });
      }
    },
  },
  activated() {
    this.loadDocumentation();
  },
};
</script>

<style lang="stylus">
</style>
