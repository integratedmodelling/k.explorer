<template>
  <div class="mc-report">
    <div class="mc-report-wrapper full-width">
      <div class="mc-report-content" v-html="report"></div>
      <q-btn icon="mdi-printer" round class="mc-report-print" color="mc-main" @click="print = true">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appPrint')}}</q-tooltip>
      </q-btn>
      <q-btn icon="mdi-refresh" round class="mc-report-reload" color="mc-main" @click="forceReload">
        <q-tooltip
          :offset="[0, 8]"
          self="bottom middle"
          anchor="top middle"
          :delay="1000"
        >{{ $t('label.appReload')}}</q-tooltip>
      </q-btn>
    </div>
    <q-modal class="klab-report-modal" @show="launchPrint" v-model="print">
      <div class="mc-report-wrapper">
        <div class="mc-report-content" v-html="report"></div>
      </div>
      <q-btn icon="mdi-close" round flat size="sm" class="mc-report-print-hide print-hide" color="mc-main" @click="print=false"></q-btn>
    </q-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { URLS } from 'shared/MessagesConstants';
// import SimpleBar from 'simplebar';

export default {
  name: 'ReportViewer',
  data() {
    return {
      report: this.$t('messages.noLoadedReport'),
      scrollBar: undefined,
      print: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'contextId',
      'hasObservations',
    ]),
    ...mapState('view', [
      'refreshDocumentation',
    ]),
  },
  methods: {
    ...mapActions('view', [
      'setReloadDocumentation',
    ]),
    loadReport() {
      if (this.needReloadDoc && this.hasContext && this.hasObservations) {
        this.$axios.get(`${process.env.WS_BASE_URL}${URLS.REST_SESSION_OBSERVATION}report/${this.contextId}`, {})
          .then(({ data }) => {
            if (data === '') {
              console.warn('Empty report');
              data = this.$t('messages.emptyReport');
            }
            this.report = data;
            this.setReloadDocumentation(false);
          });
      }
    },
    forceReload() {
      this.setReloadDocumentation(true);
    },
    launchPrint() {
      this.$nextTick(() => {
        window.print();
      });
    },
    closePrint() {
      this.print = false;
    },
  },
  watch: {
    needReloadDoc() {
      // eslint-disable-next-line no-underscore-dangle
      if (!this._inactive) {
        this.loadReport();
      }
    },
  },
  activated() {
    this.loadReport();
  },
  mounted() {
    window.addEventListener('afterprint', this.closePrint);
  },
  beforeDestroy() {
    window.removeEventListener('afterprint', this.closePrint);
  },
};
</script>

<style lang="stylus">
  @media print
    #q-app
      display none
    .klab-report-modal
      &.fullscreen
        position static
      .modal-content
        min-width none
        max-height none

    .mc-report-content table td
    .mc-report-content p
      word-break break-word

    .mc-report-content
      display: block !important
      position: relative !important
      overflow: visible !important
      overflow-y: visible !important
      width: 100% !important
      height: 100% !important
      margin: 0 !important
      left: 0 !important
      border: none !important

  .mc-report-print
  .mc-report-reload
    position absolute
    top 10px
    right 10px
  .mc-report-reload
    right 60px

  .mc-report-print-hide
    position absolute
    top 5px
    right 20px

  .mc-empty-report
    position absolute
    width 400px
    height 80px
    left calc((100% - 400px) / 2)
    top calc((100% - 80px) / 2)
    margin-left -200px
    margin-top -40px
    padding 0
    text-align center
    font-size 60px
    font-weight bold
    color rgb(17, 170, 187)

  .mc-report-content
    position absolute
    width 1024px
    left calc((100% - 1024px) / 2)
    height 100%
    overflow auto
    border none
  .klab-report-modal
    .modal-content
      border-radius 20px
      padding 20px 0
      background-color white
      overflow hidden
      width 1024px
      min-height 80vh
    .mc-report-wrapper
      .mc-report-content
        padding-top 0
</style>
