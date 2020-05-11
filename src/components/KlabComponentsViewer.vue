<!--
<template>
  <div>
  <div v-for="(alert, index) in alerts" :key="index">
    <q-dialog
      v-show="hasAlerts"
    >
      <span slot="title">{{ alert.title }}</span>

      <span slot="message">{{ alert.content }}</span>
    </q-dialog>
  </div>
  </div>
</template>
-->
<script>
import { mapGetters } from 'vuex';
import COMPONENTS from 'shared/DefaultViewComponents';

export default {
  name: 'KlabComponentsViewer',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('view', [
      'viewComponents',
      'viewComponentsByType',
    ]),
    alerts() {
      return this.viewComponentsByType('Alert');
    },
    hasAlerts: {
      get() {
        return this.alerts.length > 0;
      },
      set() {
        // nothing
      },
    },
  },
  methods: {
    createAlert(h, alert) {
      return h(COMPONENTS.ALERT.component, {
        props: {
          value: true,
          title: alert.title,
          message: alert.content,
        },
        class: {
          'kcv-alert': true,
        },
      });
    },
  },
  render(h) {
    if (this.viewComponents.length > 0) {
      const alerts = this.viewComponentsByType('Alerts');
      return h('aside', {
      }, alerts.map(a => this.createAlert(h, a)));
    }
    return null;
  },
};
</script>

<style lang="stylus">
  .kcv-alert .modal-backdrop
    background-color transparent
</style>
