<template>
  <div>{{ g }}</div>
</template>

<script>
import { mapGetters } from 'vuex';
import ELK from 'elkjs';

export default {
  name: 'DataflowViewer',
  data() {
    return {
      elk: new ELK(),
      g: null,
    };
  },
  computed: {
    ...mapGetters('data', [
      'dataflow',
    ]),
  },
  mounted() {
    this.elk.layout(this.dataflow).then((g) => { this.g = JSON.stringify(g, null, ' '); });
  },
};
</script>

<style>
</style>
