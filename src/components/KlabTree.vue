<template>
  <div ref="tree-container">
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
        v-show="hasContext && treeIsHidden"
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
      v-show="hasContext && !treeIsHidden"
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
        <div class="no-padding">
          <q-tree
            ref="klabTree"
            :nodes="tree"
            node-key="id"
            default-expand-all
            :selected.sync="selected"
            :ticked.sync="ticked"
          ></q-tree>
          <!--
          <q-spinner-ball
            color="secondary"
            :size="40"
            v-show="hasTasks"
            class="content-center full-width q-mt-md"
          ></q-spinner-ball>
          -->
          <klab-spinner color="#26A69A" :size="100"/>
        </div>
      </q-card-main>
    </q-card>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { Draggable } from 'draggable-vue-directive';
import KlabSpinner from 'components/KlabSpinner.vue';

export default {
  name: 'klabTree',
  data() {
    return {
      selected: null,
      ticked: [],
      treeIsHidden: false,
      draggableValue: {
        handle: undefined,
        resetInitialPos: false,
      },
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
      'contextLabel',
      'hasContext',
    ]),
    ...mapGetters('stomp', [
      'hasTasks',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'setLeafSelected',
    ]),
    hide() {
      this.draggableValue.resetInitialPos = false;
      this.treeIsHidden = true;
    },
    show() {
      this.draggableValue.resetInitialPos = true;
      this.treeIsHidden = false;
    },
  },
  watch: {
    selected() {
      this.setLeafSelected(this.$refs.klabTree.getNodeByKey(this.selected));
    },
  },
  mounted() {
    this.draggableValue.handle = this.$refs['dr-handler'];
  },
  directives: {
    Draggable,
  },
  components: {
    KlabSpinner,
  },
};
</script>

<style>
</style>
