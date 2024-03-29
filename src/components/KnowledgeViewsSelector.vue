<template>
  <div class="kvs-container">
    <div class="klab-button klab-action" :class="{ disabled: knowledgeViews.length === 0 }">
      <div
        class="kvs-button mdi mdi-text-box-multiple float-left"
      ></div>
      <q-icon v-if="!docked" name="mdi-chevron-down" class="float-left klab-item" style="padding: 3px 0 0 8px">
        <span class="klab-button-notification" v-if="hasNew"></span>
      </q-icon>
      <q-tooltip
        :offset="[8, 0]"
        :self="selfTooltipType"
        :anchor="anchorTooltipType"
        :delay="600"
      >{{ knowledgeViews.length === 0 ? $t('tooltips.noKnowledgeViews') : $t('tooltips.knowledgeViews') }}</q-tooltip>
    </div>
    <q-popover
      v-model="kvListOpen"
      class="kvs-popover"
      :disable="knowledgeViews.length === 0"
      :anchor="anchorType"
      :self="selfType"
      :offset="offsets"
    >
      <div class="kvs-popover-container">
        <q-list
          class="kvs-list"
          link
          no-border
          dense
          dark
        >
          <q-item v-for="knowledgeView in knowledgeViews" :key="knowledgeView.viewId" @click.native="selectKnowledgeView(knowledgeView.viewId)">
            <q-item-side :icon="KNOWLEDGE_VIEWS.find(kv => kv.viewClass === knowledgeView.viewClass).icon"></q-item-side>
            <q-item-main>
              <div>{{knowledgeView.label}}</div>
            </q-item-main>
            <q-tooltip
              :offset="[8, 0]"
              self="center left"
              anchor="center right"
              :ref="`kv-tooltip-${knowledgeView.viewId}`"
            >{{ knowledgeView.title }}</q-tooltip>
          </q-item>
        </q-list>
      </div>
    </q-popover>
  </div>
</template>

<script>
import { KNOWLEDGE_VIEWS } from 'shared/Constants';
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'KnoledgeViewsSelector',
  props: {
    docked: {
      type: Boolean,
      required: true,
    },
    offset: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      anchorTooltipType: this.docked ? 'bottom left' : 'center right',
      selfTooltipType: this.docked ? 'top left' : 'center left',
      offsetTooltip: this.docked ? [0, this.offset] : [this.offset, 0],
      anchorType: this.docked ? 'center right' : 'bottom left',
      selfType: this.docked ? 'center left' : 'top left',
      offsets: this.docked ? [this.offset, 0] : [0, this.offset],
      kvListOpen: false,
      hasNew: false,
      KNOWLEDGE_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'knowledgeViews',
    ]),
    knowledgeViewsLength() {
      return this.knowledgeViews.length;
    },
  },
  methods: {
    ...mapActions('data', [
      'showKnowledgeView',
    ]),
    selectKnowledgeView(viewId) {
      this.showKnowledgeView(viewId);
      this.$nextTick(() => {
        this.kvListOpen = false;
        const tooltip = this.$refs[`kv-tooltip-${viewId}`];
        if (tooltip && tooltip.length > 0) {
          tooltip[0].hide();
        }
      });
    },
  },
  watch: {
    knowledgeViewsLength(newValue, oldValue) {
      if (newValue > oldValue) {
        this.hasNew = true;
      }
    },
    kvListOpen() {
      if (this.kvListOpen && this.hasNew) {
        this.hasNew = false;
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kvs-popover-container
    background-color $grey-8
    border-color $grey-8
  .kvs-popover
    background-color transparent
  .kvs-container
    .klab-button.klab-action .klab-button-notification
      right 26px
      top 0
    .klab-button:not(.disabled) .kvs-button
      color $main-control-main-color
</style>
