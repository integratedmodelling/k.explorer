<template>
  <div class="klab-main-app">
    <klab-layout :layout="layout"></klab-layout>
    <app-dialogs></app-dialogs>
    <connection-status class="print-hide"></connection-status>
    <klab-settings class="print-hide"></klab-settings>
    <klab-presentation></klab-presentation>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ConnectionStatus from 'components/ConnectionStatusModal';
import KlabSettings from 'components/KlabSettings';
import AppDialogs from 'components/AppDialogsViewer';
import KlabLayout from 'components/KlabLayout.vue';
import KlabPresentation from 'components/KlabPresentation';

export default {
  name: 'LayoutDefault',
  components: {
    KlabLayout,
    ConnectionStatus,
    KlabSettings,
    AppDialogs,
    KlabPresentation,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('view', [
      'layout',
    ]),
  },
};
</script>
