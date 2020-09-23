<template>
  <div class="modal fullscreen" id="modal-show-view" v-show="hasNewKnowledgeViews">
    <div class="modal-backdrop absolute-full"></div>
      <div class="klab-modal-container"
           :style="{
              width: `${modalSize.width}px`,
              height: `${modalSize.height}px`,
              transform: `translate(-50%, -50%) !important`}">
        <div class="klab-modal-inner full-height">
          <div class="klab-modal-content full-height">
            <div class="kvv-item" v-for="(knowledgeView, index) in newKnowledgeViews" :key="index">
              <div class="kvv-title">{{ knowledgeView.title }}</div>
              <div class="kvv-content" v-html="knowledgeView.body"></div>
            </div>
          </div>
          <q-btn
            color="mc-main"
            class="absolute-bottom-right q-ma-lg kvv-close-button"
            @click="closeDialog">{{ $t('label.appClose') }}</q-btn>
        </div>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'KnowledgeViewViewer',
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters('data', [
      'newKnowledgeViews',
    ]),
    ...mapGetters('view', [
      'modalSize',
    ]),
    hasNewKnowledgeViews() {
      return this.newKnowledgeViews.length !== 0;
    },
  },
  methods: {
    closeDialog() {
      this.newKnowledgeViews.forEach((kv) => {
        kv.isNew = false;
      });
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kvv-item
    margin 20px
    .kvv-title
      font-size 1.4em
      font-weight 300
      color var(--app-title-color)
      padding 10px 0
      border-bottom 1px solid var(--app-title-color)
    caption
      display none
    .kvv-content
      padding 25px 10px
      table
        border-collapse collapse
      th
        color var(--app-title-color)
        font-weight 300
        padding 10px 5px
      tbody
        tr th
          min-width 250px
      td
        padding 10px 5px
        text-align center


      td
        border 1px solid var(--app-title-color)

  .kvv-close-button
    background var(--app-main-color) !important
    color var(--app-background-color) !important
</style>
