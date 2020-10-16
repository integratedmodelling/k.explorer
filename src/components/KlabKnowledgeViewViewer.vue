<template>
  <div class="modal fullscreen" id="modal-show-view" v-if="typeof visibleKnowledgeView !== 'undefined'">
    <div class="modal-backdrop absolute-full"></div>
      <div class="klab-modal-container"
           :style="{
              width: `${modalSize.width}px`,
              height: `${modalSize.height}px`,
              transform: `translate(-50%, -50%) !important`}">
        <div class="klab-modal-inner full-height">
          <q-btn
            icon="mdi-close"
            class="kvv-close-button"
            size="sm"
            :title="$t('label.appClose')"
            round
            flat
            @click="closeDialog"
          ></q-btn>
          <div class="klab-modal-content full-height">
            <div class="kvv-title">{{ visibleKnowledgeView.title }}</div>
            <div class="kvv-content-wrapper" :class="{ 'kvv-with-exports': visibleKnowledgeView.exportFormats.length !== 0 }" data-simplebar>
              <div class="kvv-content" v-html="visibleKnowledgeView.body"></div>
            </div>
          </div>
          <div class="kvv-actions absolute-bottom" v-if="visibleKnowledgeView.exportFormats.length !== 0">
            <q-btn
              class="float-right kvv-button"
              flat
              v-for="(format, index) in visibleKnowledgeView.exportFormats" :key="index"
              :icon="getIcon(format) || 'mdi-arrow-down'"
              :label="format.label"
              @click.native="exportKnowledgeView(format)"
            ></q-btn>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { downloadFromEngine } from 'shared/Helpers';
import { KNOWLEDGE_VIEWS } from 'shared/Constants';

export default {
  name: 'KnowledgeViewViewer',
  data() {
    return {
      KNOWLEDGE_VIEWS,
    };
  },
  computed: {
    ...mapGetters('data', [
      'visibleKnowledgeView',
    ]),
    ...mapGetters('view', [
      'modalSize',
    ]),
  },
  methods: {
    closeDialog() {
      this.visibleKnowledgeView.show = false;
    },
    getIcon(format) {
      return this.KNOWLEDGE_VIEWS.find(kv => kv.viewClass === this.visibleKnowledgeView.viewClass).exportIcons.find(ei => ei.type === format.adapter).icon;
    },
    exportKnowledgeView(selectedFormat) {
      try {
        downloadFromEngine(`${this.visibleKnowledgeView.contextId}.${this.visibleKnowledgeView.viewId}`, this.visibleKnowledgeView.viewClass.toUpperCase(), this.visibleKnowledgeView.label, selectedFormat);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .klab-modal-content
    padding 20px 20px
    background-color var(--app-background-color) !important
  .kvv-title
    font-size 1.4em
    font-weight 300
    color var(--app-title-color)
    padding 10px 0
    border-bottom 1px solid var(--app-title-color)
  caption
    display none
  .kvv-content-wrapper
    height calc(100% - 50px)
    max-height calc(100% - 50px)
    background-color var(--app-darken-background-color)
    &.kvv-with-exports
      height calc(100% - 90px)
    .simplebar-scrollbar:before
      background-color var(--app-title-color)
    .kvv-content
      margin 15px 0
      padding 20px 20px
      color var(--app-text-color)
      display flex
      flex-direction column
      align-items center
      table
        border-collapse collapse
      th
        color var(--app-title-color)
        font-weight 300
        padding 10px 5px
        &[scope='row']
          text-align right
          padding-right 15px
      tbody
        tr th
          min-width 250px
      td
        padding 10px 5px
        text-align center
        border 1px solid var(--app-title-color)
      // engine styles
      .kv-bold
        font-weight bold !important
      .kv-italic
        font-style italic !important
      .kv-align-right
        text-align right !important
      .kv-align-center
        text-align center !important
      .kv-align-left
        text-align left !important
      .kv-bg-highlight
        background-color var(--app-highlight-background-color)
      // TODO check it
      .kv-fg-highlight
        color var(--app-highlight-text-color)
  .kvv-actions
    height 50px
    padding 0 20px

  .kvv-button
    background-color var(--app-main-color) !important
    color var(--app-background-color) !important

  .kvv-close-button
    position absolute
    top 20px
    right 20px
    z-index 200000
    background-color var(--app-main-color) !important
    color var(--app-background-color) !important
</style>
