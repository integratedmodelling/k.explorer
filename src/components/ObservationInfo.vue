<template>
  <div>
    {{ observationInfo.semantics }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Observation Info',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('view', [
      'observationInfo',
    ]),
  },
};
</script>

<style>
</style>
