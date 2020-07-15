<script>
import { createComponent } from 'shared/DefaultViewComponents';
import { CUSTOM_EVENTS } from 'shared/Constants';
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
    componentClickedListener(event) {
      delete event.component.attributes.parentAttributes;
      this.sendStompMessage(MESSAGES_BUILDERS.VIEW_ACTION({
        ...EMPTY_VIEWACTION_MESSAGE,
        ...event,
      }, this.$store.state.data.session).body);
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.COMPONENT_CLICKED, this.componentClickedListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.COMPONENT_CLICKED, this.viewerClosedListener);
  },
  render(h) {
    const ret = createComponent(this.component, h, { mainPanelStyle: this.mainPanelStyle, direction: this.direction });
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
  .kcv-alert .modal-backdrop
    background-color transparent
  .kcv-collapsible-header
    background-color $app-main-color
    color $app-main-background
    position: relative
    .q-item-side
      color $app-main-background
  .kcv-collapsible
    clear both
    .kcv-tree-container
      margin 15px 10px 15px 10px
    .kcv-text
      margin 5px 10px
    .kcv-tree-container
    .kcv-text
      padding 15px 10px 5px 10px
      position relative

  .q-collapsible-sub-item
    padding 8px 0
  .kcv-tree-container
  .kcv-group-container
    padding 15px 10px
    margin 15px 20px 10px 20px
    border-radius 6px
    position relative
    &:not(.kcv-group-no-label)
      border 1px solid $app-container
      margin-bottom 30px
      padding-top 20px
    .kcv-tree-legend
    .kcv-group-legend
      position absolute
      background-color $app-container
      color $app-main-background
      padding 5px 10px
      font-weight 400
      top -14px
      border-radius 6px
      max-width 100%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
  .kcv-group
    margin 10px 0
  .kcv-label
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
    line-height 1.8em
  .kcv-text-input
    line-height 1em
    vertical-align middle
    border 1px solid $app-main-color
    padding 5px
  .kcv-pushbutton
    margin 0 5px
  .kcv-checkbutton
    display block
    width 100%
    padding 10px
  .kcv-text
    clear both
    margin 10px 10px 5px 10px
    padding 10px 10px 5px 10px
    // border 1px solid #999
    text-align justify
    position relative
    .kcv-collapsible-icon
      position absolute
      width 20px
      height 20px
      right 0
    .kcv-internal-text
      p
        margin-bottom 15px
</style>
