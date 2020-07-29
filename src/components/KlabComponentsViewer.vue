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
  listValue: [],
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
      delete event.component.attributes.parentId;
      this.sendStompMessage(MESSAGES_BUILDERS.VIEW_ACTION({
        ...EMPTY_VIEWACTION_MESSAGE,
        ...event,
      }, this.$store.state.data.session).body);
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.COMPONENT_ACTION, this.componentClickedListener);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.COMPONENT_ACTION, this.componentClickedListener);
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
    background-color var(--app-main-color)
    color var(--app-background-color)
    position relative
    .q-item-label
      font-size var(--app-font-size)
    .q-item-side
      color var(--app-background-color)
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
      border 1px solid var(--app-main-color)
      margin-bottom 30px
      padding-top 20px
    .kcv-tree-legend
    .kcv-group-legend
      position absolute
      background-color var(--app-main-color)
      color var(--app-background-color)
      padding 5px 10px
      font-weight 400
      top -14px
      border-radius 6px
      max-width 100%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      line-height 1.2em
      vertical-align center
  .kcv-group
    margin 10px 0
  .kcv-label
    float left
    padding 5px 10px
    font-weight 400
    border-radius 6px
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
    color var(--app-main-color)
    vertical-align middle
    line-height 1.8em
  .kcv-text-input
    line-height 1em
    vertical-align middle
    border 1px solid var(--app-main-color)
    padding 5px
  .kcv-pushbutton
    font-size var(--app-font-size)
    margin 5px
  .kcv-checkbutton
    display block
    width 100%
    padding 10px
  .kcv-text
    clear both
    margin 20px 10px
    // padding 10px 10px 5px 10px
    // border 1px solid #999
    text-align justify
    position relative
    color var(--app-text-color)
    .simplebar-scrollbar::before
      background-color var(--app-main-color)
    .kcv-internal-text
      display block
      overflow auto
      p
        margin-bottom 15px
      strong
        color var(--app-title-color)
    .kcv-collapse-button
      width 100%
      position absolute
      bottom 0
      left 0
      text-align center
      vertical-align middle
      line-height 30px
      opacity 0
      transition opacity 0.3s
      cursor pointer
      background-color "rgba(%s, .1)" % var(--app-rgb-main-color)
      border-radius 5px
    &:hover
      .kcv-collapse-button
        opacity 1
    &.kcv-collapse
      margin-bottom 1em
    &.kcv-collapsed
      margin-top 10px
      margin-bottom 0
      padding-top 0
      min-height 2em !important
      max-height 2em !important
      height 2em !important
      .kcv-internal-text
        display none
      .kcv-collapse-button
        opacity 1

</style>
