<template>
  <div class="no-padding">
    <q-tree
      ref="klabTree"
      :nodes="tree"
      node-key="label"
      default-expand-all
      :selected.sync="selected"

    />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'klabTree',
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'tree',
    ]),
  },
  methods: {
    ...mapActions('data', [
      'setSelected',
    ]),
  },
  watch: {
    selected() {
      this.setSelected(this.$refs.klabTree.getNodeByKey(this.selected));
    },
  },
};
</script>

<style>
</style>
