<template>
  <div class="klab-main-app">
    <template  v-if="!isApp || layout !== null">
      <klab-notifications></klab-notifications>
      <klab-layout :layout="layout"></klab-layout>
      <app-dialogs></app-dialogs>
      <connection-status class="print-hide"></connection-status>
      <klab-settings class="print-hide"></klab-settings>
      <klab-terminal v-for="terminal in terminals" :terminal="terminal" :key="terminal.id"></klab-terminal>
      <klab-presentation></klab-presentation>
      <knowledge-view-viewer></knowledge-view-viewer>
    </template>
    <template v-if="errorLoading">
      <q-modal
        content-classes="klab-wait-app"
        v-model="modal"
        no-route-dismiss
        no-esc-dismiss
        no-backdrop-dismiss
      >
        <div class="klab-wait-app-container">
          <div v-if="isApp">
            <q-icon size="50px" name="mdi-alert-circle-outline" color="mc-red"></q-icon>
            <p class="klab-app-error" v-html="$t('messages.errorLoadingApp', { app: klabApp })"></p>
          </div>
        </div>
      </q-modal>
    </template>
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
import KlabPresentation from 'components/KlabPresentation';
import KlabNotifications from 'components/KlabNotifications';
import KnowledgeViewViewer from 'components/KlabKnowledgeViewViewer';
import 'simplebar/dist/simplebar.css';

export default {
  name: 'LayoutDefault',
  components: {
    KlabLayout,
    ConnectionStatus,
    KlabSettings,
    KlabTerminal,
    AppDialogs,
    KlabPresentation,
    KlabNotifications,
    KnowledgeViewViewer,
  },
  data() {
    return {
      errorLoading: false,
    };
  },
  computed: {
    ...mapGetters('data', [
      'terminals',
    ]),
    ...mapGetters('view', [
      'layout',
      'isApp',
      'klabApp',
    ]),
    modal: {
      set() {},
      get() {
        return true;
      },
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
    setTimeout(() => {
      if (this.isApp && this.layout === null) {
        this.errorLoading = true;
      }
    }, 5000);
  },
  watch: {
    layout(newValue) {
      if (this.errorLoading && newValue) {
        this.errorLoading = false;
      }
    },
  },
};
</script>
<style lang="stylus">
  @import '~variables';
  .klab-wait-app .klab-wait-app-container
    text-align center
    width 100%
    font-weight 300
    font-size 1.5em
    padding 20px
    strong
      color $main-control-main-color
    .klab-app-error
      color $main-control-red
</style>
