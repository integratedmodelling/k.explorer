<script>
import { createComponent } from 'shared/DefaultViewComponents';
import { CUSTOM_EVENTS } from 'shared/Constants';
import { MESSAGES_BUILDERS } from 'shared/MessageBuilders';
import { dom } from 'quasar';

const { height } = dom;

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
    return {
      mainContainerHeight: undefined,
    };
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
    calculateMinHeight() {
      this.$nextTick(() => {
        const bottomPanels = document.querySelectorAll('.kcv-group-bottom');
        let totalBottomHeight = 0;
        for (let i = 0; i < bottomPanels.length; ++i) {
          totalBottomHeight += Math.ceil(height(bottomPanels[i]));
        }
        const mainContainer = document.querySelector('.kcv-main-container');
        if (mainContainer && mainContainer.style.marginBottom === '') {
          mainContainer.setAttribute('style', `margin-bottom: ${totalBottomHeight}px`);
        }
      });
    },
  },
  mounted() {
    this.$eventBus.$on(CUSTOM_EVENTS.COMPONENT_ACTION, this.componentClickedListener);
    // this.$eventBus.$on(CUSTOM_EVENTS.LAYOUT_CHANGED, this.calculateMinHeight);
  },
  beforeDestroy() {
    this.$eventBus.$off(CUSTOM_EVENTS.COMPONENT_ACTION, this.componentClickedListener);
    // this.$eventBus.$off(CUSTOM_EVENTS.LAYOUT_CHANGED, this.calculateMinHeight);
  },
  updated() {
    this.calculateMinHeight();
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
    // removed the transition for changes in dimensions of fields
    .q-if, .q-if:before, .q-if-label, .q-if-addon, .q-field-icon, .q-field-label, .q-if-control, .q-field-bottom
      transition none
   // first level group
  .kcv-main-container + .kcv-group
    padding-bottom 1px
  .kcv-main-container > .kcv-group
    // background-color #00ff00
    height 100% !important
    border-bottom 1px solid var(--app-main-color)
    // margin 0 //var(--app-smaller-mp) 0
    &> .kcv-group-container > .kcv-group-content > .kcv-group > .kcv-group-content
      padding-bottom 0 !important
    .kcv-group-container
      height 100% !important
      .kcv-group-content
        display flex
        align-content center
        flex-direction column
        height 100% !important
        // next level group
        .kcv-group:not(.kcv-wrapper)>.kcv-group-content
          // background-color #ff0000 !important
          // border 1px solid #000
          padding-bottom var(--app-smaller-mp)
          justify-content space-around
          .kcv-group
            padding calc(var(--app-smaller-mp) / 4) 0
          .kcv-pushbutton
            margin var(--app-large-mp) 0
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
          font-size: 1.2em
    .kcv-group-bottom
      // margin-top auto
      position fixed
      bottom 0
      z-index 1000
      background-color var(--app-background-color)
      border-top 1px solid var(--app-main-color)

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
    padding var(--app-small-mp) 0
    position relative
    flex-grow 1
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
    /* override the default tree header, but needed if tree has children and the arrow is display
    .q-tree > .q-tree-node-child > .q-tree-node-header
      padding-left var(--app-smaller-mp)
    */
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
    padding var(--app-smaller-mp) var(--app-small-mp)
    &.kcv-ellipsis
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    &.kcv-with-icon
      min-width calc(1rem + calc(var(--app-small-mp) * 2))
    .kcv-label-icon
      margin-right var(--app-small-mp)
    &.kcv-title
      color var(--app-alt-color)
      font-weight bold
      cursor default
    &.kcv-clickable
      cursor pointer
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
    margin 0 var(--app-small-mp)
    &:not(.kcv-roundbutton)
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
    padding var(--app-smaller-mp) var(--app-small-mp)
    &:not(.kcv-check-only)
      width 100%
    &.kcv-check-waiting
    &.kcv-check-computing
      span
        font-style italic
      .q-icon:before
        font-size calc(1em + 1px)
        animation q-spin 2s infinite linear
  .kcv-label-toggle
    color var(--app-darken-background-color)
    text-shadow: -1px -1px 0px var(--app-main-color); /* 50% black coming from the bottom */
  .kcv-error-tooltip
    background-color var(--app-negative-color)
</style>
