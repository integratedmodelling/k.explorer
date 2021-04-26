<template>
  <q-modal
    content-classes="km-main-container"
    v-model="open"
    no-esc-dismiss
    no-backdrop-dismiss
  >
    <klab-layout :layout="modal" :isModal="true" :modal-width="width" :modal-height="height"></klab-layout>
    <div class="km-buttons justify-end row">
      <q-btn class="klab-button" @click="open = false" :label="$t('label.appClose')"></q-btn>
    </div>
  </q-modal>
</template>

<script>
import { mapGetters } from 'vuex';
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
    ...mapGetters('view', [
      'modalWindows',
    ]),
    open: {
      get() {
        return this.modal && this.modal.open;
      },
      set(value) {
        this.modal.open = value;
      },
    },
    width() {
      return this.modal && (`${this.modal.panels[0].attributes.width}px` || '50vw');
    },
    height() {
      return this.modal && (`${this.modal.panels[0].attributes.height}px` || '50vh');
    },
  },
};
</script>

<style lang="stylus">
.km-buttons
  padding 0 16px 16px 0
  .klab-button
    font-size 16px
    background-color var(--app-main-color)
    color var(--app-background-color) !important
</style>
