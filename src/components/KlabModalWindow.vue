<template>
  <q-modal
    content-classes="km-main-container"
    v-model="open"
    no-esc-dismiss
    no-backdrop-dismiss
  >
    <q-modal-layout>
      <q-toolbar slot="header" v-if="modal.label" class="km-title">
        <q-toolbar-title>{{ modal.label }}</q-toolbar-title>
        <span slot="subtitle" v-if="modal.subtitle" class="km-subtitle">{{ modal.subtitle }}</span>
      </q-toolbar>
      <klab-layout :layout="modal" :isModal="true" :modal-width="width" :modal-height="height" class="km-content"></klab-layout>
      <div class="km-buttons justify-end row">
        <q-btn class="klab-button" @click="close" :label="$t('label.appClose')"></q-btn>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import { mapActions } from 'vuex';
import KlabLayout from 'components/KlabLayout.vue';

export default {
  name: 'KlabModalWindow',
  props: {
    modal: {
      type: Object,
      required: true,
    },
  },
  components: {
    KlabLayout,
  },
  data() {
    return {
      instance: undefined,
    };
  },
  computed: {
    open: {
      get() {
        return this.modal !== null;
      },
      set(value) {
        if (!value) {
          this.close();
        }
      },
    },
    width() {
      return this.modal && (`${this.modal.panels[0].attributes.width}px` || '50vw');
    },
    height() {
      return this.modal && (`${this.modal.panels[0].attributes.height}px` || '50vh');
    },
  },
  methods: {
    ...mapActions('view', [
      'setModalWindow',
    ]),
    close() {
      this.setModalWindow(null);
    },
  },
};
</script>

<style lang="stylus">
.km-main-container
  .scroll
    overflow hidden
  .km-title
    background-color var(--app-main-color) !important
    color var(--app-background-color)
    .q-toolbar-title
      font-size var(--app-modal-title-size)
    .km-subtitle
      font-size var(--app-modal-subtitle-size)
  .km-content
    overflow hidden
    border-radius 8px
    border 1px solid var(--app-main-color)
    margin 16px 16px 0 16px
    padding 8px
    background-color var(--app-background-color)
    .kcv-main-container > .kcv-group
      border none
  .km-buttons
    margin 8px 16px
    .klab-button
      font-size 16px
      background-color var(--app-main-color)
      color var(--app-background-color) !important
</style>
