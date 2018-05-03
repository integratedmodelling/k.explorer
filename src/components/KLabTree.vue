<template>
  <q-tree
    :nodes="tree"
    node-key="label"
  />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  // name: 'ComponentName',
  computed: {
    ...mapGetters('data', [
      'tree',
    ]),
  },
};
</script>

<style>
</style>
