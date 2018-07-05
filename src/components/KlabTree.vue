<template>
  <q-tree
    ref="klabTree"
    :nodes="tree"
    node-key="id"
    default-expand-all
    :ticked.sync="ticked"
    tick-strategy="strict"
  ></q-tree>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'klabTree',
  data() {
    return {
      ticked: [],
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'updateNodes',
    ]),
  },
  watch: {
    ticked(newValues, oldValues) {
      this.updateNodes({ newValues, oldValues });
    },
  },
};
</script>

<style>
</style>
