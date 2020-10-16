<script>
import { createComponent } from 'shared/DefaultViewComponents';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';

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
  name: 'KlabAppViewer',
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
  .kapp-container
    .kcv-alert .modal-backdrop
      background-color transparent

    // override quasar styles
    .q-input-target
      color var(--app-text-color)
      background-color  var(--app-background-color)
      line-height var(--app-line-height)
      height auto
    .q-btn
      min-height var(--app-line-height)
      // padding 8px 16px
     //show spinner
    .q-no-input-spinner
      -moz-appearance textfield !important
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button
        -webkit-appearance auto
     // problem when using combo for double line
    .q-if:before, .q-if:after
      border-bottom-style none
    .q-if .q-if-inner
      min-height unset
    .q-if-baseline
      line-height var(--app-line-height)
   // first level group
  .kcv-main-container>.kcv-group
    // background-color #00ff00
    border-bottom 1px solid var(--app-main-color)
    padding var(--app-smaller-mp) 0
    .kcv-group-content
      display flex
      align-content center
      flex-direction column
      justify-content space-around
      // next level group
      .kcv-group>.kcv-group-content
        // background-color #ff0000 !important
        // border 1px solid #000
        padding var(--app-smaller-mp) var(--app-small-mp)
        // margin var(--app-small-mp) 0
      .kcv-group-legend
        color var(--app-title-color)
        // padding 5px 10px
        max-width 100%
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        line-height 1.2em
        vertical-align center
        font-weight 300
        font-size 1.2em

  .kcv-collapsible
    .kcv-collapsible-header
      background-color var(--app-background-color)
      color var(--app-title-color)
      border-bottom 1px solid var(--app-darken-background-color)
      .q-item-label
        font-size var(--app-font-size)
      .q-item-side
        color var(--app-title-color)
      .q-item-icon
        transform: rotate(90deg)
        &.rotate-180
          transform: rotate(180deg)
    .q-item
      min-height unset
      padding var(--app-small-mp)
    .q-collapsible-sub-item
      padding 0
      &>.kcv-group
        border-top 1px solid var(--app-main-color)
        border-bottom 1px solid var(--app-main-color)

  .kcv-tree-container
    padding var(--app-small-mp)
    position relative
    .kcv-tree-legend
      color var(--app-title-color)
      // border-bottom 1px solid var(--app-title-color)
      //border-radius 10px
      padding var(--app-small-mp)
      margin 0 var(--app-small-mp)
      max-width 100%
      white-space nowrap
      overflow hidden
      text-overflow ellipsis

  // separator
  .kcv-separator
    padding var(--app-large-mp) var(--app-small-mp)
    position relative
    border-bottom 1px solid var(--app-main-color)
    display flex
    align-items center
    line-height 1.2em
    .kcv-separator-icon
      margin-right var(--app-small-mp)
      font-size 1.2em
      width 1.2em
    .kcv-separator-title
      font-weight 300
      font-size 1.2em
      flex-grow 10
    .kcv-separator-right
      font-size 1.3em
      width 1.2em
      align-self flex-start
      cursor pointer
  // texts
  .kcv-label
    font-weight 400
    color var(--app-main-color)
    vertical-align middle
    line-height calc(var(--app-line-height) + 4px)
    align-self center
    &.kcv-ellipsis
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .kcv-label-icon
      padding-right var(--app-small-mp)
    &.kcv-title
      color var(--app-alt-color)
      font-weight bold
  .kcv-text
    margin var(--app-large-mp) var(--app-small-mp)
    text-align justify
    position relative
    color var(--app-text-color)
    .kcv-internal-text
      // display block
      overflow hidden
      p
        padding 0 var(--app-small-mp)
        margin-bottom var(--app-large-mp)
      strong
        color var(--app-title-color)
    .kcv-collapse-button
      width 100%
      position absolute
      bottom 0
      left 0
      text-align center
      vertical-align middle
      line-height 20px
      opacity 0
      transition opacity 0.3s
      cursor pointer
      background-color "rgba(%s, .1)" % var(--app-rgb-main-color)
      border-bottom-left-radius 4px
      border-bottom-right-radius 4px
    &:hover
      .kcv-collapse-button
        opacity 1
    &.kcv-collapse
      margin-bottom 1em
    &.kcv-collapsed
      padding-top 0
      height 20px !important
      overflow: hidden
      padding-bottom 14px
      .kcv-internal-text
        display none
      .kcv-collapse-button
        opacity 1
        border-radius 4px

  // form elements
  .kcv-form-element
    margin 0 var(--app-small-mp) 0 0
    border-radius 6px
  .kcv-text-input
    min-height var(--app-line-height)
    vertical-align middle
    border 1px solid var(--app-main-color)
    background-color  var(--app-background-color)
    padding var(--app-smaller-mp) var(--app-small-mp)

  .kcv-combo
    padding 2px 10px
    background-color var(--app-background-color)
    border-radius 6px
    border 1px solid var(--app-main-color)
  .kcv-combo-option
    color var(--app-main-color)
    min-height unset
    padding var(--app-small-mp) var(--app-large-mp)

  .kcv-pushbutton
    font-size var(--app-font-size)
    margin 0 var(--app-small-mp)

  .kcv-checkbutton
    display block
    width 100%
    padding var(--app-smaller-mp) var(--app-small-mp)

</style>
