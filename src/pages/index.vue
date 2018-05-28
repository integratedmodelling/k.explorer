<template>
  <q-page class="column bg-red-1">
    <div class="col row full-height bg-red-1">
      <!--
      <div class="col-2 no-padding bg-red-1 text-right" >
        <q-btn
          color="secondary"
          round
          inverted
          size="md"
          class="q-ma-sm"
          @click="treeIsHidden = true"
          icon="clear"
        ></q-btn>
        <klab-tree></klab-tree>
      </div>
          -->
      <viewer></viewer>
    </div>
    <div class="col-1 row bg-red-1">
      <klab-log></klab-log>
    </div>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <q-btn
        class="fixed shadow-1"
        style="left:5vw; top:2vw;"
        color="secondary"
        round
        size="sm"
        @click="treeIsHidden = false"
        icon="play_arrow"
        v-show="hasTree && treeIsHidden"
      ></q-btn>
    </transition>
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
    <q-card
      class="fixed bg-white shadow-1"
      style="left:1vw; top:1vw;"
      v-show="hasTree && !treeIsHidden"
    >
      <q-card-title>{{ $t('label.treeTitle') }}
        <q-btn
          slot="right"
          color="secondary"
          round
          size="xs"
          @click="treeIsHidden = true"
          icon="clear"
        ></q-btn>
      </q-card-title>
      <q-card-main>
        <klab-tree></klab-tree>
      </q-card-main>
    </q-card>
    </transition>
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
import klabTree from 'components/KlabTree.vue';
import klabLog from 'components/KlabLog.vue';
import viewer from 'components/Viewer.vue';

export default {
  /* eslint-disable object-shorthand */
  name: 'IndexPage',
  data() {
    return {
      treeIsHidden: false,

    };
  },
  computed: {
    ...mapGetters('data', [
      'hasTree',
      'hasSaved',
    ]),
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

  components: {
    klabTree,
    klabLog,
    viewer,
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

