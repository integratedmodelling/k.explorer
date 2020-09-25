<template>
  <div class="kvs-container">
    <div class="klab-button klab-action" :class="{ disable: knowledgeViews.length === 0 }">
      <div
        class="mdi mdi-file-document-box-multiple float-left"
      ></div>
      <q-icon name="mdi-chevron-down" class="float-left klab-item" style="padding: 3px 0 0 8px"></q-icon>
      <q-tooltip
        :offset="[8, 0]"
        self="center left"
        anchor="center right"
      >{{ knowledgeViews.length === 0 ? $t('tooltips.noKnowledgeViews') : $t('tooltips.knowledgeViews') }}</q-tooltip>
    </div>
    <q-popover v-model="kvListOpen" class="kvs-popover" :disable="knowledgeViews.length === 0">
      <div class="kvs-container">
        <q-list
          class="kvs-list"
          link
          no-border
          dense
          dark
        >
          <q-item v-for="knowledgeView in knowledgeViews" :key="knowledgeView.viewId" @click.native="selectKnowledgeView(knowledgeView.viewId)" >
            <q-item-side :icon="KNOWLEDGE_VIEWS.find(kv => kv.viewClass === knowledgeView.viewClass).icon"></q-item-side>
            <q-item-main>
              <div>{{knowledgeView.label}}</div>
            </q-item-main>
            <q-tooltip
              :offset="[8, 0]"
              self="center left"
              anchor="center right"
              :delay="600"
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
      default: 8,
    },
  },
  data() {
    return {
      anchorType: this.docked ? 'center right' : 'bottom left',
      selfType: this.docked ? 'center left' : 'top left',
      offsets: this.docked ? [this.offset, 0] : [0, this.offset],
      kvListOpen: false,
      KNOWLEDGE_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'knowledgeViews',
    ]),
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
};
</script>

<style lang="stylus">
  @import '~variables'
  .kvs-popover
    border-radius 6px
    border none
    .kvs-container
      background-color $grey-8
      border-radius 2px !important
</style>
