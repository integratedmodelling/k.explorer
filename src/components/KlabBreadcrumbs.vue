<template>
  <div class="kbc-container" v-if="contextsCount > 1">
    <span
      v-for="(element, index) in contextsLabels"
      :key="element.id"
      @click="loadContext(element.contextId, index)"
    >{{ element.label }}</span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LoadContext from 'shared/LoadContextMixin';

export default {
  name: 'KlabBreadcrumbs',
  mixins: [
    LoadContext,
  ],
  computed: {
    ...mapGetters('data', [
      'contextsLabels',
      'contextsCount',
    ]),
  },
  methods: {
    loadContext(contextId, index) {
      if (index !== this.contextsCount - 1) {
        this.loadOrReloadContext(contextId);
      }
    },
  },
};
</script>

<style lang="stylus">
  @import '~variables'
  .kbc-container
    position relative
    height $main-control-spc-height
    font-size 10px
    padding 2px 5px
    span
      color #eee
      &:not(:last-child)
        cursor pointer
        color $main-control-main-color
        &:hover
          color $main-control-yellow
        &:after
          content ' / '
          color #eee


</style>
