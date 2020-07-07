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
import { CUSTOM_EVENTS } from '../shared/Constants';

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
    createComponent(node, h) {
      // Handle empty elements and return empty array in case the dNode passed in is empty
      if (!node) {
        return [];
      }
      let shelf = null;
      if (node.groupId) {
        shelf = COMPONENTS.SHELF(node.name, node.groupId);
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
        case 'Group':
          component = COMPONENTS.GROUP(node, h);
          if (node.attributes.shelf && node.components && node.components.length > 0) {
            node.components.forEach((comp) => {
              comp.groupId = node.id;
            });
          }
          break;
        case 'CheckButton':
          component = COMPONENTS.CHECK_BUTTON(node, h, this.$eventBus);
          break;
        case 'Tree':
          component = COMPONENTS.TREE(node, h, this.$eventBus);
          break;
        case 'Text':
          component = COMPONENTS.TEXT(node, h);
          break;
        default:
          component = COMPONENTS.UNKNOWN(node);
      }
      const components = [];
      if (node.components && node.components.length > 0) {
        node.components.forEach((comp) => {
          components.push(this.createComponent(comp, h));
        });
      }
      const internalContent = components.length > 0 ? components : component.content;
      const content = component.container ? component.container(internalContent) : internalContent;
      const element = h(component.type, component.attributes, shelf ? [h(shelf.type, shelf.attributes, content)] : content);
      /*
      if (node.groupId) {
        const shelf = COMPONENTS.SHELF(node.name, node.groupId);
        element = ;
      }
      */
      return element;
    },
    componentClickedListener(event) {
      console.info(JSON.stringify(event, null, 4));
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
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.COMPONENT_CLICKED, this.componentClickedListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.COMPONENT_CLICKED, this.viewerClosedListener);
  },
  render(h) {
    const ret = this.createComponent(this.component, h);
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
  @import '~variables'
  /*
  .kcv-main-container
    display flex
    &.kcv-dir-horizontal
      flex-direction row
    &.kcv-dir-vertical
      flex-direction column
   */
  .kcv-alert .modal-backdrop
    background-color transparent
  .kvc-collapsible-header
    background-color $main-control-main-color
    color #eee
  .q-collapsible-sub-item
    padding 8px 0
  .kvc-tree-container
  .kvc-group-container
    padding 10px
    margin 10px 20px
    border 1px solid #eee
    position relative
    .kvc-tree-legend
    .kvc-group-legend
      position absolute
      background-color white
      padding 5px
      top -14px
  .kvc-checkbutton
    display block
    width 100%
    padding 10px
  .kvc-text
    margin 10px 10px 5px 10px
    padding 10px 10px 5px 10px
    // border 1px solid #999
    text-align justify
    position relative
    .kvc-collapsible-icon
      position absolute
      width 20px
      height 20px
      right 0
    .kvc-internal-text
      p
        margin-botto 5px
</style>
