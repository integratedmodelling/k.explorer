<template>
  <div class="fit uv-container">
    <h4>Under construction</h4>
  </div>
</template>

<script>

export default {
  name: 'UnknownViewer',
  props: {
    idx: {
      type: Number,
      required: true,
    },
  },
};
</script>
<style lang="stylus">
  @import '~variables'

  .uv-container
    background-color $main-control-green
    overflow hidden
    h4
      text-align center

    .q-spinner
      position absolute
      top calc(50% - 20px)
      left calc(50% - 20px)
</style>
