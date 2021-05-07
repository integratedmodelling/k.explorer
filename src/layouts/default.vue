<template>
  <div class="klab-main-app">
    <template  v-if="!isApp || layout !== null">
      <klab-notifications></klab-notifications>
      <klab-layout :layout="layout"></klab-layout>
      <klab-modal-window v-if="modalWindow !== null" :modal="modalWindow"></klab-modal-window>
      <app-dialogs></app-dialogs>
      <klab-settings class="print-hide"></klab-settings>
      <klab-terminal v-for="terminal in terminals" :terminal="terminal" :key="terminal.id"></klab-terminal>
      <klab-presentation></klab-presentation>
      <!-- <knowledge-view-viewer></knowledge-view-viewer> -->
    </template>
    <q-modal
      content-classes="klab-wait-app"
      v-model="wait"
      no-route-dismiss
      no-esc-dismiss
      no-backdrop-dismiss
    >
      <div class="klab-wait-app-container">
        <div v-if="errorLoading">
          <q-icon size="50px" name="mdi-alert-circle-outline" color="mc-red"></q-icon>
          <p class="klab-app-error" v-html="$t('messages.errorLoadingApp', { app: klabApp })"></p>
          <a class="klab-app-refresh" href="#" @click="reload">{{ $t('messages.reloadApp') }}</a>
        </div>
        <div v-else>
          <q-spinner color="app-main-color" size="2em"></q-spinner>
          <p class="klab-app-wait" v-html="$t('messages.appLoading', { app: klabApp })"></p>
        </div>
      </div>
    </q-modal>
    <connection-status class="print-hide"></connection-status>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { WEB_CONSTANTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import ConnectionStatus from 'components/ConnectionStatusModal';
import KlabSettings from 'components/KlabSettings';
import KlabTerminal from 'components/KlabTerminal';
import AppDialogs from 'components/AppDialogsViewer';
import KlabLayout from 'components/KlabLayout.vue';
import KlabModalWindow from 'components/KlabModalWindow';
import KlabPresentation from 'components/KlabPresentation';
import KlabNotifications from 'components/KlabNotifications';
// import KnowledgeViewViewer from 'components/KlabKnowledgeViewViewer';
import 'simplebar/dist/simplebar.css';

export default {
  name: 'LayoutDefault',
  components: {
    KlabLayout,
    KlabModalWindow,
    ConnectionStatus,
    KlabSettings,
    KlabTerminal,
    AppDialogs,
    KlabPresentation,
    KlabNotifications,
    // KnowledgeViewViewer,
  },
  data() {
    return {
      errorLoading: false,
      waitApp: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'hasContext',
      'terminals',
      'isDeveloper',
    ]),
    ...mapGetters('stomp', [
      'connectionDown',
    ]),
    ...mapGetters('view', [
      'layout',
      'isApp',
      'klabApp',
      'modalWindow',
    ]),
    wait: {
      get() {
        return this.waitApp || this.errorLoading;
      },
      set() {
        // nothing to do, is modal
      },
    },
  },
  methods: {
    reload() {
      document.location.reload();
    },
  },
  created() {
  },
  mounted() {
    this.sendStompMessage(MESSAGES_BUILDERS.RESET_CONTEXT(this.$store.state.data.session).body);
    // clean previous apps if necessary
    const loadedApp = localStorage.getItem(WEB_CONSTANTS.LOCAL_STORAGE_APP_ID);
    if (loadedApp) {
      this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
        { applicationId: loadedApp, stop: true },
        this.$store.state.data.session,
      ).body);
      localStorage.removeItem(WEB_CONSTANTS.LOCAL_STORAGE_APP_ID);
    }
    if (this.isApp) {
      this.sendStompMessage(MESSAGES_BUILDERS.RUN_APPLICATION(
        { applicationId: this.$store.state.view.klabApp },
        this.$store.state.data.session,
      ).body);
      // localStorage.setItem(WEB_CONSTANTS.LOCAL_STORAGE_APP_ID, this.$store.state.view.klabApp);
    }
    if (this.isApp && this.layout === null) {
      this.waitApp = true;
      setTimeout(() => {
        if (this.isApp && this.layout === null) {
          this.errorLoading = true;
        }
      }, 7000);
    }
    window.addEventListener('beforeunload', (e) => {
      // Cancel the event
      if (this.hasContext && !this.isDeveloper) {
        e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
        // Chrome requires returnValue to be set
        e.returnValue = this.$t('messages.confirmExitPage');
      }
    });
  },
  watch: {
    layout(newValue) {
      if (this.waitApp && newValue) {
        this.waitApp = false;
      }
      if (this.errorLoading && newValue) {
        this.errorLoading = false;
      }
    },
  },
};
</script>
<style lang="stylus">
  @import '~variables';
  .klab-wait-app
    min-width 50px
    .klab-wait-app-container
      text-align center
      width 100%
      font-weight 300
      font-size 1.5em
      padding 20px
      p
        margin-bottom 0
      strong
        color $main-control-main-color
      .q-spinner
        margin-bottom 16px
      .klab-app-error
        color $main-control-red
        strong
          color $main-control-red
      a.klab-app-refresh
        display block
        color $main-control-main-color
        padding 8px 0 0 0
        text-decoration none
        &::after
          content:"\F0450"
          display: inline-block;
          font-family:"Material Design Icons"
          margin 2px 0 0 8px
          vertical-align bottom
          transition .6s
        &:hover::after
          transform rotate(360deg)
</style>
