<template>
  <q-modal
    id="modal-connection-status"
    v-model="modalVisible"
    no-esc-dismiss
    no-backdrop-dismiss
    :content-css="{'background-color': `rgba(${hexToRgbValues(modalColor)}, 0.5)`}"
    :content-classes="['modal-borders', 'no-padding', 'no-margin']"
  >
    <div class="bg-opaque-white modal-borders">
      <div class="q-pa-xs text-bold modal-klab-content" :style="{color: modalColor}">
        <klab-spinner
          :color="modalColor"
          :size="40"
          :ball="18"
          id="modal-spinner"
          :animated="modalAnimated"
          wrapperId="modal-connection-status"
        ></klab-spinner>
        <span class="text-white">{{ modalText }}</span>
      </div>
    </div>
  </q-modal>
</template>

<script>
import * as colors from 'shared/colors';
import { mapGetters } from 'vuex';
import { CONNECTION_CONSTANTS } from 'shared/Constants';
import KlabSpinner from 'components/KlabSpinner.vue';

export default {
  name: 'ModalConnectionStatus',
  components: {
    KlabSpinner,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('stomp', [
      'connectionState',
      'connectionDown',
    ]),
    modalVisible: {
      get() {
        return this.connectionDown;
      },
      set(visible) {
        console.warn(`Try to set modalVisible as ${visible}`);
      },
    },
    modalText() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
    modalColor() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: colors.getBrand('warning'),
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: colors.getBrand('info'),
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: colors.getBrand('negative'),
      }[this.connectionState];
    },
    modalAnimated() {
      return {
        [CONNECTION_CONSTANTS.CONNECTION_UNKNOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_DOWN]: false,
        [CONNECTION_CONSTANTS.CONNECTION_WORKING]: true,
        [CONNECTION_CONSTANTS.CONNECTION_ERROR]: false,
      }[this.connectionState];
    },
  },
};
</script>

<style lang="stylus">
  #modal-connection-status
    &.fullscreen
      z-index 10000
    .modal-borders
      border-radius 40px
    #modal-spinner
      margin-right 10px
      margin-left 1px
    .modal-klab-content > span
      display inline-block
      line-height 100%
      vertical-align middle
      margin-right 15px
    .modal-content
      min-width 200px
</style>
