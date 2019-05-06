<template>
  <div class="fit gv-container">
    <p>I'm an incredible graph viewer with id <em>{{ idx }} and I've {{ observations.length }} observations</em></p>
  </div>
</template>

<script>
export default {
  name: 'GraphViewer',
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    observations() {
      return this.$store.getters['data/observationsOfViewer'](this.idx);
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'

  .gv-container
    background-color $grey-4
</style>
