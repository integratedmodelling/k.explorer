<script>
import COMPONENTS from 'shared/DefaultViewComponents';
import { CUSTOM_EVENTS, APPS_COMPONENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from '../shared/MessageBuilders';

const EMPTY_VIEWACTION_MESSAGE = {
  component: null,
  componentTag: null,
  applicationId: null,
  booleanValue: null,
  doubleValue: null,
  intValue: null,
  stringValue: null,
  dateValue: null,
  data: null,
  operation: null,
};

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
      if (node.attributes.parentAttributes && node.attributes.parentAttributes.shelf) {
        shelf = COMPONENTS.SHELF(node);
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
        case APPS_COMPONENTS.LABEL:
          component = COMPONENTS.LABEL(node);
          break;
        case APPS_COMPONENTS.TEXT_INPUT:
          component = COMPONENTS.TEXT_INPUT(node);
          break;
        case APPS_COMPONENTS.PUSH_BUTTON:
          component = COMPONENTS.PUSH_BUTTON(node);
          break;
        case APPS_COMPONENTS.CHECK_BUTTON:
          component = COMPONENTS.CHECK_BUTTON(node);
          break;
        case APPS_COMPONENTS.TREE:
          component = COMPONENTS.TREE(node);
          break;
        case APPS_COMPONENTS.GROUP:
          component = COMPONENTS.GROUP(node);
          if (node.components && node.components.length > 0) {
            node.components.forEach((comp) => {
              comp.attributes.parentId = node.id;
              comp.attributes.parentAttributes = node.attributes;
            });
          }
          break;
        case APPS_COMPONENTS.TEXT:
          component = COMPONENTS.TEXT(node);
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
      /*
      const internalContent = components.length > 0 ? components : component.content;
      const content = component.container ? component.container(internalContent) : internalContent;
      const element = h(component.type, component.attributes, shelf ? [h(shelf.type, shelf.attributes, content)] : content);
      */
      if (shelf) {
        return h(shelf, {}, [h(component, {}, components)]);
      }
      return h(component, {}, components);
    },
    componentClickedListener(event) {
      this.sendStompMessage(MESSAGES_BUILDERS.VIEW_ACTION({
        ...EMPTY_VIEWACTION_MESSAGE,
        ...event,
      }, this.$store.state.data.session).body);
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
  $label-width = 150px
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
    background-color $app-main-color
    color $app-main-background
    position: relative
    .q-item-side
      color $app-main-background
  .kvc-collapsible
    clear both
    .kvc-tree-container
      margin 15px 10px 15px 10px
    .kvc-text
      margin 5px 10px
    .kvc-tree-container
    .kvc-text
      padding 15px 10px 5px 10px
      position relative

  .q-collapsible-sub-item
    padding 8px 0
  .kvc-tree-container
  .kvc-group-container
    padding 15px 10px
    margin 15px 20px 10px 20px
    border-radius 6px
    position relative
    &:not(.kvc-group-no-label)
      border 1px solid $app-container
      margin-bottom 30px
      padding-top 30px
    .kvc-tree-legend
    .kvc-group-legend
      position absolute
      background-color $app-container
      color $app-main-background
      padding 5px 10px
      font-weight 400
      top -14px
      border-radius 6px
  .kvc-label
    float left
    padding 5px 10px
    font-weight 400
    border-radius 6px
    width $label-width
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    color $app-title-color
    vertical-align middle
    line-height 1em
  .kvc-text-input
    line-height 1em
    vertical-align middle
    border 1px solid $app-main-color
    padding 5px
  .kvc-pushbutton
    margin 0 5px
  .kvc-checkbutton
    display block
    width 100%
    padding 10px
  .kvc-text
    clear both
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
        margin-bottom 15px
</style>
