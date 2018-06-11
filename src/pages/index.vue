<template>
  <q-page class="column bg-red-1">
    <div class="col row full-height bg-red-1">
      <viewer></viewer>
    </div>
    <div class="col-1 row bg-red-1">
      <klab-log></klab-log>
    </div>
    <klab-tree></klab-tree>
    <q-modal
        minimized
        v-model="modalVisible"
        no-esc-dismiss
        no-backdrop-dismiss
        :content-css="{padding: '50px', minWidth: '50vw'}"
        :content-classes="['text-center','bg-white']"
    >
      <div v-show="connectionState === $constants.CONNECTION_DOWN" class="bg-white">
        <div class="q-display-1 q-mb-md bg-warning round-modal">{{ modalText }}</div>
          <q-btn
            color="secondary"
            @click="reconnect"
          >{{ $t('label.reconnect') }}</q-btn>
      </div>
      <div class="bg-red" v-show="connectionState === $constants.CONNECTION_ERROR ||
                                  connectionState === $constants.CONNECTION_WORKING">
        <div class="q-display-1 q-mb-md bg-white round-modal text-primary text-bold">
          {{ modalText  }}
        </div>
        <q-spinner-radio color="white" :size="40" />
      </div>
    </q-modal>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex';

import KlabTree from 'components/KlabTree.vue';
import KlabLog from 'components/KlabLog.vue';
import Viewer from 'components/Viewer.vue';

export default {
  /* eslint-disable object-shorthand */
  name: 'IndexPage',
  computed: {
    ...mapGetters('stomp', [
      'connectionState',
    ]),
    modalVisible() {
      return this.connectionState !== this.$constants.CONNECTION_UP;
    },
    modalText() {
      return {
        [this.$constants.CONNECTION_DOWN]: this.$t('messages.connectionClosed'),
        [this.$constants.CONNECTION_WORKING]: this.$t('messages.connectionWorking'),
        [this.$constants.CONNECTION_ERROR]: this.$t('errors.connectionError'),
      }[this.connectionState];
    },
  },
  methods: {},
  components: {
    KlabTree,
    KlabLog,
    Viewer,
  },
  watch: {
  },
};
</script>
<style scoped>
  .row div{
    padding: 10px 15px;
    background: rgba(86, 61, 124, .15);
    border: 1px solid rgba(86, 61, 124, .2)
  }
  .round-modal {
    border-radius: 20px;
  }
</style>

