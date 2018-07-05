<template>
  <div ref="main-control-container">
    <transition
      appear
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <q-btn
        class="fixed shadow-1"
        style="left:.5em; top:1.5em;"
        color="primary"
        round
        size="md"
        @click="show"
        icon="ion-ios-bookmarks"
        v-show="hasContext && isHidden"
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
      v-show="hasContext && !isHidden"
      v-draggable="draggableValue"
    >
      <q-card-title class="q-pa-sm bg-primary" ref="dr-handler">
        <span class="q-pr-md text-white">{{ contextLabel }}</span>
        <q-btn
          color="primary"
          round
          size="sm"
          @click="hide"
          icon="ion-ios-arrow-back"
        ></q-btn>
      </q-card-title>
      <q-card-main>
        <component :is="content"></component>
        <klab-spinner v-show="hasTasks" color="#26A69A" :size="100"/>
      </q-card-main>
    </q-card>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import KlabSpinner from 'components/KlabSpinner.vue';
import KlabTree from 'components/KlabTree.vue';

export default {
  name: 'klabMainControl',
  data() {
    return {
      isHidden: false,
      draggableValue: {
        handle: undefined,
        resetInitialPos: false,
      },
      content: 'KlabTree',
    };
  },
  computed: {
    ...mapGetters('data', [
      'contextLabel',
      'hasContext',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
  },
  methods: {
    hide() {
      this.draggableValue.resetInitialPos = false;
      this.isHidden = true;
    },
    show() {
      this.draggableValue.resetInitialPos = true;
      this.isHidden = false;
    },
  },
  watch: {
  },
  mounted() {
    this.draggableValue.handle = this.$refs['dr-handler'];
  },
  directives: {
    Draggable,
  },
  components: {
    KlabTree,
    KlabSpinner,
  },
};
</script>

<style>
  .q-card-main {
    overflow: auto;
    max-height: 70vh;
  }
</style>
