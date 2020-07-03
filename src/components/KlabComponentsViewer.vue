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
import COMPONENTS from 'shared/DefaultViewComponents';

export default {
  name: 'KlabComponentsViewer',
  props: {
    component: {
      type: Object,
      required: true,
    },
    props: {
      type: Object,
      default: null,
    },
    direction: {
      type: String,
      validator: val => ['horizontal', 'vertical'].includes(val),
      default: 'vertical',
    },
    mainPanelStyle: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    /*
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
     */
  },
  methods: {
    createComponent(h, node) {
      // Handle empty elements and return empty array in case the dNode passed in is empty
      if (!node) {
        return [];
      }
      let component;
      switch (node.type) {
        case null:
          component = COMPONENTS.MAIN({
            ...node,
            mainPanelStyle: this.mainPanelStyle,
            direction: this.direction,
          });
          break;
        case 'Text':
          component = COMPONENTS.TEXT(node);
          break;
        default:
          component = COMPONENTS.UNKNOWN(node);
      }
      const components = [];

      if (node.components && node.components.length > 0) {
        node.components.forEach((comp) => {
          components.push(this.createComponent(h, comp));
        });
      }
      return h(component.type, component.attributes, components.length > 0 ? components : component.content);
    },
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
    const ret = this.createComponent(h, this.component);
    return ret;
    /*
    if (this.viewComponents.length > 0) {
      const alerts = this.viewComponentsByType('Alerts');
      return h('aside', {
      }, alerts.map(a => this.createAlert(h, a)));
    }
     */
  },
};
</script>

<style lang="stylus">
  .kcv-main-container
    display flex
    &.kcv-dir-horizontal
      flex-direction row
    &.kcv-dir-vertical
      flex-direction column
  .kcv-alert .modal-backdrop
    background-color transparent
  .kcv-text
    padding 10px
    text-align justify

</style>
