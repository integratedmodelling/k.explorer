<template>
  <q-page class="column">
    <div class="col row full-height" id="viewer-container">
      <keep-alive>
        <!-- <transition name="component-fade" mode="out-in"> -->
        <component :is="mainViewer"></component>
        <!-- </transition> -->
      </keep-alive>
    </div>
    <div class="col-1 row">
      <klab-log v-if="logVisible"></klab-log>
    </div>
    <klab-main-control></klab-main-control>
    <q-modal
        id="modal-connection-status"
        v-model="modalVisible"
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{'background-color': `rgba(${hexToRgbValues(modalColor)}, 0.3)`}"
        :content-classes="['text-center','modal-borders', 'no-padding', 'no-margin']"
    >
      <div class="bg-opaque-white modal-borders no-padding no-margin">
          <div class="q-pa-xs text-bold modal-klab-content" :style="{color: modalColor}">
            <klab-spinner
              :color="modalColor"
              :size="40"
              :ball="18"
              wrapperId="modal-connection-status"
            ></klab-spinner>
            <span>{{ modalText  }}</span>
          </div>
          <q-btn
            v-if="connectionState === $constants.CONNECTION_DOWN"
            color="secondary"
            @click="reconnect"
          >{{ $t('label.reconnect') }}
          </q-btn>
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { VIEWERS } from 'shared/Constants';

import KlabMainControl from 'components/KlabMainControl.vue';
import DataViewer from 'components/DataViewer.vue';
import ReportViewer from 'components/ReportViewer.vue';
import KlabSpinner from 'components/KlabSpinner.vue';

import { colors } from 'quasar';

export default {
  /* eslint-disable object-shorthand */
  name: 'IndexPage',
  computed: {
    ...mapGetters('stomp', [
      'connectionState',
    ]),
    ...mapGetters('view', [
      'searchIsActive',
      'searchIsFocused',
      'mainViewer',
    ]),
    logVisible() {
      return this.$logVisibility === this.$constants.PARAMS_LOG_VISIBLE;
    },
    modalVisible: {
      get() {
        return this.connectionState !== this.$constants.CONNECTION_UP;
      },
      set(visible) {
        console.warn(`try to set modalVisible as ${visible}`);
      },
    },
    modalText() {
      return {
        [this.$constants.CONNECTION_UNKNOWN]: this.$t('messages.connectionClosed'),
        [this.$constants.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [this.$constants.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [this.$constants.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
    modalColor() {
      return {
        [this.$constants.CONNECTION_UNKNOWN]: colors.getBrand('warning'),
        [this.$constants.CONNECTION_DOWN]: colors.getBrand('warning'),
        [this.$constants.CONNECTION_WORKING]: colors.getBrand('info'),
        [this.$constants.CONNECTION_ERROR]: colors.getBrand('negative'),
      }[this.connectionState];
    },
  },
  methods: {
    ...mapActions('view', [
      'searchStart',
      'searchStop',
      'searchFocus',
      'setMainViewer',
    ]),
  },
  components: {
    KlabMainControl,
    DataViewer,
    ReportViewer,
    KlabSpinner,
  },
  watch: {
  },
  created() {
    if (typeof this.mainViewer === 'undefined') {
      this.setMainViewer(VIEWERS.DATA_VIEWER);
    }
  },
  mounted() {
    // const self = this;
    window.addEventListener('keydown', (event) => {
      if (this.modalVisible) {
        return;
      }
      if (event.keyCode === 27 && this.searchIsActive) {
        this.searchStop();
        event.preventDefault();
        return;
      }
      if (event.keyCode === 38 || event.keyCode === 40 || (event.keyCode >= 65 && event.keyCode <= 90)) {
        if (!this.searchIsActive) {
          this.searchStart(event.key);
          event.preventDefault();
        } else if (!this.searchIsFocused) {
          this.searchFocus({ char: event.key, focused: true });
          event.preventDefault();
        }
      }
    });
  },
};
</script>
<style scoped>
  .row > div {
    /*
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2);
    */
  }
  .bg-opaque-white {
    background: rgba(255, 255, 255, 0.3)
  }
</style>
<style lang="stylus">
  .modal-borders {
    border-radius 40px;
  }
  .klab-spinner {
    display: inline;
    vertical-align: middle
  }
  .modal-klab-content {
    vertical-align: middle;
  }
  .modal-klab-content > span {
    width 150px;
    display inline-block;
    text-align left
    margin-left 15px
  }
</style>
